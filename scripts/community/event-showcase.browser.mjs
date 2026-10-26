/* Optional Node 24 + local Chrome check. Synthetic profiles live only in an ignored isolated build. */
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, writeFileSync, symlinkSync } from 'node:fs';
import { resolve } from 'node:path';
const root = process.cwd();
const output = resolve(`.community-drafts/event-001/run-${Date.now()}`);
const fixture = `${output}/fixture`;
mkdirSync(fixture, { recursive: true });
cpSync('src', `${fixture}/src`, { recursive: true });
cpSync('package.json', `${fixture}/package.json`);
symlinkSync(resolve('node_modules'), `${fixture}/node_modules`, 'dir');
symlinkSync(resolve('scripts'), `${fixture}/scripts`, 'dir');
symlinkSync(resolve('public'), `${fixture}/public`, 'dir');
writeFileSync(`${fixture}/astro.config.mjs`, "import {defineConfig} from 'astro/config';export default defineConfig({site:'https://aeglysai.com',output:'static'});\n");
const yes = { content: true, organizer: true, publicDisplayConsent: true, branding: true };
const common = { eventId: 'test-event', status: 'Published', approvedCopy: 'Synthetic approved fixture. <img src=x onerror=alert(1)>', approvals: yes, visibility: { public: true, suppressed: false } };
const data = { events: [{ id:'test-event', title:'Synthetic test event', timezone:'Asia/Kolkata' }], people:[{ id:'synthetic-person', name:'Synthetic Person', confirmed:true, approvals:yes }], records:[] };
for(let n=1;n<=4;n++) data.records.push({ ...common, id:`synthetic-partner-${n}`, name:`Synthetic Partner ${n}`, category:'Partner', template:'partner-announcement', image:{path:n===1?'/images/aeglysai-social.png':'/images/missing-test-only.png',alt:'Synthetic fixture using existing Portal preview'} });
for(const category of ['Keynote Speaker','Judge','Mentor','Participant']) data.records.push({ ...common, id:category.replaceAll(' ','-'), category, personId:'synthetic-person', qualificationVerified:true, selectionVerified:true });
data.records.push({ ...common,id:'synthetic-team',name:'Synthetic Team',category:'Team',members:['synthetic-person'],qualificationVerified:true,selectionVerified:true });
data.records.push({ ...common,id:'synthetic-news',name:'Synthetic Announcement',category:'Event Announcement' });
data.records.push({ ...common,id:'hidden-fixture',name:'NEVER-RENDER-THIS-DRAFT',category:'Partner',status:'Draft' });
writeFileSync(`${fixture}/src/pages/showcase-test.astro`, `---\nimport Layout from '../layouts/Layout.astro';\nimport EventShowcase from '../components/showcase/EventShowcase.astro';\nconst data=${JSON.stringify(data)};\n---\n<Layout title="Synthetic showcase test" description="Local isolated fixture only"><div class="container"><h1>Synthetic fixture</h1><EventShowcase id="cards" title="Fixture cards" eventId="test-event" data={data}/><EventShowcase id="carousel" title="Fixture carousel" eventId="test-event" data={data} layout="carousel"/></div></Layout>`);
const build=spawnSync(process.execPath,[resolve('node_modules/astro/bin/astro.mjs'),'build','--root',fixture],{cwd:root,encoding:'utf8',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});
writeFileSync(`${output}/fixture-build.txt`,build.stdout+build.stderr);
assert.equal(build.status,0,`Fixture build failed: ${build.stderr}`);
mkdirSync(`${fixture}/dist/production-community`,{recursive:true});
cpSync('dist/hackathons/community/index.html',`${fixture}/dist/production-community/index.html`);
const port=15000+process.pid%9000, debugPort=port+10000;
const server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',`${fixture}/dist`],{stdio:'ignore'});
const chrome=spawn(process.env.HACK_CHROME_BIN??'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking',`--remote-debugging-port=${debugPort}`,`--user-data-dir=${output}/chrome`,'about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let socket,sequence=0;
const pending=new Map(),results=[],exceptions=[];
try {
 let tabs;
 for(let n=0;n<120;n++){try{tabs=await(await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();if(tabs.some(x=>x.type==='page'))break;}catch{}await pause(50);}
 assert.ok(tabs?.some(x=>x.type==='page'),'Chrome unavailable');
 socket=new WebSocket(tabs.find(x=>x.type==='page').webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
 socket.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params.exceptionDetails.text);};
 const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description??r.exceptionDetails.text);return r.result.value;};
 const waitFor=async expression=>{for(let n=0;n<60;n++){if(await evaluate(expression))return;await pause(50);}throw Error(`Condition did not settle: ${expression}`);};
 const navigate=async path=>{const url=`http://127.0.0.1:${port}/${path}?t=${Date.now()}`;await call('Page.navigate',{url});for(let n=0;n<120;n++){if(await evaluate(`location.href===${JSON.stringify(url)}&&document.readyState==='complete'&&!!document.querySelector('[data-showcase]')`))return;await pause(50);}throw Error('Page not ready');};
 await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
 const fixturePath='showcase-test/';
 for(const width of [1440,768,390,320])for(const theme of ['light','dark']){
  await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
  await call('Emulation.setTouchEmulationEnabled',{enabled:width<600});
  await navigate('production-community/');
  await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`);
  assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false);
  assert.equal(await evaluate(`document.querySelectorAll('.showcase-card').length`),0);
  await navigate(fixturePath);
  await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`);
  assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('#cards-items')).gridTemplateColumns.split(' ').length`),width>900?3:width>600?2:1);
  assert.equal(await evaluate(`document.querySelectorAll('#cards-items article').length`),10);
  assert.equal(await evaluate(`document.body.textContent.includes('NEVER-RENDER-THIS-DRAFT')`),false);
  assert.equal(await evaluate(`document.querySelectorAll('.showcase-card img[src="x"]').length`),0,'Approved copy must be escaped');
  await evaluate(`Promise.all([...document.images].filter(img=>{const r=img.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;}).map(img=>img.decode()))`);
  assert.equal(await evaluate(`[...document.querySelectorAll('.showcase-card img')].every(img=>img.loading==='lazy'&&img.width>0&&img.height>0)`),true);
  for(const category of ['Partner','Keynote Speaker','Judge','Mentor','Participant','Team','Event Announcement','all']){
   await evaluate(`(()=>{const s=document.querySelector('[data-showcase] select');s.value=${JSON.stringify(category)};s.dispatchEvent(new Event('change'));})()`);
   assert.equal(await evaluate(`document.querySelectorAll('#cards-items article:not([hidden])').length`),category==='all'?10:category==='Partner'?4:1);
  }
  await evaluate(`document.querySelector('#carousel-items').scrollIntoView({block:'center'});document.querySelector('#carousel-items').focus()`);
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'End',code:'End',windowsVirtualKeyCode:35});await waitFor(`document.querySelector('[data-next]').disabled`);
  assert.ok(await evaluate(`document.querySelector('#carousel-items').scrollLeft>0`));
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Home',code:'Home',windowsVirtualKeyCode:36});await waitFor(`document.querySelector('[data-previous]').disabled`);
  assert.ok(await evaluate(`document.querySelector('#carousel-items').scrollLeft<2`),JSON.stringify(await evaluate(`({width:innerWidth,scroll:document.querySelector('#carousel-items').scrollLeft,focus:document.activeElement.id,first:document.querySelector('#carousel-items article').offsetLeft,padding:getComputedStyle(document.querySelector('#carousel-items')).scrollPaddingInline})`)));
  await evaluate(`document.querySelector('[data-next]').click()`);await pause(650);
  assert.ok(await evaluate(`document.querySelector('#carousel-items').scrollLeft>0`));
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await evaluate(`document.querySelector('#carousel-items').focus()`);
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Home',code:'Home',windowsVirtualKeyCode:36});
  assert.ok(await evaluate(`document.querySelector('#carousel-items').scrollLeft<2`),JSON.stringify(await evaluate(`({width:innerWidth,scroll:document.querySelector('#carousel-items').scrollLeft,focus:document.activeElement.id,first:document.querySelector('#carousel-items article').offsetLeft,padding:getComputedStyle(document.querySelector('#carousel-items')).scrollPaddingInline})`)));
  if(width<600){
   const r=await evaluate(`(()=>{const r=document.querySelector('#carousel-items').getBoundingClientRect();return{x:r.x+r.width*.8,y:Math.max(40,Math.min(innerHeight-40,r.y+100))};})()`);
   await call('Input.synthesizeScrollGesture',{...r,xDistance:-220,yDistance:0,gestureSourceType:'touch'});
   await waitFor(`document.querySelector('#carousel-items').scrollLeft>0`);
  }
  await call('Emulation.setEmulatedMedia',{features:[]});
  await evaluate(`document.querySelector('#carousel-items').blur();document.querySelector('#cards-title').scrollIntoView({block:'start',behavior:'instant'})`);
  const shot=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${output}/${width}-${theme}.png`,Buffer.from(shot.data,'base64'));
  const ax=await call('Accessibility.getFullAXTree');
  const controls=ax.nodes.filter(x=>!x.ignored&&['button','combobox','link'].includes(x.role?.value));assert.ok(controls.every(x=>x.name?.value),'Unnamed accessibility-tree control');
  results.push({width,theme,cards:10,columns:width>900?3:width>600?2:1,filter:true,keyboard:true,reducedMotion:true,overflow:false});
 }
 await call('Emulation.setScriptExecutionDisabled',{value:true});await navigate(fixturePath);
 assert.equal(await evaluate(`document.querySelectorAll('.showcase-card').length`),20);
 assert.equal(await evaluate(`document.querySelector('[data-filter-label]').hidden`),true);
 assert.equal(await evaluate(`document.querySelector('[data-navigation]').hidden`),true);
 assert.deepEqual(exceptions,[]);
 writeFileSync(`${output}/results.json`,JSON.stringify({results,noJavaScript:true,exceptions},null,2)+'\n');
 console.log(`Passed ${results.length} viewport/theme cases plus no-JavaScript fallback. Evidence: ${output}`);
} finally {socket?.close();chrome.kill();server.kill();}
