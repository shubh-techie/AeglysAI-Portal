/** Offline CLI: sanitized tables only; output stays in ignored local review staging. */
import { readFileSync, statSync, realpathSync, writeFileSync } from 'node:fs';
import { resolve, dirname, basename, relative, isAbsolute } from 'node:path';
import { parsePublicJson } from './upstream.mjs';
import { importProfiles } from './profile-import.ts';
import { registryDigest } from '../../src/data/eventRegistry.ts';
try {
  const [input, output] = process.argv.slice(2);
  if (process.argv.length !== 4 || !statSync(input).isFile() || statSync(input).size > 1024 * 1024) throw Error();
  const snapshot = importProfiles(parsePublicJson(readFileSync(input, 'utf8')));
  const root = realpathSync('.community-drafts');
  const destination = resolve(realpathSync(dirname(output)), basename(output));
  const rel = relative(root, destination);
  if (isAbsolute(rel) || rel.startsWith('..') || !destination.endsWith('.json')) throw Error();
  writeFileSync(destination, JSON.stringify(snapshot, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
  console.log(JSON.stringify({ operation: 'awaiting-independent-owner-review', sha256: registryDigest(snapshot) }));
} catch {
  console.error('Profile import rejected. Review the sanitized tables, asset rights and approvals privately.');
  process.exitCode = 1;
}
