import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';
import{speakingMediaRegions}from'./speaking-discovery-preservation.mjs';
const html=readFileSync('dist/speaking/index.html','utf8');
test('SPEAK001E final cards reserve media/count only; all gallery controls live in fallback or viewer',()=>{
 const regions=speakingMediaRegions(html);for(let i=0;i<6;i+=2){const media=html.slice(regions[i].start,regions[i].end);if(media){assert.ok(media.includes('sp-card-media-frame'));assert.ok(media.includes('sp-card-photo-count'));}assert.doesNotMatch(media,/sp-carousel-controls|sp-gallery-thumbnails|data-carousel-select/);}
 const runtime=readFileSync('src/components/speaking/showcase/conference.js','utf8');assert.doesNotMatch(runtime,/createElement\('dialog'\)/);
 assert.ok(html.includes('data-viewer-description'));assert.ok(html.includes('data-viewer-organizer'));assert.ok(html.includes('data-viewer-location'));
 const card=html.split('<div class="sp-event-grid">')[1];assert.ok(card.includes('Invitation Accepted'));assert.ok(card.includes('View Photos &amp; Details'));assert.ok(card.includes('Completion confirmed by the owner'));assert.ok(!card.split('data-speaking-event="etic-2026"')[1].split('<details')[0].includes('Talk title to be confirmed.'));
});
