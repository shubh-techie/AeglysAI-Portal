import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, rmSync, symlinkSync, existsSync, cpSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { exportRegistry, validateRegistry, validateRegistryAssets, mergeRegistry, registryDigest } from '../../src/data/eventRegistry.ts';
import { publicShowcase, eventShowcase, categories } from '../../src/data/eventShowcase.ts';
import { loadEventRegistry } from '../../src/data/eventRegistryInput.ts';

const now = new Date('2026-10-26T12:00:00Z');
const fixture = () => JSON.parse(readFileSync('scripts/community/event-registry-fixtures/synthetic-candidate.json', 'utf8'));
const owner = snapshot => ({ schemaVersion:'1.0.0', snapshotId:snapshot.snapshotId, revision:snapshot.revision,
  sha256:registryDigest(snapshot), state:'approved', approvedAt:'2026-10-25T13:00:00Z', expiresAt:'2026-12-01T00:00:00Z',
  reviewUrl:'https://example.org/synthetic-review', recordIds:snapshot.data.records.map(record=>record.id) });
const validate = (snapshot, approval=owner(snapshot)) => validateRegistry(snapshot, approval, {now, allowSynthetic:true});
const exported = () => exportRegistry(fixture(), {now});
const rendered = snapshot => publicShowcase(snapshot.data, 'synthetic-event', now);

test('EVENT-002 uses all existing categories, one shared profile and the original projection', () => {
  const snapshot=exported(); validate(snapshot); validateRegistryAssets(snapshot);
  assert.deepEqual(new Set(rendered(snapshot).map(item=>item.category)),new Set(categories));
  assert.equal(snapshot.data.people.length,1);
  assert.equal(snapshot.data.records.filter(record=>record.personId==='synthetic-person').length,4);
  assert.equal(rendered(snapshot).filter(item=>item.name==='Synthetic Registry Person').length,4);
  assert.ok(!JSON.stringify(rendered(snapshot)).includes('recordDecisions'));
  assert.ok(!JSON.stringify(snapshot).includes('profileConsents'));
  assert.throws(()=>validateRegistry(snapshot,owner(snapshot),{now}),/rejected/);
  assert.equal(loadEventRegistry(),eventShowcase);
});

test('EVENT-002 consent withdrawal/revocation/pending removes every role and dependent team', () => {
  for(const state of ['pending','revoked','withdrawn']) {
    const candidate=fixture(); candidate.profileConsents[0].state=state;
    const snapshot=exportRegistry(candidate,{now}); validate(snapshot);
    assert.equal(snapshot.data.people.length,0);
    assert.equal(snapshot.data.records.length,2); // partner + announcement
    assert.equal(snapshot.assets.length,0);
    assert.ok(!JSON.stringify(snapshot).includes('Synthetic Registry Person'));
  }
  for(const state of ['pending','revoked','withdrawn']) {
    const candidate=fixture(); candidate.recordDecisions.forEach(item=>item.state=state);
    const snapshot=exportRegistry(candidate,{now}); validate(snapshot);
    assert.equal(snapshot.data.records.length,0); assert.equal(snapshot.data.people.length,0);
  }
  const associated=fixture();associated.data.records.find(record=>record.category==='Participant').team='synthetic-team';
  associated.recordDecisions.find(item=>item.recordId==='synthetic-team').state='withdrawn';
  const snapshot=exportRegistry(associated,{now});assert.ok(!snapshot.data.records.some(record=>['Team','Participant'].includes(record.category)));
});

test('EVENT-002 missing/conflicting approvals and consent booleans block the proposed snapshot', () => {
  for(const change of [
    c=>c.recordDecisions.pop(), c=>c.profileConsents.pop(), c=>c.recordDecisions.push(c.recordDecisions[0]),
    c=>c.profileConsents.push(c.profileConsents[0]), c=>c.recordDecisions[0].recordId='unknown',
    c=>c.data.people[0].approvals.publicDisplayConsent=false, c=>c.data.people[0].confirmed=false,
    c=>c.data.people[0].suppressed=true, c=>c.data.records[0].approvals.content=false,
    c=>c.data.records[0].approvals.organizer=false, c=>c.data.records[0].status='Draft',
    c=>c.data.records[0].visibility.public=false, c=>c.data.records[0].visibility.suppressed=true,
    c=>c.data.records.find(r=>r.category==='Participant').selectionVerified=false,
    c=>c.data.records.find(r=>r.category==='Team').qualificationVerified=false,
    c=>c.data.records.find(r=>r.category==='Partner').approvals.branding=false,
  ]) { const c=fixture();change(c);assert.throws(()=>exportRegistry(c,{now})); }
});

