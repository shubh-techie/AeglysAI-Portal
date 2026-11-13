import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
const html=readFileSync('dist/speaking/index.html','utf8');
const current=Object.values(JSON.parse(readFileSync('src/data/speakingPhotos.generated.json')).photos).flat();
test('SPEAK001C compact cards preserve discovered approved images and complete progressive details',()=>{
 assert.equal((html.match(/class="sp-event sp-compact-event"/g)||[]).length,3);
 assert.equal((html.match(/<details[^>]+data-event-details/g)||[]).length,3);
 assert.equal((html.match(/<details[^>]+data-event-details/g)||[]).length,3);
 assert.equal((html.match(/<summary[^>]+data-event-trigger/g)||[]).length,3);
 const grid=html.split('<div class="sp-event-grid">')[1];
 for(const id of ['beyond-static-access-control','gicite-2026-wru-key-talk','etic-2026']){
  const card=grid.split(`data-speaking-event="${id}"`)[1].split('</article>')[0];assert.ok(card.includes('View Photos &amp; Details'));assert.ok(card.includes('<details'));assert.ok(card.includes(id==='beyond-static-access-control'?'Approved engagement record':'Earlier engagement record'));
  assert.ok(card.includes('Event website'));assert.ok(card.includes('data-event-content'));assert.ok(!card.includes('youtube.com'));assert.ok(!card.includes('recordingIds'));for(const hackathonId of['Uw6hD61RqNM','OLASKGI-aFw','tn5RhKbzRcw'])assert.ok(!card.includes(hackathonId));
 }
 const photos=[...html.matchAll(/data-photo-alt="([^"]+)"/g)].map(m=>m[1]);assert.equal(photos.length,current.length*2);assert.deepEqual(new Set(photos.map(s=>s.replaceAll('&amp;','&').replaceAll('&quot;','\"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>'))),new Set(current.map(p=>p.alt)));
 assert.match(html,/Completed/);assert.match(html,/Completion confirmed by the owner/);assert.match(html,/Invitation Accepted/);
 assert.equal((html.match(/data-speaking-conference-init/g)||[]).length,1);
});
test('SPEAK001C conference enhancement keeps nonautoplay keyboard/dialog safety and scoped layout',()=>{
 const script=readFileSync('src/components/speaking/showcase/conference.js','utf8')+readFileSync('src/components/speaking/showcase/gallery.js','utf8');assert.doesNotMatch(script,/setInterval|autoplay|innerHTML|fetch\(|XMLHttpRequest/);
 for(const marker of ['showModal','aria-haspopup','ArrowLeft','ArrowRight','pointerup','pointercancel','shiftKey',"document.body.style.overflow='hidden'",'opener.focus()'])assert.ok(script.includes(marker),marker);
 const css=readFileSync('src/styles/speaking-showcase.css','utf8');assert.match(css,/\.sp-card-gallery \.sp-photo img \{ aspect-ratio:16\/9/);assert.match(css,/object-fit:cover/);assert.match(css,/\.sp-event-dialog \{/);assert.match(css,/100dvh/);
});
