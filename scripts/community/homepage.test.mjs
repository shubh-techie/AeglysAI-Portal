import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { originalHomepage } from './homepage-preservation.mjs';
const read = path => readFileSync(path, 'utf8');
const sha = value => createHash('sha256').update(value).digest('hex');
const baseline = JSON.parse(read('scripts/community/fixtures/homepage-baseline.json'));
const html = read('dist/index.html');

test('UX-002 retains every existing homepage byte except its three explicit additions, and all 27 other routes', () => {
  assert.equal(baseline.baseline, '6f56ec09a4556143e43d268fed24237cabb20bfd');
  assert.equal(sha(originalHomepage(html)), baseline.homepage);
  assert.equal(Object.keys(baseline.routes).length, 27);
  for (const [path, hash] of Object.entries(baseline.routes)) assert.equal(sha(read(`dist/${path}`)), hash, path);
  assert.equal((html.match(/<aside class="home-research-note"/g) ?? []).length, 1);
  assert.equal((html.match(/<section class="section container home-community"/g) ?? []).length, 1);
  assert.equal((html.match(/<style data-home-experience>/g) ?? []).length, 1);
});

test('UX-002 separates research implementation from validation and Model D enforcement', () => {
  const note = html.match(/<aside class="home-research-note"[\s\S]*?<\/aside>/)[0];
  assert.match(note, /separate research repository/);
  assert.match(note, /does not independently validate their effectiveness/);
  assert.match(note, /Model D is planned, non-enforcing research/);
  assert.match(note, /enforcement_authority=NONE/);
  assert.match(note, /not a production authorization mechanism/);
  assert.equal((html.match(/class="model-card(?: planned-card)?"/g) ?? []).length, 4);
});

test('UX-002 adds only approved event discovery, retaining media and presentation attribution', () => {
  const community = html.match(/<section class="section container home-community"[\s\S]*?<\/section>/)[0];
  assert.deepEqual([...community.matchAll(/href="([^"]+)"/g)].map(m => m[1]), ['/community/', '/hackathons/', '/hackathons/2027/']);
  assert.match(community, /Coming Soon/);
  assert.match(community, /when officially confirmed/);
  assert.doesNotMatch(community, /<form\b|<input\b|forms\.gle|docs\.google|register now|countdown|sponsor|prize|2027-\d\d-\d\d/i);
  assert.equal((html.match(/data-media-id=/g) ?? []).length, 6);
  assert.match(html, /href="\/speaking\/"/);
  // All original media/presentation markup is already covered byte-for-byte above.
});