test('EVENT-002 rejects duplicate IDs, duplicate roles, unsupported categories and identity overrides', () => {
  for(const change of [
    c=>c.data.records.push(c.data.records[0]), c=>c.data.people.push(c.data.people[0]),
    c=>c.data.events.push(c.data.events[0]), c=>c.data.records[0].category='Sponsor',
    c=>c.data.records[0].personId='unknown', c=>c.data.records[0].name='Different identity',
    c=>c.data.records[0].expertise=['Duplicate profile data'], c=>c.schemaVersion='2.0.0',
    c=>c.data.records[0].members=['synthetic-person'], c=>c.data.records[0].challenge='unsupported-challenge',
    c=>{const r=c.data.records.find(item=>item.category==='Partner');delete r.name;r.personId='synthetic-person';},
    c=>{const r={...c.data.records[0],id:'another-speaker'};c.data.records.push(r);c.recordDecisions.push({recordId:r.id,state:'approved'});},
  ]) {const c=fixture();change(c);assert.throws(()=>exportRegistry(c,{now}));}
});

test('EVENT-002 strict allowlists/privacy screen reject contacts, private links, credentials and formula cells', () => {
  for(const value of ['private@example.invalid','+1 (555) 123-4567','5551234567','=IMPORTXML("url")','  @SUM(A1:A2)','\t=1+1','-1+2','<img src=x onerror=alert(1)>',
    'https://docs.google.com/spreadsheets/d/private/edit','https://example.org/?token=synthetic','https://user:password@example.org','Bearer synthetic-token']) {
    const c=fixture();c.data.records[0].approvedCopy=value;assert.throws(()=>exportRegistry(c,{now}),value);
  }
  for(const field of ['email','phone','registrationResponse','consentDocument','internalReviewNote','spreadsheetId']) {
    const c=fixture();c.data.people[0][field]='synthetic-sensitive-canary';assert.throws(()=>exportRegistry(c,{now}));
  }
  const c=fixture();c.recordDecisions[0].state='pending';c.data.records[0].email='private@example.invalid';assert.throws(()=>exportRegistry(c,{now}));
});

test('EVENT-002 independent owner binds complete digest, IDs, revision, review time and expiry', () => {
  for(const patch of [{sha256:'0'.repeat(64)},{state:'revoked'},{snapshotId:'different'},{revision:2},{recordIds:[]},
    {approvedAt:'2026-10-27T00:00:00Z'},{approvedAt:'2026-10-24T00:00:00Z'},{expiresAt:'2026-10-26T12:00:00Z'},
    {reviewUrl:'https://drive.google.com/file/d/private'},{email:'private@example.invalid'}]) {
    const snapshot=exported();assert.throws(()=>validate(snapshot,{...owner(snapshot),...patch}));
  }
  const snapshot=exported();const approval=owner(snapshot);snapshot.data.records[0].approvedCopy='Changed after review';assert.throws(()=>validate(snapshot,approval));
  assert.throws(()=>validateRegistry(exported(),undefined,{now}));
});

test('EVENT-002 scheduled dates use original local-day/DST policy, never announcement dates', () => {
  const c=fixture();const r=c.data.records[0];r.status='Scheduled';r.visibility.from='2026-11-01';r.visibility.until='2026-11-02';
  c.data.events[0].timezone='America/Chicago';const snapshot=exportRegistry(c,{now});validate(snapshot);
  for(const [instant, count] of [['2026-11-01T04:59:59Z',0],['2026-11-01T05:00:00Z',1],['2026-11-02T06:00:00Z',0]]) {
    assert.equal(publicShowcase(snapshot.data,'synthetic-event',new Date(instant),'Keynote Speaker').length,count);
  }
  c.data.events[0].timezone=null;assert.throws(()=>exportRegistry(c,{now}));
  c.data.events[0].timezone='not/a-zone';assert.throws(()=>exportRegistry(c,{now}));
  const other=fixture();other.data.records[0].announcementDate='2099-01-01';assert.equal(rendered(exportRegistry(other,{now})).length,7);
});

