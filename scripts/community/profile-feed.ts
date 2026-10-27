/** Operator-side HTTPS transport. Public browsers never fetch source/feed/approval data. */
import { z } from 'astro/zod';
import { isIP } from 'node:net';
import { validateRegistry, registryDigest } from '../../src/data/eventRegistry.ts';
const envelopeSchema = z.strictObject({ schemaVersion: z.literal('1.0.0'), snapshot: z.unknown(), approval: z.unknown(),
  images: z.array(z.strictObject({ path: z.string(), url: z.string() })).max(1000) });
export function publicFeedUrl(value: string) {
  const u = new URL(value);
  if (!['aeglysai.com', 'shubh-techie.github.io'].includes(u.hostname) || u.protocol !== 'https:' || u.port || u.username || u.password || u.search || u.hash || isIP(u.hostname)
    || !/^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(u.hostname)
    || /(^|\.)(google\.com|googleapis\.com|googleusercontent\.com|forms\.gle|localhost|local|internal)$/i.test(u.hostname)) throw Error('Public HTTPS feed destination rejected');
  return u;
}
export function validateFeed(value: unknown, expectedDigest: string, now = new Date()) {
  if (!/^[a-f0-9]{64}$/.test(expectedDigest)) throw Error('Independent reviewed digest required');
  const envelope = envelopeSchema.parse(value);
  const snapshot = validateRegistry(envelope.snapshot, envelope.approval, { now });
  for (const record of snapshot.data.records) {
    if (!record.visibility.until) continue;
    const zone = snapshot.data.events.find(event => event.id === record.eventId)!.timezone!;
    const parts = new Intl.DateTimeFormat('en', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
    const day = ['year', 'month', 'day'].map(type => parts.find(part => part.type === type)!.value).join('-');
    if (day >= record.visibility.until) throw Error('Expired record rejected');
  }
  if (registryDigest(envelope.snapshot) !== expectedDigest) throw Error('Feed differs from reviewed content');
  if (envelope.images.length !== snapshot.assets.length || new Set(envelope.images.map(x => x.path)).size !== envelope.images.length) throw Error('Image manifest mismatch');
  for (const image of envelope.images) {
    if (!snapshot.assets.some(a => a.path === image.path)) throw Error('Image manifest mismatch');
    publicFeedUrl(image.url);
  }
  return { envelope, snapshot };
}
class Unavailable extends Error {}
/** Bounded decompressed streaming bytes; no cookies/auth/redirects or browser requests. */
export async function fetchPublicBytes(url: string, maximum: number, fetcher: typeof fetch = fetch) {
  publicFeedUrl(url);
  let response;
  try { response = await fetcher(url, { redirect: 'manual', credentials: 'omit', signal: AbortSignal.timeout(15000) }); }
  catch { throw new Unavailable('Feed network unavailable'); }
  if ([502, 503, 504].includes(response.status)) { await response.body?.cancel(); throw new Unavailable('Feed service unavailable'); }
  if (response.status !== 200 || !response.body) { await response.body?.cancel(); throw Error('Feed response rejected'); }
  const reader = response.body.getReader(); const chunks: Uint8Array[] = []; let total = 0;
  try { while (true) { const { done, value } = await reader.read(); if (done) break; total += value.byteLength;
    if (total > maximum) throw Error('Feed size rejected'); chunks.push(value); } }
  finally { await reader.cancel(); }
  return Buffer.concat(chunks);
}
/** Only availability failures may reuse an exact pinned, unexpired previous snapshot. */
export async function readApprovedFeed(url: string, expectedDigest: string, cached: unknown, fetcher: typeof fetch = fetch, now = new Date()) {
  let raw;
  try { raw = await fetchPublicBytes(url, 1024 * 1024, fetcher); }
  catch (error) {
    if (!(error instanceof Unavailable) || !cached) throw Error('Feed refresh rejected');
    return { ...validateFeed(cached, expectedDigest, now), fallback: true };
  }
  // Malformed, changed, withdrawn, revoked and stale documents must NEVER trigger fallback.
  const { parsePublicJson } = await import('./upstream.mjs');
  return { ...validateFeed(parsePublicJson(raw.toString('utf8')), expectedDigest, now), fallback: false };
}
