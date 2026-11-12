import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdirSync,mkdtempSync,writeFileSync,symlinkSync,cpSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {transpileModule} from 'typescript';
import {beforeSpeakingShowcase,assertSpeakingStyles,readSpeakingHistoricalStyle} from './speak001-preservation.mjs';
const read=p=>readFileSync(p,'utf8');
const source=read('src/data/speakingShowcase.ts').replace("'astro/zod'",JSON.stringify(import.meta.resolve('astro/zod')));
const {outputText}=transpileModule(source,{compilerOptions:{module:99,target:99}});
const {validateSpeakingShowcase,speakingShowcaseSchema,eventStatus,youtubeUrl}=await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const html=read('dist/speaking/index.html');
const sample=()=>({schemaVersion:'1.0.0',events:[{id:'fixture-event',presentationId:'fixture-talk',name:'Synthetic event fixture',shortName:'Fixture',startDate:'2026-11-06',endDate:'2026-11-07',location:'Fixture location',mode:'Online',organizer:'Fixture organizer',role:'Speaker',talkTitle:null,summary:'Synthetic metadata; not published',abstract:null,status:'Upcoming',statusNote:null,deliveryDate:null,eventUrl:'https://example.org/event',sourceReferences:['https://example.org/evidence'],publicationApproved:true,photos:[],recordingIds:[]}],recordings:[]});
const photo=()=>({id:'fixture-photo',eventId:'fixture-event',assetPath:'speaking/fixture.png',sha256:'a'.repeat(64),alt:'Synthetic blue panel for gallery testing',caption:'Synthetic fixture; not conference evidence',credit:'Fixture author',sourceUrl:'https://example.org/source',rightsBasis:'OWNER_AUTHORIZED',rightsReference:'https://example.org/rights',contentApproved:true,publicationApproved:true,subjectsConsentConfirmed:true});
test('SPEAK001 versioned events reject unsupported delivery, private fields and unsafe references',()=>{
 assert.doesNotThrow(()=>validateSpeakingShowcase(sample()));
 for(const mutate of [d=>d.schemaVersion='2.0.0',d=>d.events[0].status='Completed',d=>d.events[0].deliveryDate='2026-11-06',d=>d.events[0].endDate='2026-11-01',d=>d.events.push(d.events[0]),d=>d.events[0].email='private@example.org',d=>d.events[0].eventUrl='https://docs.google.com/private',d=>d.events[0].eventUrl='https://localhost/event',d=>d.events[0].eventUrl='https://example.org/?token=secret',d=>d.events[0].publicationApproved=false]){const d=sample();mutate(d);assert.throws(()=>validateSpeakingShowcase(d));}
});
test('SPEAK001 calendar passage preserves stored confirmation without inventing delivery',()=>{
 const e=sample().events[0];assert.equal(eventStatus(e,'2026-11-01').label,'Confirmed / Upcoming');
 const elapsed=eventStatus(e,'2026-11-12');assert.equal(elapsed.label,'Confirmed engagement');assert.match(elapsed.note,/completion has not been verified/);assert.equal(e.status,'Upcoming');
 assert.equal(eventStatus({...e,status:'Completed',deliveryDate:'2026-11-06'}).label,'Completed');assert.equal(eventStatus({...e,status:'Acceptance Sent'}).label,'Awaiting confirmation');
});
test('SPEAK001 recordings use exact IDs, verified titles and no unsupported conference associations',()=>{
 for(const id of ['Uw6hD61RqNM','OLASKGI-aFw','tn5RhKbzRcw']){assert.equal(youtubeUrl(id),`https://www.youtube.com/watch?v=${id}`);assert.ok(html.includes(`data-recording-id="${id}"`));}
 for(const id of ['bad','https://youtube.com/abc','abcdefghij/','abcd<script>'])assert.throws(()=>youtubeUrl(id));
 assert.match(html,/Special Interaction and Q&amp;A Session by Industry Experts and Leaders/);assert.match(html,/QnA Session by Founder/);assert.match(html,/How to Register &amp; Qualify/);
 assert.doesNotMatch(html,/<iframe|<img[^>]+(?:ytimg|youtube)|preconnect[^>]+youtube|autoplay/);
 const recording={id:'Uw6hD61RqNM',title:'Fixture recording',channel:'Fixture',context:'Unassociated fixture',eventId:null,associationSource:null,metadataSource:'https://www.youtube.com/oembed',metadataVerifiedAt:'2026-11-12',publicationApproved:true};
 const d=sample();d.recordings=[recording];assert.ok(speakingShowcaseSchema.safeParse(d).success);d.recordings[0].eventId='fixture-event';assert.equal(speakingShowcaseSchema.safeParse(d).success,false);
});
test('SPEAK001 galleries require 0–4 approved, consented, digest-matched confined assets',()=>{
 assert.ok(speakingShowcaseSchema.safeParse(sample()).success);
 for(const field of ['contentApproved','publicationApproved','subjectsConsentConfirmed']){const d=sample();d.events[0].photos=[{...photo(),[field]:false}];assert.equal(speakingShowcaseSchema.safeParse(d).success,false);}
 for(const item of [{...photo(),eventId:'other-event'},{...photo(),assetPath:'speaking/../../private.png'},{...photo(),rightsBasis:'UNKNOWN'},{...photo(),privateNotes:'withheld'}]){const d=sample();d.events[0].photos=[item];assert.equal(speakingShowcaseSchema.safeParse(d).success,false);}
 const d=sample();d.events[0].photos=Array.from({length:5},(_,i)=>({...photo(),id:`photo-${i}`}));assert.equal(speakingShowcaseSchema.safeParse(d).success,false);
 d.events[0].photos=[photo()];assert.throws(()=>validateSpeakingShowcase(d));
 assert.equal((html.match(/data-speaking-photo(?:\s|>)/g)||[]).length,0,'No unapproved conference photos seeded');
});
test('SPEAK001 preserves all 27 unrelated routes, historical bytes and current styles',()=>{
 const manifest=JSON.parse(read('scripts/community/speak001-preservation.json'));assert.equal(Object.keys(manifest.unchangedRoutes).length,27);assertSpeakingStyles();
 for(const [p,hash] of Object.entries(manifest.unchangedRoutes))assert.equal(createHash('sha256').update(readFileSync(p)).digest('hex'),hash,p);
 assert.doesNotThrow(()=>beforeSpeakingShowcase('dist/speaking/index.html',html));assert.throws(()=>beforeSpeakingShowcase('dist/speaking/index.html',html+'UNREVIEWED'));
 for(const [p,r] of Object.entries(manifest.historicalStyles))assert.equal(createHash('sha256').update(readSpeakingHistoricalStyle(p)).digest('hex'),r.sha256);
 assert.match(html,/<h3>Beyond Static Access Control: AI-Driven Adaptive Security for Resilient Cloud-Native Systems<\/h3>/);
 assert.match(html,/Scheduled date has passed; completion has not been verified/);assert.match(html,/Awaiting confirmation/);assert.doesNotMatch(html,/Slide preview unavailable|EB-1A|career portfolio/);
 assert.equal((html.match(/data-speaking-gallery-init/g)||[]).length,1);
 const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(p,e.name)):[join(p,e.name)]);assert.equal(walk('dist').filter(p=>p.endsWith('.html')).length,28);
});
test('SPEAK001 actual Astro gallery build optimizes four approved synthetic photos and preserves no-media fallback',()=>{
 // Local synthetic assets prove the real Image pipeline. They never enter normal source/public output.
 const root=mkdtempSync(resolve('.community-drafts/speak001/gallery-fixture-'));
 for(const dir of ['src','public','scripts'])cpSync(dir,join(root,dir),{recursive:true});
 for(const file of ['package.json','package-lock.json','astro.config.mjs','tsconfig.json'])cpSync(file,join(root,file));
 symlinkSync(resolve('node_modules'),join(root,'node_modules'),'dir');mkdirSync(join(root,'src/assets/speaking'),{recursive:true});
 const png=spawnSync('python3',['-c',"import struct,zlib,sys\nw,h=960,640\ndef chunk(t,d):return struct.pack('!I',len(d))+t+d+struct.pack('!I',zlib.crc32(t+d)&0xffffffff)\nraw=(b'\\0'+bytes([30,110,140])*w)*h\nsys.stdout.buffer.write(b'\\x89PNG\\r\\n\\x1a\\n'+chunk(b'IHDR',struct.pack('!2I5B',w,h,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(raw))+chunk(b'IEND',b''))"],{maxBuffer:1024*1024});assert.equal(png.status,0);
 writeFileSync(join(root,'src/assets/speaking/fixture.png'),png.stdout);
 const digest=createHash('sha256').update(png.stdout).digest('hex');
 const photos=Array.from({length:4},(_,i)=>({...photo(),id:`fixture-photo-${i}`,eventId:'beyond-static-access-control',sha256:digest,alt:`Synthetic blue panel ${i+1}; gallery fixture only`}));
 const content=join(root,'src/data/speakingContent.ts');writeFileSync(content,read(content).replace('const approvedPhotos: Record<string, SpeakingPhoto[]> = {};',`const approvedPhotos: Record<string, SpeakingPhoto[]> = ${JSON.stringify({'beyond-static-access-control':photos})};`));
 const build=spawnSync(process.execPath,[resolve('node_modules/astro/bin/astro.mjs'),'build'],{cwd:root,encoding:'utf8',timeout:90000,maxBuffer:2*1024*1024,env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});writeFileSync(join(root,'build.log'),build.stdout+build.stderr);assert.equal(build.status,0,build.stderr);
 const fixture=read(join(root,'dist/speaking/index.html'));assert.equal((fixture.match(/data-speaking-photo(?:\s|>)/g)||[]).length,4);assert.match(fixture,/srcset="[^"]+\.webp/);assert.match(fixture,/loading="lazy"/);assert.match(fixture,/Synthetic blue panel 4/);
 const valid={...sample(),events:[{...sample().events[0],photos:[{...photo(),sha256:digest}]}]};assert.doesNotThrow(()=>validateSpeakingShowcase(valid,join(root,'src/assets')));
 valid.events[0].photos[0].sha256='0'.repeat(64);assert.throws(()=>validateSpeakingShowcase(valid,join(root,'src/assets')));
 writeFileSync('.community-drafts/speak001/gallery-fixture-path.txt',root+'\n');
});
