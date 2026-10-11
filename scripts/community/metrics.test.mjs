import test from 'node:test';import assert from 'node:assert/strict';
import {collectMetrics,githubClient,validateSnapshot,repository} from './metrics.mjs';
import {fixture,api,response} from './test-fixture.mjs';
test('COM-002 pagination/deduplication and issue/PR distinction; identities omitted',async()=>{
 const s=await fixture();assert.equal(s.metrics.pullRequests,2);assert.equal(s.metrics.issues,1);assert.equal(s.metrics.releases,1);assert.equal(s.metrics.externalContributors,1);assert.equal(s.metrics.externalAttributedCommits,3);assert.ok(!JSON.stringify(s).includes('test-only'));assert.equal(s.errors.length,0);validateSnapshot(s);
});
test('COM-002 transient retry, rate limit and secret-safe missing values',async()=>{
 let n=0;const c=await githubClient({fetcher:()=>++n<3?response({},503):response({ok:true}),sleep:async()=>{},token:'SYNTHETIC_TEST_SECRET'});assert.deepEqual((await c.request(`https://api.github.com/repos/${repository}`)).value,{ok:true});assert.equal(n,3);
 const s=await collectMetrics({fetcher:()=>response({message:'SYNTHETIC_TEST_SECRET'},429,{'retry-after':'999'}),sleep:async()=>{},token:'SYNTHETIC_TEST_SECRET'});assert.ok(Object.values(s.metrics).every(v=>v===null));assert.ok(!JSON.stringify(s).includes('SYNTHETIC_TEST_SECRET'));assert.ok(s.errors.every(e=>e.code==='RATE_LIMITED'));
});
test('COM-002 rejects cross-origin pagination, repeated links and malformed IDs',async()=>{
 for(const link of ['https://evil.invalid/collect',`https://api.github.com/repos/${repository}/pulls?per_page=100`]){
 const c=await githubClient({fetcher:()=>response([{id:1}],200,{link:`<${link}>; rel="next"`})});await assert.rejects(c.list('pulls'));
 }
 const c=await githubClient({fetcher:()=>response([{id:'bad'}])});await assert.rejects(c.list('issues'));
 const s=await fixture();assert.throws(()=>validateSnapshot({...s,email:'private@invalid'}));assert.throws(()=>validateSnapshot({...s,metrics:{...s.metrics,stars:-1}}));
});
test('COM-002 traffic requires explicit opt-in and credential, retains aggregate only',async()=>{
 const denied=await collectMetrics({fetcher:api,allowTraffic:true});assert.equal(denied.traffic,null);assert.ok(denied.errors.some(e=>e.code==='TRAFFIC_AUTHORIZATION_REQUIRED'));
 const traffic=await collectMetrics({fetcher:url=>url.includes('/traffic/')?response({count:3,uniques:2,views:[{private:'not stored'}]}):api(url),token:'TEST_ONLY',allowTraffic:true});assert.deepEqual(traffic.traffic,{windowDays:14,views:{count:3,uniques:2},clones:{count:3,uniques:2}});assert.ok(!JSON.stringify(traffic).includes('not stored'));
});


test('COM-002 malformed repository counters become unavailable, not zero',async()=>{
 const s=await collectMetrics({fetcher:url=>url.endsWith(repository)?response({full_name:repository,private:false,stargazers_count:-1,forks_count:2}):api(url),sleep:async()=>{}});
 assert.equal(s.metrics.stars,null);assert.equal(s.metrics.forks,null);assert.ok(s.errors.some(e=>e.code==='INVALID_RESPONSE'));
});
