import test from 'node:test';import assert from 'node:assert/strict';
import {monthlyReport,reportMarkdown,approveReport} from './reports.mjs';
import {digest} from './contracts.mjs';
import {fixture} from './test-fixture.mjs';
test('COM-008B deterministic drafts, UTC boundaries, open-month gate, missing history',async()=>{
 const s=await fixture(),r=monthlyReport('2026-10',[s,s],{now:new Date('2026-10-11Z')});assert.equal(r.periodState,'OPEN');assert.equal(r.observations.length,1);assert.equal(r.netChange.stars,null);assert.equal(reportMarkdown(r),reportMarkdown(monthlyReport('2026-10',[s],{now:new Date('2026-10-11Z')})));assert.throws(()=>approveReport({report:r,approved:true,reviewUrl:'https://github.com/a/b',sha256:digest(r)}));
 const a={...s,observedAt:'2026-10-01T00:00:00Z'},b={...s,observedAt:'2026-11-01T00:00:00Z',metrics:{...s.metrics,stars:1}};
 const closed=monthlyReport('2026-10',[b,a],{now:new Date('2026-11-02Z')});assert.equal(closed.netChange.stars,-1);assert.equal(closed.periodState,'CLOSED');assert.throws(()=>monthlyReport('2026-10',[a,{...a,metrics:{...a.metrics,stars:9}}]));assert.throws(()=>approveReport({report:closed,approved:true,reviewUrl:'https://github.com/a/b',sha256:digest(closed)}));
});

