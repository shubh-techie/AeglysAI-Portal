import { youtubeId } from './youtube';
export { youtubeId, youtubeUrl, youtubeThumbnail, youtubeEmbed } from './youtube';
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
const publicPhotoPath = z.string().regex(/^conference\/_generated\/[a-z0-9]+(?:-[a-z0-9]+)*\/[a-f0-9]{64}-(?:display|thumb)\.webp$/);
export const speakingPhotoSchema = z.strictObject({
  id, eventId: id, assetPath: z.union([z.string().regex(/^speaking\/[a-z0-9/-]+\.(?:png|jpg|jpeg|webp|avif)$/).refine(v => !v.includes('..')),publicPhotoPath]),
  thumbnail: z.strictObject({path:publicPhotoPath,sha256:z.string().regex(/^[a-f0-9]{64}$/)}).optional(),
  fit: z.enum(['contain','cover']).default('contain'),
  sha256: z.string().regex(/^[a-f0-9]{64}$/), alt: publicText, caption: publicText, credit: publicText,
  sourceUrl: publicUrl, rightsBasis: z.enum(['OWNER_AUTHORIZED', 'LICENSED']), rightsReference: publicUrl,
  contentApproved: z.literal(true), publicationApproved: z.literal(true), subjectsConsentConfirmed: z.literal(true),
});
export type SpeakingPhoto = z.infer<typeof speakingPhotoSchema>;
export const recordingSchema = z.strictObject({
  id: z.preprocess(value=>{if(typeof value!=='string')return value;try{return youtubeId(value);}catch{return value;}},z.string().regex(/^[A-Za-z0-9_-]{11}$/)), title: publicText, channel: publicText.nullable().default(null),
  context: publicText.optional(), category: publicText.default('Technical recording'), description: publicText.nullable().default(null),
  eventId: id.nullable().default(null), associationSource: publicUrl.nullable().default(null),
  metadataVerification:z.enum(['VERIFIED','OWNER_SUPPLIED']).default('OWNER_SUPPLIED'),
  metadataSource: publicUrl.nullable().default(null), metadataVerifiedAt: z.iso.date().nullable().default(null), publicationApproved: z.literal(true),
}).refine(r => r.eventId === null || r.associationSource !== null, 'Event association requires a public source')
.refine(r=>r.metadataVerification==='VERIFIED'?r.channel!==null&&r.metadataSource!==null&&r.metadataVerifiedAt!==null:r.metadataSource===null&&r.metadataVerifiedAt===null,'Metadata verification must match available evidence');
export const speakingEventSchema = z.strictObject({
  id, presentationId: id, name: publicText, shortName: publicText,
  startDate: z.iso.date(), endDate: z.iso.date(), location: publicText, mode: publicText,
  organizer: publicText, role: publicText, talkTitle: publicText.nullable(), summary: publicText,
  abstract: publicText.nullable(), status: z.enum(['Completed', 'Confirmed', 'Upcoming', 'Invited', 'Acceptance Sent', 'Invitation Accepted']),
  statusEvidence: z.strictObject({basis:z.literal('OWNER_CONFIRMED'),reference:publicUrl}).nullable().default(null),
  statusNote: publicText.nullable(), deliveryDate: z.iso.date().nullable(), eventUrl: publicUrl,
  sourceReferences: z.array(publicUrl).min(1), publicationApproved: z.literal(true),
  photoDirectory: z.string().regex(/^conference\/[a-z0-9]+(?:-[a-z0-9]+)*$/).nullable().default(null),
  photoPublicationApproved: z.boolean().default(false), imageAttribution: publicText.nullable().default(null),
  photos: z.array(speakingPhotoSchema),
}).superRefine((event, ctx) => {
  if (event.startDate > event.endDate) ctx.addIssue({code:'custom',message:'Event date range is reversed'});
  if (event.status==='Completed'&&event.deliveryDate===null&&!event.statusEvidence) ctx.addIssue({code:'custom',message:'Completed status requires recorded delivery or explicit owner confirmation'});
  if (event.status!=='Completed'&&event.deliveryDate!==null) ctx.addIssue({code:'custom',message:'Only completed status may record delivery'});
  for (const photo of event.photos) if (photo.eventId !== event.id) ctx.addIssue({code:'custom',message:'Photo belongs to a different event'});
});
export const speakingShowcaseSchema = z.strictObject({
  schemaVersion: z.literal('1.0.0'), events: z.array(speakingEventSchema), recordings: z.array(recordingSchema),
}).superRefine((data,ctx) => {
  for (const values of [data.events.map(e=>e.id), data.recordings.map(r=>r.id), data.events.flatMap(e=>e.photos.map(p=>p.id))]) if (new Set(values).size !== values.length) ctx.addIssue({code:'custom',message:'Duplicate stable identifier'});
});
export type SpeakingEvent = z.infer<typeof speakingEventSchema>;
export type SpeakingShowcase = z.infer<typeof speakingShowcaseSchema>;
export function validateSpeakingShowcase(input: unknown, assetsRoot = resolve('src/assets'), publicRoot = resolve('public')): SpeakingShowcase {
  const result = speakingShowcaseSchema.parse(input);
  for (const photo of result.events.flatMap(event=>event.photos)) {
    const entries=[{path:photo.assetPath,sha256:photo.sha256},...(photo.thumbnail?[photo.thumbnail]:[])];
    for(const entry of entries){
      const root=entry.path.startsWith('conference/')?publicRoot:assetsRoot;
      const file = resolve(root, entry.path);
      if (!existsSync(file) || !statSync(file).isFile() || !realpathSync(file).startsWith(realpathSync(root)+sep) || statSync(file).size > 8*1024*1024) throw Error('Approved speaking image missing, oversized or outside asset directory');
      if (createHash('sha256').update(readFileSync(file)).digest('hex') !== entry.sha256) throw Error('Speaking image differs from its approved digest');
    }
  }
  return result;
}
/** Calendar passage never establishes delivery. Keep the recorded status in the contract. */
export function eventStatus(event: SpeakingEvent, today = new Date().toISOString().slice(0,10)) {
  if (event.status === 'Completed') return {label:'Completed',note:event.deliveryDate?'Delivery recorded':'Completion confirmed by the owner; exact delivery date not supplied.',tone:'completed'};
  if (event.status === 'Invitation Accepted') return {label:'Invitation Accepted',note:'Invitation accepted by the speaker; organizer confirmation remains outstanding.',tone:'pending'};
  if (['Upcoming','Confirmed'].includes(event.status) && event.endDate < today) return {label:'Confirmed engagement',note:'Scheduled date has passed; completion has not been verified.',tone:'pending'};
  if (event.status === 'Acceptance Sent') return {label:'Awaiting confirmation',note:'Acceptance sent; written organizer confirmation remains outstanding.',tone:'pending'};
  if (event.status === 'Invited') return {label:'Invited',note:'Invitation received; participation is not yet confirmed.',tone:'pending'};
  return {label:'Confirmed / Upcoming',note:'Participation confirmed; delivery is not yet recorded.',tone:'upcoming'};
}
