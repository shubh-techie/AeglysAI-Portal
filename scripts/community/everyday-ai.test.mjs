import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('CHALLENGE-006 sixth track is selectable, visibly provisional upstream, and keeps existing eligibility/submission rules',()=>{
 const tracks=JSON.parse(readFileSync('src/data/community/challenges.json','utf8'));assert.equal(tracks.length,6);assert.equal(new Set(tracks.map(t=>t.id)).size,6);
 const sixth=tracks[5];assert.equal(sixth.id,'ai-for-everyday-life');assert.equal(sixth.title,'AI for Everyday Life');assert.equal(sixth.source,null);assert.equal(sixth.referenceStatus,'PORTAL_EXTENSION_UPSTREAM_PENDING');
 const detail=readFileSync('dist/hackathons/events/index.html','utf8'),submission=readFileSync('dist/community/submit/index.html','utf8');
 assert.match(submission,/<option[^>]*value="ai-for-everyday-life"[^>]*>AI for Everyday Life<\/option>/);assert.equal((submission.match(/<option value="(?:smart-login-guardian|find-the-anomaly|api-traffic-watch|explain-security-alert|predict-the-outage|ai-for-everyday-life)"/g)||[]).length,6);
 for(const term of ['Education and learning','Accessibility','Personal productivity','Sustainability and food waste','Community assistance','General wellness','Financial literacy','Scam awareness','intended users','synthetic or authorized data','unsupported medical, legal or financial decision claims'])assert.ok(detail.includes(term),term);
 assert.match(detail,/Portal-approved extension/);assert.match(detail,/COM-003A offering currently defines five tracks/);
 for(const html of [detail,submission]){
  assert.match(html,/maximum two minutes/);assert.match(html,/Every member, including the leader/);assert.match(html,/maximum four/);assert.match(html,/five-minute live demonstration/);assert.match(html,/Round 2 determines final ranking/);
 }
 assert.doesNotMatch(submission,/action=|spreadsheetId|participantEmail/);
});
