/* Node24/installed Chrome. Intercepts static review bytes; no server/process changes. */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,extname} from 'node:path';
const base=resolve(process.env.HOME_EVIDENCE_ROOT??'.community-drafts/design002'),out=resolve(base,`browser-${Date.now()}`);mkdirSync(out,{recursive:true});
const port=25000+process.pid%10000;
const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu','--no-first-run','--disable-background-networking',`--remote-debugging-port=${port}`,`--user-data-dir=${out}/chrome`,'about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));let socket,seq=0,root=resolve(base,process.argv[2]==='before'?'before-dist':'../../dist');const pending=new Map(),errors=[],missing=[],requests=[],results=[];
const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq,t=setTimeout(()=>reject(Error(method+' timed out')),20000);pending.set(id,{resolve:v=>{clearTimeout(t);resolve(v);},reject});socket.send(JSON.stringify({id,method,params}));});
const evalJS=async expression=>{const x=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});assert.ok(!x.exceptionDetails,JSON.stringify(x.exceptionDetails));return x.result.value;};
const key=async key=>{for(const type of['keyDown','keyUp'])await call('Input.dispatchKeyEvent',{type,key,code:key,windowsVirtualKeyCode:{Tab:9,Enter:13,Escape:27,ArrowRight:39,Home:36,End:35}[key],...(type==='keyDown'&&key==='Enter'?{text:'\r'}:{})});};
const serve=async e=>{try{const u=new URL(e.request.url);requests.push(u.href);if(u.origin!=='http://localhost:4321'){await call('Fetch.fulfillRequest',{requestId:e.requestId,responseCode:204});return;}const file=resolve(root,'.'+decodeURIComponent(u.pathname)+(u.pathname.endsWith('/')?'index.html':''));assert.ok(file.startsWith(root+'/'));const exists=existsSync(file);if(!exists&&!u.pathname.endsWith('favicon.ico'))missing.push(file);await call('Fetch.fulfillRequest',{requestId:e.requestId,responseCode:exists?200:404,responseHeaders:[{name:'Content-Type',value:{'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'}[extname(file)]??'application/octet-stream'}],body:exists?readFileSync(file).toString('base64'):''});}catch(e){errors.push(String(e));}};
try{
 let tabs;for(let i=0;i<120;i++){try{tabs=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();if(tabs.length)break;}catch{}await pause(50);}assert.ok(tabs?.length);
 socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});socket.onmessage=e=>{const x=JSON.parse(e.data);if(x.id){const p=pending.get(x.id);pending.delete(x.id);if(p)x.error?p.reject(Error(JSON.stringify(x.error))):p.resolve(x.result);}if(x.method==='Fetch.requestPaused')void serve(x.params);if(x.method==='Runtime.exceptionThrown')errors.push(x.params.exceptionDetails.text);if(x.method==='Runtime.consoleAPICalled'&&x.params.type==='error')errors.push(x.params.args.map(a=>a.value??a.description));};
 await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});await call('Page.addScriptToEvaluateOnNewDocument',{source:"try{localStorage.removeItem('aeglysai-theme')}catch{}"});


 const {readdirSync}=await import('node:fs');const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(resolve(p,e.name)):[resolve(p,e.name)]);
 const paths=walk(root).filter(p=>p.endsWith('.html')).map(p=>p.slice(root.length).replace(/index\.html$/,''));assert.equal(paths.length,28);
 const widths=[320,360,375,390,430,768,820,1024,1280,1440,1920];
 const devices=widths.map(width=>({width,height:width<640?844:1000,orientation:'portrait/default'})).concat([{width:844,height:390,orientation:'landscape'},{width:1180,height:820,orientation:'landscape'}]);
 const activate=async selector=>{await evalJS(`document.querySelector(${JSON.stringify(selector)}).click()`);await pause(70);};
 for(const device of devices)for(const theme of['light','dark'])for(const js of[true,false]){
  const {width,height}=device;await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<768});await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});await call('Emulation.setScriptExecutionDisabled',{value:!js});
  for(const path of paths){
   const url='http://localhost:4321'+path+'?audit='+Date.now();await call('Page.navigate',{url});let ready=false;
   for(let t=0;t<150;t++){if(await evalJS(`location.href===${JSON.stringify(url)}&&document.readyState==='complete'`)){ready=true;break;}await pause(15);}assert.ok(ready,path);await pause(20);
   const state=await evalJS(`(()=>{const root=document.documentElement;const visible=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'};const scroller=e=>{for(let a=e.parentElement;a;a=a.parentElement)if(/auto|scroll/.test(getComputedStyle(a).overflowX)&&a.scrollWidth>a.clientWidth)return true;return false};return {h1:document.querySelectorAll('main h1').length,overflow:root.scrollWidth>innerWidth+1,scrollWidth:root.scrollWidth,width:innerWidth,offscreen:[...document.querySelectorAll('main a,main button,footer a')].filter(visible).filter(e=>!scroller(e)).filter(e=>{const r=e.getBoundingClientRect();return r.left< -1||r.right>innerWidth+1}).map(e=>e.getAttribute('aria-label')||e.textContent.trim().slice(0,55)),forms:document.querySelectorAll('form').length,modelD:document.body.textContent.includes('enforcement_authority=NONE'),localLinks:[...document.querySelectorAll('a[href]')].map(e=>e.getAttribute('href')).filter(h=>h.startsWith('/')&&!h.startsWith('//'))}})()`);
   assert.equal(state.h1,1,path);
   const links=state.localLinks.map(h=>h.split(/[?#]/)[0]).filter(Boolean);for(const link of links){const file=resolve(root,'.'+decodeURIComponent(link)+(link.endsWith('/')?'index.html':''));assert.ok(existsSync(file),path+' missing '+link);}
   if(js&&path==='/speaking/'){
    assert.equal(await evalJS('document.querySelectorAll("iframe").length'),0);assert.equal(await evalJS('document.querySelectorAll("[data-recording-id]").length'),4);
    await activate('[data-event-trigger]');assert.equal(await evalJS("document.querySelector('[data-speaking-lightbox]').open"),true);await key('Escape');assert.equal(await evalJS("document.querySelector('[data-speaking-lightbox]').open"),false);assert.equal(await evalJS('document.body.style.overflow'),'');
    await activate('[data-video-play]');assert.equal(await evalJS('document.querySelectorAll("iframe").length'),1);assert.ok(await evalJS("document.querySelector('iframe').src.startsWith('https://www.youtube-nocookie.com/embed/')"));
   }
   if(js&&path==='/media/'){
    await activate('[data-media-carousel] [data-next]');assert.ok(await evalJS("document.querySelector('.media-track').scrollLeft>0"));
   }
   results.push({...device,theme,js,path,...state,localLinks:undefined});
  }
  console.log(JSON.stringify({completed:results.length,width,height,theme,js}));
 }
 const findings=results.filter(r=>r.overflow||r.offscreen.length);writeFileSync(out+'/results.json',JSON.stringify({cases:results.length,findings,results,errors,missing},null,2)+'\n');assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);console.log(JSON.stringify({cases:results.length,findings:findings.length,output:out}));
}finally{socket?.close();chrome.kill();}
