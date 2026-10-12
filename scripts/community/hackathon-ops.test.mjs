import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { transpileModule } from 'typescript';
async function load(path) {
 const {outputText}=transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:99,target:99}});
 return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
test('OPS-001 verified mapping and independent collection gates',async()=>{
 const {hackathonForms,approvedFormUrl}=await load('src/data/hackathonForms.ts');
 const titles={participant:'Participant Registration',team:'Team Formation',speaker:'Speaker and Mentor Profile',judge:'Judge Profile and Acceptance',guest:'Guest Invitation Response',project:'Final Project Submission',qualification:'Technical Prequalification Submission'};
 assert.equal(new Set(Object.values(hackathonForms).map(x=>x.url)).size,7);
 for(const [kind,form] of Object.entries(hackathonForms)) {
  assert.ok(form.title.includes(titles[kind])); assert.match(form.url,/^https:\/\/docs\.google\.com\/forms\/d\/e\/[^/]+\/viewform$/);
  assert.equal(approvedFormUrl(form),form.url);
  const active={...form,open:true};assert.equal(approvedFormUrl(active),form.url);
  for(const gate of ['available','publicationApproved','open']) assert.equal(approvedFormUrl({...active,[gate]:false}),null);
  assert.equal(approvedFormUrl({...active,verifiedAt:null}),null);
  assert.equal(approvedFormUrl({...active,verifiedAt:"not-a-date"}),null);
  assert.equal(approvedFormUrl({...active,url:null}),null);
  for(const suffix of ['/edit','/preview','/formResponse']) assert.throws(()=>approvedFormUrl({...active,url:form.url.replace('/viewform',suffix)}));
 }
});
test('OPS-001 original certificate sample gate, distinct eligibility and safe placeholders',async()=>{
 const {certificateCategories,certificatePreview,canShowCertificatePreview}=await load('src/data/hackathonCertificates.ts');
 assert.equal(certificateCategories.length,8);assert.equal(new Set(certificateCategories.map(x=>x.title)).size,8);
 assert.equal(canShowCertificatePreview(certificatePreview),true);
 assert.equal(canShowCertificatePreview({enabled:true,publicationApproved:false}),false);
 assert.equal(canShowCertificatePreview({enabled:false,publicationApproved:true}),false);
 assert.equal(canShowCertificatePreview({enabled:true,publicationApproved:true}),true);
 const component=readFileSync('src/components/hackathons/CertificateShowcase.astro','utf8');
 for(const label of ['Sample Recipient','[Certificate Category]','[Certificate ID]','[Date]','[Authorized Signature]','Sample — Not Valid for Verification'])assert.ok(component.includes(label));
 assert.doesNotMatch(component,/https?:\/\/|<svg|QR code/);
 const html=readFileSync('dist/hackathons/index.html','utf8');
 for(const category of certificateCategories)assert.ok(html.includes(category.title));
 assert.ok(!html.includes('Certificate design preview pending'));assert.ok(html.includes('Sample Recipient'));
 assert.ok(html.includes('Sample — Not Valid for Verification'));
 const {hackathonForms}=await load('src/data/hackathonForms.ts');
 for(const form of Object.values(hackathonForms)) assert.ok(html.includes(`href="${form.url}"`));
 assert.doesNotMatch(html,/Keynote Speaker · PLANNED|formResponse|edit_requested/);
});
