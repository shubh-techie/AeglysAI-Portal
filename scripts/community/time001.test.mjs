import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {beforeTime001A} from './time001a-preservation.mjs';
import {beforeTime001} from './time001-preservation.mjs';
const html=readFileSync('dist/hackathons/index.html','utf8');
const timeline=html.match(/<section[^>]*id="timeline"[\s\S]*?<\/section>/)?.[0];
test('TIME001 renders three ordered phases with only confirmed machine-readable dates',()=>{
 assert.ok(timeline);
 const phases=[...timeline.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map(m=>m[1]);
 assert.equal(phases.length,3);
 for(const [i,title,mode] of [[0,'Registration &amp; Technical Qualification','Online'],[1,'Project Submission &amp; Finalist Qualification','Virtual judging'],[2,'Grand Finale','Hybrid — Online &amp; On-site']]){
  assert.ok(phases[i].includes(`Phase ${i+1}`));assert.ok(phases[i].includes(title));assert.ok(phases[i].includes(mode));
 }
 assert.deepEqual([...timeline.matchAll(/datetime="([^"]+)"/g)].map(m=>m[1]),['2026-10-01','2026-11-06','2026-11-15','2026-11-22','2026-11-28']);
 assert.doesNotMatch(html,/All dates remain TBA/);
 assert.doesNotMatch(html,/Phase 2 schedule remains to be announced/);
 assert.match(phases[0],/mandatory technical qualification requirements/);
 assert.match(phases[1],/November 15/);assert.match(phases[1],/November 22, 2026/);assert.doesNotMatch(phases[1],/Schedule to be announced|deadline/i);
 assert.match(phases[1],/Judges evaluate eligible submissions and select finalists/);
 assert.match(phases[2],/Selected finalists demonstrate their solutions/);
 assert.doesNotMatch(timeline,/\bTBA\b|\bTBD\b|To Be Decided|Dates to be announced/);
});
test('TIME001 preserves all content outside the timeline and rejects unreviewed byte drift',()=>{
 const previous=beforeTime001('dist/hackathons/index.html',html);
 const strip=h=>h.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'SCRIPT').replace(/<section[^>]*id="timeline"[\s\S]*?<\/section>/,'TIMELINE').replace(/<style>\s*#timeline[\s\S]*?<\/style>/,'');
 assert.equal(strip(beforeTime001A('dist/hackathons/index.html',html)),strip(previous));
 assert.throws(()=>beforeTime001('dist/hackathons/index.html',html+'UNREVIEWED'));
});
