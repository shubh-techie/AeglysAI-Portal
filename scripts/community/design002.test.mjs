import {discoveryForHistory} from './speaking-discovery-preservation.mjs';
import {beforeNavigationFix} from './design002c-preservation.mjs';
import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
import {beforeEditorialDesign} from './design002-preservation.mjs';
const read=p=>readFileSync(p,'utf8'),sha=v=>createHash('sha256').update(v).digest('hex');
const html=read('dist/index.html'),pins=JSON.parse(read('scripts/community/design002-preservation.json'));
test('DESIGN002 limits the change to the approved homepage and rejects unknown current bytes',()=>{
 assert.equal(Object.keys(pins.unchangedRoutes).length,27);
 for(const[p,hash]of Object.entries(pins.unchangedRoutes)){
  // Generated gallery URLs vary with approved photos and native image encoders.
  // The existing discovery guard pins every byte outside exactly six media interiors.
  if(p==='dist/speaking/index.html')assert.doesNotThrow(()=>discoveryForHistory(p,readFileSync(p)),p);
  else assert.equal(sha(beforeNavigationFix(p,readFileSync(p))),hash,p);
 }
 for(const[p,record]of Object.entries(pins.files)){assert.equal(sha(beforeNavigationFix(p,read(p))),record.afterSHA256);assert.equal(sha(beforeEditorialDesign(p,read(p))),record.beforeSHA256);assert.throws(()=>beforeEditorialDesign(p,read(p)+'UNREVIEWED'));}
 assert.throws(()=>beforeEditorialDesign('dist/index.html',html.replace('enforcement_authority=NONE','enforcement_authority=FULL')));
});
test('DESIGN002 keeps technical diagrams, metadata, navigation, footer and media exactly intact',()=>{
 for(const[name,r]of Object.entries(pins.invariants)){let value=(name==='header'||name==='head'?beforeNavigationFix('dist/index.html',html):html).match(new RegExp(r.pattern))[0];if(r.stripStyles)value=value.replace(/<style[\s\S]*?<\/style>/g,'');assert.equal(sha(value),r.sha256,name);}
 assert.equal(sha([...beforeNavigationFix('dist/index.html',html).matchAll(/<script\b[\s\S]*?<\/script>/g)].map(x=>x[0]).filter(x=>!x.startsWith('<script data-model-carousel-init>')).join('')),pins.scriptsSHA256);
 assert.equal((html.match(/data-media-id=/g)||[]).length,6);assert.equal((html.match(/<footer\b/g)||[]).length,1);assert.doesNotMatch(html,/<iframe/);
});
test('DESIGN002 presents all four models with explicit offline non-enforcing research boundaries',()=>{
 const rows=[...html.matchAll(/<article class="ed-content-row">[\s\S]*?<\/article>/g)].map(x=>x[0]);
 for(const[id,title,status]of[['A','RBAC','Implemented'],['B','RBAC + ABAC','Implemented'],['C','Contextual Risk','Implemented'],['D','Behavioral Adaptive Authorization','Research Implementation Complete']]){const row=rows.find(x=>x.includes(`Model ${id} · ${status}`));assert.ok(row,id);assert.ok(row.includes(title));assert.ok(row.includes(`Explore Model ${id}`));}
 const note=html.match(/<aside class="home-research-note"[\s\S]*?<\/aside>/)[0];for(const text of['separate research repository','does not independently validate','non-enforcing','enforcement_authority=NONE','not a production authorization mechanism','external field effectiveness','Drift and mock-feedback limitations remain unresolved'])assert.ok(note.includes(text),text);
 assert.doesNotMatch(html,/class="model-card/);assert.match(html,/What changes when authorization can adapt/);
});
test('DESIGN002 reuses foundations with one closing CTA and preserves approved discovery and presentation links',()=>{
 assert.match(html,/data-editorial/);assert.equal((html.match(/data-home-editorial/g)||[]).length,1);assert.equal((html.match(/class="ed-collaboration"/g)||[]).length,1);
 assert.match(html,/href="\/hackathons\/2027\/"/);assert.match(html,/Details will be shared when officially confirmed/);assert.match(html,/href="\/hackathons\/"/);assert.match(html,/href="\/speaking\/"/);assert.match(html,/First-slide preview · Full PDF not published/);
 const old=pins.files['dist/index.html'].before;const oldLinks=[...old.matchAll(/href="([^"]+)"/g)].map(x=>x[1]);const newLinks=new Set([...html.matchAll(/href="([^"]+)"/g)].map(x=>x[1]));for(const link of new Set(oldLinks))assert.ok(newLinks.has(link),'retained link '+link);
 const source=read('src/pages/index.astro');for(const name of['EditorialSectionHeader','EditorialContentRow','CollaborationCTA'])assert.ok(source.includes(name));assert.doesNotMatch(source,/fonts\.google|youtube-nocookie|data-video-play/);
});

