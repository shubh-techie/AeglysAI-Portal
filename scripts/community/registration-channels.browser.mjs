/* Optional local Chromium/CDP regression. No browser dependency or external navigation. */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const output=resolve(`.community-drafts/reg-001/browser-${Date.now()}`);mkdirSync(output,{recursive:true});
const port=15000+process.pid%8000,debugPort=port+10000;
const server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',resolve('dist')],{stdio:'ignore'});
const chrome=spawn(process.env.HACK_CHROME_BIN??'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${debugPort}`,`--user-data-dir=${output}/chrome`,'about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));let socket,sequence=0;const pending=new Map(),exceptions=[],results=[];
try{
 let tabs;for(let n=0;n<120;n++){try{tabs=await(await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();if(tabs.some(t=>t.type==='page'))break;}catch{}await pause(50);}
 assert.ok(tabs?.some(t=>t.type==='page'));
 socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
 socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params.exceptionDetails.text);};
 const call=(method,params={})=>new Promise((r,j)=>{const id=++sequence;pending.set(id,{resolve:r,reject:j});socket.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description??r.exceptionDetails.text);return r.result.value;};
 const key=async()=>{await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});};
 await call('Page.enable');await call('Runtime.enable');
 for(const width of [320,390,768,1440])for(const theme of ['light','dark'])for(const js of [true,false]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});
  await call('Emulation.setScriptExecutionDisabled',{value:!js});
  const query=`?reg001=${Date.now()}-${sequence}`;await call('Page.navigate',{url:`http://127.0.0.1:${port}/hackathons/${query}`});
  let ready=false;for(let n=0;n<120;n++){try{if(await evaluate(`location.search===${JSON.stringify(query)}&&document.readyState==='complete'`)){ready=true;break;}}catch{}await pause(50);}assert.ok(ready);
  if(js)assert.equal(await evaluate('document.documentElement.dataset.theme'),theme);
  else assert.equal(await evaluate('getComputedStyle(document.body).backgroundColor'),theme==='light'?'rgb(246, 247, 249)':'rgb(8, 15, 28)');
  assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false,`${width}/${theme}/${js}: overflow`);
  assert.equal(await evaluate("document.querySelectorAll('[data-registration-channel]').length"),2);
  assert.equal(await evaluate("document.querySelectorAll('a[href=\"https://discord.com/invite/rNdTbezkg\"]').length"),2);
  await evaluate(`(()=>{const first=document.querySelector('#registration-channels a');const links=[...document.querySelectorAll('a[href]')];links[links.indexOf(first)-1].focus();})()`);
  for(const expected of ['https://unstop.com/o/UMpqYS1','https://luma.com/1vmb4bna','https://discord.com/invite/rNdTbezkg']){
   await key();assert.equal(await evaluate('document.activeElement.href'),expected);
   assert.equal(await evaluate("document.activeElement.matches(':focus-visible')"),true);
   const focus=await evaluate(`(()=>{const a=document.activeElement,r=a.getBoundingClientRect(),s=getComputedStyle(a);return{height:r.height,outline:s.outlineStyle,width:parseFloat(s.outlineWidth),visible:r.width>0&&r.height>0};})()`);
   assert.ok(focus.visible&&focus.height>=44&&focus.outline!=='none'&&focus.width>=2,JSON.stringify(focus));
  }
  await evaluate(`document.querySelector('[data-reg001-support="card"] a').focus()`);
  assert.equal(await evaluate("document.activeElement.matches(':focus-visible')"),true);
  const tree=await call('Accessibility.getFullAXTree');assert.equal(tree.nodes.filter(n=>!n.ignored&&n.role?.value==='link'&&n.name?.value.includes('Join Discord Community')).length,2);
  await evaluate(`document.querySelector('#registration-channels').scrollIntoView({block:'start',behavior:'instant'})`);
  if(js){const shot=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${output}/${width}-${theme}-channels.png`,Buffer.from(shot.data,'base64'));
   await evaluate(`document.querySelector('[data-reg001-support="card"]').scrollIntoView({block:'center',behavior:'instant'})`);const card=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${output}/${width}-${theme}-support.png`,Buffer.from(card.data,'base64'));}
  results.push({width,theme,js,keyboard:true,focus:true,noOverflow:true});
 }
 assert.deepEqual(exceptions,[]);writeFileSync(`${output}/results.json`,JSON.stringify({results,exceptions},null,2)+'\n');console.log(JSON.stringify({cases:results.length,exceptions:exceptions.length,output}));
}finally{socket?.close();chrome.kill();server.kill();}
