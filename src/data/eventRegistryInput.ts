import { lstatSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { eventShowcase } from './eventShowcase.ts';
import { validateRegistry, validateRegistryAssets, mergeRegistry } from './eventRegistry.ts';
import { parsePublicJson } from '../../scripts/community/upstream.mjs';

/** Fixed server-only inputs. Neither private staging exports nor synthetic fixtures are loaded. */
export function loadEventRegistry(root = resolve('src/data/community'), publicRoot = resolve('public')) {
  const paths = ['event-showcase.json', 'event-showcase-approval.json'].map(name => resolve(root, name));
  try {
    const present = paths.map(path => {
      try { lstatSync(path); return true; }
      catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false; throw error; }
    });
    if (present.every(value => !value)) return eventShowcase;
    if (present.some(value => !value)) throw new Error();
    const documents = paths.map(path => {
      const rel = relative(realpathSync(root), realpathSync(path));
      if (isAbsolute(rel) || rel.startsWith('..') || !statSync(path).isFile() || statSync(path).size > 1024 * 1024) throw new Error();
      return parsePublicJson(readFileSync(path, 'utf8'));
    });
    const snapshot = validateRegistry(documents[0], documents[1]);
    validateRegistryAssets(snapshot, publicRoot);
    return mergeRegistry(eventShowcase, snapshot);
  } catch {
    // Do not leak candidate contents, private values or filesystem paths through diagnostics.
    throw new Error('Registry publication blocked: snapshot, approval or assets rejected');
  }
}
export const approvedEventShowcase = loadEventRegistry();
