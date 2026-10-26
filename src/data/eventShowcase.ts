import { z } from 'astro/zod';

export const categories = ['Partner', 'Keynote Speaker', 'Judge', 'Mentor', 'Participant', 'Team', 'Event Announcement'] as const;
const id = z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_-]*$/);
const text = z.string().trim().min(1).max(2400).refine(value => !/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(value), 'Contact email is not public showcase content');
const day = z.iso.date();
const link = z.url().refine(value => {
  const url = new URL(value);
  return url.protocol === 'https:' && /^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(url.hostname) && !/^(?:\d{1,3}\.){3}\d{1,3}$/.test(url.hostname) && !/\.(?:local|internal|localhost)$/i.test(url.hostname) && !url.username && !url.password && !['docs.google.com', 'drive.google.com', 'sheets.google.com'].includes(url.hostname);
}, 'Use a reviewed public HTTPS website, never private Workspace evidence');
const image = z.strictObject({
  path: z.string().regex(/^\/images\/[A-Za-z0-9/_-]+\.(png|jpg|jpeg|webp|avif)$/).refine(value => !value.includes('..')),
  alt: text,
});
const approvals = z.strictObject({ content: z.boolean(), organizer: z.boolean(), publicDisplayConsent: z.boolean(), branding: z.boolean() });
const profile = z.strictObject({
  id, name: text, designation: text.optional(), organization: text.optional(), biography: text.optional(),
  expertise: z.array(text).default([]), image: image.optional(), website: link.optional(),
  linkedin: link.refine(value => new URL(value).hostname === 'www.linkedin.com' || new URL(value).hostname === 'linkedin.com').optional(),
  affiliationVerified: z.boolean().default(false), confirmed: z.boolean().default(false),
  approvals, suppressed: z.boolean().default(false),
});
const record = z.strictObject({
  id, eventId: id, category: z.enum(categories), personId: id.optional(), name: text.optional(),
  approvedCopy: text.optional(), organization: text.optional(), designation: text.optional(), biography: text.optional(),
  expertise: z.array(text).default([]), image: image.optional(), website: link.optional(),
  affiliationVerified: z.boolean().default(false),
  session: text.optional(), challenge: id.optional(), team: id.optional(), members: z.array(id).max(4).optional(),
  qualificationVerified: z.boolean().default(false), selectionVerified: z.boolean().default(false),
  announcementDate: day.optional(), template: z.literal('partner-announcement').optional(),
  status: z.enum(['Draft', 'Approved', 'Scheduled', 'Published', 'Archived']), approvals,
  visibility: z.strictObject({ public: z.boolean(), suppressed: z.boolean(), from: day.optional(), until: day.optional() }),
}).superRefine((value, ctx) => {
  const fail = (message: string) => ctx.addIssue({ code: 'custom', message });
  if (!value.name && !value.personId) fail('A display name or reusable person is required');
  if (['Keynote Speaker', 'Judge', 'Mentor', 'Participant'].includes(value.category) && !value.personId) fail('Person roles require a reusable profile');
  if (value.category === 'Team' && !value.members?.length) fail('Teams require one to four reviewed members');
  if (value.members && new Set(value.members).size !== value.members.length) fail('Duplicate team member');
  if (value.status === 'Scheduled' && !value.visibility.from) fail('Scheduled records require a visibility start');
  if (value.visibility.from && value.visibility.until && value.visibility.from >= value.visibility.until) fail('Visibility end must follow start');
});
export const showcaseSchema = z.strictObject({
  events: z.array(z.strictObject({ id, title: text, timezone: z.string().refine(value => {
    try { new Intl.DateTimeFormat('en', { timeZone: value }); return true; } catch { return false; }
  }).nullable() })),
  people: z.array(profile), records: z.array(record),
}).superRefine((data, ctx) => {
  const fail = (message: string) => ctx.addIssue({ code: 'custom', message });
  for (const list of [data.events, data.people, data.records]) if (new Set(list.map(x => x.id)).size !== list.length) fail('Duplicate stable ID');
  const activeMembership = new Set<string>();
  for (const item of data.records) {
    if (item.category === 'Team' && item.visibility.public && !item.visibility.suppressed && ['Published', 'Scheduled'].includes(item.status)) {
      for (const member of item.members ?? []) {
        const key = `${item.eventId}:${member}`;
        if (activeMembership.has(key)) fail('Duplicate active public team membership');
        activeMembership.add(key);
      }
    }
    if (!data.events.some(event => event.id === item.eventId)) fail('Unknown event');
    for (const personId of [...(item.personId ? [item.personId] : []), ...(item.members ?? [])]) {
      if (!data.people.some(person => person.id === personId)) fail('Unknown person');
    }
    if (item.team && !data.records.some(team => team.id === item.team && team.category === 'Team' && team.eventId === item.eventId && (!item.personId || team.members?.includes(item.personId)))) fail('Invalid team association');
  }
});
export type ShowcaseData = z.infer<typeof showcaseSchema>;
export type ShowcaseRecord = ShowcaseData['records'][number];
export type Category = typeof categories[number];
export const pendingApprovals = { content: false, organizer: false, publicDisplayConsent: false, branding: false };
export const eventShowcase = showcaseSchema.parse({
  events: [{ id: 'aegython-2026', title: 'AEGYTHON 2026', timezone: null }],
  people: [],
  records: [
    ['PARTNER-001', 'Kalam Academy', '2026-10-26'],
    ['PARTNER-002', 'Startup Jharkhand', '2026-10-27'],
    ['PARTNER-003', 'GDG Ranchi', '2026-10-28'],
  ].map(([id, name, announcementDate]) => ({
    id, name, announcementDate, eventId: 'aegython-2026', category: 'Partner', template: 'partner-announcement',
    status: 'Draft', approvals: pendingApprovals, visibility: { public: false, suppressed: false },
  })),
});

