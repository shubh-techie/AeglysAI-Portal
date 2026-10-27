import test from 'node:test';import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,readdirSync,rmSync,realpathSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';
import {synchronize} from './profile-sync.ts';import {sourceConfigSchema,googleClient} from './profile-source.ts';import {sourceFixture} from './profile-source-fixture.mjs';
import {validateRegistry,registryDigest} from '../../src/data/eventRegistry.ts';
const image=readFileSync('public/images/aeglysai-social.png');
async function isolated(fn){const root=mkdtempSync(join(realpathSync(tmpdir()),'profile-source-test-'));try{await fn(root);}finally{rmSync(root,{recursive:true,force:true});}}
test('API sync reflects bio, replacement image, new profile and multiple roles without code edits',()=>isolated(async root=>{
 const {state:s,api}=sourceFixture(image),feed=()=>JSON.parse(readFileSync(join(root,'content-002a-feed/preview-feed.json')));
 await synchronize(s.config,api,'demo',root);const old=feed().profiles[0].imageSha256;s.profiles[1][6]='Fictional changed biography';
 // A separately decoded PNG is used as the replacement source bytes.
 const sharp=(await import('sharp')).default;s.bytes=await sharp({create:{width:8,height:8,channels:3,background:'#336699'}}).png().toBuffer();
 s.profiles.push(['demo-fixture-02','Fictional newcomer','mentor','2026','Fictional mentor','','New biography','','','','','Fallback avatar','DEMO_DO_NOT_PUBLISH','Yes']);s.roles.push(['demo-fixture-02','2026','mentor'],['demo-fixture-01','2026','mentor']);s.roleFlags.push(['No'],['No']);s.approvals.push(['demo-fixture-02']);s.approvalFlags.push(['No','No','No','No']);
 await synchronize(s.config,api,'demo',root);const f=feed();assert.equal(f.profiles.length,2);assert.equal(f.profiles[0].biography,'Fictional changed biography');assert.notEqual(f.profiles[0].imageSha256,old);assert.deepEqual(f.profiles[0].extraCategories,['Mentor']);assert.equal(f.profiles[1].category,'Mentor');
}));
test('unapproved, demo, withdrawn, duplicate, missing and unavailable source reject before preview replacement',()=>isolated(async root=>{
 const {state:s,api}=sourceFixture(image);await synchronize(s.config,api,'demo',root);const original=readFileSync(join(root,'content-002a-feed/preview-feed.json'),'utf8');
 await assert.rejects(()=>synchronize(s.config,api,'candidate',root));s.approvalFlags[1][3]='Yes';await assert.rejects(()=>synchronize(s.config,api,'demo',root));s.approvalFlags[1][3]='No';
 s.profiles.push([...s.profiles[1]]);await assert.rejects(()=>synchronize(s.config,api,'demo',root));s.profiles.pop();
 s.assets[1][1]='mismatched-photo';await assert.rejects(()=>synchronize(s.config,api,'demo',root));s.assets[1][1]='synthetic-photo-123';s.available=false;await assert.rejects(()=>synchronize(s.config,api,'demo',root));assert.equal(readFileSync(join(root,'content-002a-feed/preview-feed.json'),'utf8'),original);
}));
test('candidate verifies rights, owner, bytes and fresh owner approval; never publishes',()=>isolated(async root=>{
 const {state:s,api,approve}=sourceFixture(image);approve();s.owner='untrusted';await assert.rejects(()=>synchronize(s.config,api,'candidate',root));s.owner='synthetic-owner';s.corrupt=true;await assert.rejects(()=>synchronize(s.config,api,'candidate',root));s.corrupt=false;
 s.assetFlags[1][2]='Not granted';await assert.rejects(()=>synchronize(s.config,api,'candidate',root));s.assetFlags[1][2]='Permission granted';
 await synchronize(s.config,api,'candidate',root);const dir=readdirSync(join(root,'profile-source-candidates'))[0],snapshot=JSON.parse(readFileSync(join(root,'profile-source-candidates',dir,'candidate.json')));assert(!JSON.stringify(snapshot).includes('synthetic-photo-123'));assert(!JSON.stringify(snapshot).includes(s.config.sheetId));assert.throws(()=>validateRegistry(snapshot,{}));
 const a={schemaVersion:'1.0.0',snapshotId:snapshot.snapshotId,revision:snapshot.revision,sha256:registryDigest(snapshot),state:'approved',approvedAt:new Date().toISOString(),expiresAt:'2099-01-01T00:00:00Z',reviewUrl:'https://example.org/test',recordIds:snapshot.data.records.map(x=>x.id)};
 assert.doesNotThrow(()=>validateRegistry(snapshot,a));snapshot.data.people[0].biography='Changed';assert.throws(()=>validateRegistry(snapshot,a));
}));
test('publication flag cannot be enabled and API transport prevents bearer redirects/destination changes',async()=>{
 const {state:s}=sourceFixture(image);assert.throws(()=>sourceConfigSchema.parse({...s.config,publicationEnabled:true}));let seen;
 const api=googleClient('synthetic-token',async(_url,options)=>{seen=options;return new Response('{}',{status:200});});await api.json('https://sheets.googleapis.com/v4/spreadsheets/synthetic');assert.equal(seen.redirect,'manual');
 await assert.rejects(()=>api.json('https://attacker.example/test'));await assert.rejects(()=>googleClient('synthetic-token',async()=>new Response('',{status:302})).json('https://www.googleapis.com/drive/v3/files/synthetic'));
});
