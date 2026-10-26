/** Build/administrator only. No private master data belongs in these inputs. */
import { z } from 'astro/zod';
import { createHash } from 'node:crypto';
import { readFileSync, realpathSync, statSync } from 'node:fs';
import { relative, resolve, isAbsolute } from 'node:path';
import { showcaseSchema, publicShowcase, type ShowcaseData } from './eventShowcase.ts';
import { challengeVisuals } from './hackathonVisuals.ts';
import { assertPublicExport } from '../../scripts/community/public-export.mjs';

export const REGISTRY_VERSION = '1.0.0';
const id = z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const timestamp = z.iso.datetime({ offset: true });
const plainText = z.string().trim().min(1).max(2400);
const publicUrl = z.url().refine(value => {
  const url = new URL(value);
  return url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash
    && /^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(url.hostname)
    && !/^(?:\d{1,3}\.){3}\d{1,3}$/.test(url.hostname)
    && !/\.(local|internal|localhost)$/i.test(url.hostname)
    && !/(^|\.)(google\.com|googleapis\.com|googleusercontent\.com|forms\.gle)$/i.test(url.hostname);
}, 'Reviewed public HTTPS URL required');
const assetSchema = z.strictObject({
  path: z.string().regex(/^\/images\/[A-Za-z0-9/_-]+\.(png|jpg|jpeg|webp|avif)$/),
  sha256: hash, rights: z.enum(['owned', 'cc0', 'permission']), attribution: plainText,
  sourceUrl: publicUrl.optional(), approved: z.literal(true), displayCreditRequired: z.literal(false),
});
const common = {
  schemaVersion: z.literal(REGISTRY_VERSION), kind: z.enum(['PUBLIC_APPROVED', 'SYNTHETIC']),
  snapshotId: id, revision: z.number().int().positive().max(Number.MAX_SAFE_INTEGER), exportedAt: timestamp,
  provenance: z.strictObject({ method: z.literal('controlled-sanitized-export'), exportId: id, sourceRevision: id }),
  data: showcaseSchema, assets: z.array(assetSchema).max(1000),
};
export const registrySnapshotSchema = z.strictObject(common);
export const registryCandidateSchema = z.strictObject({
  ...common,
  recordDecisions: z.array(z.strictObject({ recordId: id, state: z.enum(['approved', 'pending', 'revoked', 'withdrawn']) })).max(1000),
  profileConsents: z.array(z.strictObject({ personId: id, state: z.enum(['granted', 'pending', 'revoked', 'withdrawn']) })).max(1000),
});
export const registryApprovalSchema = z.strictObject({
  schemaVersion: z.literal(REGISTRY_VERSION), snapshotId: id, revision: z.number().int().positive(),
  sha256: hash, state: z.enum(['approved', 'revoked']), approvedAt: timestamp, expiresAt: timestamp,
  reviewUrl: publicUrl, recordIds: z.array(id).max(1000),
});
export type RegistrySnapshot = z.infer<typeof registrySnapshotSchema>;
export type RegistryApproval = z.infer<typeof registryApprovalSchema>;

