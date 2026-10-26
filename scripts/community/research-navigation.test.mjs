import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
const baseline = JSON.parse(readFileSync('scripts/community/fixtures/research-navigation-baseline.json', 'utf8'));
const sha = value => createHash('sha256').update(value).digest('hex');

test('UX-001 preserves all 27 routes outside the header, with the approved EVENT-001 community exception', () => {
  assert.equal(Object.keys(baseline.routes).length, 27);
  for (const [path, record] of Object.entries(baseline.routes)) {
    const html = readFileSync(`dist/${path}`, 'utf8');
    const outside = html.replace(/<header class="site-header">[\s\S]*?<\/header>/, 'HEADER').replace(/\/_astro\/[^" ]+\.css/g, '/_astro/STYLES.css');
    if (path === 'hackathons/community/index.html' && existsSync('scripts/community/fixtures/event-showcase-baseline.json')) {
      // Keep EVENT's independent baseline; do not regenerate UX's original page hashes.
      const event = JSON.parse(readFileSync('scripts/community/fixtures/event-showcase-baseline.json', 'utf8'));
      const restored = html.replace(/<header class="site-header">[\s\S]*?<\/header>/, baseline.headers[record.header]);
      const previousContent = restored.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/\/_astro\/[^" ]+\.css/g, '/_astro/STYLES.css')
        .replace(/<section class="section event-showcase"[\s\S]*?<\/section>/, '').replace(/<style>[\s\S]*?<\/style>/g, '');
      assert.equal(sha(previousContent), event.html, path);
      assert.equal((html.match(/<section class="section event-showcase"/g) ?? []).length, 1);
      assert.equal((html.match(/<script[^>]*data-showcase-init/g) ?? []).length, 1);
    } else assert.equal(sha(outside), record.outsideHeader, path);
  }
});

test('UX-001 has one native disclosure with exactly the original destinations and current-page semantics', () => {
  for (const [path, record] of Object.entries(baseline.routes)) {
    const html = readFileSync(`dist/${path}`, 'utf8');
    const header = html.match(/<header class="site-header">[\s\S]*?<\/header>/)[0];
    const disclosure = header.match(/<details class="research-navigation"[\s\S]*?<\/details>/)[0];
    assert.equal((header.match(/data-site-menu(?=[\s>])/g) ?? []).length, 1);
    assert.match(header, /<dialog id="mobile-navigation"[^>]*aria-labelledby="navigation-title"/);
    assert.match(header, /aria-controls="mobile-navigation"/);
    assert.match(header, /data-menu-close/);
    assert.match(disclosure, /<summary[^>]*>\s*Research\s*<\/summary>/);
    assert.deepEqual([...disclosure.matchAll(/href="([^"]+)"/g)].map(m => m[1]), ['/research/', '/experiments/', '/publications/']);
    const links = value => [...value.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)].map(m => m[1]);
    assert.deepEqual(links(header).sort(), [...links(baseline.headers[record.header]), '/', '/hackathons/2027/'].sort(), path);
    for (const destination of ['research', 'experiments', 'publications']) {
      assert.equal((header.match(new RegExp(`href="/${destination}/"`, 'g')) ?? []).length, 1);
      assert.ok(existsSync(`dist/${destination}/index.html`));
      if (path === `${destination}/index.html`) {
        assert.match(disclosure, new RegExp(`href="/${destination}/" aria-current="page"`));
        assert.match(disclosure, /research-current/);
      }
    }
    // Keep the browser's disclosure semantics rather than imposing application menu roles.
    assert.doesNotMatch(disclosure, /role="menu|aria-expanded=/);
  }
});
