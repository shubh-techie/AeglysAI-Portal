import { readFileSync, existsSync, statSync, realpathSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { parsePublicJson } from '../../../scripts/community/upstream.mjs';
import { assertPublicExport } from '../../../scripts/community/public-export.mjs';
export function publicInput(name:string,fallback:unknown):any {
 if(!/^[a-z-]+$/.test(name))throw Error('Invalid public input name');
 const path=resolve('src/data/community',`${name}.json`);
 if(existsSync(path) && (statSync(path).size>1024*1024 || !statSync(path).isFile() || relative(realpathSync('src/data/community'),realpathSync(path)).startsWith('..')))throw Error('Public input boundary rejected');
 const value=existsSync(path)?parsePublicJson(readFileSync(path,'utf8')):fallback;
 assertPublicExport(value);
 return value;
}
