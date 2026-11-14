import{beforeEditorialAlignment}from'./design003-preservation.mjs';
/** Test-only projection of the exact reviewed shared navigation delta.
 * Route-specific header pins protect links/current-page state. Other bytes stay raw.
 */
import {readFileSync} from 'node:fs';import{createHash}from'node:crypto';
const pin=JSON.parse(readFileSync(new URL('./design002c-preservation.json',import.meta.url),'utf8'));
const sha=v=>createHash('sha256').update(v).digest('hex');
export function beforeNavigationFix(path,value){
 value=beforeEditorialAlignment(path,value);
 path=String(path).replace(/^\.\//,'');const source=pin.sources[path];
 if(source){const hash=sha(value);if(hash===source.beforeSHA256)return value;if(hash!==source.afterSHA256)throw Error(`DESIGN002C source differs: ${path}`);if(sha(source.before)!==source.beforeSHA256)throw Error('DESIGN002C historical source differs');return Buffer.isBuffer(value)?Buffer.from(source.before):source.before;}
 const route=pin.routes[path];if(!route)return value;const text=String(value),header=text.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0];
 if(!header)throw Error(`DESIGN002C header missing: ${path}`);if(sha(header)===route.beforeHeaderSHA256)return value;if(sha(header)!==route.afterHeaderSHA256)throw Error(`DESIGN002C header differs: ${path}`);
 let restored=header;for(const {before,after}of pin.changes){if(restored.split(after).length!==2)throw Error('DESIGN002C delta is not unique');restored=restored.replace(after,()=>before);}
 if(sha(restored)!==route.beforeHeaderSHA256)throw Error('DESIGN002C prior header differs');const result=text.replace(header,()=>restored);return Buffer.isBuffer(value)?Buffer.from(result):result;
}
