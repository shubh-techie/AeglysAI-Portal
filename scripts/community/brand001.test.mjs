import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {beforeBrand001} from './brand001-preservation.mjs';
const read=p=>readFileSync(p,'utf8');
const legacy=/Aeglysi Hackathon 2026|AeglysAI(?: AI\/ML and Cybersecurity)? Hackathon(?: 2026)?|AEGLYSAI HACKATHON 2026|AEGLYSAI \/ 2026/i;
test('BRAND001 active event names, metadata and labels use AEGYTHON 2026;2027 stays distinct',()=>{
 for(const page of ['dist/index.html','dist/hackathons/index.html','dist/hackathons/events/index.html','dist/hackathons/community/index.html']){
  const html=read(page);assert.doesNotMatch(html,legacy,page);assert.match(html,/AEGYTHON 2026/);
 }
 const event=read('dist/hackathons/index.html');assert.match(event,/<title>AEGYTHON 2026/);assert.match(event,/property="og:title" content="AEGYTHON 2026/);assert.match(event,/name="twitter:title" content="AEGYTHON 2026/);assert.match(read("dist/hackathons/events/index.html"),/aria-label="AEGYTHON 2026 navigation"/);assert.match(event,/Register for AEGYTHON 2026/);
 const future=read('dist/hackathons/2027/index.html');assert.match(future,/Hackathon 2027/);assert.match(future,/Coming Soon/);
 const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${p}/${e.name}`):[`${p}/${e.name}`]);
 for(const p of walk('src').filter(p=>/\.(astro|ts|js)$/.test(p)))assert.doesNotMatch(read(p),legacy,p);
});
test('BRAND001 keeps URLs/forms intact and rejects changes beyond pinned naming deltas',()=>{
 const manifest=JSON.parse(read('scripts/community/brand001-preservation.json'));
 for(const path of Object.keys(manifest.files).filter(p=>p.endsWith('.html'))){const html=read(path),old=beforeBrand001(path,html);assert.deepEqual([...html.matchAll(/(?:href|src|action)="([^"]*)"/g)].map(m=>m[1]),[...old.matchAll(/(?:href|src|action)="([^"]*)"/g)].map(m=>m[1]),path);assert.throws(()=>beforeBrand001(path,html+'UNREVIEWED'));}
});
