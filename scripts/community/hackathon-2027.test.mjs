import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const read = path => readFileSync(path, 'utf8');
const walk = path => readdirSync(path, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(path, entry.name)) : [join(path, entry.name)]);

test('2027 announcement is discoverable and contains no unapproved event or registration claims', () => {
  const html = read('dist/hackathons/2027/index.html');
  const main = html.match(/<main\b[\s\S]*?<\/main>/)[0];
  assert.equal(walk('dist').filter(path => path.endsWith('.html')).length, 28);
  assert.match(html, /rel="canonical" href="https:\/\/aeglysai.com\/hackathons\/2027\/"/);
  assert.match(read('dist/sitemap-0.xml'), /<loc>https:\/\/aeglysai.com\/hackathons\/2027\/<\/loc>/);
  assert.match(main, /HACKATHON 2027/);
  assert.match(main, /Coming<br\b[^>]*><span[^>]*>Soon/);
  assert.match(main, /Dates, challenges, participation details and announcements will be shared when officially confirmed\./);
  assert.match(main, /href="\/hackathons\/"[^>]*>Explore AEGYTHON 2026/);
  assert.doesNotMatch(main, /<form\b|<input\b|<time\b|countdown|forms\.gle|docs\.google|register now|prize|sponsor|venue|judge/i);
  assert.doesNotMatch(main, /2027-\d{2}-\d{2}|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d/i);
});

test('shared header exposes exactly two Hackathon destinations with unique disclosure controls on all routes', () => {
  for (const path of walk('dist').filter(path => path.endsWith('.html'))) {
    const header = read(path).match(/<header class="site-header">[\s\S]*?<\/header>/)[0];
    const group = header.match(/<details[^>]*data-hackathon-navigation[\s\S]*?<\/details>/)[0];
    assert.match(group, /<summary[^>]*aria-controls="hackathons-destinations"[^>]*>\s*Hackathon\s*<\/summary>/);
    assert.deepEqual([...group.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([^<]+)/g)].map(m => [m[1], m[2]]), [['/hackathons/', 'AEGYTHON 2026'], ['/hackathons/2027/', 'Hackathon 2027']]);
    const ids = [...header.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length, path);
    assert.match(header, /data-research-navigation/);
    assert.equal((header.match(/<dialog\b/g) ?? []).length, 1);
    const active = path === 'dist/hackathons/index.html' ? '/hackathons/' : path === 'dist/hackathons/2027/index.html' ? '/hackathons/2027/' : null;
    if (active) assert.match(group, new RegExp(`href="${active}" aria-current="page"`));
    else assert.doesNotMatch(group, /aria-current="page"/);
  }
});
