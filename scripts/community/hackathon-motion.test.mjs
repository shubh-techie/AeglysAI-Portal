import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
const baseline = JSON.parse(readFileSync('scripts/community/fixtures/hackathon-motion-baseline.json','utf8'));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const navigation = JSON.parse(readFileSync('scripts/community/fixtures/research-navigation-baseline.json','utf8'));
// Restore only the verified pre-UX header for historical byte guards; new tests guard all remaining bytes.
const originalHeader = (html, path) => html.replace(/<header class="site-header">[\s\S]*?<\/header>/, navigation.headers[navigation.routes[path].header]);
const normalize = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/\/_astro\/[^" ]+\.css/g,'/_astro/STYLES.css');
test('DESIGN-005 preserves every non-network landing HTML byte and protected content source', () => {
 const revised = JSON.parse(readFileSync('scripts/community/fixtures/hackathon-interactions-baseline.json','utf8'));
 assert.equal(sha(normalize(originalHeader(readFileSync('dist/hackathons/index.html','utf8'), 'hackathons/index.html')).replace(/<div class="hx-network\b[\s\S]*?(?=<\/section>)/,'NETWORK</div>')),revised.landingOutsideNetwork);
 for(const [path,hash] of Object.entries(baseline.protectedSources).filter(([path])=>path!=='src/components/hackathons/landing/EventHero.astro')) assert.equal(sha(readFileSync(path)),hash,path);
});
test('EVENT-001 preserves 25 other routes and all pre-existing community content/styles', () => {
 assert.equal(Object.keys(baseline.otherRoutes).length,26);
 for(const [path,record] of Object.entries(baseline.otherRoutes)) {
  const html=readFileSync(`dist/${path}`,'utf8');
  if (path === 'hackathons/community/index.html') {
   const eventBaseline = JSON.parse(readFileSync('scripts/community/fixtures/event-showcase-baseline.json','utf8'));
   const withoutShowcase = normalize(html).replace(/<style>\.event-showcase\[[\s\S]*?<\/style>/, '').replace(/<section class="section event-showcase"[\s\S]*?<\/section>/, '');
   assert.equal(sha(withoutShowcase.replace(/<style>[\s\S]*?<\/style>/g,'')),eventBaseline.html,path);
   assert.equal(sha([...withoutShowcase.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(x=>x[1]).join('').replace(/\s/g,'')),eventBaseline.inlineStyles,'Existing community inline styles');
  } else assert.equal(sha(normalize(html)),record.html,path);
  const styles=[...html.matchAll(/href="(\/_astro\/[^" ]+\.css)"/g)].map(match=>sha(readFileSync(`dist${match[1]}`)));
  assert.deepEqual(styles,record.styles,`${path} CSS`);
 }
});
