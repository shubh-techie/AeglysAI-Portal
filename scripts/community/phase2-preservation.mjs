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
