/** Historical byte guards project only the explicitly pinned TIME-001A delta backwards.
 * Current bytes must match the new pin; every prior hash assertion remains in place.
 * This helper is test-only. New functionality is asserted against raw current output.
 */
import {beforeFinalSchedule} from './time001a-final-preservation.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const manifest=JSON.parse(readFileSync(new URL('./time001a-preservation.json',import.meta.url),'utf8'));
const sha=value=>createHash('sha256').update(value).digest('hex');
export function beforeTime001A(path,value){
 value=beforeFinalSchedule(path,value);
 const record=manifest.files[String(path).replace(/^\.\//,'')];if(!record)return value;
 if(sha(value)!==record.afterSHA256)throw Error(`TIME-001A current byte pin differs: ${path}`);
 let text=Buffer.isBuffer(value)?value.toString('utf8'):value;
 for(const {before,after}of record.changes){if(text.split(after).length!==2)throw Error(`TIME-001A delta is not unique: ${path}`);text=text.replace(after,before);}
 if(sha(text)!==record.beforeSHA256)throw Error(`TIME-001A prior bytes differ: ${path}`);
 return Buffer.isBuffer(value)?Buffer.from(text):text;
}
export function readHistoricalFile(path,encoding){return beforeTime001A(path,readFileSync(path,encoding));}
