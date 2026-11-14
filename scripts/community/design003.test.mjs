import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';
import{beforeEditorialAlignment}from'./design003-preservation.mjs';import{normalizeSpeakingMedia}from'./speaking-discovery-preservation.mjs';
const read=p=>readFileSync(p,'utf8'),sha=v=>createHash('sha256').update(v).digest('hex'),pin=JSON.parse(read('scripts/community/design003-preservation.json'));
const main=html=>html.match(/<main\b[\s\S]*?<\/main>/)[0];
const footer=html=>html.match(/<footer class="site-footer"[\s\S]*?<\/footer>/)[0];
const paragraphs=html=>[...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m=>m[1].replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim()).sort();
const links=html=>[...html.matchAll(/<a\b[^>]*>/g)].map(m=>['href','target','rel'].map(a=>m[0].match(new RegExp(`\\b${a}="([^"]*)"`))?.[1]??'').join('|')).sort();
test('DESIGN003 changes only exact reviewed target mains and footer; frozen21routes and static assets remain pinned',()=>{
 assert.equal(Object.keys(pin.outsideFooter).length,21);
 for(const[path,hash]of Object.entries(pin.outsideFooter)){
  let html=read(path);assert.equal(footer(html),path.startsWith('dist/hackathons/')?pin.footer.before:pin.footer.after,path);
  if(path==='dist/speaking/index.html')html=normalizeSpeakingMedia(html);
  if(path==='dist/community/reports/index.html'){
   const month=new Date().toISOString().slice(0,7),matches=[...html.matchAll(/<p>(\d{4}-\d{2}) remains an open reporting period/g)];assert.equal(matches.length,1);assert.equal(matches[0][1],month);html=html.replace(`<p>${month} remains an open reporting period`,`<p>${pin.reportingMonth} remains an open reporting period`);
  }
  assert.equal(sha(html.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/,'FOOTER')),hash,path);
 }
 for(const[path,hash]of Object.entries(pin.assetHashes))assert.equal(sha(readFileSync(path)),hash,path);
 for(const[path,hash]of Object.entries(pin.sourceIntegrity))assert.equal(sha(readFileSync(path)),hash,path);
});
test('DESIGN003 retains manuscript/research paragraphs, every destination and exact footer content while changing presentation',()=>{
 for(const[path,record]of Object.entries(pin.pages)){
  const html=read(path),body=main(html);assert.equal(sha(body),record.afterMainSHA256,path);assert.equal(sha(html.match(/<head>[\s\S]*?<\/head>/)[0]),record.afterHeadSHA256,path);
  assert.deepEqual(links(body),links(record.beforeMain),path);
  if(!path.includes('/media/'))assert.deepEqual(paragraphs(body),paragraphs(record.beforeMain),path);
  const projected=beforeEditorialAlignment(path,html);assert.equal(sha(main(projected)),record.beforeMainSHA256);assert.equal(sha(projected.match(/<head>[\s\S]*?<\/head>/)[0]),record.headSHA256);
  assert.throws(()=>beforeEditorialAlignment(path,html.replace('<h1','<h1 data-unapproved')));
 }
 assert.deepEqual(links(pin.footer.after),links(pin.footer.before));assert.deepEqual(paragraphs(pin.footer.after),paragraphs(pin.footer.before));
 const research=read('dist/research/index.html');for(const fact of['enforcement_authority=NONE','non-enforcing','Drift','feedback'])assert.ok(research.toLowerCase().includes(fact.toLowerCase()),fact);
 const publications=read('dist/publications/index.html');assert.equal((publications.match(/Manuscript in preparation/g)||[]).length,2);assert.match(publications,/no publication or conference acceptance is claimed/);
});
test('DESIGN003 preserves six unique media records with one latest feature and five original-carousel slides',()=>{
 const html=read('dist/media/index.html'),ids=[...html.matchAll(/data-media-id="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,6);assert.equal(new Set(ids).size,6);assert.equal(ids[0],'business-outstanders-platform');assert.equal((html.match(/aria-roledescription="slide"/g)||[]).length,5);assert.equal((html.match(/data-media-carousel-init/g)||[]).length,1);assert.match(html,/Latest dated coverage/);assert.match(html,/Editorial arrangements have not been independently verified/);
 assert.match(read('src/styles/editorial-alignment.css'),/-webkit-line-clamp: unset/);
});
test('DESIGN003 normalization rejects footer/source/head corruption and unrelated frozen content',()=>{
 const path='dist/index.html',html=read(path);assert.throws(()=>beforeEditorialAlignment(path,html.replace(footer(html),footer(html).replace('Research repository','UNAPPROVED'))));assert.equal(beforeEditorialAlignment(path,html).replace(/<footer class="site-footer"[\s\S]*?<\/footer>/,'FOOTER'),html.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/,'FOOTER'));
 for(const[path,record]of Object.entries(pin.sources)){assert.equal(sha(read(path)),record.afterSHA256);assert.equal(sha(beforeEditorialAlignment(path,read(path))),record.beforeSHA256);assert.throws(()=>beforeEditorialAlignment(path,read(path)+'UNAPPROVED'));}
 const media=read('dist/media/index.html');assert.throws(()=>beforeEditorialAlignment('dist/media/index.html',media.replace('<title>','<title>UNAPPROVED')));
});

test('DESIGN003A scopes the shared editorial pattern and excludes every Hackathon output',async()=>{
 const {transpileModule}=await import('typescript');const source=transpileModule(read('src/layouts/editorial-policy.ts'),{compilerOptions:{module:99,target:99}}).outputText;
 const{editorialPresentation}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
 for(const path of Object.keys(pin.pages)){const route='/'+path.slice(5).replace(/index\.html$/,'');assert.equal(editorialPresentation(route).editorial,true);const html=read(path);assert.match(html,/data-editorial-page-styles/);assert.equal((html.match(/data-editorial-page-styles/g)||[]).length,1);assert.doesNotMatch(html,/data-page-editorial-alignment/);}
 for(const path of Object.keys(pin.outsideFooter)){if(!path.startsWith('dist/hackathons/'))continue;const route='/'+path.slice(5).replace(/index\.html$/,'');assert.deepEqual(editorialPresentation(route),{editorial:false,editorialFooter:false});assert.doesNotMatch(read(path),/data-editorial-page|data-footer-editorial|editorial-ivory/);}
 for(const route of['/','/speaking/','/community/submit/','/community/reports/','/unapproved-new-route/'])assert.equal(editorialPresentation(route).editorial,false);
 const css=read('src/styles/editorial-page.css');assert.match(css,/color-scheme: light/);assert.match(css,/color-scheme: dark/);assert.match(css,/#f4f0e7/);
});

test('DESIGN003A retains byte-identical merged event pages and footer token scope',()=>{
 assert.equal(Object.keys(pin.eventWholeSHA256).length,8);
 for(const[path,hash]of Object.entries(pin.eventWholeSHA256))assert.equal(sha(read(path)),hash,path);
 const css=pin.footer.after.match(/<style data-footer-editorial>([\s\S]*?)<\/style>/)[1];assert.doesNotMatch(css,/\[data-editorial\]/);assert.match(css,/\.site-footer/);
});
