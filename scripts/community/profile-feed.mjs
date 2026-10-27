/** Configurable public feed → validated ignored staging; never directly publish. */
import { readFileSync, statSync, realpathSync, mkdtempSync, mkdirSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { readApprovedFeed, fetchPublicBytes, publicFeedUrl } from './profile-feed.ts';
import { validateRegistryAssets } from '../../src/data/eventRegistry.ts';
import { parsePublicJson } from './upstream.mjs';
try {
  if (process.argv.length !== 2) throw Error();
  const url = process.env.AEGLYSAI_SHOWCASE_FEED_URL, digest = process.env.AEGLYSAI_SHOWCASE_FEED_SHA256;
  if (!url || !digest) throw Error(); publicFeedUrl(url);
  const root = resolve('.community-drafts/profile-feed'); mkdirSync(root, { recursive: true });
  if (realpathSync(root) !== root) throw Error();
  const pointer = resolve(root, 'current.json'); let cached;
  if (existsSync(pointer)) {
    if(realpathSync(pointer)!==pointer || statSync(pointer).size>128) throw Error();
    const name = readFileSync(pointer, 'utf8'); if (!/^snapshot-[A-Za-z0-9_-]+$/.test(name)) throw Error();
    const p = resolve(root, name, 'feed.json'); if (statSync(p).size > 1024 * 1024 || realpathSync(p) !== p) throw Error();
    cached = parsePublicJson(readFileSync(p, 'utf8'));
  }
  const result = await readApprovedFeed(url, digest, cached);
  const origin = new URL(url).origin;
  // Same-origin transport only; remote image declarations cannot expand the fetch authority.
  if (result.envelope.images.some(x => publicFeedUrl(x.url).origin !== origin)) throw Error();
  if (result.fallback) {
    const name = readFileSync(pointer, 'utf8'); validateRegistryAssets(result.snapshot, resolve(root, name, 'public'));
    console.log(JSON.stringify({ operation: 'retained-pinned-valid-snapshot', sha256: digest }));
  } else {
    const stage = mkdtempSync(resolve(root, 'snapshot-')); mkdirSync(resolve(stage, 'public/images'), { recursive: true });
    for (const image of result.envelope.images) {
      const destination = resolve(stage, 'public', image.path.slice(1)); const rel = relative(resolve(stage, 'public/images'), destination);
      if (isAbsolute(rel) || rel.startsWith('..')) throw Error();
      const bytes = await fetchPublicBytes(image.url, 10 * 1024 * 1024); mkdirSync(resolve(destination, '..'), { recursive: true });
      writeFileSync(destination, bytes, { flag: 'wx', mode: 0o600 });
    }
    validateRegistryAssets(result.snapshot, resolve(stage, 'public'));
    for (const [name, value] of [['feed.json', result.envelope], ['event-showcase.json', result.envelope.snapshot], ['event-showcase-approval.json', result.envelope.approval]])
      writeFileSync(resolve(stage, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
    const temporary = resolve(stage, 'pointer'); writeFileSync(temporary, stage.split('/').pop(), { flag: 'wx', mode: 0o600 }); renameSync(temporary, pointer);
    console.log(JSON.stringify({ operation: 'staged-approved-feed-awaiting-Git-review', sha256: digest }));
  }
} catch { console.error('Approved feed update rejected; previous staging retained. Review privately.'); process.exitCode = 1; }
