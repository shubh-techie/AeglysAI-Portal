import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdtempSync,writeFileSync,rmSync} from 'node:fs';import {join,resolve} from 'node:path';import {tmpdir} from 'node:os';import {createHash} from 'node:crypto';
import {parsePublicJson,validateContract} from './upstream.mjs';import {recognitionRecords,adoptionRecords,approvedMonthly,authorize} from './publication.mjs';import {digest} from './contracts.mjs';import {impactDraft,impactMarkdown} from './impact-report.mjs';
const root=resolve('scripts/community/upstream'),load=p=>parsePublicJson(readFileSync(p,'utf8')),copy=v=>structuredClone(v);
const paths={evidence:'evidence',recognition:'contributors',adoption:'adoption',monthly:'reporting'};
function publicFixture(d){return JSON.parse(JSON.stringify(d).replaceAll('SYNTHETIC','PUBLIC_AGGREGATE').replaceAll('https://example.invalid','https://example.org').replaceAll('"kind":"synthetic"','"kind":"public-aggregate"').replaceAll('0'.repeat(64),'1'.repeat(64)));}
const approval=(kind,d,recordIds=[])=>[{kind,sha256:digest(d),reviewUrl:'https://github.com/shubh-techie/AeglysAI-Portal/pull/owner-reviewed-fixture',approvedAt:'2026-11-02T00:00:00Z',recordIds}];
const later={now:new Date('2026-11-03T00:00:00Z')};
test('INTEGRATION-001 pinned schema and validator hashes remain exact',()=>{
 const manifest=JSON.parse(readFileSync(join(root,'MANIFEST.json'),'utf8'));
 const {source,fixtures,...files}=manifest;
 assert.equal(source.commit,'711c1556e27bd226c08fb6a8c7b0d9040b4c88ee');
 assert.equal(source.observedMainCommit,source.commit);
 assert.equal(source.public,true);assert.equal(source.status,'PUBLISHED_MAIN_VERIFIED');
 assert.equal(Object.keys(fixtures).length,24);
 for(const [path,sha]of Object.entries(fixtures))assert.equal(createHash('sha256').update(readFileSync(join(root,path))).digest('hex'),sha,path);
 for(const [name,m] of Object.entries(files)){
  const path=m.path??`scripts/community/${name}`;
  assert.equal(createHash('sha256').update(readFileSync(join(root,path))).digest('hex'),m.sha256,name);
 }
});
test('INTEGRATION-001 all upstream positive and negative fixtures use authoritative schema and semantics',()=>{
 for(const [kind,folder] of Object.entries(paths)){
  const base=join(root,'community',folder,'fixtures');const options={artifactRoot:join(base,'snapshots')};
  for(const name of readdirSync(join(base,'valid')))validateContract(kind,load(join(base,'valid',name)),options);
  for(const name of readdirSync(join(base,'invalid'))){
   const d=load(join(base,'invalid',name));
   // This fixture is structurally valid pending content, rejected only for publication.
   assert.throws(()=>validateContract(kind,d,{...options,publication:kind==='monthly'}),`${kind}/${name}`);
  }
 }
});
test('INTEGRATION-001 strict parsing, versions, duplicate evidence and whitespace rejection',()=>{
 for(const raw of ['{"x":1,"x":2}','{"x":NaN}','{"x":1e999}','{"x":9007199254740993}', JSON.stringify(Array.from({length:70}).reduce(a=>[a],0)), ' '.repeat(1024*1024+1)])assert.throws(()=>parsePublicJson(raw));
 for(const [kind,folder] of Object.entries(paths)){
  const p=join(root,'community',folder,'fixtures/valid');const d=load(join(p,readdirSync(p)[0]));d.schema_version='2.0.0';assert.throws(()=>validateContract(kind,d));
 }
 const d=load(join(root,'community/evidence/fixtures/valid/synthetic-all-levels.json'));
 assert.throws(()=>validateContract('evidence',{...d,metrics:[...d.metrics,d.metrics[0]]}));const bad=copy(d);bad.metrics[0].definition=' ';assert.throws(()=>validateContract('evidence',bad));
});
test('INTEGRATION-001 recognition cannot self-authorize and withdrawal minimizes public credit',()=>{
 const d=publicFixture(load(join(root,'community/contributors/fixtures/valid/synthetic-recognition.json')));
 validateContract('recognition',d);assert.throws(()=>recognitionRecords(d,[],later));
 assert.equal(recognitionRecords(d,approval('recognition',d,[d.recognitions[0].id]),later).length,1);
 const withdrawn=publicFixture(load(join(root,'community/contributors/fixtures/valid/synthetic-withdrawal.json')));
 assert.equal(recognitionRecords(withdrawn,approval('recognition',withdrawn,[withdrawn.recognitions[0].id]),later).length,0);
 const invalid=copy(d);invalid.recognitions[0].consent.state='withdrawn';assert.throws(()=>recognitionRecords(invalid,approval('recognition',invalid),later));
 const synthetic=load(join(root,'community/contributors/fixtures/valid/synthetic-recognition.json'));assert.throws(()=>recognitionRecords(synthetic,approval('recognition',synthetic),later));
});
test('INTEGRATION-001 adoption requires independent execution; current corrections and withdrawal control visibility',()=>{
 const d=publicFixture(load(join(root,'community/adoption/fixtures/valid/synthetic-integration.json'))),id=d.records[0].id;
 assert.throws(()=>adoptionRecords(d,[],later));assert.equal(adoptionRecords(d,approval('adoption',d,[id]),later).length,1);
 const bad=copy(d);bad.records[0].independence.relationship='affiliated';assert.throws(()=>adoptionRecords(bad,approval('adoption',bad,[id]),later));
 const corrected=copy(d),next={...copy(d.records[0]),id:'corrected-fixture',correction:{previous_id:id,reason:'Local synthetic correction test'}};
 corrected.records[0].record_state='superseded';corrected.records.push(next);
 assert.deepEqual(adoptionRecords(corrected,approval('adoption',corrected,[id,next.id]),later).map(r=>r.id),[next.id]);
 const withdrawn=copy(d);withdrawn.records[0].record_state='withdrawn';withdrawn.records[0].verification.status='draft';assert.equal(adoptionRecords(withdrawn,approval('adoption',withdrawn,[id]),later).length,0);
 const cycle=copy(corrected);cycle.records[0].correction={previous_id:next.id,reason:'Cycle'};cycle.records[1].record_state='superseded';assert.throws(()=>validateContract('adoption',cycle));
});
test('INTEGRATION-001 monthly drafts preserve raw bytes, determinism, revisions and publication gates',()=>{
 const base=join(root,'community/reporting/fixtures/snapshots');
 const draft=impactDraft('2026-10',['source-evidence.json'],{artifactRoot:base});
 validateContract('monthly',draft,{artifactRoot:base});assert.equal(draft.schema_version,'1.0.0');assert.equal(draft.publication.state,'pending');
 assert.equal(impactMarkdown(draft),impactMarkdown(impactDraft('2026-10',['source-evidence.json'],{artifactRoot:base})));
 assert.throws(()=>impactDraft('2026-10',['source-evidence.json','source-evidence.json'],{artifactRoot:base}));assert.throws(()=>impactDraft('2026-10',['../outside.json'],{artifactRoot:base}));
 assert.throws(()=>approvedMonthly(draft,approval('monthly',draft),{artifactRoot:base,...later}));
 const revised=load(join(root,'community/reporting/fixtures/valid/synthetic-revised-monthly.json'));validateContract('monthly',revised,{artifactRoot:base});const invalid=copy(revised);invalid.revision.history=[];assert.throws(()=>validateContract('monthly',invalid,{artifactRoot:base}));
 const temporary=mkdtempSync(join(tmpdir(),'portal-contract-'));
 try{
  const r=publicFixture(load(join(root,'community/reporting/fixtures/valid/synthetic-approved-monthly.json')));
  for(const source of r.source_snapshots){const raw=JSON.stringify(source.record);writeFileSync(join(temporary,source.artifact_path),raw);source.sha256=createHash('sha256').update(raw).digest('hex');}
  assert.throws(()=>approvedMonthly(r,[],{artifactRoot:temporary,...later}));
  assert.equal(approvedMonthly(r,approval('monthly',r),{artifactRoot:temporary,...later}).schema_version,'1.0.0');
  assert.throws(()=>approvedMonthly(r,approval('monthly',r),{artifactRoot:temporary,now:new Date('2026-10-11T00:00:00Z')}));
  r.publication.state='withdrawn';r.publication.approved_at=null;r.publication.review_reference=null;assert.throws(()=>approvedMonthly(r,approval('monthly',r),{artifactRoot:temporary,...later}));
 }finally{rmSync(temporary,{recursive:true,force:true});}
});
test('INTEGRATION-001 owner approvals bind exact bytes of objects, privacy and review dates',()=>{
 const d={data_kind:'PUBLIC_AGGREGATE',metrics:[]};assert.throws(()=>authorize(d,[],[]));assert.throws(()=>authorize(d,'evidence',approval('evidence',d),{now:new Date('2026-10-11T00:00:00Z')}));
 assert.throws(()=>authorize({...d,email:'private@example.invalid'},'evidence',approval('evidence',d),later));
 assert.throws(()=>authorize({...d,metrics:['changed']},'evidence',approval('evidence',d),later));
});
