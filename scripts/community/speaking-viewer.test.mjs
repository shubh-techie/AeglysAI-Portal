import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';
const html=readFileSync('dist/speaking/index.html','utf8');const inventory=JSON.parse(readFileSync('src/data/speakingPhotos.generated.json'));
test('SPEAK001E single closed semantic viewer uses event facts and per-photo discovered descriptions',()=>{
 const markup=html.match(/<dialog[^>]+data-speaking-lightbox[\s\S]*?<\/dialog>/)[0];assert.doesNotMatch(markup,/data-viewer-thumbnails|sp-viewer-details|data-original-photo|<aside/);
 assert.ok(markup.includes('data-viewer-dates'));assert.ok(markup.includes('data-viewer-status'));assert.ok(markup.includes('data-viewer-website'));assert.ok(markup.includes('data-viewer-extra'));
 const tag=html.match(/<dialog[^>]+data-speaking-lightbox[^>]*>/)[0];assert.doesNotMatch(tag,/\sopen(?:\s|=|>)/);assert.match(tag,/aria-labelledby="speaking-photo-heading"/);assert.match(tag,/aria-describedby="speaking-photo-description"/);
 for(const marker of['data-viewer-image','data-viewer-stage','data-viewer-name'])assert.ok(html.includes(marker),marker);
 for(const[event,photos]of Object.entries(inventory.photos)){
  const card=html.split('<div class="sp-event-grid">')[1].split(`data-speaking-event="${event}"`)[1].split('</article>')[0];assert.ok(card.includes(`data-viewer-event="${event}"`));assert.equal((card.match(/data-photo-thumb=/g)||[]).length,photos.length*2);assert.equal((card.match(/data-photo-credit=/g)||[]).length,photos.length*2);assert.ok(!card.includes('youtube.com'));assert.ok(!card.includes('data-viewer-recordings'));for(const hackathonId of['Uw6hD61RqNM','OLASKGI-aFw','tn5RhKbzRcw'])assert.ok(!card.includes(hackathonId));
  assert.ok(card.includes(event==='beyond-static-access-control'?'data-viewer-role="Keynote Speaker"':event==='gicite-2026-wru-key-talk'?'Completion confirmed by the owner':'Invitation Accepted'));
 }
 assert.equal((html.match(/id="speaking-photo-heading"/g)||[]).length,1);assert.equal((html.match(/id="speaking-photo-description"/g)||[]).length,1);
});
