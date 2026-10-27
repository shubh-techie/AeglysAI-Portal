import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, existsSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { importProfiles } from './profile-import.ts';
import { validateRegistry, registryDigest } from '../../src/data/eventRegistry.ts';
import { makeDemoShowcase } from './preview/profiles-demo.ts';
import { publicShowcase } from '../../src/data/eventShowcase.ts';
const packet = () => ({ snapshotId: 'test-import', revision: 1, exportedAt: '2026-01-01T00:00:00Z', exportId: 'test-export', sourceRevision: 'rev-1',
  Profiles: [{profile_id:'test-person', display_name:'Synthetic Test', short_bio:'Synthetic test biography', publication_status:'PUBLIC_APPROVED', affiliation_verified:true}],
  Roles: [{profile_id:'test-person',event_year:'2026',registry_category:'Judge',role_approved:true}], Assets: [],
  Approvals: [{profile_id:'test-person',consent_confirmed:true,content_approved:true,asset_approved:false,withdrawn:false}] });
const approval = s => ({schemaVersion:'1.0.0',snapshotId:s.snapshotId,revision:s.revision,sha256:registryDigest(s),state:'approved',approvedAt:'2026-01-02T00:00:00Z',expiresAt:'2099-01-01T00:00:00Z',reviewUrl:'https://example.org/review',recordIds:s.data.records.map(x=>x.id)});
test('sanitized import reuses registry, multiple roles share one profile; owner approval still required',()=>{
 const p=packet();p.Roles.push({...p.Roles[0],registry_category:'Mentor'});const s=importProfiles(p);
 assert.equal(s.data.people.length,1);assert.equal(s.data.records.length,2);assert.throws(()=>validateRegistry(s,{}));assert.doesNotThrow(()=>validateRegistry(s,approval(s)));
 const a=approval(s);s.data.people[0].biography='Changed approved copy';assert.throws(()=>validateRegistry(s,a));
});
test('rejects missing/conflicting approval, withdrawal, demo marker and unsupported role',()=>{
 for(const mutate of [p=>p.Approvals=[],p=>p.Approvals[0].consent_confirmed=false,p=>p.Approvals[0].withdrawn=true,p=>p.Approvals[0].content_approved=false,p=>p.Roles[0].role_approved=false,p=>p.Profiles[0].publication_status='DEMO_DO_NOT_PUBLISH',p=>p.Roles[0].registry_category='speaker']) {const p=packet();mutate(p);assert.throws(()=>importProfiles(p));}
});
test('rejects duplicates, orphan roles/assets, private fields/links, formulas and contacts',()=>{
 for(const mutate of [p=>p.Profiles.push(p.Profiles[0]),p=>p.Roles.push(p.Roles[0]),p=>p.Approvals.push(p.Approvals[0]),p=>p.Roles[0].profile_id='unknown',p=>p.Profiles[0].email='private@example.org',p=>p.Approvals[0].notes_private='private',p=>p.Profiles[0].drive_photo_file_id='private-id',p=>p.Profiles[0].short_bio='=HYPERLINK("x")',p=>p.Profiles[0].public_website_url='https://drive.google.com/file/d/private',p=>p.Profiles[0].short_bio='Call +1 555 123 4567']) {const p=packet();mutate(p);assert.throws(()=>importProfiles(p));}
});
test('approved local image bytes and permissions are required; digest changes reject',()=>{
 const p=packet(),path='/images/aeglysai-social.png';p.Assets=[{profile_id:'test-person',public_copy_path:path,sha256:createHash('sha256').update(readFileSync('public'+path)).digest('hex'),alt_text:'Synthetic asset test',rights:'owned',attribution:'Existing Portal test asset',ownership_verified:true,usage_permission_verified:true,asset_approved:true,display_credit_required:false}];p.Approvals[0].asset_approved=true;
 assert.equal(importProfiles(p).assets.length,1);
 for(const mutate of [p=>p.Assets[0].display_credit_required=true,p=>p.Assets[0].ownership_verified=false,p=>p.Assets[0].usage_permission_verified=false,p=>p.Assets[0].sha256='0'.repeat(64),p=>p.Assets[0].public_copy_path='/images/../private.png',p=>p.Approvals[0].asset_approved=false]) {const q=structuredClone(p);mutate(q);assert.throws(()=>importProfiles(q));}
});
test('partner maps to existing record; organization cannot be a second human role',()=>{
 const p=packet();p.Roles[0].registry_category='Partner';const s=importProfiles(p);assert.equal(s.data.people.length,0);assert.equal(s.data.records[0].name,'Synthetic Test');p.Roles.push({...p.Roles[0],registry_category:'Mentor'});assert.throws(()=>importProfiles(p));
});
test('synthetic preview feed reuses renderer with four categories and missing-image fallback',()=>{
 const d=makeDemoShowcase({schemaVersion:'1.0.0',kind:'DEMO_DO_NOT_PUBLISH',profiles:Array.from({length:6},(_,i)=>({id:'test-demo-'+i,name:'Synthetic Test '+i,category:['Judge','Judge','Mentor','Keynote Speaker','Keynote Speaker','Partner'][i],designation:'Synthetic role',biography:'Synthetic test only'}))}),cards=publicShowcase(d,'demo-2026',new Date());assert.equal(cards.length,6);assert.equal(new Set(cards.map(x=>x.category)).size,4);assert(cards.every(x=>x.copy.startsWith('DEMO')&&!x.image));
 const config=readFileSync('astro.dev.config.mjs','utf8');assert.match(config,/command === 'dev'/);assert(!readFileSync('astro.config.mjs','utf8').includes('local-profile-demo'));
});
test('CLI exclusive review output and private-input rejection',()=>{
 const work=mkdtempSync(resolve('.community-drafts/content002-cli-')),outside=mkdtempSync(join(tmpdir(),'content002-cli-'));
 const run=(input,output)=>spawnSync(process.execPath,['scripts/community/profile-import.mjs',input,output],{encoding:'utf8'});
 try{
  const input=join(outside,'tables.json'),output=join(work,'candidate.json');writeFileSync(input,JSON.stringify(packet()));
  assert.equal(run(input,output).status,0);const original=readFileSync(output,'utf8');assert.equal(JSON.parse(original).kind,'PUBLIC_APPROVED');
  assert.notEqual(run(input,output).status,0);assert.equal(readFileSync(output,'utf8'),original);
  assert.notEqual(run(input,join(outside,'escaped.json')).status,0);assert(!existsSync(join(outside,'escaped.json')));
  symlinkSync(outside,join(work,'escape'),'dir');assert.notEqual(run(input,join(work,'escape','symlink.json')).status,0);assert(!existsSync(join(outside,'symlink.json')));
  const bad=packet();bad.Approvals[0].notes_private='PRIVATE-DO-NOT-LOG';writeFileSync(input,JSON.stringify(bad));const rejected=run(input,join(work,'bad.json'));
  assert.notEqual(rejected.status,0);assert(!existsSync(join(work,'bad.json')));assert(!rejected.stderr.includes('PRIVATE-DO-NOT-LOG'));
 }finally{rmSync(work,{recursive:true,force:true});rmSync(outside,{recursive:true,force:true});}
});
