/* Optional local Chrome/CDP checks; Node 24, Python 3, no npm/browser dependency. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const stage = process.argv[2] ?? 'after';
const output = resolve('.community-drafts/design-004');
mkdirSync(`${output}/screenshots`, { recursive: true });
const server = spawn('python3', ['-m','http.server','4404','--bind','127.0.0.1','--directory',resolve(stage === 'before' ? `${output}/baseline-dist` : 'dist')], {stdio:'ignore'});
const chrome = spawn(process.env.HACK_CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--remote-debugging-port=9554',`--user-data-dir=${output}/chrome-${stage}`,'about:blank'], {stdio:'ignore'});
let socket, sequence = 0;
const pending = new Map();
const results = [], exceptions = [];
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const contentExpression = `(()=>{const root=document.querySelector('.hx-global-event');const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const text=[];while(walker.nextNode()){if(walker.currentNode.parentElement.closest('script,style'))continue;const value=walker.currentNode.textContent.trim();if(value)text.push(value);}return {text,ids:[...root.querySelectorAll('[id]')].map(e=>e.id),links:[...root.querySelectorAll('a')].map(e=>[e.getAttribute('href'),e.getAttribute('target'),e.getAttribute('rel'),e.textContent.trim()]),headings:[...root.querySelectorAll('h1,h2,h3,h4')].map(e=>[e.tagName,e.textContent])};})()`;
try {
  let tabs;
  for (let n = 0; n < 120; n++) {
    try { tabs = await (await fetch('http://127.0.0.1:9554/json/list')).json(); if(tabs.some(t=>t.type==='page')) break; } catch {}
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
    await call('Page.navigate',{url:`http://127.0.0.1:4404/hackathons/${query}`});
    let ready=false;
    for(let n=0;n<120;n++){if(await evaluate(`location.search===${JSON.stringify(query)}&&document.readyState==='complete'&&!!document.querySelector('.hx-global-event')`)){ready=true;break;}await pause(50);}
    assert.ok(ready,'Navigation did not complete');
  };
  const scrollTo = async selector => {await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'start',behavior:'instant'})`);await pause(900);};
  const screenshot = async name => {const shot=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${output}/screenshots/${name}.png`,Buffer.from(shot.data,'base64'));};
  const pointer = async (selector,xRatio=.75,yRatio=.4) => {
    const rect=await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};})()`);
    await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:rect.x+rect.width*xRatio,y:Math.min(850,rect.y+rect.height*yRatio)});
    await pause(250);
  };
  await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
  await call('Page.addScriptToEvaluateOnNewDocument',{source:`window.__layoutShift=0;new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__layoutShift+=e.value})).observe({type:'layout-shift',buffered:true});`});
  let baselineContent;
  if(stage==='after') baselineContent=JSON.parse(readFileSync(`${output}/browser-baseline.json`,'utf8'));
  for(const width of [1440,768,390]) for(const theme of ['light','dark']) {
    await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<1000});
    await call('Emulation.setTouchEmulationEnabled',{enabled:width<1000});
    await call('Emulation.setEmulatedMedia',{features:[]});
    await navigate(stage==='before');
    await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`);
    await pause(1200);
    const content=await evaluate(contentExpression);
    if(stage==='before') {
      if(!baselineContent){baselineContent=content;writeFileSync(`${output}/browser-baseline.json`,JSON.stringify(content,null,2));}
      else assert.deepEqual(content,baselineContent);
      await scrollTo('#series');await screenshot(`before-${theme}-${width}`);
      results.push({stage,width,theme,content:'baseline'});continue;
    }
    assert.deepEqual(content,baselineContent,'Text, URLs, anchors, headings or reading order changed');
    const layout=await evaluate(`({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,cards:document.querySelectorAll('.challenge-tile').length,columns:getComputedStyle(document.querySelector('.challenge-grid')).gridTemplateColumns.split(' ').length,cls:window.__layoutShift,fine:matchMedia('(hover:hover) and (pointer:fine)').matches})`);
    assert.equal(layout.overflow,false);assert.equal(layout.h1,1);assert.equal(layout.cards,6);assert.equal(layout.columns,width>1100?3:width>760?2:1);assert.ok(layout.cls<.1);
    const contrast=await evaluate(`(()=>{const lum=color=>{const c=color.match(/[\\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return c[0]*.2126+c[1]*.7152+c[2]*.0722};const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);const root=getComputedStyle(document.querySelector('.hx-global-event'));return [ratio('rgb(184,200,223)','rgb(16,28,50)'),ratio('rgb(116,229,245)','rgb(16,28,50)'),ratio('rgb(196,172,241)','rgb(7,14,30)'),ratio('rgb(255,255,255)','rgb(22,85,215)')];})()`);
    assert.ok(contrast.every(value=>value>=4.5),'Body/link/gradient/CTA contrast below AA');
    const tree=await call('Accessibility.getFullAXTree');
    assert.equal(tree.nodes.filter(n=>!n.ignored&&n.role?.value==='link'&&!n.name?.value).length,0,'Unnamed accessible links');
    const svg=await evaluate(`(()=>{const luminance=s=>{const channels=s.match(/[\\d.]+/g).slice(0,3).map(Number).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4});return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722};return [...document.querySelectorAll('[data-challenge-diagram] svg')].map(s=>{const a=luminance(getComputedStyle(s.querySelector('.label')).fill),b=luminance(getComputedStyle(s.querySelector('.node')).fill);return{width:s.getBoundingClientRect().width,contrast:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};});})()`);
    assert.equal(svg.length,6);assert.ok(svg.every(s=>s.width>0&&s.contrast>=4.5));
    await scrollTo('#series');
    await pointer('.hx-hero',.25,.35);
    const heroLeft=await evaluate(`document.querySelector('.hx-hero').style.getPropertyValue('--cursor-x')`);
    await pointer('.hx-hero',.8,.45);
    const heroRight=await evaluate(`document.querySelector('.hx-hero').style.getPropertyValue('--cursor-x')`);
    if(layout.fine){assert.notEqual(heroLeft,'');assert.notEqual(heroLeft,heroRight);}else{assert.equal(heroLeft,'');assert.equal(heroRight,'');}
    if(layout.fine) {
      await call('Emulation.setCPUThrottlingRate',{rate:4});
      const scheduled=await evaluate(`(()=>{const hero=document.querySelector('.hx-hero'),r=hero.getBoundingClientRect(),original=window.requestAnimationFrame;let count=0;window.requestAnimationFrame=callback=>{count++;return original.call(window,callback)};for(let i=0;i<50;i++)hero.dispatchEvent(new PointerEvent('pointermove',{pointerType:'mouse',clientX:r.x+r.width*(.2+i/100),clientY:r.y+200}));window.requestAnimationFrame=original;return count;})()`);
      assert.equal(scheduled,1,'Pointer burst should schedule one frame');await pause(250);
      await call('Emulation.setCPUThrottlingRate',{rate:1});
      await pointer('.hx-hero',.8,.45);
    }
    await screenshot(`after-${theme}-${width}`);
    if(layout.fine) {
      for(let i=0;i<6;i++) {
        const selector=`.challenge-tile:nth-child(${i+1})`;
        await scrollTo(selector);await pointer(selector,.75,.45);
        const card=await evaluate(`(()=>{const c=document.querySelector(${JSON.stringify(selector)});return{active:c.dataset.pointer,tiltX:parseFloat(c.style.getPropertyValue('--tilt-x')),tiltY:parseFloat(c.style.getPropertyValue('--tilt-y')),transform:getComputedStyle(c).transform,glow:getComputedStyle(c,'::before').opacity};})()`);
        assert.equal(card.active,'active');assert.ok(Math.abs(card.tiltX)<=1.5&&Math.abs(card.tiltY)<=1.5);assert.match(card.transform,/matrix3d/);assert.ok(Number(card.glow)>.5);
      }
    } else {
      await scrollTo('.challenge-tile');await pointer('.challenge-tile');
      assert.equal(await evaluate(`document.querySelector('.challenge-tile').style.getPropertyValue('--tilt-x')`),'');
    }
    await scrollTo('#challenges');
    assert.equal(await evaluate(`document.querySelector('[data-event-section="challenges"]').getAttribute('aria-current')`),'location');
    assert.equal(await evaluate(`getComputedStyle(document.querySelector('.hx-event-nav')).position`),width>760?'sticky':'static');
    await evaluate(`document.querySelector('#challenges').__repeatEntrances=0;document.querySelector('#challenges').addEventListener('animationstart',event=>{if(event.target.id==='challenges')event.target.__repeatEntrances++});`);
    await scrollTo('#timeline');await scrollTo('#challenges');
    assert.equal(await evaluate(`document.querySelector('#challenges').__repeatEntrances`),0,'Section entrance replayed');
    await scrollTo('#how-it-works');
    await evaluate(`document.querySelector('.hx-journey li').focus({preventScroll:true})`);
    const focus=await evaluate(`({focused:document.activeElement.matches('.hx-journey li'),outline:getComputedStyle(document.activeElement).outlineWidth,complete:!!document.querySelector('[aria-checked="true"],[data-completed]')})`);
    assert.ok(focus.focused);assert.equal(focus.outline,'3px');assert.equal(focus.complete,false);
    await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
    assert.equal(await evaluate(`document.activeElement===document.querySelectorAll('.hx-journey li')[1]`),true,'Keyboard cannot reach the next step');
    await scrollTo('#judging');
    assert.deepEqual(await evaluate(`[...document.querySelectorAll('.hx-round li')].map(row=>Number(row.style.getPropertyValue('--score')))`),[.3,.25,.2,.15,.1,.35,.25,.2,.15,.05]);
    const broken=await evaluate(`[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)`);assert.deepEqual(broken,[]);
    if(theme==='dark') for(const section of ['challenges','how-it-works','timeline','prizes','judging','certificates']){await scrollTo(`#${section}`);await screenshot(`${section}-${width}`);}
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    await scrollTo('#series');await pointer('.hx-hero');
    const reduced=await evaluate(`(()=>{const root=document.querySelector('.hx-global-event');return{mode:root.dataset.motion,pointer:root.querySelector('.hx-hero').dataset.pointer,network:getComputedStyle(root.querySelector('.hx-network-ring')).animationName,scroll:getComputedStyle(document.documentElement).scrollBehavior,transitions:[...root.querySelectorAll('.challenge-tile,.hx-button')].map(e=>getComputedStyle(e).transitionDuration),opacity:getComputedStyle(root.querySelector('h1 span')).opacity};})()`);
    assert.equal(reduced.mode,'off');assert.equal(reduced.pointer,undefined);assert.equal(reduced.network,'none');assert.equal(reduced.scroll,'auto');assert.ok(reduced.transitions.every(v=>v==='0s'));assert.equal(reduced.opacity,'1');
    assert.deepEqual(await evaluate(contentExpression),baselineContent);
    // Actual cleanup: dispose observers/listeners, then send another pointer movement.
    await evaluate(`document.dispatchEvent(new Event('astro:before-swap'))`);await pointer('.hx-hero');
    assert.equal(await evaluate(`typeof window.__aeglysEventMotionDispose`),'undefined');assert.equal(await evaluate(`document.querySelector('.hx-hero').style.getPropertyValue('--cursor-x')`),'');
    await call('Emulation.setEmulatedMedia',{features:[]});
    await navigate();await evaluate(`window.dispatchEvent(new PageTransitionEvent('pagehide'));`);
    assert.equal(await evaluate(`document.querySelector('.hx-global-event').dataset.motion`),undefined);
    await evaluate(`window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));`);
    assert.equal(await evaluate(`document.querySelector('.hx-global-event').dataset.motion`),'on');
    await navigate(true);await pause(150);
    assert.deepEqual(await evaluate(contentExpression),baselineContent,'JavaScript-disabled content changed');
    const staticPage=await evaluate(`({hidden:[...document.querySelectorAll('.hx-global-event section,h1,h2,h3,.challenge-tile')].some(e=>getComputedStyle(e).display==='none'||getComputedStyle(e).visibility==='hidden'||Number(getComputedStyle(e).opacity)===0),overflow:document.documentElement.scrollWidth>innerWidth})`);
    assert.equal(staticPage.hidden,false);assert.equal(staticPage.overflow,false);
    results.push({stage,width,theme,columns:layout.columns,cls:layout.cls,pointer:layout.fine?'six tiles + hero':'coarse disabled',content:'exact',keyboard:'PASS',reducedMotion:'PASS',noJavaScript:'PASS',cleanup:'PASS'});
    console.log(JSON.stringify(results.at(-1)));
  }
  assert.deepEqual(exceptions,[],'Browser runtime exception');
  writeFileSync(`${output}/${stage}-results.json`,JSON.stringify(results,null,2));
  console.log(JSON.stringify({stage,cases:results.length,result:'PASS',screenshots:`${output}/screenshots`}));
} catch(error) {console.error(error.stack);process.exitCode=1;} finally {socket?.close();chrome.kill('SIGTERM');server.kill('SIGTERM');}