function approvedPerson(person: ShowcaseData['people'][number] | undefined) {
  return !!person && !person.suppressed && person.confirmed && person.approvals.content && person.approvals.organizer && person.approvals.publicDisplayConsent && (!person.image || person.approvals.branding) && (!person.organization || person.affiliationVerified);
}
function localDay(now: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat('en', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  return ['year', 'month', 'day'].map(type => parts.find(part => part.type === type)!.value).join('-');
}
/** Server/build only: do not serialize unapproved source records into HTML or client bundles. */
export function publicShowcase(input: unknown, eventId: string, now: Date, category?: Category) {
  const data = showcaseSchema.parse(input);
  if (!Number.isFinite(now.getTime())) throw new Error('Invalid build instant');
  const event = data.events.find(event => event.id === eventId);
  return data.records.filter(item => {
    if (item.eventId !== eventId || (category && item.category !== category)) return false;
    if (!['Published', 'Scheduled'].includes(item.status) || !item.visibility.public || item.visibility.suppressed) return false;
    if (!item.approvals.content || !item.approvals.organizer || !item.approvedCopy) return false;
    if (item.category === 'Partner' && !item.approvals.branding) return false;
    if (item.image && !item.approvals.branding) return false;
    if (item.organization && !item.affiliationVerified) return false;
    if (item.personId && !approvedPerson(data.people.find(person => person.id === item.personId))) return false;
    if (['Participant', 'Team'].includes(item.category)) {
      if (!item.approvals.publicDisplayConsent || !item.qualificationVerified || !item.selectionVerified) return false;
      if (item.members?.some(id => !approvedPerson(data.people.find(person => person.id === id)))) return false;
    }
    if (item.visibility.from || item.visibility.until) {
      if (!event?.timezone) return false;
      const today = localDay(now, event.timezone);
      if (item.visibility.from && today < item.visibility.from) return false;
      if (item.visibility.until && today >= item.visibility.until) return false;
    }
    return true;
  }).map(item => {
    const person = data.people.find(person => person.id === item.personId);
    // Explicit public projection: approval flags, member IDs and editorial state stay out of the renderer.
    return {
      id: item.id, category: item.category, name: person?.name ?? item.name!, copy: item.approvedCopy!,
      designation: person ? person.designation : item.designation, organization: person ? person.organization : item.organization,
      biography: person ? person.biography : item.biography, expertise: person ? person.expertise : item.expertise,
      image: person ? person.image : item.image, website: person ? person.website : item.website, linkedin: person?.linkedin,
      session: item.session, challenge: item.challenge, announcementDate: item.announcementDate,
    };
  });
}
