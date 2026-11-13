import{reportingPeriodForHistory}from'./reporting-period-preservation.mjs';
import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{beforeNavigationFix}from'./design002c-preservation.mjs';
const read=p=>readFileSync(p,'utf8'),sha=v=>createHash('sha256').update(v).digest('hex');const pin=JSON.parse(read('scripts/community/design002c-preservation.json'));
const outsideForPin=(path,html,current)=>{const value=path==='dist/community/reports/index.html'?reportingPeriodForHistory(path,html,pin.reportingMonth,current):html;return value.replace(/<header class="site-header">[\s\S]*?<\/header>/,'HEADER');};
test('DESIGN002C changes only exact reviewed shared header bytes across all28routes',()=>{
 assert.equal(Object.keys(pin.routes).length,28);
 for(const[path,record]of Object.entries(pin.routes)){const html=read(path),header=html.match(/<header class="site-header">[\s\S]*?<\/header>/)[0];assert.equal(sha(header),record.afterHeaderSHA256,path);assert.equal(sha(outsideForPin(path,html)),record.outsideHeaderSHA256,path);assert.equal(sha(beforeNavigationFix(path,html).match(/<header class="site-header">[\s\S]*?<\/header>/)[0]),record.beforeHeaderSHA256);assert.throws(()=>beforeNavigationFix(path,html.replace('data-menu-toggle','data-unreviewed-toggle')));}
 for(const[path,r]of Object.entries(pin.sources)){assert.equal(sha(read(path)),r.afterSHA256);assert.equal(sha(beforeNavigationFix(path,read(path))),r.beforeSHA256);assert.throws(()=>beforeNavigationFix(path,read(path)+'UNREVIEWED'));}
});
test('DESIGN002C retains the configured menu destinations and one authoritative theme-control instance',()=>{
 const html=read('dist/index.html'),header=html.match(/<header class="site-header">[\s\S]*?<\/header>/)[0],nav=header.match(/<nav aria-label="Main navigation">[\s\S]*?<\/nav>/)[0];
 assert.deepEqual([...nav.matchAll(/<a[^>]+href="([^"]+)"/g)].map(m=>m[1]),['/','/research/','/experiments/','/publications/','/architecture/','/speaking/','/about/','/hackathons/','/hackathons/2027/','/community/']);assert.match(header,/href="https:\/\/github.com\/shubh-techie\/AeglysAI"/);
 assert.equal((header.match(/data-theme-toggle(?=[\s>])/g)||[]).length,1);assert.equal((header.match(/data-theme-system(?=[\s>])/g)||[]).length,1);assert.equal((html.match(/<script data-theme-init>/g)||[]).length,1);assert.equal((header.match(/data-navigation-disclosure(?=[\s>])/g)||[]).length,2);
 for(const id of['research-destinations','hackathons-destinations','site-navigation','mobile-navigation'])assert.equal((header.match(new RegExp(`id="${id}"`,'g'))||[]).length,1);
});

test('DESIGN002C keeps the real UTC month validation and future reporting rollovers',()=>{
 const path='dist/community/reports/index.html',html=read(path),current=new Date().toISOString().slice(0,7);
 for(const next of['2026-12','2027-01','2028-02']){const value=html.replace(`${current} remains an open reporting period`,`${next} remains an open reporting period`);assert.equal(sha(outsideForPin(path,value,next)),pin.routes[path].outsideHeaderSHA256);assert.throws(()=>outsideForPin(path,value,'2099-12'));}
});
