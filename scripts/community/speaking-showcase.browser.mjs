/* Node 24 + installed Chrome; no dependencies or development-process changes.
 * CDP serves archived/production bytes at the existing localhost URL for comparison.
 * All requests are intercepted; forms/external services are never contacted.
 */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdirSync,readFileSync,writeFileSync,existsSync,readdirSync} from 'node:fs';
import {resolve,extname} from 'node:path';
const output=resolve(`.community-drafts/speak001/browser-${Date.now()}`);mkdirSync(output,{recursive:true});
const debugPort=24000+process.pid%10000;
const chrome=spawn(process.env.HACK_CHROME_BIN??'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking',`--remote-debugging-port=${debugPort}`,`--user-data-dir=${output}/chrome`,'about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));let socket,sequence=0,root;
const pending=new Map(),exceptions=[],results=[],requestErrors=[],requests=[],missing=[];
const call=(method,params={})=>new Promise((r,j)=>{const id=++sequence;const timer=setTimeout(()=>{pending.delete(id);j(Error(`CDP timeout: ${method}`));},20000);pending.set(id,{resolve:v=>{clearTimeout(timer);r(v);},reject:e=>{clearTimeout(timer);j(e);}});socket.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description??r.exceptionDetails.text);return r.result.value;};
const key=async name=>{for(const type of ['keyDown','keyUp'])await call('Input.dispatchKeyEvent',{type,key:name,code:name,windowsVirtualKeyCode:{Tab:9,Enter:13,ArrowRight:39,Home:36,End:35,Escape:27}[name],...(type==='keyDown'&&name==='Enter'?{text:'\r'}:{})});};
const serve=async p=>{
 try{
  const url=new URL(p.request.url);let status=204,body='',mime='text/plain';
  if(url.origin==='http://localhost:4321'){
   const pathname=decodeURIComponent(url.pathname);const file=resolve(root,`.${pathname}${pathname.endsWith('/')?'index.html':''}`);
   assert.ok(file.startsWith(root+'/'));
   status=existsSync(file)?200:404;if(status===404&&!pathname.endsWith('favicon.ico'))missing.push(pathname);
   if(status===200){body=readFileSync(file).toString('base64');mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.svg':'image/svg+xml','.xml':'application/xml'}[extname(file)]??'application/octet-stream';}
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
 socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(p)m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}if(m.method==='Network.requestWillBeSent')requests.push(m.params.request.url);if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params.exceptionDetails.text);if(m.method==='Fetch.requestPaused')void serve(m.params);};
 await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
 const fixtureRoot=readFileSync('.community-drafts/speak001/gallery-fixture-path.txt','utf8').trim();
 for(const version of ['before','after','fixture']){
  root=resolve(version==='before'?'.community-drafts/speak001/before-dist':version==='after'?'dist':`${fixtureRoot}/dist`);
  for(const width of [320,375,390,430,768,1024,1440])for(const theme of ['light','dark'])for(const js of [true,false]){
   await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768});
   await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});await call('Emulation.setScriptExecutionDisabled',{value:!js});
   await navigate('/speaking/');
   assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false,`${version}/${width}/${theme}/${js}`);
   assert.equal(await evaluate('document.querySelectorAll("h1").length'),1);
   if(js)assert.equal(await evaluate('document.documentElement.dataset.theme'),theme);
   else assert.equal(await evaluate('getComputedStyle(document.body).backgroundColor'),theme==='light'?'rgb(246, 247, 249)':'rgb(8, 15, 28)');
   if(version!=='before'){
    const text=await evaluate('document.body.innerText');assert.ok(text.includes('completion has not been verified'));assert.ok(text.includes('Awaiting confirmation'));assert.ok(!text.includes('Slide preview unavailable'));
    assert.equal(await evaluate("document.querySelectorAll('[data-recording-id]').length"),3);assert.equal(await evaluate('document.querySelectorAll("iframe").length'),0);
    await evaluate("document.querySelector('#engagement-all').focus()");await key('ArrowRight');
    assert.equal(await evaluate("document.querySelector('#engagement-completed').checked"),true);
    assert.equal(await evaluate("[...document.querySelectorAll('.sp-event-grid [data-engagement-status]')].filter(e=>getComputedStyle(e).display!=='none').length"),1);
    assert.ok(await evaluate("document.activeElement.matches(':focus-visible')"));
    await evaluate("document.querySelector('#engagement-all').click()");
    if(version==='fixture'){
     assert.equal(await evaluate("document.querySelectorAll('[data-speaking-photo]').length"),4);
     const first=await evaluate("document.querySelector('[data-speaking-photo]').href");await evaluate("document.querySelector('[data-speaking-photo]').focus()");await key('Enter');await pause(100);
     if(js){
      assert.equal(await evaluate("document.querySelector('[data-speaking-lightbox]').open"),true);
      assert.equal(await evaluate("document.activeElement.hasAttribute('data-photo-close')"),true);
      for(const type of ['keyDown','keyUp'])await call('Input.dispatchKeyEvent',{type,key:'Tab',code:'Tab',windowsVirtualKeyCode:9,modifiers:8});
      assert.equal(await evaluate("document.activeElement.hasAttribute('data-original-photo')"),true);await key('Tab');
      assert.equal(await evaluate("document.querySelector('[data-photo-counter]').textContent"),'Photo 1 of 4');
      await key('ArrowRight');assert.equal(await evaluate("document.querySelector('[data-photo-counter]').textContent"),'Photo 2 of 4');
      for(let n=0;n<8;n++){await key('Tab');assert.ok(await evaluate("document.querySelector('[data-speaking-lightbox]').contains(document.activeElement)"));}
      if([320,1440].includes(width)){const shot=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${output}/gallery-${width}-${theme}.png`,Buffer.from(shot.data,'base64'));}
      await key('Escape');await pause(100);assert.equal(await evaluate("document.querySelector('[data-speaking-lightbox]').open"),false);
      assert.equal(await evaluate('document.activeElement.href'),first);assert.equal(await evaluate('document.body.style.overflow'),'');
      // A failed original image has a readable fallback and keeps a working Close control.
      await key('Enter');await evaluate("document.querySelector('[data-speaking-lightbox] img').dispatchEvent(new Event('error'))");assert.ok(await evaluate("document.querySelector('[data-photo-description]').textContent.includes('Photo unavailable')"));await key('Escape');await pause(50);
     }else{
      let ready=false;for(let n=0;n<100;n++){if(await evaluate(`location.href===${JSON.stringify(first)}&&document.readyState==='complete'`)){ready=true;break;}await pause(40);}assert.ok(ready,'No-JS full image link');await navigate('/speaking/');
     }
    }
   }
   if(version!=='fixture'&&js&&[320,1440].includes(width)){
    await evaluate('scrollTo({top:0,behavior:"instant"})');await pause(80);
    const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:Math.min(1600,await evaluate('document.documentElement.scrollHeight')),scale:1}});writeFileSync(`${output}/${version}-${width}-${theme}.png`,Buffer.from(shot.data,'base64'));
    if(version==='after')for(const selector of ['#engagements','#recordings','#slide-library']){
     const clip=await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});e.scrollIntoView({block:'start',behavior:'instant'});const r=e.getBoundingClientRect();return{x:0,y:r.top+scrollY,width:innerWidth,height:r.height,scale:1}})()`);
     const section=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});writeFileSync(`${output}/${selector.slice(1)}-${width}-${theme}.png`,Buffer.from(section.data,'base64'));
    }
   }
   results.push({version,width,theme,js,noOverflow:true});
  }
 }
 const speakingThirdParty=requests.filter(url=>/^https?:/.test(url)&&new URL(url).origin!=='http://localhost:4321');assert.deepEqual(speakingThirdParty,[]);
 root=resolve('dist');const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${p}/${e.name}`):[`${p}/${e.name}`]);const routes=walk(root).filter(p=>p.endsWith('.html')).map(p=>p.slice(root.length).replace(/index.html$/,''));
 for(const route of routes){await navigate(route);assert.equal(await evaluate('document.querySelectorAll("h1").length'),1,route);}
 assert.deepEqual(exceptions,[]);assert.deepEqual(requestErrors,[]);assert.deepEqual(missing,[]);
 const thirdParty=speakingThirdParty;
 writeFileSync(`${output}/results.json`,JSON.stringify({results,routes,exceptions,requestErrors,missing,thirdPartyRequests:thirdParty},null,2)+'\n');console.log(JSON.stringify({cases:results.length,routes:routes.length,exceptions:exceptions.length,thirdPartyRequests:thirdParty.length,output}));
}finally{socket?.close();chrome.kill();}
