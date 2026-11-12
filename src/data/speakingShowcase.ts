import { z } from 'astro/zod';
import { existsSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { createHash } from 'node:crypto';

/** Sanitized, offline publication contract. Private approvals and originals stay outside public/. */
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const publicText = z.string().trim().min(1).max(2400).refine(v => !/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(v), 'No private contact information');
const publicUrl = z.url().refine(value => {
  const u = new URL(value);
  return u.protocol === 'https:' && !u.username && !u.password && u.hostname.includes('.') && !/^(?:\d{1,3}\.){3}\d{1,3}$/.test(u.hostname) && !/\.(?:local|internal|localhost)$/.test(u.hostname) && !['docs.google.com', 'drive.google.com', 'sheets.google.com'].includes(u.hostname) && !/token|secret|credential|auth|signature/i.test(u.search);
}, 'Use an approved public HTTPS reference');
export const speakingPhotoSchema = z.strictObject({
  id, eventId: id, assetPath: z.string().regex(/^speaking\/[a-z0-9/-]+\.(?:png|jpg|jpeg|webp|avif)$/).refine(v => !v.includes('..')),
  sha256: z.string().regex(/^[a-f0-9]{64}$/), alt: publicText, caption: publicText, credit: publicText,
  sourceUrl: publicUrl, rightsBasis: z.enum(['OWNER_AUTHORIZED', 'LICENSED']), rightsReference: publicUrl,
  contentApproved: z.literal(true), publicationApproved: z.literal(true), subjectsConsentConfirmed: z.literal(true),
});
export type SpeakingPhoto = z.infer<typeof speakingPhotoSchema>;
export const recordingSchema = z.strictObject({
  id: z.string().regex(/^[A-Za-z0-9_-]{11}$/), title: publicText, channel: publicText,
  context: publicText, eventId: id.nullable(), associationSource: publicUrl.nullable(),
  metadataSource: publicUrl, metadataVerifiedAt: z.iso.date(), publicationApproved: z.literal(true),
}).refine(r => r.eventId === null || r.associationSource !== null, 'Event association requires a public source');
export const speakingEventSchema = z.strictObject({
  id, presentationId: id, name: publicText, shortName: publicText,
  startDate: z.iso.date(), endDate: z.iso.date(), location: publicText, mode: publicText,
  organizer: publicText, role: publicText, talkTitle: publicText.nullable(), summary: publicText,
  abstract: publicText.nullable(), status: z.enum(['Completed', 'Confirmed', 'Upcoming', 'Invited', 'Acceptance Sent']),
  statusNote: publicText.nullable(), deliveryDate: z.iso.date().nullable(), eventUrl: publicUrl,
  sourceReferences: z.array(publicUrl).min(1), publicationApproved: z.literal(true),
  photos: z.array(speakingPhotoSchema).max(4), recordingIds: z.array(z.string().regex(/^[A-Za-z0-9_-]{11}$/)),
}).superRefine((event, ctx) => {
  if (event.startDate > event.endDate) ctx.addIssue({code:'custom',message:'Event date range is reversed'});
  if ((event.status === 'Completed') !== (event.deliveryDate !== null)) ctx.addIssue({code:'custom',message:'Completed status requires recorded delivery; other statuses cannot imply it'});
  for (const photo of event.photos) if (photo.eventId !== event.id) ctx.addIssue({code:'custom',message:'Photo belongs to a different event'});
});
export const speakingShowcaseSchema = z.strictObject({
  schemaVersion: z.literal('1.0.0'), events: z.array(speakingEventSchema), recordings: z.array(recordingSchema),
}).superRefine((data,ctx) => {
  for (const values of [data.events.map(e=>e.id), data.recordings.map(r=>r.id), data.events.flatMap(e=>e.photos.map(p=>p.id))]) if (new Set(values).size !== values.length) ctx.addIssue({code:'custom',message:'Duplicate stable identifier'});
  for (const event of data.events) for (const recordingId of event.recordingIds) if (!data.recordings.some(r=>r.id===recordingId&&r.eventId===event.id)) ctx.addIssue({code:'custom',message:'Recording association is not supported'});
  for (const r of data.recordings) if (r.eventId && !data.events.some(e=>e.id===r.eventId&&e.recordingIds.includes(r.id))) ctx.addIssue({code:'custom',message:'Unknown or inconsistent recording association'});
});
export type SpeakingEvent = z.infer<typeof speakingEventSchema>;
export type SpeakingShowcase = z.infer<typeof speakingShowcaseSchema>;
export function validateSpeakingShowcase(input: unknown, assetsRoot = resolve('src/assets')): SpeakingShowcase {
  const result = speakingShowcaseSchema.parse(input);
  for (const photo of result.events.flatMap(event=>event.photos)) {
    const file = resolve(assetsRoot, photo.assetPath);
    if (!existsSync(file) || !statSync(file).isFile() || !realpathSync(file).startsWith(realpathSync(assetsRoot)+sep) || statSync(file).size > 8*1024*1024) throw Error('Approved speaking image missing, oversized or outside asset directory');
    const bytes=readFileSync(file);
    if (createHash('sha256').update(bytes).digest('hex') !== photo.sha256) throw Error('Speaking image differs from its approved digest');
  }
  return result;
}
/** Calendar passage never establishes delivery. Keep the recorded status in the contract. */
export function eventStatus(event: SpeakingEvent, today = new Date().toISOString().slice(0,10)) {
  if (event.status === 'Completed') return {label:'Completed',note:'Delivery recorded',tone:'completed'};
  if (['Upcoming','Confirmed'].includes(event.status) && event.endDate < today) return {label:'Confirmed engagement',note:'Scheduled date has passed; completion has not been verified.',tone:'pending'};
  if (event.status === 'Acceptance Sent') return {label:'Awaiting confirmation',note:'Acceptance sent; written organizer confirmation remains outstanding.',tone:'pending'};
  if (event.status === 'Invited') return {label:'Invited',note:'Invitation received; participation is not yet confirmed.',tone:'pending'};
  return {label:'Confirmed / Upcoming',note:'Participation confirmed; delivery is not yet recorded.',tone:'upcoming'};
}
export function youtubeUrl(videoId: string): string {
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) throw Error('Invalid YouTube video ID');
  return `https://www.youtube.com/watch?v=${videoId}`;
}
