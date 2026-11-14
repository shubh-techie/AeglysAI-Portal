/** Test-only exact projection of DESIGN003 presentation, retaining all earlier pins.
 * Only three reviewed page mains, the shared footer and its source may project back.
 */
import{readFileSync}from'node:fs';import{createHash}from'node:crypto';
const pin=JSON.parse(readFileSync(new URL('./design003-preservation.json',import.meta.url),'utf8'));
const sha=v=>createHash('sha256').update(v).digest('hex');
export function beforeEditorialAlignment(path,value){
 path=String(path).replace(/^\.\//,'');const buffer=Buffer.isBuffer(value);let text=String(value);
 const source=pin.sources[path];
 if(source){if(sha(value)===source.beforeSHA256)return value;if(sha(value)!==source.afterSHA256)throw Error('DESIGN003 source outside review: '+path);if(sha(source.before)!==source.beforeSHA256)throw Error('DESIGN003 historical source differs');return buffer?Buffer.from(source.before):source.before;}
 if(!path.startsWith('dist/')||!path.endsWith('.html'))return value;
 const footer=text.match(/<footer class="site-footer"[\s\S]*?<\/footer>/)?.[0];
 if(footer===pin.footer.after)text=text.replace(footer,()=>pin.footer.before);
 else if(footer!==pin.footer.before)throw Error('DESIGN003 footer outside review: '+path);
 const page=pin.pages[path];
 if(page?.beforeHead){const head=text.match(/<head>[\s\S]*?<\/head>/)?.[0];if(sha(head)!==page.headSHA256){if(sha(head)!==page.afterHeadSHA256)throw Error('DESIGN003 head outside review');if(sha(page.beforeHead)!==page.headSHA256)throw Error('DESIGN003 historical head differs');text=text.replace(head,()=>page.beforeHead);}}
 if(page){const main=text.match(/<main\b[\s\S]*?<\/main>/)?.[0];if(!main)throw Error('DESIGN003 main missing');const hash=sha(main);if(hash!==page.beforeMainSHA256){if(hash!==page.afterMainSHA256)throw Error('DESIGN003 page outside review: '+path);if(sha(page.beforeMain)!==page.beforeMainSHA256)throw Error('DESIGN003 historical main differs');text=text.replace(main,()=>page.beforeMain);}}
 return buffer?Buffer.from(text):text;
}
