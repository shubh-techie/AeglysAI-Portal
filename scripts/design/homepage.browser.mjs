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
const load=async()=>{const url='http://localhost:4321/?design='+Date.now();await call('Page.navigate',{url});for(let i=0;i<120;i++){if(await evalJS(`location.href===${JSON.stringify(url)}&&document.readyState==='complete'`)){await pause(80);return;}await pause(30);}throw Error('Navigation timeout');};
const shot=async name=>{await evalJS('document.activeElement.blur();scrollTo(0,0)');const metrics=await call('Page.getLayoutMetrics');const clip={x:0,y:0,width:metrics.cssContentSize.width,height:Math.min(metrics.cssContentSize.height,20000),scale:1};const x=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});writeFileSync(`${out}/${name}.png`,Buffer.from(x.data,'base64'));};
try{
 let tabs;for(let i=0;i<120;i++){try{tabs=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();if(tabs.length)break;}catch{}await pause(50);}assert.ok(tabs?.length);
 socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});socket.onmessage=e=>{const x=JSON.parse(e.data);if(x.id){const p=pending.get(x.id);pending.delete(x.id);if(p)x.error?p.reject(Error(JSON.stringify(x.error))):p.resolve(x.result);}if(x.method==='Fetch.requestPaused')void serve(x.params);if(x.method==='Runtime.exceptionThrown')errors.push(x.params.exceptionDetails.text);if(x.method==='Runtime.consoleAPICalled'&&x.params.type==='error')errors.push(x.params.args.map(a=>a.value??a.description));};
 await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});await call('Page.addScriptToEvaluateOnNewDocument',{source:"try{localStorage.removeItem('aeglysai-theme')}catch{}"});

 const stage=process.argv[2]??'after';assert.ok(['before','after'].includes(stage));
 const approvedBaseline=process.env.HOME_PRESERVE_APPROVED==='1'?JSON.parse(readFileSync(JSON.parse(readFileSync(base+'/browser-before.log','utf8').trim().split('\n').at(-1)).output+'/results.json','utf8')).results:null;
 for(const width of[320,360,375,390,430,768,820,1024,1280,1440,1920])for(const theme of['light','dark'])for(const js of[true,false]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768});await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});await call('Emulation.setScriptExecutionDisabled',{value:!js});await load();
  assert.equal(await evalJS('document.documentElement.scrollWidth>innerWidth'),false,`${stage} ${width} ${theme}`);assert.equal(await evalJS('document.querySelectorAll("main h1").length'),1);
  const layout=await evalJS(`(()=>{const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height}};const c=document.createElement('canvas').getContext('2d');c.font=getComputedStyle(document.querySelector('h1')).font;return{hero:box('.research-visual svg'),architecture:box('.home-architecture .architecture'),stages:[...document.querySelectorAll('.home-model-rows article')].map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height}}),headlineMinimumWidth:c.measureText('Intelligence,').width,approved:Object.fromEntries(['question','media','speaking','collaboration','footer'].map(name=>{const e=document.querySelector(name==='footer'?'.site-footer':'[data-home-surface='+name+']'),r=e.getBoundingClientRect(),h=e.querySelector('h2'),cs=getComputedStyle(e);return[name,{width:r.width,height:r.height,background:cs.backgroundColor,color:cs.color,headingFont:h?getComputedStyle(h).font:null}]}))}})()`);
  let minimumTextContrast=null;let surfaceGeometry=null;
  if(stage==='after'){
   if(approvedBaseline){const old=approvedBaseline.find(r=>r.width===width&&r.theme===theme&&r.js===js).layout.approved;for(const [name,value]of Object.entries(layout.approved)){for(const key of['width','height'])assert.ok(Math.abs(value[key]-old[name][key])<.1,name+' '+key+' changed');for(const key of['background','color','headingFont'])assert.equal(value[key],old[name][key],name+' '+key);}}
   assert.equal(await evalJS("document.querySelectorAll('.home-model-rows article').length"),4);
   const stages=layout.stages,rows=new Set(stages.map(s=>Math.round(s.y))),columns=new Set(stages.map(s=>Math.round(s.x)));
   if(width>=1280){assert.equal(rows.size,1);assert.equal(columns.size,4);assert.ok(Math.max(...stages.map(s=>s.height))-Math.min(...stages.map(s=>s.height))<1);}
   else{assert.equal(rows.size,1);assert.ok(await evalJS("document.querySelector('.home-model-rows').scrollWidth>document.querySelector('.home-model-rows').clientWidth"));await evalJS("document.querySelector('.home-model-rows article:last-child a').focus()");assert.ok(await evalJS("document.querySelector('.home-model-rows').scrollLeft>0"));await evalJS("document.querySelector('.home-model-rows').scrollLeft=0");}
assert.equal(rows.size,1);
   assert.ok(Math.max(...stages.map(s=>s.height))-Math.min(...stages.map(s=>s.height))<1);
   assert.ok(await evalJS("(()=>{const t=document.querySelector('.home-model-rows'),n=document.querySelector('.home-research-note');return !t.contains(n)&&n.getBoundingClientRect().top>=t.getBoundingClientRect().bottom})()"));
   if(js&&width<1280){
    await evalJS("document.querySelector('#research-models').scrollLeft=0");await pause(80);
    assert.equal(await evalJS("document.querySelector('[data-model-controls]').hidden"),false);
    assert.equal(await evalJS("document.querySelector('[data-model-prev]').disabled"),true);
    for(let index=0;index<4;index++){
     if(index)await evalJS("document.querySelector('[data-model-next]').click()");await pause(150);
     assert.ok(await evalJS(`(()=>{const r=document.querySelectorAll('#research-models article')[${index}].getBoundingClientRect(),t=document.querySelector('#research-models').getBoundingClientRect();return r.left>=t.left-3&&r.right<=t.right+3})()`),'control reveals model '+index);
    }
    assert.equal(await evalJS("document.querySelector('[data-model-next]').disabled"),true);assert.match(await evalJS("document.querySelector('[data-model-position]').textContent"),/4/);
    await evalJS("document.querySelector('#research-models').focus()");await key('Home');await pause(150);assert.equal(await evalJS("document.querySelector('#research-models').scrollLeft"),0);
    await key('End');await pause(150);assert.equal(await evalJS("document.querySelector('[data-model-next]').disabled"),true);
   }
   for(const index of[0,1,2,3]){
    await evalJS("document.querySelector('.home-model-rows').scrollLeft=0;document.querySelector('.home-model-rows').focus()");
    const visible=()=>evalJS(`(()=>{const a=document.querySelectorAll('.home-model-rows article a')[${index}].getBoundingClientRect(),t=document.querySelector('.home-model-rows').getBoundingClientRect();return a.left>=t.left-1&&a.right<=t.right+1})()`);
    for(let tries=0;tries<30&&!await visible();tries++){await key('ArrowRight');await pause(100);}
    assert.ok(await visible(),JSON.stringify({width,theme,js,index}));
   }
   await evalJS("document.querySelector('.home-model-rows').scrollLeft=0");
   if(width<1280){await evalJS("document.querySelector('.home-model-rows').focus()");await key('ArrowRight');await pause(150);assert.ok(await evalJS("document.querySelector('.home-model-rows').scrollLeft>0"));await evalJS("document.querySelector('.home-model-rows').scrollLeft=0");}
   if(width<1280){
    await evalJS("document.activeElement.blur();document.querySelector('.home-model-rows').scrollLeft=0;document.querySelector('.home-model-rows').scrollIntoView({block:'center',behavior:'instant'})");
    const point=await evalJS("(()=>{const r=document.querySelector('.home-model-rows').getBoundingClientRect();return{x:r.right-40,y:Math.min(innerHeight-80,Math.max(80,r.top+80))}})()");
    await call('Input.synthesizeScrollGesture',{...point,xDistance:-240,yDistance:0,gestureSourceType:'touch',speed:600});await pause(250);
    assert.ok(await evalJS("document.querySelector('.home-model-rows').scrollLeft>0"),'touch card scrolling');await evalJS("document.querySelector('.home-model-rows').scrollLeft=0");
   }
   assert.ok(await evalJS("(()=>{const h=document.querySelector('.home-architecture-intro').getBoundingClientRect(),e=document.querySelector('.home-architecture .architecture'),d=e.getBoundingClientRect(),c=document.querySelector('.home-architecture-layout').getBoundingClientRect();return d.top>=h.bottom&&Math.abs(d.width-c.width)<1&&e.scrollWidth<=e.clientWidth+1})()"));
   assert.equal(await evalJS("document.querySelectorAll('#featured-media [data-media-id]').length"),6);assert.equal(await evalJS("document.querySelectorAll('.ed-collaboration').length"),1);assert.equal(await evalJS("document.querySelectorAll('iframe').length"),0);
   assert.ok(await evalJS("document.querySelector('.home-research-note').textContent.includes('enforcement_authority=NONE')"));
   const surfaces=await evalJS("[...document.querySelectorAll('[data-home-surface]')].map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{name:e.dataset.homeSurface,background:s.backgroundColor,width:r.width,x:r.x,colorScheme:s.colorScheme}})");
   assert.equal(surfaces.length,8);const availableWidth=await evalJS('document.documentElement.clientWidth');for(const s of surfaces){assert.equal(s.x,0);assert.equal(s.width,availableWidth);}
   surfaceGeometry=surfaces;const surfaceMap=Object.fromEntries(surfaces.map(s=>[s.name,s.background]));assert.equal(surfaceMap.hero,'rgb(8, 15, 28)');assert.equal(surfaceMap.research,'rgb(244, 240, 231)');assert.equal(surfaceMap.collaboration,'rgb(18, 62, 97)');assert.notEqual(surfaceMap.hero,surfaceMap.architecture);assert.notEqual(surfaceMap.research,surfaceMap.architecture);

   await load();await key('Tab');assert.equal(await evalJS("document.activeElement.classList.contains('skip-link')"),true);await key('Enter');assert.equal(await evalJS('document.activeElement.id'),'main');
   await evalJS("document.querySelector('.home-hero-copy .ed-action').focus()");assert.equal(await evalJS("getComputedStyle(document.activeElement).outlineStyle"),'solid');
   const geometry=()=>evalJS("[...document.querySelectorAll('.home-editorial-hero,.home-model-rows,.home-question,.home-speaking-preview')].map(e=>{const r=e.getBoundingClientRect();return[r.width,r.height,r.top+scrollY]})");const before=await geometry();
   await evalJS("[...document.images].filter(i=>new URL(i.src).origin===location.origin).forEach(i=>i.loading='eager')");await pause(180);assert.deepEqual(await geometry(),before);
   assert.ok(await evalJS("[...document.images].filter(i=>new URL(i.src).origin===location.origin).every(i=>i.complete&&i.naturalWidth>0)"));
   const contrast=await evalJS(`(()=>{const lum=s=>(s.match(/[\\d.]+/g)||[]).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);return[...document.querySelectorAll('.home-hero-copy h1,.home-hero-copy p,.ed-section-header h2,.ed-section-header p,.ed-content-row h3,.ed-content-row p,.ed-content-row a,.home-research-note p,.home-future p,.ed-collaboration h2,.ed-collaboration p,.ed-action')].map(e=>{let b=e;while(b&&getComputedStyle(b).backgroundColor==='rgba(0, 0, 0, 0)')b=b.parentElement;const a=lum(getComputedStyle(e).color),c=lum(getComputedStyle(b||document.body).backgroundColor);return{ratio:(Math.max(a,c)+.05)/(Math.min(a,c)+.05),text:e.textContent.slice(0,40)}})})()`);assert.ok(contrast.every(x=>x.ratio>=4.5),JSON.stringify(contrast));minimumTextContrast=Math.min(...contrast.map(x=>x.ratio));
   assert.ok(await evalJS("[...document.querySelectorAll('.home-editorial a.ed-link,.home-editorial a.ed-action')].every(e=>e.getBoundingClientRect().height>=44)"));
   if(js){await evalJS("document.querySelector('#featured-media .media-track').focus()");await key('End');await pause(80);assert.ok(await evalJS("document.querySelector('#featured-media .media-track').scrollLeft>0"));await key('Home');await pause(80);assert.equal(await evalJS("document.querySelector('#featured-media .media-track').scrollLeft"),0);await evalJS("document.querySelector('[data-theme-toggle]').click()");assert.equal(await evalJS('document.documentElement.dataset.theme'),theme==='light'?'dark':'light');await evalJS("document.querySelector('[data-theme-toggle]').click()");}
   else{await evalJS("[...document.querySelectorAll('#featured-media a.media-read')].at(-1).focus()");assert.ok(await evalJS("document.querySelector('#featured-media .media-track').scrollLeft>0"));}
   await evalJS("document.querySelector('#featured-media .media-track').scrollLeft=0");
  }
  if(([390,768,1440].includes(width))&&js){await shot(`${stage}-${width}-${theme}`);for(const name of['research','architecture']){const clip=await evalJS(`(()=>{const r=document.querySelector('[data-home-surface="${name}"]').getBoundingClientRect();return{x:0,y:r.top+scrollY,width:document.documentElement.clientWidth,height:r.height,scale:1}})()`);const image=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});writeFileSync(`${out}/${stage}-${name}-${width}-${theme}.png`,Buffer.from(image.data,'base64'));}const image=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${out}/${stage}-hero-${width}-${theme}.png`,Buffer.from(image.data,'base64'));}
  results.push({stage,width,theme,js,minimumTextContrast,surfaceGeometry,layout});
 }
 if(stage==='after'){
  await call('Emulation.setScriptExecutionDisabled',{value:false});
  const {readdirSync}=await import('node:fs');const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(resolve(p,e.name)):[resolve(p,e.name)]);const routes=walk(root).filter(p=>p.endsWith('.html'));assert.equal(routes.length,28);
  for(const path of routes){const relative=path.slice(root.length);await call('Page.navigate',{url:'http://localhost:4321'+(relative==='/404.html'?relative:relative.replace('index.html',''))+'?route='+Date.now()});await pause(80);assert.equal(await evalJS('document.querySelectorAll("h1").length'),1);}
 }
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);writeFileSync(out+'/results.json',JSON.stringify({cases:results.length,results,errors,missing},null,2)+'\n');console.log(JSON.stringify({cases:results.length,errors,missing,output:out}));
}finally{socket?.close();chrome.kill();}
