import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {hackathonForms, approvedFormUrl, eventPhase} from '../../src/data/hackathonForms.ts';
import {whatsappCommunityUrl} from '../../src/data/hackathonChannels.ts';
import {beforeProjectSubmission, assertPhase2Assets} from './phase2-preservation.mjs';
const read=p=>readFileSync(p,'utf8'),sha=v=>createHash('sha256').update(v).digest('hex');
const pin=JSON.parse(read('scripts/community/phase2-preservation.json'));
const html=read('dist/hackathons/index.html');
const text=html.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');
const submission='https://docs.google.com/forms/d/e/1FAIpQLSeje4ie_BXjzsNpxu_NvNxIJcz5p9IoS3jEgiUaC6FPdh_Frg/viewform';
test('PHASE2 closes registration and qualification even if stale form flags try to reopen them',()=>{
 assert.equal(eventPhase.registration,'CLOSED');assert.equal(eventPhase.qualification,'CLOSED');assert.equal(eventPhase.project,'OPEN');assert.equal(eventPhase.finalistEvaluation,'PENDING');assert.equal(eventPhase.submissionCutoff.timezone,null);
 for(const kind of ['participant','qualification']){assert.equal(hackathonForms[kind].open,false);assert.equal(approvedFormUrl({...hackathonForms[kind],open:true}),null);assert.ok(hackathonForms[kind].url);}
 assert.equal(approvedFormUrl(hackathonForms.project),submission);
 for(const gate of ['open','available','publicationApproved'])assert.equal(approvedFormUrl({...hackathonForms.project,[gate]:false}),null);
 for(const kind of ['team','judge','speaker','guest'])assert.equal(approvedFormUrl(hackathonForms[kind]),hackathonForms[kind].url);
});
test('PHASE2 full-width row preserves the hero and provides the approved submission, challenges and separate community actions',()=>{
 const hero=html.match(/<section class="hx-submission-announcement"[\s\S]*?<\/section>/)[0];
 const original=String(beforeProjectSubmission('dist/hackathons/index.html',html));
 for(const pattern of [/<h1[^>]*>[\s\S]*?<\/h1>/,/<div class="hx-event-brand">[\s\S]*?<p class="hx-eyebrow">[\s\S]*?<\/p>/,/<p class="hx-lead">[\s\S]*?<\/p>/])assert.equal(html.match(pattern)[0],original.match(pattern)[0]);
 assert.match(html,/GLOBAL AI \/ ML \/ CYBERSECURITY INNOVATION/);
 assert.ok(hero.includes('Registration &amp; Qualification: Oct 1 – Nov 6, 2026 — Closed'));
 assert.ok(hero.includes('Project Submission &amp; Finalist Selection: Nov 15 – Nov 22, 2026 — Active'));

 for(const label of ['PROJECT SUBMISSIONS OPEN','Your project deserves to be seen.','Registration has closed. Qualified teams can now submit their working AI/ML projects for finalist consideration.','Submit Your Project','Explore Challenges'])assert.ok(hero.replace(/<[^>]*>/g,'').includes(label),label);
 assert.ok(hero.includes(`href="${submission}"`));assert.match(hero,/href="#challenges"/);
 assert.equal(whatsappCommunityUrl,'https://chat.whatsapp.com/LX9mKTV2L6tH6C1xROUPsy?s=cl&p=a&iam=2');
 assert.ok(hero.replaceAll('&amp;','&').includes(`href="${whatsappCommunityUrl}"`));
 assert.match(hero,/Join the WhatsApp Community/);
 assert.ok(html.indexOf('id="project-submissions"')>html.indexOf('id="series"'));
 assert.ok(html.indexOf('id="project-submissions"')<html.indexOf('aria-label="Official event facts"'));
 assert.equal((html.match(/Your project deserves to be seen\./g)||[]).length,1);
 const facts=value=>value.slice(value.indexOf('<div class="container hx-facts"'),value.indexOf('<div class="container hx-content"'));
 assert.equal(facts(html),facts(original));
 const originalHero=html.match(/<section class="hx-hero"[\s\S]*?<\/section>/)[0];assert.doesNotMatch(originalHero,/Submit Your Project|Join the WhatsApp Community|PROJECT SUBMISSIONS OPEN/);
 assert.match(text,/Submission deadline: November 22, 2026 — end of day/);assert.match(text,/The exact cutoff timezone has not yet been confirmed by organizers/);
 assert.doesNotMatch(text,/2026-11-22T|23:59|11:59|midnight (?:UTC|IST|CST)/);
});
test('PHASE2 current public intake links match the central gates; existing working-project rules remain',()=>{
 for(const path of Object.keys(pin.files).filter(p=>p.endsWith('.html'))){const page=read(path);for(const kind of ['participant','qualification'])assert.ok(!page.includes(`href="${hackathonForms[kind].url}"`),path+': '+kind);}
 for(const phrase of ['Registration Closed','Qualification Intake Closed','qualification/example-user','working project','maximum two minutes','No duplicate active membership'])assert.ok(text.toLowerCase().includes(phrase.toLowerCase()),phrase);
 assert.match(text,/November 28, 2026/);assert.match(text,/On-site venue details will be announced separately/);assert.match(text,/Certificate verification and issuance details will be communicated/);
});
test('PHASE2 exact transition retains all previous bytes and all unaffected public output',()=>{
 for(const [path,record] of Object.entries(pin.files)){
  const value=read(path);assert.equal(sha(value),record.afterSHA256,path);assert.equal(sha(beforeProjectSubmission(path,value)),record.beforeSHA256,path);
  assert.notEqual(sha(beforeProjectSubmission(path,value+'UNREVIEWED')),record.beforeSHA256,path);
  if(path.endsWith('.html'))assert.deepEqual([...value.matchAll(/<script\b[\s\S]*?<\/script>/g)].map(m=>m[0]),[...String(beforeProjectSubmission(path,value)).matchAll(/<script\b[\s\S]*?<\/script>/g)].map(m=>m[0]),path);
 }
 assert.equal(pin.generatedAssetsPolicy,'current-speaking-inventory-v1');
 assertPhase2Assets(pin.unchanged,JSON.parse(read('src/data/speakingPhotos.generated.json')));
 assert.equal(Object.keys(pin.files).filter(p=>p.endsWith('.html')).length,4);
});
