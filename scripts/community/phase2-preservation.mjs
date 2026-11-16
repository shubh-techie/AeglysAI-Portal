/** Test-only projection of the exact reviewed phase activation, before historical guards.
 * Unknown bytes pass through unchanged so the existing historical pins reject them.
 * Raw phase2 tests independently require the current hashes and behavior.
 */
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const pin=JSON.parse(readFileSync(new URL('./phase2-preservation.json',import.meta.url),'utf8'));
const sha=value=>createHash('sha256').update(value).digest('hex');
export function beforeProjectSubmission(path,value){
 const record=pin.files[String(path).replace(/^\.\//,'')];
 if(!record||sha(value)!==record.afterSHA256)return value;
 let text=String(value);
 for(const {before,after}of record.changes){if(text.split(after).length!==2)throw Error('PHASE2 delta is not unique: '+path);text=text.replace(after,()=>before);}
 if(sha(text)!==record.beforeSHA256)throw Error('PHASE2 historical bytes differ: '+path);
 return Buffer.isBuffer(value)?Buffer.from(text):text;
}

/** Fixed output remains pinned; native-encoder outputs use this build's validated inventory.
 * No ENOENT handling: missing assets and any byte corruption remain hard failures.
 */
export function assertPhase2Assets(staticPins, inventory, readAsset=readFileSync){
 for(const [path,hash] of Object.entries(staticPins)){
  if(path.startsWith('dist/conference/_generated/'))throw Error('Generated conference assets require the current build inventory');
  if(sha(readAsset(path))!==hash)throw Error('PHASE2 static output differs: '+path);
 }
 const expected=new Map();
 for(const source of inventory.sources){
  for(const [path,hash,variant] of [[source.displayPath,source.displaySHA256,'display'],[source.thumbnailPath,source.thumbnailSHA256,'thumb']]){
   const match=typeof path==='string'&&path.match(/^conference\/_generated\/([a-z0-9-]+)\/([a-f0-9]{64})-(display|thumb)\.webp$/);
   if(!match||match[1]!==source.folder||match[2]!==hash||match[3]!==variant)throw Error('Invalid current conference asset reference');
   if(expected.has(path)&&expected.get(path)!==hash)throw Error('Conflicting current conference asset hash');
   expected.set(path,hash);
  }
 }
 for(const [path,hash] of expected)if(sha(readAsset('dist/'+path))!==hash)throw Error('PHASE2 generated asset differs: '+path);
 return [...expected.keys()].map(path=>'dist/'+path).sort();
}