function homeSurface(document,name){
 const start=new RegExp(`<(?<tag>section|div)\\b[^>]*data-home-surface="${name}"[^>]*>`).exec(document);assert.ok(start,name);
 const tokens=new RegExp(`<(/?)${start.groups.tag}\\b[^>]*>`,'g');tokens.lastIndex=start.index;let depth=0;
 for(let t;(t=tokens.exec(document));){depth+=t[1]?-1:1;if(!depth)return document.slice(start.index,tokens.lastIndex);}
 throw Error('Unclosed home surface '+name);
}

test('DESIGN002B community contains only approved hackathon discovery while Speaking assets remain intact',()=>{
 const inventory=JSON.parse(read('docs/speaking/SPEAK-001B-IMAGES.json')),portrait=inventory.find(p=>p.id==='gicite-desktop-photo');assert.equal(portrait.publication,'INCLUDED');assert.equal(portrait.eventId,'gicite-2026-wru-key-talk');assert.equal(sha(readFileSync('src/assets/'+portrait.assetPath)),portrait.displaySHA256);
 const community=homeSurface(html,'community');assert.match(community,/AEGYTHON 2026/);assert.match(community,/Hackathon 2027/);assert.match(community,/Coming Soon/);assert.match(community,/href="\/hackathons\/"/);assert.match(community,/href="\/hackathons\/2027\/"/);assert.doesNotMatch(community,/GICITE|<img\b|<picture\b|<iframe\b/);assert.doesNotMatch(html,/gicite-desktop-photo/);
 for(const surface of['hero','research','architecture','community','collaboration'])assert.ok(html.includes(`data-home-surface="${surface}"`));assert.equal((html.match(/class="ed-collaboration"/g)||[]).length,1);
});

test('DESIGN002B preserves the approved question, media, speaking and collaboration markup exactly',()=>{
 for(const[name,hash]of Object.entries(pins.approvedSections))assert.equal(sha(homeSurface(html,name)),hash,name);
 assert.match(html,/role="region" aria-label="Research models A through D"/);assert.match(html,/id="model-progression-help"/);
});

// Owner supersedes the earlier 2x2/tablet and side-by-side architecture layouts.
test('DESIGN002C uses one native model-card track and a stacked full-width architecture',()=>{
 const css=read('src/styles/homepage-editorial.css');
 assert.match(html,/A baseline for every next step/);assert.match(html,/Explore the Models/);
 assert.match(css,/grid-auto-flow: column/);assert.match(css,/scroll-snap-type: x proximity/);
 assert.doesNotMatch(css,/home-model-rows[^}]*repeat\(2/);assert.doesNotMatch(css,/home-architecture-layout[^}]*grid-template-columns/);
 assert.match(css,/article:last-child[^}]*3px double/);
 const track=html.match(/<div class="home-model-rows"[\s\S]*?<aside class="home-research-note"/)[0];
 assert.equal((track.match(/<article /g)||[]).length,4);assert.equal((track.match(/Explore Model [ABCD]/g)||[]).length,4);
});

test('DESIGN002C adds only the pinned model enhancement and keeps native noJS scrolling',()=>{
 const scripts=[...html.matchAll(/<script data-model-carousel-init>([\s\S]*?)<\/script>/g)];assert.equal(scripts.length,1);
 assert.equal(sha(scripts[0][1]),pins.modelScriptSHA256);assert.equal(sha(read('src/components/research-model-carousel.js')),pins.modelScriptSHA256);
 assert.match(html,/data-model-controls hidden/);for(const attr of['data-model-prev','data-model-next','data-model-position','aria-controls="research-models"'])assert.ok(html.includes(attr));
 const css=read('src/styles/homepage-editorial.css');assert.match(css,/@media \(min-width: 80rem\)/);assert.match(css,/overflow-x: auto/);assert.match(css,/home-model-controls\[hidden\]/);
});
