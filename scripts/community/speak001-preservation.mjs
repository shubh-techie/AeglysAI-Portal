/** Historical byte guards project only the explicitly pinned SPEAK-001 delta backwards.
 * Current bytes must match the new pin; every prior hash assertion remains in place.
 * This helper is test-only. New functionality is asserted against raw current output.
 */
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const manifest=JSON.parse(readFileSync(new URL('./speak001-preservation.json',import.meta.url),'utf8'));
const sha=value=>createHash('sha256').update(value).digest('hex');
export function beforeSpeakingShowcase(path,value){
 const record=manifest.files[String(path).replace(/^\.\//,'')];if(!record)return value;
 if(String(path).replace(/^\.\//,'')==='dist/speaking/index.html')assertSpeakingStyles();
 if(sha(value)!==record.afterSHA256)throw Error(`SPEAK-001 current byte pin differs: ${path}`);
 let text=Buffer.isBuffer(value)?value.toString('utf8'):value;
 for(const {before,after}of record.changes){if(text.split(after).length!==2)throw Error(`SPEAK-001 delta is not unique: ${path}`);text=text.replace(after,()=>before);}
 if(sha(text)!==record.beforeSHA256)throw Error(`SPEAK-001 prior bytes differ: ${path}`);
 return Buffer.isBuffer(value)?Buffer.from(text):text;
}
export function readHistoricalFile(path,encoding){return beforeSpeakingShowcase(path,readFileSync(path,encoding));}

export function assertSpeakingStyles(){for(const [path,hash] of Object.entries(manifest.currentStyles))if(sha(readFileSync(`dist${path}`))!==hash)throw Error(`SPEAK-001 current stylesheet pin differs: ${path}`);}
export function readSpeakingHistoricalStyle(path){
 const record=manifest.historicalStyles[path];if(!record)return readFileSync(path);
 assertSpeakingStyles();if(sha(record.text)!==record.sha256)throw Error(`SPEAK-001 historical stylesheet differs: ${path}`);return Buffer.from(record.text);
}
