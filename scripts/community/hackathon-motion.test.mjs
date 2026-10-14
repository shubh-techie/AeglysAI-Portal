import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const baseline = JSON.parse(readFileSync('scripts/community/fixtures/hackathon-motion-baseline.json','utf8'));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const normalize = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/\/_astro\/[^" ]+\.css/g,'/_astro/STYLES.css');
test('DESIGN-004 preserves every non-script landing HTML byte including copy, links, anchors, order and SVGs', () => {
 assert.equal(sha(normalize(readFileSync('dist/hackathons/index.html','utf8'))),baseline.landingHtml);
 for(const [path,hash] of Object.entries(baseline.protectedSources)) assert.equal(sha(readFileSync(path)),hash,path);
});
test('DESIGN-004 keeps all 26 other routes and their consumed styles identical to the untouched baseline', () => {
 assert.equal(Object.keys(baseline.otherRoutes).length,26);
 for(const [path,record] of Object.entries(baseline.otherRoutes)) {
  const html=readFileSync(`dist/${path}`,'utf8');
  assert.equal(sha(normalize(html)),record.html,path);
  const styles=[...html.matchAll(/href="(\/_astro\/[^" ]+\.css)"/g)].map(match=>sha(readFileSync(`dist${match[1]}`)));
  assert.deepEqual(styles,record.styles,`${path} CSS`);
 }
});
