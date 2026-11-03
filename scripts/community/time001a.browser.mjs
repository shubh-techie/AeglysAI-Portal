/* Node 24 + installed Chrome; no dependencies or development-process changes.
 * CDP serves archived/production bytes at the existing localhost URL for comparison.
 * All requests are intercepted; forms/external services are never contacted.
 */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdirSync,readFileSync,writeFileSync,existsSync,readdirSync} from 'node:fs';
import {resolve,extname} from 'node:path';
const output=resolve(`.community-drafts/time001a-final/browser-${Date.now()}`);mkdirSync(output,{recursive:true});
const debugPort=24000+process.pid%10000;
const chrome=spawn(process.env.HACK_CHROME_BIN??'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking',`--remote-debugging-port=${debugPort}`,`--user-data-dir=${output}/chrome`,'about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));let socket,sequence=0,root;
const pending=new Map(),exceptions=[],results=[],requestErrors=[];
const call=(method,params={})=>new Promise((r,j)=>{const id=++sequence;const timer=setTimeout(()=>{pending.delete(id);j(Error(`CDP timeout: ${method}`));},20000);pending.set(id,{resolve:v=>{clearTimeout(timer);r(v);},reject:e=>{clearTimeout(timer);j(e);}});socket.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description??r.exceptionDetails.text);return r.result.value;};
const key=async name=>{for(const type of ['keyDown','keyUp'])await call('Input.dispatchKeyEvent',{type,key:name,code:name,windowsVirtualKeyCode:{Tab:9,Enter:13,ArrowRight:39,Home:36,End:35}[name],...(type==='keyDown'&&name==='Enter'?{text:'\r'}:{})});};
const serve=async p=>{
 try{
  const url=new URL(p.request.url);let status=204,body='',mime='text/plain';
  if(url.origin==='http://localhost:4321'){
   const pathname=decodeURIComponent(url.pathname);const file=resolve(root,`.${pathname}${pathname.endsWith('/')?'index.html':''}`);
   assert.ok(file.startsWith(root+'/'));
   status=existsSync(file)?200:404;
   if(status===200){body=readFileSync(file).toString('base64');mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.xml':'application/xml'}[extname(file)]??'application/octet-stream';}
  }
  await call('Fetch.fulfillRequest',{requestId:p.requestId,responseCode:status,responseHeaders:[{name:'Content-Type',value:mime},{name:'Cache-Control',value:'no-store'}],body});
 }catch(error){requestErrors.push(String(error));await call('Fetch.failRequest',{requestId:p.requestId,errorReason:'Failed'});}
};
const navigate=async path=>{
 const query=`?time001a=${Date.now()}-${sequence}`;await call('Page.navigate',{url:`http://localhost:4321${path}${query}`});
 let ready=false;for(let n=0;n<160;n++){try{if(await evaluate(`location.search===${JSON.stringify(query)}&&document.readyState==='complete'`)){ready=true;break;}}catch{}await pause(30);}assert.ok(ready,path);
};
try{
 let tabs;for(let n=0;n<160;n++){try{tabs=await(await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();if(tabs.some(t=>t.type==='page'))break;}catch{}await pause(50);}assert.ok(tabs?.some(t=>t.type==='page'));
 socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
 socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(p)m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params.exceptionDetails.text);if(m.method==='Fetch.requestPaused')void serve(m.params);};
 await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
 for(const version of ['before','after']){
  root=resolve(version==='before'?(process.env.TIME001A_BEFORE??'.community-drafts/time001a-final/before-dist'):'dist');
  for(const width of [320,390,768,1440])for(const theme of ['light','dark'])for(const js of [true,false])for(const route of ['/','/hackathons/','/hackathons/events/']){
   await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768});
   await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});await call('Emulation.setScriptExecutionDisabled',{value:!js});
   await navigate(route);assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false,`${version}/${width}/${theme}/${route}/${js}`);
   if(js)assert.equal(await evaluate('document.documentElement.dataset.theme'),theme);
   else assert.equal(await evaluate('getComputedStyle(document.body).backgroundColor'),theme==='light'?'rgb(246, 247, 249)':'rgb(8, 15, 28)');
   const text=await evaluate('document.body.textContent');assert.ok(text.includes('AEGYTHON 2026'));
   if(version==='after'){
    for(const label of ['Registration & Qualification: Oct 1 – Nov 6, 2026','Grand Finale: Nov 28, 2026','Project Submission & Finalist Qualification: Nov 15 – Nov 22, 2026'])assert.ok(text.includes(label),label);
    assert.ok(!/Event dates to be announced|Event dates pending|Judges, dates and results are not confirmed|Phase 2 schedule remains to be announced|Schedule to be announced/.test(text));
    if(route==='/hackathons/'){
     assert.equal(await evaluate("document.querySelectorAll('#timeline ol > li').length"),3);
     assert.ok(text.includes('Certificate verification and issuance details will be communicated through official AEGYTHON channels.'));
     assert.ok(text.includes('Grand Finale: November 28, 2026 — Hybrid (Online & On-site). On-site venue details will be announced separately.'));
     assert.ok(text.includes('Sample — Not Valid for Verification'));assert.ok(text.includes('funding is unconfirmed'));
     if(js){
      await evaluate("document.querySelector('[aria-label=\"Event milestone selection\"] button').focus()");await key('ArrowRight');
      assert.ok(await evaluate("document.activeElement.matches(':focus-visible')"));
      assert.ok(await evaluate("document.querySelector('[aria-label=\"Event milestone selection\"] button:nth-child(2)').getAttribute('aria-pressed')==='true'"));
      assert.ok(await evaluate("document.querySelector('#timeline .hx-selection-panel').textContent.includes('November 15')"));
     }
     await evaluate("document.querySelector('#faq summary').focus()");await key('Enter');await pause(80);assert.equal(await evaluate("document.querySelector('#faq details').open"),true);
    }
   }
   if(js&&[320,1440].includes(width)){
    const selectors=route==='/hackathons/'?['#series','#challenges','#timeline','#prizes','#certificates','#judging','#faq']:route==='/'?['.home-community']:['.page-hero'];
    for(const selector of selectors){
     if(selector==='#faq')await evaluate("document.querySelectorAll('#faq details').forEach(d=>d.open=true)");
     const clip=await evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)return null;el.scrollIntoView({block:'start',behavior:'instant'});const r=el.getBoundingClientRect();return{x:0,y:r.top+scrollY,width:innerWidth,height:r.height,scale:1}})()`);
     assert.ok(clip,selector);await pause(70);const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});writeFileSync(`${output}/${version}-${width}-${theme}-${selector.replace(/[#.]/g,'')}.png`,Buffer.from(shot.data,'base64'));
    }
   }
   results.push({version,width,theme,js,route,noOverflow:true});
  }
 }
 root=resolve('dist');const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${p}/${e.name}`):[`${p}/${e.name}`]);
 const routes=walk(root).filter(p=>p.endsWith('.html')).map(p=>p.slice(root.length).replace(/index.html$/,''));
 for(const route of routes){await navigate(route);assert.equal(await evaluate('document.querySelectorAll("h1").length'),1,route);}
 assert.deepEqual(exceptions,[]);assert.deepEqual(requestErrors,[]);
 writeFileSync(`${output}/results.json`,JSON.stringify({results,routes,exceptions,requestErrors},null,2)+'\n');console.log(JSON.stringify({cases:results.length,routes:routes.length,exceptions:exceptions.length,output}));
}finally{socket?.close();chrome.kill();}
