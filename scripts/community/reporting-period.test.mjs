import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {reportingPeriodForHistory} from './reporting-period-preservation.mjs';
import {beforeFinal001} from './final001-preservation.mjs';
const path='dist/community/reports/index.html';
const html=readFileSync(path,'utf8');
const month=new Date().toISOString().slice(0,7);
const sha=v=>createHash('sha256').update(v).digest('hex');
const period=m=>`<p>${m} remains an open reporting period until UTC month-end. Current cumulative repository counts cannot reconstruct missing historical snapshots.</p>`;
test('CI003 raw reports archive states the current UTC month and retains publication boundaries',()=>{
 assert.equal(html.split(period(month)).length,2);
 assert.match(html,/No approved monthly reports published/);
 assert.match(html,/Each report still requires separate owner authorization and verified closed-period evidence before publication/);
 assert.doesNotThrow(()=>beforeFinal001(path,html));
});
test('CI003 month/year rollovers preserve original October and November byte pins',()=>{
 const october=JSON.parse(readFileSync('scripts/community/final001-preservation.json','utf8')).files[path].afterSHA256;
 const november=JSON.parse(readFileSync('scripts/community/time001a-final-preservation.json','utf8')).unchangedRoutes[path];
 for(const current of ['2026-10','2026-11','2026-12','2027-01','2028-02']){
  const candidate=html.replace(period(month),period(current));
  assert.equal(sha(reportingPeriodForHistory(path,candidate,'2026-10',current)),october,current);
  assert.equal(sha(reportingPeriodForHistory(path,candidate,'2026-11',current)),november,current);
  const buffer=reportingPeriodForHistory(path,Buffer.from(candidate),'2026-10',current);
  assert.ok(Buffer.isBuffer(buffer));assert.equal(sha(buffer),october);
 }
});
test('CI003 rejects stale/missing/duplicate/invalid periods and unrelated HTML tampering',()=>{
 const stale=month==='2026-10'?'2026-09':'2026-10';
 for(const candidate of [html.replace(period(month),period(stale)),html.replace(period(month),''),html+period(month),html.replace(`${month} remains`,'2026-13 remains')])assert.throws(()=>reportingPeriodForHistory(path,candidate,'2026-10'));
 assert.throws(()=>reportingPeriodForHistory(path,html,'2026-13'));
 // Current-period normalization never grants permission to edit other bytes.
 for(const candidate of [html+'UNREVIEWED',html.replace('No approved monthly reports published.','Invented report published.'),html.replace('Closed-period reports require review','All reports bypass review')])assert.throws(()=>beforeFinal001(path,candidate));
});
test('CI003 reporting-month projection cannot change the approved five timeline endpoints',()=>{
 const timelinePath='dist/hackathons/index.html',landing=readFileSync(timelinePath,'utf8');
 assert.equal(reportingPeriodForHistory(timelinePath,landing,'2026-10'),landing);
 const timeline=landing.match(/<section[^>]*id="timeline"[\s\S]*?<\/section>/)[0];
 assert.deepEqual([...timeline.matchAll(/datetime="([^"]+)"/g)].map(m=>m[1]),['2026-10-01','2026-11-06','2026-11-15','2026-11-22','2026-11-28']);
 assert.match(timeline,/Project Submission &amp; Finalist Qualification/);assert.match(timeline,/Virtual judging and finalist selection/);
 assert.doesNotMatch(timeline,/Schedule to be announced/);
 assert.match(landing,/The phase window does not specify an hour-specific submission deadline/);
});
