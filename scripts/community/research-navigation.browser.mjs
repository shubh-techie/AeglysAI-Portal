/* Optional local Chrome/CDP checks; Node 24, Python 3, no npm/browser dependency. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const stage = 'navigation';
const serverPort=14000+process.pid%10000;
const browserPort=serverPort+10000;
const output = resolve('.community-drafts/ux-001');
mkdirSync(`${output}/screenshots`, { recursive: true });
const server = spawn('python3', ['-m','http.server',String(serverPort),'--bind','127.0.0.1','--directory',resolve('dist')], {stdio:'ignore'});
const chrome = spawn(process.env.HACK_CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking',`--remote-debugging-port=${browserPort}`,`--user-data-dir=${output}/chrome-${stage}-${process.pid}`,'about:blank'], {stdio:'ignore'});
let socket, sequence = 0;
const pending = new Map();
const results = [], exceptions = [];
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

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
  const navigate = async (path='/', disabled=false) => {
    await call('Emulation.setScriptExecutionDisabled',{value:disabled});
    const query=`?inspection=${Date.now()}-${sequence}`;
    await call('Page.navigate',{url:`http://127.0.0.1:${serverPort}${path}${query}`});
    let ready=false;
    for(let n=0;n<120;n++) {
      if(await evaluate(`location.search===${JSON.stringify(query)}&&document.readyState==='complete'&&!!document.querySelector('[data-research-navigation]')`)){ready=true;break;}
      await pause(50);
    }
    assert.ok(ready,'Navigation did not complete');
  };
  const key = async (key, code, windowsVirtualKeyCode) => {
    await call('Input.dispatchKeyEvent',{type:'keyDown',key,code,windowsVirtualKeyCode,...(key==='Enter'?{text:'\r'}:key===' '?{text:' '}: {})});
    await call('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode});
    await pause(80);
  };
  const click = async (selector,touch=false) => {
    const r=await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};})()`);
    if(touch) {
      await call('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[r]});
      await call('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    } else {
      await call('Input.dispatchMouseEvent',{type:'mousePressed',...r,button:'left',clickCount:1});
      await call('Input.dispatchMouseEvent',{type:'mouseReleased',...r,button:'left',clickCount:1});
    }
    await pause(150);
  };
  const screenshot = async name => {const shot=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${output}/screenshots/${name}.png`,Buffer.from(shot.data,'base64'));};
  const opened = () => evaluate(`document.querySelector('[data-research-navigation]').open`);
  const summary = '[data-research-navigation] summary';
  await call('Page.enable');await call('Runtime.enable');
  for(const [width,height] of [[1440,900],[768,1024],[390,844],[320,844]]) {
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
    await call('Emulation.setTouchEmulationEnabled',{enabled:width<=760});
    for(const theme of ['light','dark']) {
      await navigate();
      await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`);
      assert.equal(await opened(),false);
      await screenshot(`closed-${width}-${theme}`);
      await evaluate(`document.querySelector(${JSON.stringify(summary)}).focus()`);
      assert.equal(await evaluate(`document.activeElement===document.querySelector(${JSON.stringify(summary)})`),true,'summary focused');
      await key('Enter','Enter',13);
      assert.equal(await opened(),true);
      assert.equal(await evaluate(`getComputedStyle(document.querySelector(${JSON.stringify(summary)})).outlineStyle`),'solid');
      await key('Tab','Tab',9);
      assert.equal(await evaluate(`document.activeElement.getAttribute('href')`),'/research/');
      await key('Tab','Tab',9);
      assert.equal(await evaluate(`document.activeElement.getAttribute('href')`),'/experiments/');
      await key('Tab','Tab',9);
      assert.equal(await evaluate(`document.activeElement.getAttribute('href')`),'/publications/');
      const tree=await call('Accessibility.getFullAXTree');
      const control=tree.nodes.find(n=>!n.ignored&&n.role?.value==='DisclosureTriangle'&&n.name?.value==='Research');
      assert.ok(control,'Native named Research disclosure in accessibility tree');
      assert.equal(control.properties.find(p=>p.name==='expanded').value.value,true);
      for(const name of ['Research','Experiments','Publications']) assert.ok(tree.nodes.some(n=>!n.ignored&&n.role?.value==='link'&&n.name?.value===name));
      await screenshot(`open-${width}-${theme}`);
      assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false);
      assert.equal(await evaluate(`getComputedStyle(document.querySelector('.research-destinations')).position`),width<=760?'static':'absolute');
      await key('Escape','Escape',27);
      assert.equal(await opened(),false);
      assert.equal(await evaluate(`document.activeElement===document.querySelector(${JSON.stringify(summary)})`),true);
      await key(' ','Space',32);assert.equal(await opened(),true);
      for(let n=0;n<4;n++) await key('Tab','Tab',9);
      assert.equal(await evaluate(`document.activeElement.getAttribute('href')`),'/architecture/');
      assert.equal(await opened(),false);
      await click(summary,width<=760);assert.equal(await opened(),true);
      await click('.wordmark',width<=760);assert.equal(await opened(),false);
      await click(summary,width<=760);assert.equal(await opened(),true);
      await evaluate(`document.querySelector('.header-github').focus()`);assert.equal(await opened(),false);
      results.push({width,theme,keyboard:true,escape:true,focus:true,accessibilityTree:true,pointerOrTouch:true,overflow:false,mobileAccordion:width<=760});
    }
    await navigate('/',true);
    await click(summary,width<=760);assert.equal(await opened(),true);
    await screenshot(`no-js-${width}`);
    await click('.research-destinations a',width<=760);
    for(let n=0;n<60;n++){if(await evaluate(`location.pathname==='/research/'&&document.readyState==='complete'`))break;await pause(50);}
    assert.equal(await evaluate(`location.pathname`),'/research/');
    assert.equal(await evaluate(`document.querySelector('h1').textContent.trim().length>0`),true);
    results.push({width,noJavaScriptDisclosureAndDestination:true});
  }
  for(const path of ['/research/','/experiments/','/publications/','/hackathons/','/community/']) {
    await navigate(path);
    const current=await evaluate(`document.querySelector('.site-header [aria-current="page"]')?.getAttribute('href')`);
    assert.equal(current,path);
  }
  assert.deepEqual(exceptions,[]);
  writeFileSync(`${output}/browser-results.json`,JSON.stringify({results,exceptions},null,2));
  console.log(JSON.stringify({cases:results.length,exceptions:exceptions.length,result:'PASS'}));
} catch(error) {console.error(error.stack);process.exitCode=1;} finally {socket?.close();chrome.kill('SIGTERM');server.kill('SIGTERM');}
