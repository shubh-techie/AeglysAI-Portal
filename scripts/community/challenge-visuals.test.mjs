import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
const ids=['smart-login-guardian','find-the-anomaly','api-traffic-watch','explain-security-alert','predict-the-outage','ai-for-everyday-life'];
test('HACK-VISUAL-001 six distinct accessible vector sources have no external resources or active content',()=>{
 const files=readdirSync('src/assets/hackathon');assert.equal(files.length,6);
 const contents=ids.map(id=>readFileSync(`src/assets/hackathon/${id}.svg`,'utf8'));assert.equal(new Set(contents).size,6);
 for(const [index,svg]of contents.entries()){
  assert.match(svg,/viewBox="0 0 480 320"/);assert.match(svg,/role="img"/);
  assert.ok(svg.includes(`aria-labelledby="${ids[index]}-title ${ids[index]}-description"`));
  assert.match(svg,/<title[^>]*>[^<]+<\/title>/);assert.match(svg,/<desc[^>]*>[^<]+<\/desc>/);
  assert.match(svg,/marker-end="url\(#/);assert.doesNotMatch(svg,/<(?:script|image|foreignObject|animate|iframe)\b|\bon\w+=|(?:href|src)=|@import|url\((?!#)/i);
 }
});
test('HACK-VISUAL-001 production tiles and existing detail anchors share six diagrams and public HTML descriptions',()=>{
 const landing=readFileSync('dist/hackathons/index.html','utf8'),details=readFileSync('dist/hackathons/events/index.html','utf8');
 for(const html of [landing,details]){
  assert.equal((html.match(/data-challenge-diagram=/g)||[]).length,6);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
  assert.equal((html.match(/Conceptual architecture/g)||[]).length,6);
  assert.doesNotMatch(html,/cinematic|patent-specific algorithm|\b(?:accuracy|adoption)\s*:\s*\d/i);
 }
 for(const id of ids){assert.ok(landing.includes(`href="/hackathons/events/#${id}"`));assert.ok(details.includes(`id="${id}"`));}
 assert.equal((landing.match(/Minimum prototype/g)||[]).length,6);assert.equal((landing.match(/Beginner-friendly/g)||[]).length,5);assert.match(landing,/Beginner–intermediate/);
 assert.match(details,/chronological split/);assert.match(details,/mandatory AeglysAI qualification/);
});
