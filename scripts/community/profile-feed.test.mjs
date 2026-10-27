import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,symlinkSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {readApprovedFeed,validateFeed,publicFeedUrl,fetchPublicBytes} from './profile-feed.ts';
import {importProfiles} from './profile-import.ts';
import {registryDigest} from '../../src/data/eventRegistry.ts';
const url='https://aeglysai.com/community-feed/v1.json';
function fixture(){const snapshot=importProfiles({snapshotId:'test-feed',revision:1,exportedAt:'2026-01-01T00:00:00Z',exportId:'test-export',sourceRevision:'rev-1',
 Profiles:[{profile_id:'test-person',display_name:'Synthetic Test',short_bio:'Synthetic biography',publication_status:'PUBLIC_APPROVED',affiliation_verified:true}],
 Roles:[{profile_id:'test-person',event_year:'2026',registry_category:'Judge',role_approved:true}],Assets:[],
 Approvals:[{profile_id:'test-person',consent_confirmed:true,content_approved:true,asset_approved:false,withdrawn:false}]});
 const approval={schemaVersion:'1.0.0',snapshotId:snapshot.snapshotId,revision:1,sha256:registryDigest(snapshot),state:'approved',approvedAt:'2026-01-02T00:00:00Z',expiresAt:'2099-01-01T00:00:00Z',reviewUrl:'https://example.org/review',recordIds:snapshot.data.records.map(x=>x.id)};
 return {schemaVersion:'1.0.0',snapshot,approval,images:[]};}
const json=value=>async()=>new Response(JSON.stringify(value),{status:200});
test('approved feed needs reviewed digest and independent current owner manifest',async()=>{
 const f=fixture(),pin=registryDigest(f.snapshot);assert.equal(validateFeed(f,pin).snapshot.data.people.length,1);
 const result=await readApprovedFeed(url,pin,null,json(f));assert.equal(result.fallback,false);
 for(const change of [x=>x.approval={},x=>x.approval.state='revoked',x=>x.approval.expiresAt='2026-01-03T00:00:00Z',x=>x.snapshot.kind='SYNTHETIC',x=>x.snapshot.data.people[0].biography='Changed without review',x=>x.snapshot.data.people[0].withdrawn=true]){const x=structuredClone(f);change(x);assert.throws(()=>validateFeed(x,pin));}
});
test('only unavailable service can retain exact pinned, unexpired previous snapshot',async()=>{
 const f=fixture(),pin=registryDigest(f.snapshot),offline=async()=>{throw Error('offline');};
 assert.equal((await readApprovedFeed(url,pin,f,offline)).fallback,true);
 assert.equal((await readApprovedFeed(url,pin,f,async()=>new Response('',{status:503}))).fallback,true);
 await assert.rejects(()=>readApprovedFeed(url,'0'.repeat(64),f,offline));await assert.rejects(()=>readApprovedFeed(url,pin,null,offline));
 await assert.rejects(()=>readApprovedFeed(url,pin,f,offline,new Date('2100-01-01T00:00:00Z')));
});
test('malformed, changed, redirected, missing, stale and revoked feeds never fall back',async()=>{
 const f=fixture(),pin=registryDigest(f.snapshot);
 for(const fetcher of [async()=>new Response('{bad'),async()=>new Response('{}'),async()=>new Response('',{status:302}),async()=>new Response('',{status:404}),json({...f,approval:{...f.approval,state:'revoked'}}),json({...f,approval:{...f.approval,expiresAt:'2026-01-03T00:00:00Z'}})]) await assert.rejects(()=>readApprovedFeed(url,pin,f,fetcher));
 const changed=structuredClone(f);changed.snapshot.revision++;await assert.rejects(()=>readApprovedFeed(url,pin,f,json(changed)));
});
test('withdrawal replacement cannot resurrect prior cache when reviewed pin changes',async()=>{
 const f=fixture(),next=structuredClone(f);next.snapshot.revision=2;next.snapshot.data.records=[];next.snapshot.data.people=[];next.approval.revision=2;next.approval.recordIds=[];next.approval.sha256=registryDigest(next.snapshot);
 const pin=registryDigest(next.snapshot);assert.equal((await readApprovedFeed(url,pin,f,json(next))).snapshot.data.records.length,0);
 await assert.rejects(()=>readApprovedFeed(url,pin,f,async()=>{throw Error('offline');}));
});
test('destination/size/privacy limits and manifest references reject safely',async()=>{
 for(const value of ['http://aeglysai.com/x','https://user:secret@aeglysai.com/x','https://aeglysai.com/x?token=secret','https://drive.google.com/file/d/private','https://127.0.0.1/x','https://arbitrary.example/x','https://aeglysai.com:444/x'])assert.throws(()=>publicFeedUrl(value));
 await assert.rejects(()=>fetchPublicBytes(url,4,async()=>new Response('12345')));
 const f=fixture(),pin=registryDigest(f.snapshot);assert.throws(()=>validateFeed({...f,private_notes:'secret'},pin));assert.throws(()=>validateFeed({...f,images:[{path:'/images/unreferenced.png',url:'https://aeglysai.com/x.png'}]},pin));
});
test('image URL must be stable public HTTPS and declared by approved snapshot',()=>{
 const f=fixture();f.snapshot.assets=[{path:'/images/test.png',sha256:'0'.repeat(64),rights:'owned',attribution:'Synthetic test',approved:true,displayCreditRequired:false}];f.snapshot.data.people[0].image={path:'/images/test.png',alt:'Synthetic avatar'};f.approval.sha256=registryDigest(f.snapshot);
 assert.doesNotThrow(()=>validateFeed({...f,images:[{path:'/images/test.png',url:'https://aeglysai.com/images/test.png'}]},registryDigest(f.snapshot)));
 assert.throws(()=>validateFeed({...f,images:[{path:'/images/test.png',url:'https://drive.google.com/private'}]},registryDigest(f.snapshot)));
});

