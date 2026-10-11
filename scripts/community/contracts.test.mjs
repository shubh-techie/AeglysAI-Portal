import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {validateEvidence,reviewedPublicRecords,transitionReview} from './contracts.mjs';
test('COM-001 upstream valid/invalid fixtures and synthetic publication separation',()=>{
 for(const name of readdirSync('scripts/community/fixtures')){
  const document=JSON.parse(readFileSync(`scripts/community/fixtures/${name}`,'utf8'));
  if(name.startsWith('valid-'))validateEvidence(document);else assert.throws(()=>validateEvidence(document),name);
 }
});
test('COM-003B/006/007B require review, consent, independent outcome, privacy allowlists',()=>{
 const record={id:'test-only',title:'Test only',description:'Synthetic',category:'Test',status:'VERIFIED',publicationPermission:true,sourceUrl:'https://example.org/source',reviewUrl:'https://example.org/review',verifiedAt:'2026-10-01'};
 assert.equal(reviewedPublicRecords([record],'project').length,1);
 for(const status of ['RECEIVED','PENDING_REVIEW','REJECTED','WITHDRAWN'])assert.equal(reviewedPublicRecords([{...record,status}],'project').length,0);
 assert.equal(reviewedPublicRecords([{...record,publicationPermission:false}],'project').length,0);assert.throws(()=>reviewedPublicRecords([{...record,email:'private'}],'project'));assert.throws(()=>reviewedPublicRecords([record],'adoption'));assert.throws(()=>reviewedPublicRecords([{...record,sourceUrl:'https://example.org/?token=x'}],'project'));
 assert.equal(reviewedPublicRecords([{...record,independent:true,outcome:'Executed synthetic test',provenanceDate:'2026-10-01'}],'adoption').length,1);assert.throws(()=>reviewedPublicRecords([record,record],'project'));
});

test('COM-003B review transitions require review and withdraw publication permission',()=>{
 const received={status:'RECEIVED',publicationPermission:true};
 assert.throws(()=>transitionReview(received,'VERIFIED'));
 const pending=transitionReview(received,'PENDING_REVIEW');
 const verified=transitionReview(pending,'VERIFIED');
 const withdrawn=transitionReview(verified,'WITHDRAWN');
 assert.equal(withdrawn.publicationPermission,false);
 assert.throws(()=>transitionReview(withdrawn,'VERIFIED'));
});