test('EVENT-002 image references require approval, rights, exact bytes and safe local raster files', async () => {
  for(const change of [c=>c.assets=[],c=>c.assets.push(c.assets[0]),c=>c.assets[0].approved=false,c=>c.assets[0].displayCreditRequired=true,
    c=>c.assets[0].rights='unreviewed',c=>c.data.people[0].image.path='/images/../private.png']) {
    const c=fixture();change(c);assert.throws(()=>exportRegistry(c,{now}));
  }
  const snapshot=exported();snapshot.assets[0].sha256='0'.repeat(64);assert.throws(()=>validateRegistryAssets(snapshot));
  const root=mkdtempSync(join(tmpdir(),'event-registry-assets-'));
  try {
    mkdirSync(join(root,'images')); writeFileSync(join(root,'outside.png'),'synthetic');
    symlinkSync(join(root,'outside.png'),join(root,'images','escape.png'));
    snapshot.assets[0].path='/images/escape.png';assert.throws(()=>validateRegistryAssets(snapshot,root));
    writeFileSync(join(root,'images','fake.png'),'synthetic text');snapshot.assets[0].path='/images/fake.png';
    const {createHash}=await import('node:crypto');snapshot.assets[0].sha256=createHash('sha256').update('synthetic text').digest('hex');
    assert.throws(()=>validateRegistryAssets(snapshot,root));
  } finally {rmSync(root,{recursive:true,force:true});}
});

test('EVENT-002 merge preserves EVENT-001 data and rejects collisions or unauthorized event changes', () => {
  const snapshot=exported();const merged=mergeRegistry(eventShowcase,snapshot);
  assert.deepEqual(merged.records.slice(0,eventShowcase.records.length),eventShowcase.records);
  const collision=exported();collision.data.records[0].id=eventShowcase.records[0].id;assert.throws(()=>mergeRegistry(eventShowcase,collision));
  const event=exported();event.data.events.push({...eventShowcase.events[0],timezone:'UTC'});assert.throws(()=>mergeRegistry(eventShowcase,event));
});

test('EVENT-002 loader blocks malformed, partial, duplicate-key and synthetic production inputs', () => {
  const root=mkdtempSync(join(tmpdir(),'event-registry-input-'));
  try {
    assert.equal(loadEventRegistry(root),eventShowcase);
    const path=join(root,'event-showcase.json');writeFileSync(path,'{}');assert.throws(()=>loadEventRegistry(root));
    const approvalPath=join(root,'event-showcase-approval.json');writeFileSync(approvalPath,'{}');assert.throws(()=>loadEventRegistry(root));
    writeFileSync(path,'{"schemaVersion":"1.0.0","schemaVersion":"2.0.0"}');assert.throws(()=>loadEventRegistry(root));
    rmSync(path);symlinkSync(join(root,'absent.json'),path);assert.throws(()=>loadEventRegistry(root));rmSync(path);
    const snapshot=exported();writeFileSync(path,JSON.stringify(snapshot));writeFileSync(approvalPath,JSON.stringify(owner(snapshot)));assert.throws(()=>loadEventRegistry(root));
    snapshot.kind='PUBLIC_APPROVED';writeFileSync(path,JSON.stringify(snapshot));writeFileSync(approvalPath,JSON.stringify(owner(snapshot)));
    assert.equal(loadEventRegistry(root).records.length,eventShowcase.records.length+7);
  } finally {rmSync(root,{recursive:true,force:true});}
});

test('EVENT-002 CLI rejects privately, creates JSON exclusively, never generates spreadsheet/CSV output', () => {
  const root=mkdtempSync(join(tmpdir(),'event-registry-cli-'));
  const cli=resolve('scripts/community/event-registry.mjs');const candidate=join(root,'candidate.json');const output=join(root,'snapshot.json');
  const run=(...args)=>spawnSync(process.execPath,[cli,...args],{encoding:'utf8'});
  try {
    writeFileSync(candidate,JSON.stringify(fixture()));assert.equal(run('demo',candidate,output).status,0);
    const first=readFileSync(output,'utf8');assert.equal(run('demo',candidate,output).status,1);assert.equal(readFileSync(output,'utf8'),first);
    assert.equal(run('demo',candidate,join(root,'unsafe.csv')).status,1);assert.ok(!existsSync(join(root,'unsafe.csv')));
    assert.equal(run('demo',candidate,resolve('src/data/community/event-showcase.json')).status,1);assert.ok(!existsSync('src/data/community/event-showcase.json'));
    const invalid=fixture();invalid.data.people[0].email='PRIVATE-ERROR-CANARY@example.invalid';writeFileSync(candidate,JSON.stringify(invalid));
    const result=run('demo',candidate,join(root,'rejected.json'));assert.equal(result.status,1);assert.ok(!result.stderr.includes('PRIVATE-ERROR-CANARY'));assert.ok(!existsSync(join(root,'rejected.json')));
    writeFileSync(candidate,'{"schemaVersion":"1.0.0","schemaVersion":"2.0.0"}');assert.equal(run('demo',candidate,join(root,'duplicate.json')).status,1);
    writeFileSync(candidate,' '.repeat(1024*1024+1));assert.equal(run('demo',candidate,join(root,'oversized.json')).status,1);
    writeFileSync(candidate,'['.repeat(70)+'0'+']'.repeat(70));assert.equal(run('demo',candidate,join(root,'deep.json')).status,1);
    writeFileSync(candidate,'{"revision":9007199254740993}');assert.equal(run('demo',candidate,join(root,'unsafe-number.json')).status,1);
    assert.equal(run('csv',candidate,join(root,'unsafe.csv')).status,1);assert.ok(!existsSync(join(root,'unsafe.csv')));
  } finally {rmSync(root,{recursive:true,force:true});}
});

