/* Node24/installed Chrome. Intercepts static review bytes; no server/process changes. */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,extname} from 'node:path';
const base=resolve(process.env.HOME_EVIDENCE_ROOT??'.community-drafts/design002'),out=resolve(base,`browser-${Date.now()}`);mkdirSync(out,{recursive:true});
const mediaCache=existsSync(base+'/media-loading.json')?JSON.parse(readFileSync(base+'/media-loading.json','utf8')):[];
const port=25000+process.pid%10000;
const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu','--no-first-run','--disable-background-networking',`--remote-debugging-port=${port}`,`--user-data-dir=${out}/chrome`,'about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));let socket,seq=0,root=resolve(base,process.argv[2]==='before'?'before-dist':'../../dist');const pending=new Map(),errors=[],missing=[],requests=[],results=[];
const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq,t=setTimeout(()=>reject(Error(method+' timed out')),20000);pending.set(id,{resolve:v=>{clearTimeout(t);resolve(v);},reject});socket.send(JSON.stringify({id,method,params}));});
const evalJS=async expression=>{const x=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});assert.ok(!x.exceptionDetails,JSON.stringify(x.exceptionDetails));return x.result.value;};
const key=async key=>{for(const type of['keyDown','keyUp'])await call('Input.dispatchKeyEvent',{type,key,code:key,windowsVirtualKeyCode:{Tab:9,Enter:13,Escape:27,ArrowRight:39,Home:36,End:35}[key],...(type==='keyDown'&&key==='Enter'?{text:'\r'}:{})});};
const serve=async e=>{try{const u=new URL(e.request.url);requests.push(u.href);if(u.origin!=='http://localhost:4321'){const cached=mediaCache.find(r=>r.url===u.href&&r.file);await call('Fetch.fulfillRequest',{requestId:e.requestId,responseCode:cached?200:204,responseHeaders:cached?[{name:'Content-Type',value:cached.type}]:[],body:cached?readFileSync(cached.file).toString('base64'):''});return;}const file=resolve(root,'.'+decodeURIComponent(u.pathname)+(u.pathname.endsWith('/')?'index.html':''));assert.ok(file.startsWith(root+'/'));const exists=existsSync(file);if(!exists&&!u.pathname.endsWith('favicon.ico'))missing.push(file);await call('Fetch.fulfillRequest',{requestId:e.requestId,responseCode:exists?200:404,responseHeaders:[{name:'Content-Type',value:{'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'}[extname(file)]??'application/octet-stream'}],body:exists?readFileSync(file).toString('base64'):''});}catch(e){errors.push(String(e));}};
const shot=async name=>{await evalJS('document.activeElement.blur();scrollTo(0,0)');const metrics=await call('Page.getLayoutMetrics');const clip={x:0,y:0,width:metrics.cssContentSize.width,height:Math.min(metrics.cssContentSize.height,20000),scale:1};const x=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});writeFileSync(`${out}/${name}.png`,Buffer.from(x.data,'base64'));};
try{
 let tabs;for(let i=0;i<120;i++){try{tabs=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();if(tabs.length)break;}catch{}await pause(50);}assert.ok(tabs?.length);
 socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});socket.onmessage=e=>{const x=JSON.parse(e.data);if(x.id){const p=pending.get(x.id);pending.delete(x.id);if(p)x.error?p.reject(Error(JSON.stringify(x.error))):p.resolve(x.result);}if(x.method==='Fetch.requestPaused')void serve(x.params);if(x.method==='Runtime.exceptionThrown')errors.push(x.params.exceptionDetails.text);if(x.method==='Runtime.consoleAPICalled'&&x.params.type==='error')errors.push(x.params.args.map(a=>a.value??a.description));};
 await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});await call('Page.addScriptToEvaluateOnNewDocument',{source:"try{localStorage.removeItem('aeglysai-theme')}catch{}"});


 const stage=process.argv[2]??'after';
 for(const width of(stage==='before'?[390,1440]:[320,375,390,430,768,1024,1280,1440,1920]))for(const theme of['light','dark'])for(const js of(stage==='before'?[true]:[true,false]))for(const route of['publications','media','research','architecture','about','experiments','community','speaking']){
 await call('Emulation.setScriptExecutionDisabled',{value:!js});
 await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});
 const url='http://localhost:4321/'+route+'/?review='+Date.now();await call('Page.navigate',{url});for(let n=0;n<150;n++){if(await evalJS(`location.href===${JSON.stringify(url)}&&document.readyState==='complete'`))break;await pause(20);}await pause(80);
 if(route==='media'){await evalJS("[...document.querySelectorAll('.media-thumbnail')].forEach(e=>e.loading='eager')");for(let t=0;t<100;t++){if(await evalJS("[...document.querySelectorAll('.media-thumbnail')].every(e=>e.complete&&e.naturalWidth>0)"))break;await pause(20);}}
 if(js&&[390,1440].includes(width))await shot(`${stage}-${route}-${width}-${theme}`);
 const clip=await evalJS("(()=>{const r=document.querySelector('.site-footer').getBoundingClientRect();return{x:0,y:r.top+scrollY,width:innerWidth,height:r.height,scale:1}})()");const im=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});if(js&&[390,1440].includes(width))writeFileSync(`${out}/${stage}-footer-${route}-${width}-${theme}.png`,Buffer.from(im.data,'base64'));
 const overflow=await evalJS('document.documentElement.scrollWidth>innerWidth');assert.equal(overflow,false,`${route} ${width} ${theme}`);
 if(stage==='after'&&route!=='speaking'){
  const brand=await evalJS("(()=>{const m=document.querySelector('[data-editorial-page]'),h=m.querySelector('.page-hero');return{paper:getComputedStyle(m).backgroundColor,hero:getComputedStyle(h).backgroundColor,heroScheme:getComputedStyle(h).colorScheme,bodyScheme:getComputedStyle(m).colorScheme}})()");
  assert.equal(brand.paper,'rgb(244, 240, 231)');assert.equal(brand.hero,'rgb(8, 15, 28)');assert.equal(brand.heroScheme,'dark');assert.equal(brand.bodyScheme,'light');
 }
 if(stage==='after'){
  await key('Tab');await evalJS("document.querySelector('.site-footer a').focus()");assert.equal(await evalJS("getComputedStyle(document.activeElement).outlineStyle"),'solid');
  const targets=await evalJS("[...document.querySelectorAll('.site-footer a')].map(e=>({text:e.textContent.trim(),height:e.getBoundingClientRect().height}))");assert.ok(targets.every(e=>e.height>=44),JSON.stringify(targets));
  const contrast=await evalJS(`(()=>{const lum=c=>c.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);const rgb=c=>(c.match(/[0-9.]+/g)||[]).slice(0,3).map(Number);return[...document.querySelectorAll('[data-editorial-page] h1,[data-editorial-page] h2,[data-editorial-page] h3,[data-editorial-page] p,.site-footer p,.site-footer a')].filter(e=>e.getClientRects().length).map(e=>{let bg=e;while(bg&&getComputedStyle(bg).backgroundColor==='rgba(0, 0, 0, 0)')bg=bg.parentElement;const a=lum(rgb(getComputedStyle(e).color)),b=lum(rgb(getComputedStyle(bg||document.body).backgroundColor));return{ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),text:e.textContent.trim().slice(0,35),foreground:getComputedStyle(e).color,background:getComputedStyle(bg||document.body).backgroundColor}})})()`);assert.ok(contrast.every(x=>x.ratio>=4.5),JSON.stringify(contrast.filter(x=>x.ratio<4.5)));
  if(js&&route==='media'){
   assert.ok(await evalJS("[...document.querySelectorAll('.media-thumbnail')].every(e=>e.complete&&e.naturalWidth>0)"));
   await evalJS("document.querySelector('.media-track').focus()");await key('End');await pause(100);assert.ok(await evalJS("document.querySelector('.media-track').scrollLeft>0"));await key('Home');
  }
 }
 results.push({stage,route,width,theme,js,overflow});
 }
 writeFileSync(out+'/results.json',JSON.stringify({results,errors,missing},null,2));assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);console.log(JSON.stringify({output:out,cases:results.length}));
}finally{socket?.close();chrome.kill();}
