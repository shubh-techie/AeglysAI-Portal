import test from 'node:test';
import assert from 'node:assert/strict';
import {assertPublicExport} from './public-export.mjs';
test('COM-ARCH-001 sanitized exports reject nested private Workspace identifiers, contacts and credentials',()=>{
 assertPublicExport({title:'Public-safe topic',sourceUrl:'https://github.com/shubh-techie/AeglysAI',count:null});
 for(const value of [{spreadsheetId:'synthetic'}, {nested:[{participantEmail:'local@example.invalid'}]}, {description:'Contact local@example.invalid'}, {sourceUrl:'https://docs.google.com/spreadsheets/d/synthetic/edit'}, {sourceUrl:'https://drive.google.com/file/d/synthetic/view'}, {accessToken:'synthetic'}, {description:`Bearer ${'synthetic'.repeat(5)}`}])assert.throws(()=>assertPublicExport(value),/privacy gate rejected/);
});
