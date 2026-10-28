import test from 'node:test';
import { beforeFinal001, readHistoricalFile } from './final001-preservation.mjs';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { registrationChannels, discordCommunityUrl } from '../../src/data/hackathonChannels.ts';
import { originalHackathon, originalHackathonSource } from './registration-preservation.mjs';
const html = readFileSync('dist/hackathons/index.html','utf8');
const baseline = JSON.parse(readFileSync('scripts/community/registration-baseline.json','utf8'));
const sha = value => createHash('sha256').update(value).digest('hex');
const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(match=>({attrs:match[1],text:match[2].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim()}));

test('REG-001 exact owner-supplied public links are safe and clearly identify external destinations',()=>{
  assert.deepEqual(registrationChannels.map(c=>c.url),['https://unstop.com/o/UMpqYS1','https://luma.com/1vmb4bna']);
  assert.equal(discordCommunityUrl,'https://discord.com/invite/rNdTbezkg');
  for(const url of [...registrationChannels.map(c=>c.url),discordCommunityUrl]){
    const parsed=new URL(url);assert.equal(parsed.protocol,'https:');assert.ok(!parsed.username&&!parsed.password&&!parsed.search&&!parsed.hash&&!parsed.port);
    const links=anchors.filter(a=>a.attrs.includes(`href="${url}"`));assert.equal(links.length,url===discordCommunityUrl?2:1);
    for(const link of links){assert.match(link.attrs,/target="_blank"/);assert.match(link.attrs,/rel="noopener noreferrer"/);assert.match(link.text,/external/);}
  }
});
test('REG-001 preserves historical bytes outside the pinned FINAL-001 delta, including2027 and navigation',()=>{
  assert.equal(baseline.baseline,'c85f80e5662d5d429ed098b260c6dc7a427edb65');
  assert.equal((html.match(/id="registration-channels"/g)||[]).length,1);
  assert.equal((html.match(/data-reg001-support="inline"/g)||[]).length,1);
  assert.equal((html.match(/data-reg001-support="card"/g)||[]).length,1);
  assert.equal(sha(originalHackathon(beforeFinal001('dist/hackathons/index.html',html))),baseline.landingHtml);
  assert.equal(sha(originalHackathonSource(readHistoricalFile('src/pages/hackathons/index.astro','utf8'))),baseline.landingSource);
  assert.equal(Object.keys(baseline.otherRoutes).length,27);
  for(const [path,hash] of Object.entries(baseline.otherRoutes))assert.equal(sha(readHistoricalFile(`dist/${path}`)),hash,path);
});
test('REG-001 keeps registration/qualification/selection authoritative and Discord separate',()=>{
  const section=html.match(/<section class="hx-section" id="registration-channels"[\s\S]*?<\/section>/)[0];
  assert.ok(html.indexOf('id="registration"')<html.indexOf('id="registration-channels"'));
  assert.ok(html.indexOf('id="registration-channels"')<html.indexOf('id="qualification"'));
  assert.match(section,/External registration does not complete AeglysAI technical qualification or indicate organizer selection/);
  assert.match(section,/official AeglysAI page remains authoritative/);
  assert.match(section,/dates and eligibility are still pending/);
  assert.doesNotMatch(section,/\b(?:registered|attendees|participants):?\s*\d|₹|2026-11-/i);
  assert.equal((html.match(/Discord participation does not constitute event registration, technical qualification or organizer selection\./g)||[]).length,2);
  assert.ok(html.indexOf('data-reg001-support="card"')>html.indexOf('id="faq"'));
});
test('REG-001 links expose unique descriptive context and retain existing focus styling without runtime JS',()=>{
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
  for(const link of anchors.filter(a=>a.attrs.includes(`href="${discordCommunityUrl}"`))){
    assert.match(link.text,/Join Discord Community/);
    const id=link.attrs.match(/aria-describedby="([^"]+)"/)[1];assert.ok(ids.includes(id));
  }
  const css=readFileSync('src/styles/hackathon-landing.css','utf8');assert.match(css,/:focus-visible\s*\{ outline: 3px solid var\(--hackathon-focus\)/);
  for(const name of ['CommunitySupport','RegistrationChannels'])assert.doesNotMatch(readFileSync(`src/components/hackathons/${name}.astro`,'utf8'),/<script|<iframe|<form|fetch\(/);
});
