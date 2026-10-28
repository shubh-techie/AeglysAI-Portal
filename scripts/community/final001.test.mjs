import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync,existsSync} from 'node:fs';
import {importProfiles} from './profile-import.ts';import {registryDigest,validateRegistry} from '../../src/data/eventRegistry.ts';import {publicShowcase} from '../../src/data/eventShowcase.ts';import {beforeFinal001} from './final001-preservation.mjs';
const read=p=>readFileSync(p,'utf8');
test('FINAL001 preserves event links and adds discoverable showcase/support destinations',()=>{
 const html=read('dist/hackathons/index.html'),nav=html.match(/<nav class="hx-event-nav"[\s\S]*?<\/nav>/)[0];
 for(const label of ['Challenges','Qualification','Timeline','Awards','Judging','FAQs','Full rules','People &amp; Partners','Community'])assert(nav.includes(label),label);
 assert.match(nav,/href="\/hackathons\/community\/#aegython-showcase-title"/);assert.match(nav,/href="#faq-community-heading"/);assert.match(html,/id="faq-community-heading"/);
 const community=read('dist/hackathons/community/index.html');assert.match(community,/id="aegython-showcase-title"[^>]*>People &amp; Partners/);assert.match(community,/border-radius: 50%/);assert.match(community,/object-fit: cover/);assert.match(community,/Approved profiles and announcements will appear/);
 assert(!existsSync('src/data/community/event-showcase.json'));assert(!existsSync('src/data/community/event-showcase-approval.json'));
});
test('FINAL001 raw public Model D status preserves research and enforcement boundaries',()=>{
 const home=read('dist/index.html'),research=read('dist/research/index.html');assert.match(home,/Research Implementation Complete/);assert.match(research,/Model D — Research Implementation Complete/);
 for(const html of [home,research]){assert.match(html,/enforcement_authority=NONE/);assert.match(html,/non-enforcing/);assert.match(html,/external field effectiveness/);assert.match(html,/commercial readiness/);assert.match(html,/Drift|drift/);assert.match(html,/mock-feedback/);assert.doesNotMatch(html,/Model D (?:is|remains) planned|Model D is not implemented/);}
 assert.match(research,/internal reproducibility checks/);assert.match(research,/not independent field validation/);
});
test('FINAL001 new Speaker/Organizer roles require version1.1 and matching independent owner approval',()=>{
 const snapshot=importProfiles({snapshotId:'synthetic-final001',revision:1,exportedAt:'2026-01-01T00:00:00Z',exportId:'synthetic-export',sourceRevision:'synthetic-source',
 Profiles:[{profile_id:'synthetic-person',display_name:'Synthetic Multi Role',short_bio:'Synthetic fixture only',publication_status:'PUBLIC_APPROVED',affiliation_verified:true}],
 Roles:['Speaker','Organizer'].map(registry_category=>({profile_id:'synthetic-person',event_year:'2026',registry_category,role_approved:true})),Assets:[],
 Approvals:[{profile_id:'synthetic-person',consent_confirmed:true,content_approved:true,asset_approved:false,withdrawn:false}]});
 assert.equal(snapshot.schemaVersion,'1.1.0');assert.equal(snapshot.data.people.length,1);assert.equal(publicShowcase(snapshot.data,'aegython-2026',new Date()).length,2);
 const approval={schemaVersion:'1.1.0',snapshotId:snapshot.snapshotId,revision:1,sha256:registryDigest(snapshot),state:'approved',approvedAt:'2026-01-02T00:00:00Z',expiresAt:'2099-01-01T00:00:00Z',reviewUrl:'https://example.org/review',recordIds:snapshot.data.records.map(x=>x.id)};
 assert.doesNotThrow(()=>validateRegistry(snapshot,approval));assert.throws(()=>validateRegistry(snapshot,{}));assert.throws(()=>validateRegistry(snapshot,{...approval,schemaVersion:'1.0.0'}));
 const legacy={...snapshot,schemaVersion:'1.0.0'};assert.throws(()=>validateRegistry(legacy,{...approval,schemaVersion:'1.0.0',sha256:registryDigest(legacy)}));
 snapshot.data.people[0].biography='Changed after approval';assert.throws(()=>validateRegistry(snapshot,approval));
});
test('FINAL001 preservation projection rejects any unpinned current change',()=>{
 const html=read('dist/index.html');assert.doesNotThrow(()=>beforeFinal001('dist/index.html',html));assert.throws(()=>beforeFinal001('dist/index.html',html+'UNREVIEWED-CHANGE'));
});
