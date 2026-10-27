import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdtempSync,mkdirSync,rmSync,cpSync,symlinkSync,realpathSync} from 'node:fs';import {resolve,join} from 'node:path';import {tmpdir} from 'node:os';import {spawnSync} from 'node:child_process';
import {readPeople,preparePeoplePreview,savePeoplePreview,readPeoplePreview,peoplePhoto} from './profile-people.ts';import {inspectSourceImage,sourceConfigSchema} from './profile-source.ts';
const header=['Profile_ID','Role','Name','Affiliation / Company','Designation','LinkedIn_URL','Photo_ID','Status','Notes'];
const row=()=>['synthetic-person','Organizer / Example','Synthetic source name','Synthetic organization','Synthetic designation','https://www.linkedin.com/in/synthetic/','synthetic-photo','Pending'];
const config=()=>sourceConfigSchema.parse({schemaVersion:'1.0.0',layout:'people',publicationEnabled:false,sheetId:'synthetic-sheet-123',assetFolderId:'synthetic-folder-123',maxRows:200,demoAvatarUse:true,approvedOwnerPermissionIds:[],roleMap:{},rightsMap:{}});
test('People header mapping excludes Notes values and preserves raw pending roles',async()=>{
 const requests=[];const api={json:async url=>{requests.push(url);if(url.includes('?fields='))return {sheets:[{properties:{title:'People',gridProperties:{rowCount:200,columnCount:26}}}]};if(url.endsWith('A1:I1'))return {values:[header]};return {values:[header.slice(0,8),row()]};}};
 const rows=await readPeople(config(),api);assert.equal(rows[0].length,8);assert.equal(rows[0][1],'Organizer / Example');assert.equal(rows[0][7],'Pending');assert(!requests.some(x=>/I\d/.test(x)&&!x.endsWith('A1:I1')));
 const bad={json:async url=>url.includes('?fields=')?{sheets:[{properties:{title:'People',gridProperties:{rowCount:200}}}]}:{values:[['private_notes',...header.slice(1)]]}};await assert.rejects(()=>readPeople(config(),bad));
});
test('preview joins multiple roles by stable ID, suppresses withdrawals, rejects Notes/conflicts and unsafe links',async()=>{
 const a=row(),b=[...a];b[1]='Judge';const withdrawn=[...a];withdrawn[0]='withdrawn-person';withdrawn[7]='Withdrawn';const f=await preparePeoplePreview([a,b,withdrawn],async()=>({bytes:Buffer.from('synthetic'),extension:'png',sha256:'0'.repeat(64)}));assert.equal(f.feed.people.length,1);assert.deepEqual(f.feed.people[0].roles,['Organizer / Example','Judge']);assert.equal(f.feed.people[0].status,'Pending');assert(!JSON.stringify(f.feed).includes('synthetic-photo'));
 for(const rows of [[a,a],[a,[...b.slice(0,2),'Conflicting name',...b.slice(3)]],[[...a,'NEVER-READ-NOTES']],[[...a.slice(0,5),'http://unsafe.example',...a.slice(6)]]])await assert.rejects(()=>preparePeoplePreview(rows,async()=>{throw Error('no image');}));
 const revoked=[...a];revoked[7]='Revoked';assert.equal((await preparePeoplePreview([revoked],async()=>{throw Error('withdrawn image must not load');})).feed.people.length,0);
});
test('original PNG/JPEG bytes are preserved and no crop is performed by preview storage',async()=>{
 const bytes=readFileSync('public/images/aeglysai-social.png'),image=await inspectSourceImage(bytes,'image/png',bytes.length,false),root=mkdtempSync(join(realpathSync(tmpdir()),'people-preview-'));
 try{const f=await preparePeoplePreview([row()],async()=>image);savePeoplePreview(f,root);assert.deepEqual(readFileSync(join(root,'photos/synthetic-person.png')),bytes);const output=readFileSync(join(root,'preview-feed.json'),'utf8');assert(!output.includes('synthetic-photo'));assert(!output.includes('Notes'));assert(!output.includes('approval'));const revoked=JSON.parse(output);revoked.people[0].status='Revoked';writeFileSync(join(root,'preview-feed.json'),JSON.stringify(revoked));assert.equal(readPeoplePreview(root).people.length,0);assert.equal(peoplePhoto('synthetic-person',revoked),null);
 const sharp=(await import('sharp')).default,jpeg=await sharp(bytes).jpeg().toBuffer();assert.equal((await inspectSourceImage(jpeg,'image/jpeg',jpeg.length,false)).extension,'jpg');await assert.rejects(()=>inspectSourceImage(jpeg,'image/png',jpeg.length,false));}finally{rmSync(root,{recursive:true,force:true});}
});
test('People source cannot create publication candidates, regardless of source status',()=>{
 const root=mkdtempSync(join(tmpdir(),'people-cli-'));try{mkdirSync(join(root,'.community-drafts'));writeFileSync(join(root,'.community-drafts/profile-source.json'),JSON.stringify(config()));const r=spawnSync(process.execPath,[resolve('scripts/community/profile-sync.mjs'),'candidate'],{cwd:root,encoding:'utf8'});assert.notEqual(r.status,0);assert.match(r.stderr,/PEOPLE_PUBLICATION_PACKET_REQUIRED/);assert(!r.stderr.includes('synthetic-sheet'));}finally{rmSync(root,{recursive:true,force:true});}
});
test('actual production build refuses a previewItems caller instead of rendering unapproved cards',()=>{
 const root=mkdtempSync(resolve('.community-drafts/people-production-guard-'));try{
 cpSync('src',join(root,'src'),{recursive:true});symlinkSync(resolve('node_modules'),join(root,'node_modules'),'dir');symlinkSync(resolve('scripts'),join(root,'scripts'),'dir');symlinkSync(resolve('public'),join(root,'public'),'dir');
 writeFileSync(join(root,'astro.config.mjs'),"import {defineConfig} from 'astro/config';export default defineConfig({site:'https://example.org',output:'static'});");
 writeFileSync(join(root,'src/pages/preview-guard.astro'),`---\nimport EventShowcase from '../components/showcase/EventShowcase.astro';\n---\n<EventShowcase id="test" eventId="test" title="Test" previewItems={[{id:'test',category:'Judge',name:'Synthetic secret',copy:'Not approved',expertise:[]}]} />`);
 const r=spawnSync(process.execPath,[resolve('node_modules/astro/bin/astro.mjs'),'build','--root',root],{encoding:'utf8',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});assert.notEqual(r.status,0);assert.match(r.stdout+r.stderr,/Preview records are unavailable in production/);
 }finally{rmSync(root,{recursive:true,force:true});}
});
