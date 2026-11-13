import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const inventory=JSON.parse(readFileSync('docs/speaking/SPEAK-001B-IMAGES.json','utf8'));
const html=readFileSync('dist/speaking/index.html','utf8');
const generated=JSON.parse(readFileSync('src/data/speakingPhotos.generated.json'));const current=Object.values(generated.photos).flat();
test('SPEAK001B preserves historical approved assets independently of current discovered photo counts',()=>{
 assert.equal(inventory.length,10);const included=inventory.filter(x=>x.publication==='INCLUDED');assert.equal(included.length,5);
 assert.equal(included.filter(x=>x.eventId==='beyond-static-access-control').length,1);assert.equal(included.filter(x=>x.eventId==='gicite-2026-wru-key-talk').length,4);
 assert.equal(readdirSync('src/assets/speaking/conferences').length,5);
 for(const item of included){assert.equal(createHash('sha256').update(readFileSync('src/assets/'+item.assetPath)).digest('hex'),item.displaySHA256);assert.equal(item.attribution,'Courtesy of Shubh Prabhat');if(current.some(photo=>photo.alt===item.alt))assert.ok(html.includes(item.alt));assert.ok(!item.alt.includes('delivered'));}
 const etic=html.split('data-speaking-event="etic-2026"')[1].split('</article>')[0];assert.equal((etic.match(/data-speaking-photo /g)||[]).length,(generated.photos['etic-2026']?.length??0)*2);assert.ok(etic.includes('Invitation Accepted'));
 assert.match(html,/Completion confirmed by the owner/);assert.doesNotMatch(html,/Synthetic blue panel|fixture-photo|meet\.google\.com\/(?:meet\/)?[a-z]{3}-[a-z]{4}-[a-z]{3}/);
});
test('SPEAK001B privacy crops exclude screenshot controls and originals from public variants',()=>{
 for(const item of inventory.filter(x=>x.crop)){
  assert.ok(item.crop.left>=0&&item.crop.top>=0);assert.ok(item.crop.left+item.crop.width<=item.originalWidth);assert.ok(item.crop.top+item.crop.height<=item.originalHeight);
  assert.notEqual(item.originalSHA256,item.displaySHA256);
 }

 for(const item of inventory.filter(x=>x.publication==='EXCLUDED'))assert.ok(!html.includes(item.id));
 assert.equal((html.match(/data-video-play /g)||[]).length,JSON.parse(readFileSync('src/data/speakingRecordings.json','utf8')).length);assert.equal((html.match(/data-speaking-photo /g)||[]).length,current.length*2);
});
