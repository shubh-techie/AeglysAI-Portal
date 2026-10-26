/* Local Chromium/CDP visual and interaction checks; no browser dependency added. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const stage = process.argv[2] ?? 'after';
assert.ok(['before', 'after'].includes(stage));
const output = resolve(`.community-drafts/ux-002/${stage}`);
mkdirSync(output, { recursive: true });
const port = 16000 + process.pid % 8000, debugPort = port + 10000;
const server = spawn('python3', ['-m','http.server',String(port),'--bind','127.0.0.1','--directory',resolve('dist')], {stdio:'ignore'});
const chrome = spawn(process.env.HACK_CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking',`--remote-debugging-port=${debugPort}`,`--user-data-dir=${output}/chrome`,'about:blank'], {stdio:'ignore'});
let socket, sequence = 0;
const pending = new Map(), results = [], exceptions = [];
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  let tabs;
  for(let n=0;n<120;n++) {try {tabs=await(await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();if(tabs.some(t=>t.type==='page'))break;}catch{}await pause(50);}
  assert.ok(tabs?.some(t=>t.type==='page'));
  socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
  socket.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params.exceptionDetails.text);};
  const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
  const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description??r.exceptionDetails.text);return r.result.value;};
  const navigate=async disabled=>{
    await call('Emulation.setScriptExecutionDisabled',{value:disabled});
    const query=`?ux002=${Date.now()}-${sequence}`;
    await call('Page.navigate',{url:`http://127.0.0.1:${port}/${query}`});
    let ready=false;for(let n=0;n<120;n++){if(await evaluate(`location.search===${JSON.stringify(query)}&&document.readyState==='complete'`)){ready=true;break;}await pause(50);}assert.ok(ready);
  };
  const key=async(key,code,number)=>{await call('Input.dispatchKeyEvent',{type:'keyDown',key,code,windowsVirtualKeyCode:number});await call('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode:number});await pause(100);};
  const shot=async name=>{
    await evaluate(`scrollTo({top:0,behavior:'instant'})`);
    const metrics=await call('Page.getLayoutMetrics');
    const r=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:metrics.cssLayoutViewport.clientWidth,height:Math.min(metrics.cssContentSize.height,20000),scale:1}});
    writeFileSync(`${output}/${name}.png`,Buffer.from(r.data,'base64'));
  };
  await call('Page.enable');await call('Runtime.enable');
  for(const [width,height] of [[320,740],[375,812],[390,844],[430,932],[768,1024],[1024,900],[1440,1000]]) {
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
    for(const theme of ['light','dark']) {
      await navigate(false);
      await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`);
      await pause(120);
      assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false,`${stage} ${width} ${theme} overflow`);
      assert.equal(await evaluate(`document.querySelectorAll('main h1').length`),1);
      assert.equal(await evaluate(`document.querySelectorAll('.model-card').length`),4);
      assert.equal(await evaluate(`document.querySelectorAll('#featured-media .media-slide').length`),6);
      assert.equal(await evaluate(`document.querySelector('main').textContent.includes('Conceptual research architecture, not a deployment schematic.')`),true);
      if(stage==='after') {
        assert.equal(await evaluate(`document.querySelector('.home-research-note').textContent.includes('non-enforcing')`),true);
        assert.equal(await evaluate(`document.querySelector('.home-community a[href="/hackathons/2027/"]').textContent.includes('Coming Soon')`),true);
        const tree=await call('Accessibility.getFullAXTree');
        assert.ok(tree.nodes.some(n=>!n.ignored&&n.role?.value==='heading'&&n.name?.value==='Build with the community.'));
        assert.equal(await evaluate(`([...document.querySelectorAll('.home-community a')].every(e=>{const r=e.getBoundingClientRect();return r.width>=44&&r.height>=44;}))`),true);
      }
      // Native skip-link and a real keyboard-controlled carousel remain usable.
      await evaluate(`document.activeElement?.blur()`);
      const keyboardQuery=`?keyboard=${sequence}`;
      await call('Page.navigate',{url:`http://127.0.0.1:${port}/${keyboardQuery}`});
      for(let n=0;n<100;n++){if(await evaluate(`location.search===${JSON.stringify(keyboardQuery)}&&document.readyState==='complete'&&!!document.querySelector('.skip-link')`))break;await pause(30);}
      await key('Tab','Tab',9);
      await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)};document.querySelector('.skip-link').focus()`);
      assert.equal(await evaluate(`getComputedStyle(document.querySelector('.skip-link')).outlineStyle`),'solid');
      await key('Enter','Enter',13);
      assert.equal(await evaluate(`document.activeElement.id`),'main');
      await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
      assert.equal(await evaluate(`getComputedStyle(document.querySelector('.media-track')).scrollBehavior`),'auto');
      await evaluate(`document.querySelector('.media-track').focus()`);await key('End','End',35);
      assert.equal(await evaluate(`document.querySelector('.media-track').scrollLeft>0`),true);
      await key('Home','Home',36);
      assert.equal(await evaluate(`Math.abs(document.querySelector('.media-track').scrollLeft)<2`),true);
      await shot(`${width}-${theme}`);
      await call('Emulation.setEmulatedMedia',{features:[]});
      results.push({width,theme,keyboard:true,media:true,reducedMotion:true,overflow:false});
      if(stage==='after') {
        await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme}]});await navigate(true);
        assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false,`noJS ${width} ${theme} overflow`);
        assert.equal(await evaluate(`document.querySelectorAll('.media-track a[href]').length>=6`),true);
        assert.equal(await evaluate(`document.querySelector('.home-community a[href="/hackathons/"]')!==null`),true);
        await shot(`${width}-${theme}-no-js`);
        await call('Emulation.setEmulatedMedia',{features:[]});
        results.push({width,theme,noJavaScript:true,overflow:false});
      }
    }
  }
  assert.deepEqual(exceptions,[]);
  writeFileSync(`${output}/results.json`,JSON.stringify({stage,results,exceptions},null,2));
  console.log(JSON.stringify({stage,cases:results.length,exceptions:exceptions.length,result:'PASS'}));
} catch(error){console.error(error.stack);process.exitCode=1;}finally{socket?.close();chrome.kill('SIGTERM');server.kill('SIGTERM');}
