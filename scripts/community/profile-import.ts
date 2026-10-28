/** Offline operator adapter. Never pass a private Sheet dump or credentials here. */
import { z } from 'astro/zod';
import { exportRegistry, validateRegistryAssets } from '../../src/data/eventRegistry.ts';
import { eventShowcase } from '../../src/data/eventShowcase.ts';

const id = z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/);
const text = z.string().trim().min(1).max(2400);
const yes = z.literal(true);
const packetSchema = z.strictObject({
  snapshotId: id, revision: z.number().int().positive(), exportedAt: z.iso.datetime({ offset: true }),
  exportId: id, sourceRevision: id,
  Profiles: z.array(z.strictObject({
    profile_id: id, display_name: text, public_title: text.optional(), organization: text.optional(),
    short_bio: text, public_linkedin_url: z.string().optional(), public_website_url: z.string().optional(),
    publication_status: z.literal('PUBLIC_APPROVED'), affiliation_verified: yes,
  })).min(1).max(1000),
  Roles: z.array(z.strictObject({
    profile_id: id, event_year: z.literal('2026'),
    // "speaker" alone cannot establish a keynote appointment. This is a separate human decision.
    registry_category: z.enum(['Keynote Speaker', 'Speaker', 'Judge', 'Mentor', 'Organizer', 'Partner']), role_approved: yes,
  })).min(1).max(1000),
  Assets: z.array(z.strictObject({
    profile_id: id, public_copy_path: z.string(), sha256: z.string().regex(/^[a-f0-9]{64}$/), alt_text: text,
    rights: z.enum(['owned', 'cc0', 'permission']), attribution: text,
    ownership_verified: yes, usage_permission_verified: yes, asset_approved: yes, display_credit_required: z.literal(false),
  })).max(1000),
  Approvals: z.array(z.strictObject({
    profile_id: id, consent_confirmed: yes, content_approved: yes, asset_approved: z.boolean(), withdrawn: z.literal(false),
  })).min(1).max(1000),
});
const approved = { content: true, organizer: true, publicDisplayConsent: true, branding: true };
function reject(): never { throw Error('Profile import rejected; review sanitized tables and approvals privately'); }
function unique(values: string[]) { if (new Set(values).size !== values.length) reject(); }

/** Returns an EVENT-002 snapshot awaiting independent owner approval; never writes/publishes. */
export function importProfiles(input: unknown, publicRoot = 'public') {
  try {
    if (Buffer.byteLength(JSON.stringify(input) ?? '') > 1024 * 1024) reject();
    const p = packetSchema.parse(input);
    unique(p.Profiles.map(x => x.profile_id)); unique(p.Approvals.map(x => x.profile_id)); unique(p.Assets.map(x => x.profile_id));
    unique(p.Roles.map(x => `${x.profile_id}:${x.registry_category}`));
    const ids = new Set(p.Profiles.map(x => x.profile_id));
    if ([...p.Roles, ...p.Assets, ...p.Approvals].some(x => !ids.has(x.profile_id)) || p.Approvals.length !== ids.size) reject();
    const people = [], records = [], assets = [];
    for (const profile of p.Profiles) {
      const roles = p.Roles.filter(x => x.profile_id === profile.profile_id);
      const asset = p.Assets.find(x => x.profile_id === profile.profile_id);
      const approval = p.Approvals.find(x => x.profile_id === profile.profile_id)!;
      if (!roles.length || (asset && !approval.asset_approved)) reject();
      // Organizations use the existing Partner record, never a pretend reusable person.
      if (roles.some(x => x.registry_category === 'Partner') && roles.length !== 1) reject();
      const identity = { name: profile.display_name, designation: profile.public_title, organization: profile.organization,
        biography: profile.short_bio, website: profile.public_website_url, affiliationVerified: true,
        ...(asset ? { image: { path: asset.public_copy_path, alt: asset.alt_text } } : {}) };
      if (roles[0].registry_category !== 'Partner') people.push({ id: profile.profile_id, ...identity,
        linkedin: profile.public_linkedin_url, confirmed: true, approvals: approved });
      else if (profile.public_linkedin_url) reject(); // Existing Partner projection has no LinkedIn field.
      for (const role of roles) records.push({ id: `${profile.profile_id}-${role.registry_category.replaceAll(' ', '-')}`,
        eventId: 'aegython-2026', category: role.registry_category,
        ...(role.registry_category === 'Partner' ? identity : { personId: profile.profile_id }),
        approvedCopy: profile.short_bio, status: 'Published', approvals: approved, visibility: { public: true, suppressed: false } });
      if (asset) assets.push({ path: asset.public_copy_path, sha256: asset.sha256, rights: asset.rights,
        attribution: asset.attribution, approved: true, displayCreditRequired: false });
    }
    const snapshot = exportRegistry({ schemaVersion: records.some(record => ['Speaker', 'Organizer'].includes(record.category)) ? '1.1.0' : '1.0.0', kind: 'PUBLIC_APPROVED', snapshotId: p.snapshotId,
      revision: p.revision, exportedAt: p.exportedAt,
      provenance: { method: 'controlled-sanitized-export', exportId: p.exportId, sourceRevision: p.sourceRevision },
      data: { events: eventShowcase.events, people, records }, assets,
      recordDecisions: records.map(x => ({ recordId: x.id, state: 'approved' })),
      profileConsents: people.map(x => ({ personId: x.id, state: 'granted' })) });
    validateRegistryAssets(snapshot, publicRoot);
    return snapshot;
  } catch { reject(); }
}
