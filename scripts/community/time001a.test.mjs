import test from 'node:test';
import {reportingPeriodForHistory} from './reporting-period-preservation.mjs';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {transpileModule} from 'typescript';
import {beforeFinalSchedule} from './time001a-final-preservation.mjs';
import {beforeTime001A} from './time001a-preservation.mjs';
const read=p=>readFileSync(p,'utf8');
const source=read('src/data/hackathons.ts').replace(/from (["'])(\.\/[^"']+)\1/g,(_,_quote,name)=>`from "${pathToFileURL(resolve('src/data',name+(name.endsWith('.json')?'':'.ts')))}"${name.endsWith('.json')?' with { type: "json" }':''}`);
const {outputText}=transpileModule(source,{compilerOptions:{module:99,target:99}});
const {eventSchedule,eventScheduleCopy,eventDate,eventDateRange,scheduleCopy}=await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${p}/${e.name}`):[`${p}/${e.name}`]);
const visible=h=>h.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/g,'').replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ');
const publicPages=walk('dist').filter(p=>p.endsWith('.html'));
test('TIME001A confirms all three phase windows and separately tracks pending operations',()=>{
 assert.deepEqual(eventSchedule.registration,{status:'CONFIRMED',start:'2026-10-01',end:'2026-11-06',mode:'Online'});
 assert.deepEqual(eventSchedule.finale,{status:'CONFIRMED',date:'2026-11-28',mode:'Hybrid — Online & On-site'});
 for(const field of [eventSchedule.submission.deadline,eventSchedule.sessionTimes,eventSchedule.venue,eventSchedule.certificates.verificationChannel,eventSchedule.certificates.issuanceDate])assert.deepEqual(field,{status:'UNCONFIRMED',value:null});
 assert.equal(eventSchedule.submission.mode,'Virtual judging and finalist selection');
 assert.equal(eventSchedule.submission.title,'Project Submission & Finalist Qualification');
 assert.deepEqual(eventSchedule.submission.dates,{status:'CONFIRMED',value:{start:'2026-11-15',end:'2026-11-22'}});
 assert.equal(eventSchedule.judging.schedule.status,'CONFIRMED');
 assert.equal(eventDate('2026-11-28'),'November 28, 2026');
 assert.equal(eventDateRange('2026-12-31','2027-01-02'),'December 31, 2026 – January 2, 2027');
});
test('TIME001A date changes propagate through shared labels without editing components',()=>{
 const next=structuredClone(eventSchedule);next.registration.start='2028-02-01';next.registration.end='2028-02-29';next.finale.date='2028-03-18';next.submission.dates={status:'CONFIRMED',value:{start:'2028-03-01',end:'2028-03-08'}};
 const copy=eventScheduleCopy(next);
 assert.equal(copy.registrationShort,'Registration & Qualification: Feb 1 – Feb 29, 2028');
 assert.equal(copy.finaleShort,'Grand Finale: Mar 18, 2028');
 assert.match(copy.venue,/March 18, 2028 — Hybrid \(Online & On-site\)/);
 assert.doesNotMatch(copy.summary,/2026/);
 assert.equal(copy.certificates,scheduleCopy.certificates);
 // Every current consumer imports shared copy/config instead of owning confirmed date strings.
 for(const p of walk('src').filter(p=>/hackathon/i.test(p)&&/\.(astro|ts|js)$/.test(p)&&p!=='src/data/hackathons.ts'))assert.doesNotMatch(read(p),/2026-10-01|2026-11-06|2026-11-28|2026-11-15|2026-11-22|Oct(?:ober)? 1|Nov(?:ember)? (?:6|28), 2026/,p);
});
test('TIME001A public HTML and SEO distinguish confirmed dates from specifically pending schedules',()=>{
 const blanket=/event dates (?:to be announced|pending)|dates to be decided|dates TBD|dates and eligibility are still pending|judges, dates and results are not confirmed|Registration Opening Soon|finalized participation rules; dates pending|DATES TO BE ANNOUNCED/i;
 for(const p of publicPages.filter(p=>!p.includes('/2027/'))){
  const text=visible(read(p));assert.doesNotMatch(text,blanket,p);
 }
 for(const p of ['dist/hackathons/index.html','dist/hackathons/events/index.html']){
  const html=read(p),text=visible(html);
  for(const label of [scheduleCopy.registrationShort,scheduleCopy.finaleShort,scheduleCopy.judging,scheduleCopy.submissionDeadline])assert.ok(text.includes(label),`${p}: ${label}`);
  for(const name of ['name="description"','property="og:description"','name="twitter:description"']){
   const meta=[...html.matchAll(/<meta[^>]*>/g)].map(m=>m[0]).find(m=>m.includes(name));assert.ok(meta,name);
   assert.ok(meta.includes('Oct 1 – Nov 6, 2026'));assert.ok(meta.includes('Nov 28, 2026'));assert.ok(meta.includes('Nov 15 – Nov 22, 2026'));
  }
  assert.doesNotMatch(html,/application\/ld\+json/); // No invented event time/venue structured data.
 }
});
test('TIME001A certificate/FAQ/venue messages preserve sample, eligibility and award boundaries',()=>{
 const html=read('dist/hackathons/index.html'),text=visible(html);
 for(const label of [scheduleCopy.certificates,scheduleCopy.venue,'Sample — Not Valid for Verification','Registration alone does not earn a certificate','No issued certificates or approved results are represented here.','PROPOSED AWARD — SUBJECT TO CONFIRMATION','funding is unconfirmed','No duplicate active membership'])assert.ok(text.includes(label),label);
 assert.match(html,/<details><summary>When are registration, qualification and the grand finale\?/);
 assert.match(html,/On-site venue details will be announced separately/);
 assert.doesNotMatch(text,/Verification channel and issuance dates remain to be announced/);
 const manifest=JSON.parse(read('scripts/community/time001a-preservation.json'));
 for(const p of Object.keys(manifest.files)){const value=read(p);assert.doesNotThrow(()=>beforeTime001A(p,value));assert.throws(()=>beforeTime001A(p,value+'UNREVIEWED'));}
});

test('TIME001A preserves every unrelated route, 2027, dependencies and protected rules/data',()=>{
 const manifest=JSON.parse(read('scripts/community/time001a-preservation.json'));
 assert.equal(publicPages.length,28);assert.equal(Object.keys(manifest.unchangedRoutes).length,25);
 assert.ok(manifest.unchangedRoutes['dist/hackathons/2027/index.html']);
 for(const [p,hash] of Object.entries({...manifest.unchangedRoutes,...manifest.protectedSources}))assert.equal(createHash('sha256').update(reportingPeriodForHistory(p,beforeFinalSchedule(p,readFileSync(p)),'2026-11')).digest('hex'),hash,p);
});

test('TIME001A final schedule separates registration, Phase 2 window and unconfirmed exact cutoff',()=>{
 for(const p of ['dist/index.html','dist/hackathons/index.html','dist/hackathons/events/index.html','dist/community/submit/index.html']){
  const text=visible(read(p));assert.match(text,/November 15|Nov 15/);assert.match(text,/November 22, 2026|Nov 22, 2026/);
  assert.doesNotMatch(text,/Phase 2 schedule remains to be announced|Schedule to be announced|Project submission dates and deadlines are not yet confirmed|detailed submission schedule unconfirmed|Detailed judging and submission schedule will be announced separately/);
 }
 const landing=read('dist/hackathons/index.html'),timeline=landing.match(/<section[^>]*id="timeline"[\s\S]*?<\/section>/)[0];
 const phases=[...timeline.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map(m=>m[1]);
 assert.deepEqual([...phases[0].matchAll(/datetime="([^"]+)"/g)].map(m=>m[1]),['2026-10-01','2026-11-06']);
 assert.deepEqual([...phases[1].matchAll(/datetime="([^"]+)"/g)].map(m=>m[1]),['2026-11-15','2026-11-22']);
 assert.doesNotMatch(landing,/2026-11-22T|23:59|11:59|register(?:ation)?[^<]{0,40}through November 28/i);
 assert.match(landing,/The phase window does not specify an hour-specific submission deadline/);
 const homepage=visible(read('dist/index.html'));assert.ok(homepage.includes(scheduleCopy.summary));
 const awards=visible(landing.match(/<section id="prizes"[\s\S]*?<\/section>/)[0]);assert.ok(awards.includes(scheduleCopy.summary));
 const manifest=JSON.parse(read('scripts/community/time001a-final-preservation.json'));
 assert.equal(Object.keys(manifest.unchangedRoutes).length,24);
 for(const [p,hash] of Object.entries(manifest.unchangedRoutes))assert.equal(createHash('sha256').update(reportingPeriodForHistory(p,readFileSync(p),'2026-11')).digest('hex'),hash,p);
 for(const [p,r] of Object.entries(manifest.files)){const value=read(p);assert.doesNotThrow(()=>beforeFinalSchedule(p,value));assert.throws(()=>beforeFinalSchedule(p,value+'UNREVIEWED'));assert.ok(r.beforeSHA256);}
});
