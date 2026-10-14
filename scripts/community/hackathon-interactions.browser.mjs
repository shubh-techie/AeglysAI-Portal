/* Optional local Chrome/CDP checks; Node 24, Python 3, no npm/browser dependency. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const stage = process.argv[2] ?? 'after';
const serverPort=14000+process.pid%10000;
const browserPort=serverPort+10000;
const output = resolve('.community-drafts/design-005');
mkdirSync(`${output}/screenshots`, { recursive: true });
const server = spawn('python3', ['-m','http.server',String(serverPort),'--bind','127.0.0.1','--directory',resolve(stage === 'before' ? `${output}/before-dist` : 'dist')], {stdio:'ignore'});
const chrome = spawn(process.env.HACK_CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking',`--remote-debugging-port=${browserPort}`,`--user-data-dir=${output}/chrome-${stage}-${process.pid}`,'about:blank'], {stdio:'ignore'});
let socket, sequence = 0;
const pending = new Map();
const results = [], exceptions = [];
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const contentExpression = `(()=>{const root=document.querySelector('.hx-global-event');const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const text=[];while(walker.nextNode()){if(walker.currentNode.parentElement.closest('script,style'))continue;const value=walker.currentNode.textContent.trim();if(value)text.push(value);}return {text,ids:[...root.querySelectorAll('[id]')].map(e=>e.id),links:[...root.querySelectorAll('a')].map(e=>[e.getAttribute('href'),e.getAttribute('target'),e.getAttribute('rel'),e.textContent.trim()]),headings:[...root.querySelectorAll('h1,h2,h3,h4')].map(e=>[e.tagName,e.textContent])};})()`;
try {
  let tabs;
  for (let n = 0; n < 120; n++) {
    try { tabs = await (await fetch(`http://127.0.0.1:${browserPort}/json/list`)).json(); if(tabs.some(t=>t.type==='page')) break; } catch {}
    await pause(50);
  }
  assert.ok(tabs?.some(t=>t.type==='page'),'Chrome debugging endpoint unavailable');
  socket = new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
  socket.onmessage = event => {
    const message=JSON.parse(event.data);
    if(message.id){const request=pending.get(message.id);pending.delete(message.id);message.error?request.reject(Error(JSON.stringify(message.error))):request.resolve(message.result);}
    if(message.method==='Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text);
  };
  const call = (method,params={}) => new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
  const evaluate = async expression => {
    const result=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description??result.exceptionDetails.text);
    return result.result.value;
  };
  const navigate = async (disabled=false) => {
    await call('Emulation.setScriptExecutionDisabled',{value:disabled});
    const query=`?inspection=${Date.now()}-${sequence}`;
    await call('Page.navigate',{url:`http://127.0.0.1:${serverPort}/hackathons/${query}`});
    let ready=false;
    for(let n=0;n<120;n++){if(await evaluate(`location.search===${JSON.stringify(query)}&&document.readyState==='complete'&&!!document.querySelector('.hx-global-event')`)){ready=true;break;}await pause(50);}
    assert.ok(ready,'Navigation did not complete');
  };
  const scrollTo = async selector => {await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'start',behavior:'instant'})`);await pause(900);};
  const screenshot = async name => {const shot=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${output}/screenshots/${name}.png`,Buffer.from(shot.data,'base64'));};
  const pointer = async (selector,xRatio=.75,yRatio=.4) => {
    const rect=await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};})()`);
    await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:rect.x+rect.width*xRatio,y:Math.min(800,rect.y+rect.height*yRatio)});
    await pause(250);
  };
  await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
  await call('Page.addScriptToEvaluateOnNewDocument',{source:`window.__layoutShift=0;new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__layoutShift+=e.value})).observe({type:'layout-shift',buffered:true});`});
  const click=async selector=>{await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',behavior:'instant'})`);await pause(250);const r=await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};})()`);await call('Input.dispatchMouseEvent',{type:'mouseMoved',...r});await call('Input.dispatchMouseEvent',{type:'mousePressed',...r,button:'left',clickCount:1});await call('Input.dispatchMouseEvent',{type:'mouseReleased',...r,button:'left',clickCount:1});await pause(150);};
  for(const [width,height] of (process.argv[3]==='lifecycle'?[[1440,900]]:[[1440,900],[768,1024],[390,844]])) {
   await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<1000});
   await call('Emulation.setTouchEmulationEnabled',{enabled:width<1000});
   await call('Emulation.setEmulatedMedia',{features:[]});
   if(stage==='before'){await navigate(true);await pause(600);await screenshot(`before-hero-${width}`);results.push({stage,width,height});continue;}
   await navigate();await evaluate(`sessionStorage.removeItem('aeglys-hack-motion')`);await navigate();await pause(700);
   await screenshot(`after-hero-${width}`);
   assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false,'Horizontal overflow');
   assert.equal(await evaluate(`document.querySelectorAll('.hx-flow-controls').length`),6);
   const initialContent=await evaluate(contentExpression);
   const cls=await evaluate('window.__layoutShift');assert.ok(cls<.1);
   await evaluate(`document.querySelector('#judging').scrollIntoView({behavior:'instant'})`);await pause(120);
   const barBefore=await evaluate(`getComputedStyle(document.querySelector('.hx-round li'),'::after').transform`);await pause(350);
   const barAfter=await evaluate(`getComputedStyle(document.querySelector('.hx-round li'),'::after').transform`);assert.notEqual(barBefore,barAfter,'Judging bar must visibly progress');
   await click('[data-node="0"]');
   assert.equal(await evaluate(`document.querySelectorAll('.is-selected').length`),1);
   assert.equal(await evaluate(`document.querySelectorAll('.is-connected').length`),3);
   await screenshot(`hero-selected-${width}`);
   await click('[data-example="identity"]');
   assert.equal(await evaluate(`document.querySelectorAll('.is-pulsing').length`),2);
   const first=await evaluate(`getComputedStyle(document.querySelector('.is-pulsing')).strokeDashoffset`);
   await pause(300);assert.notEqual(await evaluate(`getComputedStyle(document.querySelector('.is-pulsing')).strokeDashoffset`),first);
   await screenshot(`hero-signal-${width}`);
   await click('[data-network-reset]');assert.equal(await evaluate(`document.querySelectorAll('.is-selected').length`),0);
   await evaluate(`document.querySelector('[data-node="1"]').focus()`);
   await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
   assert.equal(await evaluate(`document.querySelector('[data-node="1"]').getAttribute('aria-pressed')`),'true');
   await call('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
   assert.match(await evaluate(`document.querySelector('.hx-network-plane').getAttribute('transform')`),/translate\(8 0\)/);
   if(width===1440){
    await call('Emulation.setCPUThrottlingRate',{rate:4});
    const scheduled=await evaluate(`(()=>{const hero=document.querySelector('.hx-hero'),r=hero.getBoundingClientRect(),original=requestAnimationFrame;let n=0;window.requestAnimationFrame=fn=>{n++;return original(fn)};for(let i=0;i<50;i++)hero.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:r.x+200+i,clientY:r.y+200}));window.requestAnimationFrame=original;return n;})()`);assert.ok(scheduled<=2);await call('Emulation.setCPUThrottlingRate',{rate:1});
    await pointer('[data-example="identity"]');assert.equal(await evaluate(`document.querySelector('.hx-context-cursor').textContent`),'SELECT');assert.equal(await evaluate(`getComputedStyle(document.querySelector('.hx-context-cursor')).display`),'block');
    await scrollTo('.hx-network-stage');const r=await evaluate(`(()=>{const r=document.querySelector('.hx-network-stage').getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};})()`);await call('Input.dispatchMouseEvent',{type:'mousePressed',...r,button:'left',clickCount:1});await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:r.x+100,y:r.y+60,buttons:1});await call('Input.dispatchMouseEvent',{type:'mouseReleased',x:r.x+100,y:r.y+60,button:'left',clickCount:1});assert.notEqual(await evaluate(`document.querySelector('.hx-network-plane').getAttribute('transform')`),'translate(8 0)');}
   for(let i=1;i<=6;i++){
    const selector=`.challenge-tile:nth-child(${i})`;
    await scrollTo(selector);await pointer(selector,.7,.4);
    if(width===1440)assert.equal(await evaluate(`document.querySelector(${JSON.stringify(selector)}).dataset.pointer`),'active');
    await click(`${selector} .hx-flow-controls button:nth-child(2)`);
    assert.ok(await evaluate(`document.querySelector(${JSON.stringify(selector)}).querySelectorAll('.hx-flow-selected').length>0`),`Card ${i} at ${width}`);
    assert.equal(await evaluate(`document.querySelector(${JSON.stringify(selector)}).querySelector('.hx-flow-controls button:nth-child(2)').getAttribute('aria-pressed')`),'true');
   }
   await screenshot(`challenge-flow-${width}`);
   await click('#how-it-works .hx-process-controls button:nth-child(4)');
   assert.equal(await evaluate(`document.querySelector('#how-it-works .hx-selection-panel strong').textContent`),'UNDERSTAND & DOCUMENT');
   await screenshot(`qualification-${width}`);
   await click('#timeline .hx-process-controls button:nth-child(8)');
   assert.equal(await evaluate(`document.querySelector('#timeline .hx-selection-panel strong').textContent`),'FINALIST LIVE DEMO');
   assert.equal(await evaluate(`document.querySelectorAll('.hx-competition-timeline .hx-status').length`),9);
   await scrollTo('#judging');
   if(width===1440){assert.equal(await evaluate(`document.querySelector('.hx-progress-rail a[aria-current]').dataset.railSection`),'judging');assert.ok(Number(await evaluate(`document.querySelector('.hx-progress-rail').style.getPropertyValue('--page-progress')`))>0);}
   const scores=await evaluate(`([...document.querySelectorAll('.hx-round li')].map(e=>parseFloat(e.style.getPropertyValue('--score'))))`);
   assert.deepEqual(scores,[.3,.25,.2,.15,.1,.35,.25,.2,.15,.05]);
   await click('.hx-round-controls button:nth-child(2)');assert.equal(await evaluate(`document.querySelectorAll('.hx-round-selected').length`),1);
   await evaluate(`document.querySelectorAll('.hx-round li')[5].focus()`);
   assert.equal(await evaluate(`getComputedStyle(document.querySelectorAll('.hx-criterion-help')[5]).display`),'block');
   await screenshot(`judging-${width}`);
   await scrollTo('#series');await click('.hx-motion-toggle');
   assert.equal(await evaluate(`document.querySelector('.hx-global-event').dataset.paused`),'true');
   assert.equal(await evaluate(`getComputedStyle(document.querySelector('.hx-intelligence-edge')).animationName`),'none');
   const still=await evaluate(`getComputedStyle(document.querySelector('.hx-hero .hx-emphasis')).backgroundPosition`);await pause(250);assert.equal(await evaluate(`getComputedStyle(document.querySelector('.hx-hero .hx-emphasis')).backgroundPosition`),still);
   await click('[data-node="3"]');assert.equal(await evaluate(`document.querySelector('[data-node="3"]').getAttribute('aria-pressed')`),'true');
   await navigate();assert.equal(await evaluate(`document.querySelector('.hx-global-event').dataset.paused`),'true');
   await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await navigate();
   assert.equal(await evaluate(`document.querySelector('.hx-global-event').dataset.paused`),'true');
   assert.equal(await evaluate(`getComputedStyle(document.querySelector('h1 span')).opacity`),'1');
   await screenshot(`reduced-motion-${width}`);
   await evaluate(`window.dispatchEvent(new PageTransitionEvent('pagehide'))`);assert.equal(await evaluate(`typeof window.__aeglysInteractionsDispose`),'undefined');
   await evaluate(`window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}))`);
   assert.equal(await evaluate(`document.querySelectorAll('.hx-flow-controls').length`),6);
   assert.equal(await evaluate(`([...document.querySelectorAll('.hx-domain')].every(e=>e.getAttribute('aria-pressed')===String(e.classList.contains('is-selected'))))`),true);
   const tree=await call('Accessibility.getFullAXTree');assert.equal(tree.nodes.filter(n=>!n.ignored&&['link','button'].includes(n.role?.value)&&!n.name?.value).length,0);
   const links=initialContent.links.filter(([url])=>url.includes('docs.google.com/forms'));
   assert.ok(links.length>=7);assert.ok(links.every(([url,target,rel])=>url.includes('/viewform')&&target==='_blank'&&rel.includes('noopener')));
   await evaluate(`document.dispatchEvent(new Event('astro:before-swap'))`);assert.equal(await evaluate(`typeof window.__aeglysInteractionsDispose`),'undefined');
   await navigate(true);
   assert.equal(await evaluate(`document.querySelectorAll('h1').length`),1);
   assert.equal(await evaluate(`document.querySelectorAll('.hx-journey > li').length`),7);
   assert.equal(await evaluate(`document.querySelectorAll('.challenge-tile').length`),6);
   assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false);
   assert.equal(await evaluate(`([...document.querySelectorAll('h1,h2,h3,.hx-journey p,.hx-round li')].some(e=>getComputedStyle(e).display==='none'||getComputedStyle(e).visibility==='hidden'||Number(getComputedStyle(e).opacity)===0))`),false);
   results.push({width,height,cls,barAnimation:'PASS',hero:'PASS',signal:'PASS',cards:6,qualification:'PASS',timeline:'PASS',judging:'PASS',pause:'PASS',reduced:'PASS',noJS:'PASS',overflow:false,forms:links.length});console.log(JSON.stringify(results.at(-1)));
  }
  assert.deepEqual(exceptions,[]);writeFileSync(`${output}/${stage}${process.argv[3]==='lifecycle'?'-lifecycle':''}-interaction-results.json`,JSON.stringify(results,null,2));

} catch(error) {console.error(error.stack);process.exitCode=1;} finally {socket?.close();chrome.kill('SIGTERM');server.kill('SIGTERM');}