test('actual CLI stages valid content, retains offline cache, and rejects refresh without replacing pointer',()=>{
 const work=mkdtempSync(join(tmpdir(),'portal-feed-cli-')),repo=resolve('.');
 try{
 mkdirSync(join(work,'.community-drafts'));symlinkSync(join(repo,'scripts'),join(work,'scripts'),'dir');
 const f=fixture(),fixturePath=join(work,'fixture.json'),preload=join(work,'preload.mjs');writeFileSync(fixturePath,JSON.stringify(f));
 const pin=registryDigest(f.snapshot),cli=join(repo,'scripts/community/profile-feed.mjs');
 const run=(mode,content=f)=>{writeFileSync(fixturePath,JSON.stringify(content));writeFileSync(preload,mode==='offline'?"globalThis.fetch=async()=>{throw Error('offline');};":`import {readFileSync} from 'node:fs';globalThis.fetch=async()=>new Response(readFileSync(${JSON.stringify(fixturePath)}),{status:200});`);return spawnSync(process.execPath,['--import',preload,cli],{cwd:work,encoding:'utf8',env:{...process.env,AEGLYSAI_SHOWCASE_FEED_URL:url,AEGLYSAI_SHOWCASE_FEED_SHA256:pin}});};
 const initial=run('valid');assert.equal(initial.status,0,initial.stderr);const pointer=join(work,'.community-drafts/profile-feed/current.json'),original=readFileSync(pointer,'utf8');
 assert.equal(run('offline').status,0);assert.equal(readFileSync(pointer,'utf8'),original);
 assert.notEqual(run('bad',{}).status,0);assert.equal(readFileSync(pointer,'utf8'),original);
 assert.notEqual(run('revoked',{...f,approval:{...f.approval,state:'revoked'}}).status,0);assert.equal(readFileSync(pointer,'utf8'),original);
 assert.equal(JSON.parse(readFileSync(join(work,'.community-drafts/profile-feed',original,'event-showcase.json'))).data.people.length,1);
 }finally{rmSync(work,{recursive:true,force:true});}
});

test('expired record visibility is rejected even while its owner manifest remains valid',()=>{
 const f=fixture();f.snapshot.data.events[0].timezone='UTC';f.snapshot.data.records[0].visibility.until='2026-02-01';f.approval.sha256=registryDigest(f.snapshot);
 assert.throws(()=>validateFeed(f,registryDigest(f.snapshot),new Date('2026-10-26T12:00:00Z')));
});