export function registryDigest(value: unknown) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}
function fail(): never { throw new Error('Registry validation rejected'); }
/** Supplemental screening, not proof that arbitrary prose has been sanitized. */
function screen(value: unknown, depth = 0, field = ''): void {
  if (depth > 64) fail();
  if (typeof value === 'string') {
    // No phone-shaped contacts, Workspace links, markup or executable spreadsheet cells.
    if (/[<>\u0000-\u001f\u007f]/.test(value) || /^[\s\uFEFF]*[=+@-]/.test(value)
      || (['name', 'designation', 'organization', 'biography', 'expertise', 'alt', 'approvedCopy', 'session', 'title', 'attribution'].includes(field) && /(?:\+?\d[\s().-]*){8,}/.test(value))
      || /https?:\/\/(?:[^/]+\.)?(?:google\.com|googleapis\.com|googleusercontent\.com|forms\.gle)(?:[/?#]|$)/i.test(value)) fail();
    if (/https?:\/\//i.test(value) && !publicUrl.safeParse(value).success) fail();
  } else if (Array.isArray(value)) value.forEach(item => screen(item, depth + 1, field));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => screen(item, depth + 1, key));
}
function checkedInput(value: unknown) {
  if (Buffer.byteLength(JSON.stringify(value) ?? '') > 1024 * 1024) fail();
  assertPublicExport(value);
  screen(value);
}
function unique(values: string[]) { if (new Set(values).size !== values.length) fail(); }
function sameIds(actual: string[], expected: string[]) {
  unique(actual);
  if (actual.length !== expected.length || expected.some(id => !actual.includes(id))) fail();
}
function instant(now: Date) { if (!Number.isFinite(+now)) fail(); }
function references(data: ShowcaseData) {
  return new Set(data.records.flatMap(record => [...(record.personId ? [record.personId] : []), ...(record.members ?? [])]));
}
function imagePaths(data: ShowcaseData) {
  return new Set([...data.people, ...data.records].flatMap(item => item.image ? [item.image.path] : []));
}
/** Reuse EVENT-001's approval rules, while preserving future/expired visibility windows. */
function eligible(data: ShowcaseData) {
  const probe = { ...data, records: data.records.map(record => ({ ...record, status: 'Published', visibility: { public: true, suppressed: false } })) };
  return new Set(data.events.flatMap(event => publicShowcase(probe, event.id, new Date('2000-01-01T00:00:00Z')).map(item => item.id)));
}
function validateSemantics(snapshot: RegistrySnapshot, now: Date) {
  if (Date.parse(snapshot.exportedAt) > +now || snapshot.data.records.length > 1000 || snapshot.data.people.length > 1000) fail();
  const data = snapshot.data;
  const allowed = eligible(data);
  const roles = new Set<string>();
  for (const record of data.records) {
    if (!['Published', 'Scheduled'].includes(record.status) || !record.visibility.public || record.visibility.suppressed || !allowed.has(record.id)) fail();
    const event = data.events.find(event => event.id === record.eventId)!;
    if ((record.visibility.from || record.visibility.until) && !event.timezone) fail();
    if (record.members && record.category !== 'Team') fail();
    if (record.personId && !['Keynote Speaker', 'Judge', 'Mentor', 'Participant'].includes(record.category)) fail();
    if (record.challenge && !Object.hasOwn(challengeVisuals, record.challenge)) fail();
    if (record.personId) {
      const key = `${record.eventId}:${record.personId}:${record.category}`;
      if (roles.has(key)) fail();
      roles.add(key);
      // A role cannot carry a second, conflicting copy of a reusable person's identity.
      if (['name', 'designation', 'organization', 'biography', 'image', 'website'].some(key => key in record) || record.expertise.length) fail();
    }
  }
  sameIds(data.people.map(person => person.id), [...references(data)]);
  sameIds(snapshot.assets.map(asset => asset.path), [...imagePaths(data)]);
}
/** Candidate must already be sanitized outside Git. Never give this a response Sheet dump. */
export function exportRegistry(input: unknown, { now = new Date() } = {}): RegistrySnapshot {
  instant(now); checkedInput(input);
  const candidate = registryCandidateSchema.parse(input);
  unique(candidate.assets.map(asset => asset.path));
  sameIds(candidate.recordDecisions.map(item => item.recordId), candidate.data.records.map(item => item.id));
  sameIds(candidate.profileConsents.map(item => item.personId), candidate.data.people.map(item => item.id));
  const consenting = new Set(candidate.profileConsents.filter(item => item.state === 'granted').map(item => item.personId));
  const approved = new Set(candidate.recordDecisions.filter(item => item.state === 'approved').map(item => item.recordId));
  let records = candidate.data.records.filter(record => approved.has(record.id)
    && [...(record.personId ? [record.personId] : []), ...(record.members ?? [])].every(id => consenting.has(id)));
  // Withholding/withdrawing a team also withholds roles associated with that team.
  records = records.filter(record => !record.team || records.some(team => team.id === record.team));
  const data = { ...candidate.data, records };
  data.people = data.people.filter(person => references(data).has(person.id));
  const { recordDecisions: _decisions, profileConsents: _consents, ...envelope } = candidate;
  const snapshot = registrySnapshotSchema.parse({ ...envelope, data, assets: candidate.assets.filter(asset => imagePaths(data).has(asset.path)) });
  validateSemantics(snapshot, now);
  return snapshot;
}
/** Fail the build on invalid/missing/conflicting owner approval; never silently fall back. */
export function validateRegistry(input: unknown, approvalInput: unknown, { now = new Date(), allowSynthetic = false } = {}) {
  instant(now); checkedInput(input); checkedInput(approvalInput);
  const snapshot = registrySnapshotSchema.parse(input);
  const approval = registryApprovalSchema.parse(approvalInput);
  if (snapshot.kind !== 'PUBLIC_APPROVED' && !allowSynthetic) fail();
  validateSemantics(snapshot, now);
  if (approval.state !== 'approved' || approval.snapshotId !== snapshot.snapshotId || approval.revision !== snapshot.revision
    || approval.sha256 !== registryDigest(input) || Date.parse(approval.approvedAt) < Date.parse(snapshot.exportedAt)
    || Date.parse(approval.approvedAt) > +now || Date.parse(approval.expiresAt) <= +now
    || Date.parse(approval.expiresAt) <= Date.parse(approval.approvedAt)) fail();
  sameIds(approval.recordIds, snapshot.data.records.map(record => record.id));
  return snapshot;
}
/** Local reviewed assets only. No remote fetches; reject symlinks escaping public/images. */
export function validateRegistryAssets(snapshot: RegistrySnapshot, publicRoot = resolve('public')) {
  const root = realpathSync(resolve(publicRoot, 'images'));
  for (const asset of snapshot.assets) {
    const path = realpathSync(resolve(publicRoot, asset.path.slice(1)));
    const rel = relative(root, path);
    if (isAbsolute(rel) || rel.startsWith('..') || !statSync(path).isFile() || statSync(path).size > 10 * 1024 * 1024) fail();
    if (createHash('sha256').update(readFileSync(path)).digest('hex') !== asset.sha256) fail();
    const bytes = readFileSync(path);
    const extension = asset.path.split('.').pop();
    const correct = extension === 'png' ? bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
      : ['jpg', 'jpeg'].includes(extension!) ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
      : extension === 'webp' ? bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP'
      : bytes.toString('ascii',4,8) === 'ftyp' && /avif|avis/.test(bytes.toString('ascii',8,32));
    if (!correct) fail();
  }
}
/** Additive integration protects EVENT-001 source entries, including its withheld drafts. */
export function mergeRegistry(base: ShowcaseData, snapshot: RegistrySnapshot): ShowcaseData {
  for (const list of ['people', 'records'] as const) {
    if (snapshot.data[list].some(item => base[list].some(existing => existing.id === item.id))) fail();
  }
  const events = [...base.events];
  for (const event of snapshot.data.events) {
    const existing = events.find(item => item.id === event.id);
    if (existing && JSON.stringify(existing) !== JSON.stringify(event)) fail();
    if (!existing) events.push(event);
  }
  return showcaseSchema.parse({ events, people: [...base.people, ...snapshot.data.people], records: [...base.records, ...snapshot.data.records] });
}
