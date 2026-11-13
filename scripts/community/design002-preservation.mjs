/** Test-only adapter for exactly the approved DESIGN002 homepage delta.
 * Reject unknown current bytes before restoring historical bytes. No application use.
 */
import {beforeNavigationFix} from './design002c-preservation.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const manifest=JSON.parse(readFileSync(new URL('./design002-preservation.json',import.meta.url),'utf8'));
const sha=v=>createHash('sha256').update(v).digest('hex');
export function beforeEditorialDesign(path,value){
 value=beforeNavigationFix(path,value);
 const record=manifest.files[String(path).replace(/^\.\//,'')];if(!record)return value;
 const hash=sha(value);if(hash===record.beforeSHA256)return value;
 if(hash!==record.afterSHA256)throw Error(`DESIGN002 unreviewed bytes: ${path}`);
 if(sha(record.before)!==record.beforeSHA256)throw Error(`DESIGN002 historical pin differs: ${path}`);
 return Buffer.isBuffer(value)?Buffer.from(record.before):record.before;
}
