/* Node24/installed Chrome. Intercepts static review bytes; no server/process changes. */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,extname} from 'node:path';
const base=resolve(process.env.HOME_EVIDENCE_ROOT??'.community-drafts/hack2026-phase2'),out=resolve(base,`browser-${Date.now()}`);mkdirSync(out,{recursive:true});
const port=25000+process.pid%10000;
const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu','--no-first-run','--disable-background-networking',`--remote-debugging-port=${port}`,`--user-data-dir=${out}/chrome`,'about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));let socket,seq=0,root=process.argv[2]==='before'?resolve(base,'before-dist'):resolve('dist');const pending=new Map(),errors=[],missing=[],requests=[],results=[];
const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq,t=setTimeout(()=>reject(Error(method+' timed out')),20000);pending.set(id,{resolve:v=>{clearTimeout(t);resolve(v);},reject});socket.send(JSON.stringify({id,method,params}));});
const evalJS=async expression=>{const x=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});assert.ok(!x.exceptionDetails,JSON.stringify(x.exceptionDetails));return x.result.value;};
const key=async key=>{for(const type of['keyDown','keyUp'])await call('Input.dispatchKeyEvent',{type,key,code:key,windowsVirtualKeyCode:{Tab:9,Enter:13,Escape:27,ArrowRight:39,Home:36,End:35}[key],...(type==='keyDown'&&key==='Enter'?{text:'\r'}:{})});};
const serve=async e=>{try{const u=new URL(e.request.url);requests.push(u.href);if(u.origin!=='http://localhost:4321'){await call('Fetch.fulfillRequest',{requestId:e.requestId,responseCode:204});return;}const file=resolve(root,'.'+decodeURIComponent(u.pathname)+(u.pathname.endsWith('/')?'index.html':''));assert.ok(file.startsWith(root+'/'));const exists=existsSync(file);if(!exists&&!u.pathname.endsWith('favicon.ico'))missing.push(file);await call('Fetch.fulfillRequest',{requestId:e.requestId,responseCode:exists?200:404,responseHeaders:[{name:'Content-Type',value:{'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'}[extname(file)]??'application/octet-stream'}],body:exists?readFileSync(file).toString('base64'):''});}catch(e){errors.push(String(e));}};
const load=async()=>{const url='http://localhost:4321/hackathons/?phase2='+Date.now();await call('Page.navigate',{url});for(let i=0;i<120;i++){if(await evalJS(`location.href===${JSON.stringify(url)}&&document.readyState==='complete'`)){await pause(80);return;}await pause(30);}throw Error('Navigation timeout');};
try{
 let tabs;for(let i=0;i<120;i++){try{tabs=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();if(tabs.length)break;}catch{}await pause(50);}assert.ok(tabs?.length);
 socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});socket.onmessage=e=>{const x=JSON.parse(e.data);if(x.id){const p=pending.get(x.id);pending.delete(x.id);if(p)x.error?p.reject(Error(JSON.stringify(x.error))):p.resolve(x.result);}if(x.method==='Fetch.requestPaused')void serve(x.params);if(x.method==='Runtime.exceptionThrown')errors.push(x.params.exceptionDetails.text);if(x.method==='Runtime.consoleAPICalled'&&x.params.type==='error')errors.push(x.params.args.map(a=>a.value??a.description));};
 await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});await call('Page.addScriptToEvaluateOnNewDocument',{source:"try{localStorage.removeItem('aeglysai-theme')}catch{}"});



 const before=process.argv[2]==='before';
 for(const width of (before?[390,1440]:[320,375,390,430,768,1024,1280,1440]))for(const theme of ['light','dark'])for(const js of (before?[true]:[true,false])){
  await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});
  await call('Emulation.setTouchEmulationEnabled',{enabled:width<768});
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});
  await call('Emulation.setScriptExecutionDisabled',{value:!js});await load();
  const state=await evalJS(`(()=>{const hero=document.querySelector('.hx-hero'),link=document.querySelector('#project-submissions .hx-actions a')||hero.querySelector('.hx-actions a'),h=hero.querySelector('h1'),r=h.getBoundingClientRect();return{heading:h.textContent,headingMarkup:h.outerHTML,brandMarkup:hero.querySelector(".hx-event-brand").outerHTML,introduction:hero.querySelector(".hx-lead").textContent,headingFont:getComputedStyle(h).fontSize,headingLineHeight:getComputedStyle(h).lineHeight,headingRect:h.getBoundingClientRect().toJSON(),networkRect:hero.querySelector(".hx-network").getBoundingClientRect().toJSON(),heroHeight:hero.getBoundingClientRect().height,cta:link.textContent,href:link.href,overflow:document.documentElement.scrollWidth>innerWidth,headingWidth:r.width,viewport:innerWidth,images:[...hero.querySelectorAll("img")].every(i=>i.complete&&i.naturalWidth>0),iframe:document.querySelectorAll('iframe').length,network:!!document.querySelector('.hx-network')}})()`);
  assert.equal(state.overflow,false,JSON.stringify({width,theme,js,state}));assert.equal(state.images,true);assert.equal(state.iframe,0);
  if(!before){assert.equal(state.heading,'BUILD INTELLIGENCE. SECURE TOMORROW.');assert.match(state.cta,/Submit Your Project/);assert.ok(state.href.includes('1FAIpQLSeje4ie_BXjzsNpxu_NvNxIJcz5p9IoS3jEgiUaC6FPdh_Frg'));
   assert.equal(await evalJS(`document.querySelectorAll('a[href="https://docs.google.com/forms/d/e/1FAIpQLSeNfr0ah_d2yHuBzVZmRY87gkt7e4mGOcIB0IqczaUSl8ok9w/viewform"]').length`),0);
   await key('Tab');await evalJS(`document.querySelector('#project-submissions .hx-actions a').focus()`);assert.equal(await evalJS(`document.activeElement.matches('#project-submissions .hx-actions a')`),true);
   const focus=await evalJS(`getComputedStyle(document.activeElement).outlineStyle`);assert.notEqual(focus,'none');
   await evalJS(`document.querySelector('#project-submissions a[href="#challenges"]').focus()`);await key('Enter');assert.equal(await evalJS('location.hash'),'#challenges');
  }
  if(js&&(width===390||width===1440)){await evalJS('scrollTo(0,0);document.activeElement.blur()');await pause(100);const bottom=await evalJS('document.querySelector(".hx-facts").getBoundingClientRect().bottom');const image=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:Math.ceil(bottom),scale:1}});writeFileSync(`${out}/${before?'before':'after'}-${width}-${theme}.png`,Buffer.from(image.data,'base64'));}
  results.push({width,theme,js,...state});
 }
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
 writeFileSync(`${base}/${before?'before':'after'}-results.json`,JSON.stringify({results,errors,missing,output:out},null,2));console.log(JSON.stringify({cases:results.length,output:out}));
}finally{socket?.close();chrome.kill();}
