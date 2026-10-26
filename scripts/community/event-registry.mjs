/** Node 24 CLI; input must be a separately sanitized export, never private Sheet/master data. */
import { readFileSync, statSync, writeFileSync, realpathSync } from 'node:fs';
import { resolve, relative, dirname, basename, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parsePublicJson } from './upstream.mjs';
import { exportRegistry, validateRegistry, validateRegistryAssets, registryDigest } from '../../src/data/eventRegistry.ts';

function read(path) {
  if (!statSync(path).isFile() || statSync(path).size > 1024 * 1024) throw new Error();
  return parsePublicJson(readFileSync(path, 'utf8'));
}
export function runRegistryCommand(args) {
  const [command, inputPath, outputOrApprovalPath] = args;
  if (args.length !== 3 || !['export', 'validate', 'demo'].includes(command)) throw new Error();
  const input = read(inputPath);
  if (command === 'validate') {
    const snapshot = validateRegistry(input, read(outputOrApprovalPath));
    validateRegistryAssets(snapshot);
    console.log(JSON.stringify({ operation: 'validated', schemaVersion: snapshot.schemaVersion, snapshotId: snapshot.snapshotId, revision: snapshot.revision, sha256: registryDigest(input) }));
  } else {
    const snapshot = exportRegistry(input);
    if (command === 'demo' ? snapshot.kind !== 'SYNTHETIC' : snapshot.kind !== 'PUBLIC_APPROVED') throw new Error();
    validateRegistryAssets(snapshot);
    const destination = resolve(realpathSync(dirname(outputOrApprovalPath)), basename(outputOrApprovalPath));
    const rel = relative(realpathSync(process.cwd()), destination);
    if (!destination.endsWith('.json') || (!isAbsolute(rel) && !rel.startsWith('..') && !rel.startsWith('.community-drafts/'))) throw new Error();
    // Exclusive creation: validation never overwrites an approved/previous snapshot or input.
    writeFileSync(destination, JSON.stringify(snapshot, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
    console.log(JSON.stringify({ operation: 'exported-awaiting-owner-review', schemaVersion: snapshot.schemaVersion, snapshotId: snapshot.snapshotId, revision: snapshot.revision, sha256: registryDigest(snapshot) }));
  }
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { runRegistryCommand(process.argv.slice(2)); }
  catch { console.error('Registry operation rejected; no proposed snapshot was published. Check the sanitized contract privately.'); process.exitCode = 1; }
}