test('EVENT-002 synthetic/private source and approval metadata are absent from production HTML', () => {
  const files=readdirSync('dist',{recursive:true}).filter(path=>path.endsWith('.html'));
  for(const path of files) {
    const html=readFileSync(join('dist',path),'utf8');
    for(const marker of ['Synthetic Registry Person','synthetic-snapshot','recordDecisions','profileConsents','sourceRevision','approvedAt','event-showcase.json','docs.google.com/spreadsheets']) assert.ok(!html.includes(marker),`${path}: ${marker}`);
  }
  const html=readFileSync('dist/hackathons/community/index.html','utf8');
  assert.ok(html.includes('Approved profiles and announcements will appear here when available.'));
});

test('EVENT-002 actual isolated Astro build admits approved fixture, blocks invalid proposal and unpublishes by replacement', {timeout:60000}, () => {
  mkdirSync('.community-drafts',{recursive:true});
  const root=mkdtempSync(resolve('.community-drafts/event-registry-build-'));
  const contractPython=process.env.AEGLYSAI_CONTRACT_PYTHON ?? (existsSync('.community-drafts/contract-venv/bin/python') ? resolve('.community-drafts/contract-venv/bin/python') : 'python3');
  const build=()=>spawnSync(process.execPath,[resolve('node_modules/astro/bin/astro.mjs'),'build'],{cwd:root,encoding:'utf8',timeout:20000,env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1',AEGLYSAI_CONTRACT_PYTHON:contractPython}});
  try {
    cpSync('src',join(root,'src'),{recursive:true});cpSync('package.json',join(root,'package.json'));cpSync('astro.config.mjs',join(root,'astro.config.mjs'));
    for(const dir of ['node_modules','scripts','public'])symlinkSync(resolve(dir),join(root,dir),'dir');
    const candidate=fixture();candidate.data.events=[{id:'aegython-2026',title:'AEGYTHON 2026',timezone:null}];candidate.data.records.forEach(record=>record.eventId='aegython-2026');
    const snapshot=exportRegistry(candidate,{now});snapshot.kind='PUBLIC_APPROVED'; // Test-only simulated approval; never production data.
    const path=join(root,'src/data/community/event-showcase.json');const approvalPath=join(root,'src/data/community/event-showcase-approval.json');
    writeFileSync(path,JSON.stringify(snapshot));writeFileSync(approvalPath,JSON.stringify(owner(snapshot)));
    let result=build();assert.equal(result.status,0,result.stdout+result.stderr);
    let html=readFileSync(join(root,'dist/hackathons/community/index.html'),'utf8');assert.ok(html.includes('Synthetic Registry Person'));assert.ok(html.includes('7 approved items'));
    for(const record of eventShowcase.records)assert.ok(!html.includes(record.name));
    snapshot.data.people[0].email='BUILD-PRIVATE-CANARY@example.invalid';writeFileSync(path,JSON.stringify(snapshot));
    result=build();assert.notEqual(result.status,0);assert.ok(!(result.stdout+result.stderr).includes('BUILD-PRIVATE-CANARY'));
    const withdrawn=fixture();withdrawn.data.events=candidate.data.events;withdrawn.data.records.forEach(record=>record.eventId='aegython-2026');withdrawn.recordDecisions.forEach(item=>item.state='withdrawn');
    const empty=exportRegistry(withdrawn,{now});empty.kind='PUBLIC_APPROVED';empty.revision=2;
    writeFileSync(path,JSON.stringify(empty));writeFileSync(approvalPath,JSON.stringify(owner(empty)));
    result=build();assert.equal(result.status,0,result.stdout+result.stderr);
    html=readFileSync(join(root,'dist/hackathons/community/index.html'),'utf8');assert.ok(!html.includes('Synthetic Registry Person'));assert.ok(html.includes('Approved profiles and announcements will appear here when available.'));
  } finally {rmSync(root,{recursive:true,force:true});}
});
