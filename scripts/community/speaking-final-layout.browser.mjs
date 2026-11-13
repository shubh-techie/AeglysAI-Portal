/* Node 24 + installed Chrome; no dependencies or development-process changes.
 * CDP serves archived/production bytes at the existing localhost URL for comparison.
 * All requests are intercepted; forms/external services are never contacted.
 */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdirSync,readFileSync,writeFileSync,existsSync,readdirSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {youtubeId} from '../../src/data/youtube.ts';
const configuredVideoIds=JSON.parse(readFileSync('src/data/speakingRecordings.json','utf8')).map(record=>youtubeId(record.id));
const evidenceRoot=process.env.SPEAK_EVIDENCE_ROOT??'.community-drafts/speak001e-final';
const innerLimit=width=>width*(width<=600?.96:.92);
const output=resolve(`${evidenceRoot}/layout-${Date.now()}`);mkdirSync(output,{recursive:true});
const debugPort=24000+process.pid%10000;
const chrome=spawn(process.env.HACK_CHROME_BIN??'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking',`--remote-debugging-port=${debugPort}`,`--user-data-dir=${output}/chrome`,'about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));let socket,sequence=0,root;const navigationRoots=new Map();
const modalMeasurements=[],interactionMeasurements=[],carouselMeasurements=[];
const pending=new Map(),exceptions=[],results=[],requestErrors=[],requests=[],missing=[];
const call=(method,params={})=>new Promise((r,j)=>{const id=++sequence;const timer=setTimeout(()=>{pending.delete(id);j(Error(`CDP timeout: ${method}`));},20000);pending.set(id,{resolve:v=>{clearTimeout(timer);r(v);},reject:e=>{clearTimeout(timer);j(e);}});socket.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description??r.exceptionDetails.text);return r.result.value;};
const key=async name=>{for(const type of ['keyDown','keyUp'])await call('Input.dispatchKeyEvent',{type,key:name,code:name===' '?'Space':name,windowsVirtualKeyCode:{' ':32,Tab:9,Enter:13,ArrowRight:39,Home:36,End:35,Escape:27}[name],...(type==='keyDown'&&name==='Enter'?{text:'\r'}:{})});};
const serve=async p=>{
 try{
  const url=new URL(p.request.url);let status=204,body='',mime='text/plain';
  if(url.origin==='http://localhost:4321'){
   const referrer=Object.entries(p.request.headers).find(([key])=>key.toLowerCase()==='referer')?.[1];
   const requestRoot=referrer?navigationRoots.get(new URL(referrer).search)??root:root;
   const pathname=decodeURIComponent(url.pathname);const file=resolve(requestRoot,`.${pathname}${pathname.endsWith('/')?'index.html':''}`);
   assert.ok(file.startsWith(requestRoot+'/'));
   status=existsSync(file)?200:404;if(status===404&&!pathname.endsWith('favicon.ico'))missing.push(pathname);
   if(status===200){body=readFileSync(file).toString('base64');mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.svg':'image/svg+xml','.xml':'application/xml'}[extname(file)]??'application/octet-stream';}
  }
  await call('Fetch.fulfillRequest',{requestId:p.requestId,responseCode:status,responseHeaders:[{name:'Content-Type',value:mime},{name:'Cache-Control',value:'no-store'}],body});
 }catch(error){requestErrors.push(String(error));await call('Fetch.failRequest',{requestId:p.requestId,errorReason:'Failed'});}
};
const navigate=async path=>{
 const query=`?time001a=${Date.now()}-${sequence}`;navigationRoots.set(query,root);await call('Page.navigate',{url:`http://localhost:4321${path}${query}`});
 let ready=false;for(let n=0;n<160;n++){try{if(await evaluate(`location.search===${JSON.stringify(query)}&&document.readyState==='complete'`)){ready=true;break;}}catch{}await pause(30);}assert.ok(ready,path);
};
try{
 let tabs;for(let n=0;n<160;n++){try{tabs=await(await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();if(tabs.some(t=>t.type==='page'))break;}catch{}await pause(50);}assert.ok(tabs?.some(t=>t.type==='page'));
 socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
 socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(p)m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}if(m.method==='Network.requestWillBeSent')requests.push(m.params.request.url);if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params.exceptionDetails.text);if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')exceptions.push({console:m.params.args.map(a=>a.value??a.description)});if(m.method==='Fetch.requestPaused')void serve(m.params);};
 await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});


 const cardBoxes=()=>evaluate("[...document.querySelectorAll('.sp-compact-event')].map(e=>{const r=e.getBoundingClientRect();return{id:e.dataset.speakingEvent,x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,open:e.querySelector('details').open,column:getComputedStyle(e).gridColumn}})");
 const stable=(before,after)=>{for(let i=0;i<before.length;i++){assert.equal(after[i].open,false);assert.equal(after[i].column,before[i].column);for(const key of['x','y','width','height'])assert.ok(Math.abs(before[i][key]-after[i][key])<1,`${before[i].id} ${key} changed ${before[i][key]}→${after[i][key]}`);}};
 const pointerClick=async(selector,whitespace=false)=>{await evaluate(`document.querySelector('${selector}').scrollIntoView({block:'center',behavior:'instant'})`);const point=await evaluate(`(()=>{const r=document.querySelector('${selector}').getBoundingClientRect();return{x:${whitespace?'r.right-8':'r.left+r.width/2'},y:${whitespace?'r.top+60':'r.top+r.height/2'}}})()`);for(const type of['mousePressed','mouseReleased'])await call('Input.dispatchMouseEvent',{type,...point,button:'left',clickCount:1});};
 const inventory=JSON.parse(readFileSync('src/data/speakingPhotos.generated.json','utf8')),ids=Object.keys(inventory.photos);
 const pauseImage=async selector=>{for(let attempt=0;attempt<35;attempt++){if(await evaluate(`(()=>{const i=document.querySelector(${JSON.stringify(selector)});return !!i&&i.complete&&i.naturalWidth>0})()`))return;await pause(60);}throw Error(`Image did not decode: ${selector}`);};
 const screenshot=async(name,selector)=>{
  const count=await evaluate(`document.querySelectorAll('${selector} img').length`);for(let i=0;i<count;i++){const visible=await evaluate(`(()=>{const i=document.querySelectorAll('${selector} img')[${i}];return i.getClientRects().length&&!i.closest('details:not([open]),dialog:not([open])')})()`);if(!visible)continue;await evaluate(`document.querySelectorAll('${selector} img')[${i}].scrollIntoView()`);await pause(90);}
  if(selector==='#recordings'){await evaluate("document.querySelector('[data-video-track]')?.scrollTo({left:0,behavior:'instant'})");await pause(80);}
  const clip=await evaluate(`(()=>{const e=document.querySelector('${selector}');e.scrollIntoView({behavior:'instant'});const r=e.getBoundingClientRect();return{x:0,y:r.top+scrollY,width:innerWidth,height:r.height,scale:1}})()`);const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});writeFileSync(`${output}/${name}.png`,Buffer.from(shot.data,'base64'));
 };
 root=resolve(`${evidenceRoot}/before-dist`);for(const width of[320,390,1440])for(const theme of['light','dark']){await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768});await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme}]});await navigate('/speaking/');await screenshot(`before-${width}-${theme}`,'#engagements');await evaluate("document.querySelector('.sp-card-gallery [data-speaking-photo]').click()");const beforeShot=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${output}/before-viewer-${width}-${theme}.png`,Buffer.from(beforeShot.data,'base64'));await key('Escape');}
 root=resolve('dist');
 for(const width of[320,375,390,430,768,1024,1440])for(const theme of['light','dark'])for(const js of[true,false]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768});await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});await call('Emulation.setScriptExecutionDisabled',{value:!js});const start=requests.length;await navigate('/speaking/');
  assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false);assert.equal(await evaluate('document.querySelectorAll("iframe").length'),0);assert.ok(requests.slice(start).every(url=>!/^https?:/.test(url)||new URL(url).origin==='http://localhost:4321'));
  assert.equal(await evaluate("document.querySelectorAll('#recordings [data-recording-id]').length"),configuredVideoIds.length);
  // Media-pattern carousel: geometry, range navigation, keyboard and drag safety.
  const expectedVisible=width>=1024?3:width>=640?2:1;
  const carouselGeometry=await evaluate("(()=>{const t=document.querySelector('[data-video-track]'),r=t.getBoundingClientRect(),s=[...t.querySelectorAll('[data-video-slide]')];return{width:t.clientWidth,slides:s.map(e=>{const b=e.getBoundingClientRect(),a=e.querySelector('article').getBoundingClientRect(),m=e.querySelector('.sp-video-stage').getBoundingClientRect();return{width:b.width,height:a.height,mediaRatio:m.width/m.height}})}})()");
  assert.ok(Math.abs(carouselGeometry.slides[0].width-(carouselGeometry.width-24*(expectedVisible-1))/expectedVisible)<1);
  assert.ok(Math.max(...carouselGeometry.slides.map(e=>e.height))-Math.min(...carouselGeometry.slides.map(e=>e.height))<1);assert.ok(carouselGeometry.slides.every(e=>Math.abs(e.mediaRatio-16/9)<.02));
  if(js){
   const range=async(first)=>{const expected=`Videos ${first+1}–${Math.min(configuredVideoIds.length,first+expectedVisible)} of ${configuredVideoIds.length}`;for(let attempt=0;attempt<45;attempt++){if(await evaluate("document.querySelector('[data-video-position]').textContent")===expected)return;await pause(25);}assert.fail(expected);};
   await range(0);assert.equal(await evaluate("document.querySelector('[data-video-prev]').disabled"),true);
   await evaluate("document.querySelector('[data-video-next]').click()");await range(1);await evaluate("document.querySelector('[data-video-prev]').click()");await range(0);
   await evaluate("document.querySelector('[data-video-track]').focus()");await key('End');await range(configuredVideoIds.length-expectedVisible);assert.ok(await evaluate("document.querySelector('[data-video-next]').disabled"));await key('Home');await range(0);await key('ArrowRight');await range(1);await key('ArrowLeft');await range(0);
   assert.ok(await evaluate("document.querySelector('[data-video-controls]').getBoundingClientRect().top>=document.querySelector('[data-video-track]').getBoundingClientRect().bottom"));
   await evaluate("document.querySelector('[data-video-track]').scrollIntoView({block:'center',behavior:'instant'})");
   const drag=await evaluate("(()=>{const r=document.querySelector('[data-video-play]').getBoundingClientRect();return{x:r.left+r.width*.8,y:r.top+r.height/2,end:r.left+r.width*.2}})()");
   await call('Input.dispatchMouseEvent',{type:'mousePressed',x:drag.x,y:drag.y,button:'left',clickCount:1});for(let i=1;i<=6;i++)await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:drag.x+(drag.end-drag.x)*i/6,y:drag.y,button:'left',buttons:1});await call('Input.dispatchMouseEvent',{type:'mouseReleased',x:drag.end,y:drag.y,button:'left',clickCount:1});await range(1);assert.equal(await evaluate('document.querySelectorAll("iframe").length'),0,'Dragging thumbnail must not play a video');
   await evaluate("document.querySelector('[data-video-track]').focus()");await key('Home');await range(0);
   if(width<=768){
    await call('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
    const touch=await evaluate("(()=>{const r=document.querySelector('[data-video-track]').getBoundingClientRect();return{x:r.right-25,end:r.left+25,y:r.top+80}})()");
    await call('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:touch.x,y:touch.y,id:1}]});for(let i=1;i<=8;i++){await call('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:touch.x+(touch.end-touch.x)*i/8,y:touch.y,id:1}]});await pause(25);}await call('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await pause(500);
    assert.ok(await evaluate("document.querySelector('[data-video-track]').scrollLeft>30"));assert.equal(await evaluate('document.querySelectorAll("iframe").length'),0);await call('Emulation.setTouchEmulationEnabled',{enabled:false});await evaluate("document.querySelector('[data-video-track]').focus()");await key('Home');await range(0);
   }
  }else{
   assert.ok(await evaluate("document.querySelector('[data-video-controls]').hidden"));await evaluate("document.querySelector('[data-recording-id=\"CEEVv2PYkfg\"] a').focus()");assert.ok(await evaluate("document.querySelector('[data-video-track]').scrollLeft>0"));await evaluate("document.querySelector('[data-video-track]').scrollTo({left:0,behavior:'instant'})");
  }
  carouselMeasurements.push({width,theme,js,visible:expectedVisible,total:configuredVideoIds.length,geometry:carouselGeometry});
  const metrics=await evaluate("[...document.querySelectorAll('.sp-compact-event')].map(e=>{const r=e.getBoundingClientRect(),f=e.querySelector('.sp-card-media-frame')?.getBoundingClientRect(),a=e.querySelector('[data-event-trigger]').getBoundingClientRect(),b=e.querySelector('.sp-card-status').getBoundingClientRect(),d=e.querySelector('.sp-event-date').getBoundingClientRect();return{id:e.dataset.speakingEvent,width:r.width,height:r.height,mediaRatio:f?f.width/f.height:null,badgeTop:b.top-r.top,dateTop:d.top-r.top,actionGap:r.bottom-a.bottom,actionHeight:a.height}})");
  const photoMetrics=metrics.filter(m=>m.mediaRatio!==null),emptyMetrics=metrics.filter(m=>m.mediaRatio===null);
  for(const field of['height','actionGap'])assert.ok(Math.max(...photoMetrics.map(m=>m[field]))-Math.min(...photoMetrics.map(m=>m[field]))<=1,`${width}/${theme}/${js}: ${field} ${JSON.stringify(metrics)}`);
  assert.ok(metrics.every(m=>(m.mediaRatio===null||Math.abs(m.mediaRatio-16/9)<.02)&&m.actionHeight>=44));assert.equal(await evaluate("getComputedStyle(document.querySelector('.sp-event-grid')).gridTemplateColumns.split(' ').length"),width<=760?1:width<=1100?2:3);
  assert.equal(await evaluate("document.querySelectorAll('.sp-card-gallery .sp-carousel-controls,.sp-card-gallery .sp-gallery-thumbnails').length"),0);
  assert.equal(await evaluate("document.querySelectorAll('[data-event-dialog]').length"),0);
  assert.ok(emptyMetrics.every(m=>m.height<Math.min(...photoMetrics.map(p=>p.height))));
  assert.ok(await evaluate("[...document.querySelectorAll('.sp-card-summary')].every(e=>e.scrollHeight<=e.clientHeight+1)"));
  for(const [filter,expected]of [['all',3],['completed',2],['accepted',1]]){
   await evaluate(`document.querySelector('#engagement-${filter}').click()`);
   assert.equal(await evaluate("[...document.querySelectorAll('.sp-compact-event')].filter(e=>getComputedStyle(e).display!=='none').length"),expected);
  }
  await evaluate("document.querySelector('#engagement-all').click();document.querySelector('#engagement-all').focus()");
  for(const expected of[2,1,3]){await key('ArrowRight');assert.equal(await evaluate("[...document.querySelectorAll('.sp-compact-event')].filter(e=>getComputedStyle(e).display!=='none').length"),expected);}
  assert.equal(await evaluate("[...document.querySelectorAll('.sp-compact-event')].filter(e=>e.dataset.engagementStatus==='Completed').length"),2);
  assert.equal(await evaluate("document.querySelector('[data-speaking-event=\"etic-2026\"]').dataset.engagementStatus"),'Invitation Accepted');
  for(const id of ids){
   const count=inventory.photos[id].length,card=`.sp-event-grid [data-speaking-event="${id}"]`;
   assert.equal(await evaluate(`document.querySelectorAll('${card} [data-speaking-photo]').length`),count*2);
   assert.equal(await evaluate(`document.querySelector('${card} .sp-card-photo-count')?.textContent??null`),count?`${count} photo${count===1?'':'s'}`:'No photos published');
   assert.equal(await evaluate(`document.querySelectorAll('${card} .sp-card-gallery .sp-photo:not([hidden])').length`),Math.min(count,4));
   const action=card+' [data-event-trigger]';
   assert.equal(await evaluate(`document.querySelectorAll('${card} a[href*="youtube.com"],${card} iframe,${card} [data-video-play]').length`),0);
   if(!js){await evaluate(`document.querySelector('${action}').focus()`);await key('Enter');assert.equal(await evaluate(`document.querySelector('${card} details').open`),true);assert.ok(await evaluate(`document.querySelector('${card} details').innerText.includes('Organizer')`));assert.equal(await evaluate(`document.querySelectorAll('${card} details [data-speaking-photo]').length`),count);assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false);await key('Enter');continue;}
   if(count>1){for(let i=0;i<Math.min(count,4);i++){
    await evaluate(`document.querySelectorAll('${card} .sp-card-gallery [data-speaking-photo]')[${i}].focus()`);await key('Enter');
    assert.equal(await evaluate("document.querySelector('[data-photo-counter]').textContent"),`${i+1} / ${count}`);await key('Escape');
   }}
   // Every intended surface opens the one existing dialog without opening grid details.
   for(const source of['photo','title','body','whitespace','action','Enter','Space']){
    const selector=source==='photo'?card+' .sp-card-gallery [data-speaking-photo]':source==='title'?card+' h3':source==='body'?card+' .sp-card-summary':source==='whitespace'?card+' .sp-compact-copy':action;
    if(source==='photo'&&!count)continue;
    const before=await cardBoxes();
    if(source==='Enter'||source==='Space'){await evaluate(`document.querySelector('${action}').focus()`);await key(source==='Enter'?'Enter':' ');}else await pointerClick(selector,source==='whitespace');
    const during=await cardBoxes();stable(before,during);
    assert.equal(await evaluate("document.querySelector('[data-speaking-lightbox]').open"),true);assert.equal(await evaluate('document.body.style.overflow'),'hidden');
    assert.equal(await evaluate("document.querySelector('[data-speaking-lightbox]').closest('.sp-event-grid')"),null);
    assert.ok(await evaluate("document.querySelector('[data-speaking-lightbox] [data-viewer-dates]').textContent.length>0"));assert.equal(await evaluate("document.querySelector('[data-speaking-lightbox] [data-viewer-status]').textContent"),id==='etic-2026'?'Invitation Accepted':'Completed');
    await key('Escape');const after=await cardBoxes();stable(before,after);assert.equal(await evaluate('document.body.style.overflow'),'');
    const restore=source==='photo'?selector:action;assert.ok(await evaluate(`document.activeElement===document.querySelector('${restore}')`));
    interactionMeasurements.push({width,theme,id,source,before,during,after});
   }
   for(const source of count?['photo','action']:['action']){
    const selector=source==='photo'?card+' .sp-card-gallery [data-speaking-photo]':action;
    await evaluate(`document.querySelector('${selector}').focus()`);await key('Enter');
    assert.equal(await evaluate("document.querySelector('[data-speaking-lightbox]').open"),true);assert.equal(await evaluate('document.body.style.overflow'),'hidden');assert.equal(await evaluate("document.querySelectorAll('dialog[open]').length"),1);assert.equal(await evaluate("document.querySelector('[data-viewer-extra]').querySelectorAll('[id]').length"),0);assert.equal(await evaluate("document.querySelectorAll('[data-speaking-lightbox] a a,[data-speaking-lightbox] button button,[data-speaking-lightbox] a button,[data-speaking-lightbox] button a').length"),0);
    assert.equal(await evaluate("document.querySelector('[data-speaking-lightbox] [data-viewer-name]').textContent"),await evaluate(`document.querySelector('${card} [data-event-content]').dataset.viewerName`));
    assert.equal(await evaluate("document.querySelectorAll('[data-speaking-lightbox] aside,[data-speaking-lightbox] [data-viewer-thumbnails]').length"),0);
    assert.equal(await evaluate("getComputedStyle(document.querySelector('[data-speaking-lightbox]')).backgroundColor"),'rgb(255, 255, 255)');
    assert.ok(await evaluate("(()=>{const body=document.querySelector('.sp-viewer-body'),stage=document.querySelector('[data-viewer-stage]'),caption=document.querySelector('[data-photo-description]');return body.clientHeight<=stage.offsetHeight+caption.offsetHeight+document.querySelector('.sp-photo-event-meta').offsetHeight+2})()"),'No oversized blank body area');
    const bounds=await evaluate("(()=>{const r=document.querySelector('[data-speaking-lightbox]').getBoundingClientRect();return {width:r.width,height:r.height,left:r.left,top:r.top}})()");
    assert.ok(bounds.width<=900.1&&bounds.width<=innerLimit(width)+1);assert.ok(bounds.height<=(width<=600?900:720)+1);assert.ok(Math.abs(bounds.left+bounds.width/2-width/2)<2);assert.ok(Math.abs(bounds.top+bounds.height/2-500)<2);
    await pauseImage('[data-viewer-image]');assert.equal(await evaluate("getComputedStyle(document.querySelector('[data-viewer-image]')).objectFit"),'contain');
    assert.ok(await evaluate("(()=>{const i=document.querySelector('[data-viewer-image]'),r=i.getBoundingClientRect();return r.height<=innerHeight*.6+1&&Math.abs(r.width/r.height-i.naturalWidth/i.naturalHeight)<.02})()"));
    assert.equal(await evaluate("document.querySelector('[data-photo-counter]').textContent"),`1 / ${count}`);
    for(let i=0;i<count;i++){
     if(i)await key('ArrowRight');await pauseImage('[data-viewer-image]');assert.equal(await evaluate("document.querySelector('[data-viewer-image]').alt"),inventory.photos[id][i].alt);assert.ok((await evaluate("document.querySelector('[data-photo-description]').textContent")).includes(inventory.photos[id][i].credit));assert.equal(await evaluate("document.querySelector('[data-photo-counter]').textContent"),`${i+1} / ${count}`);
    }
    await key('Home');
    if(count>1){
     await evaluate("document.querySelector('[data-photo-next]').click()");assert.equal(await evaluate("document.querySelector('[data-photo-counter]').textContent"),`2 / ${count}`);await evaluate("document.querySelector('[data-photo-prev]').click()");
     await key('ArrowLeft');assert.equal(await evaluate("document.querySelector('[data-photo-counter]').textContent"),`${count} / ${count}`);await key('Home');
     await evaluate("(()=>{const s=document.querySelector('[data-viewer-stage]');s.dispatchEvent(new PointerEvent('pointerdown',{isPrimary:true,button:0,clientX:180,clientY:60,bubbles:true}));s.dispatchEvent(new PointerEvent('pointerup',{isPrimary:true,button:0,clientX:80,clientY:65,bubbles:true}))})()");assert.equal(await evaluate("document.querySelector('[data-photo-counter]').textContent"),`2 / ${count}`);await key('Home');
    }else assert.ok(await evaluate("document.querySelector('[data-photo-prev]').hidden&&document.querySelector('[data-photo-next]').hidden"));
    assert.ok(await evaluate("document.querySelector('.sp-lightbox-controls').getBoundingClientRect().top>=document.querySelector('[data-viewer-stage]').getBoundingClientRect().bottom-1"));
    const lastControl=await evaluate("[...document.querySelectorAll('[data-speaking-lightbox] button:not([disabled]),[data-speaking-lightbox] a[href],[data-speaking-lightbox] summary')].filter(e=>e.checkVisibility()&&!e.closest('[hidden]')).at(-1).outerHTML");
    await evaluate("document.querySelector('[data-photo-close]').focus()");for(const type of['keyDown','keyUp'])await call('Input.dispatchKeyEvent',{type,key:'Tab',code:'Tab',windowsVirtualKeyCode:9,modifiers:8});assert.equal(await evaluate('document.activeElement.outerHTML'),lastControl);await key('Tab');assert.ok(await evaluate("document.activeElement.hasAttribute('data-photo-close')"));
    if(source==='photo'&&[320,390,1440].includes(width)){
     await evaluate("document.querySelector('.sp-viewer-body').scrollTop=0");const shot=await call('Page.captureScreenshot',{format:'png'});writeFileSync(`${output}/viewer-${id}-${width}-${theme}.png`,Buffer.from(shot.data,'base64'));
    }
    await evaluate("document.querySelector('[data-viewer-image]').dispatchEvent(new Event('error'))");assert.equal(await evaluate("document.querySelector('[data-photo-error]').hidden"),false);
    await key('Escape');assert.equal(await evaluate("document.querySelector('[data-speaking-lightbox]').open"),false);assert.equal(await evaluate('document.body.style.overflow'),'');assert.ok(await evaluate(`document.activeElement===document.querySelector('${selector}')`));
    await key('Enter');await evaluate("document.querySelector('[data-photo-close]').click()");assert.equal(await evaluate('document.body.style.overflow'),'');await key('Enter');for(const type of['mousePressed','mouseReleased'])await call('Input.dispatchMouseEvent',{type,x:1,y:1,button:'left',clickCount:1});assert.equal(await evaluate("document.querySelector('[data-speaking-lightbox]').open"),false);
    modalMeasurements.push({width,theme,id,source,bounds});
   }
   // External links remain independent: observe native navigation intent, then cancel only in the test.
   await evaluate(`document.querySelector('${action}').click()`);
   await evaluate("document.querySelector('[data-viewer-more]').open=true");
   assert.ok(await evaluate("document.querySelector('[data-viewer-extra]').innerText.includes('Organizer')"));
   const external=await evaluate("(()=>{const a=document.querySelector('[data-speaking-lightbox] [data-viewer-website]');let native=false;document.addEventListener('click',e=>{native=!e.defaultPrevented;e.preventDefault()},{once:true});a.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,button:0}));return{native,href:a.href,target:a.target,rel:a.rel,dialog:document.querySelector('[data-speaking-lightbox]').open}})()");
   assert.ok(external.native&&external.dialog&&external.href.startsWith('https://')&&external.target==='_blank'&&external.rel.includes('noopener'));
   assert.equal(await evaluate("document.querySelectorAll('[data-speaking-lightbox] a[href*=\"youtube.com\"],[data-speaking-lightbox] iframe,[data-speaking-lightbox] [data-video-play]').length"),0);
   await key('Escape');assert.equal(await evaluate(`document.querySelector('${card} details').open`),false);

  }
  if(js){
   // An empty ETIC fixture must never reuse a previous event's photos or expand the card.
   const beforeEmpty=await cardBoxes();await evaluate("document.querySelectorAll('.sp-compact-event[data-speaking-event=\"etic-2026\"] [data-speaking-photo]').forEach(e=>e.remove());document.querySelector('.sp-compact-event[data-speaking-event=\"etic-2026\"] [data-event-trigger]').click()");
   assert.equal(await evaluate("document.querySelector('[data-speaking-lightbox]').open"),true);assert.equal(await evaluate("document.querySelector('[data-photo-counter]').textContent"),'No photos');assert.ok(await evaluate("document.querySelector('[data-viewer-image]').hidden"));assert.ok(await evaluate("document.querySelector('[data-speaking-lightbox] [data-viewer-website]').href.startsWith('https://')"));await key('Escape');stable(beforeEmpty,await cardBoxes());await navigate('/speaking/');
   if(inventory.sources.length){await evaluate("document.querySelector('.sp-card-gallery [data-speaking-photo]').focus()");await key('Enter');await pauseImage('[data-viewer-image]');assert.equal(await evaluate("document.querySelector('[data-photo-error]').hidden"),true);await key('Escape');assert.equal(await evaluate('document.body.style.overflow'),'');}
   for(const[i,id]of configuredVideoIds.entries()){await evaluate(`document.querySelector('[data-recording-id="${id}"] [data-video-thumbnail]').scrollIntoView({block:'center'})`);await pauseImage(`[data-recording-id="${id}"] [data-video-thumbnail]`);await evaluate(`document.querySelector('[data-recording-id="${id}"] [data-video-play]').focus()`);await key(i===0||id==='CEEVv2PYkfg'?' ':'Enter');assert.equal(await evaluate('document.querySelectorAll("iframe").length'),i+1);assert.ok(await evaluate(`[...document.querySelectorAll('iframe')].some(f=>f.src==='https://www.youtube-nocookie.com/embed/${id}')`));}await navigate('/speaking/');
   if(inventory.sources.length){await evaluate("document.querySelector('[data-speaking-image]').dispatchEvent(new Event('error'))");assert.ok(await evaluate("document.querySelector('[data-speaking-image]').hidden"));await navigate('/speaking/');}
   if([320,390,1440].includes(width)){await screenshot(`after-${width}-${theme}`,'#engagements');await screenshot(`watch-learn-${width}-${theme}`,'#recordings');}
  }else for(const id of configuredVideoIds)assert.equal(await evaluate(`document.querySelector('[data-recording-id="${id}"] [data-video-play]').getAttribute('href')`),`https://www.youtube.com/watch?v=${id}`);
  results.push({width,theme,js,metrics});
 }
 await call('Emulation.setScriptExecutionDisabled',{value:false});root=resolve('dist');const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${p}/${e.name}`):[`${p}/${e.name}`]);const routes=walk(root).filter(p=>p.endsWith('.html')).map(p=>p.slice(root.length).replace(/index.html$/,''));for(const route of routes){await navigate(route);assert.equal(await evaluate('document.querySelectorAll("h1").length'),1);}
 const fixtureRoot=readFileSync('.community-drafts/speak001i/fifth-fixture-path.txt','utf8').trim();root=resolve(fixtureRoot,'dist');
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await navigate('/speaking/');
 assert.equal(await evaluate("document.querySelectorAll('[data-video-slide]').length"),5);
 assert.equal(await evaluate("document.querySelector('[data-video-position]').textContent"),'Videos 1–3 of 5');await evaluate("document.querySelector('[data-video-track]').focus()");await key('End');await pause(100);assert.equal(await evaluate("document.querySelector('[data-video-position]').textContent"),'Videos 3–5 of 5');assert.ok(await evaluate("document.querySelector('[data-video-next]').disabled"));assert.equal(await evaluate('document.querySelectorAll("iframe").length'),0);
 assert.deepEqual(exceptions,[]);assert.deepEqual(missing,[]);assert.deepEqual(requestErrors,[]);writeFileSync(`${output}/results.json`,JSON.stringify({results,modalMeasurements,interactionMeasurements,carouselMeasurements,fifthFixtureVerified:true,routes,exceptions,missing,requestErrors},null,2)+'\n');console.log(JSON.stringify({cases:results.length,routes:routes.length,exceptions:exceptions.length,missing:missing.length,output}));
}finally{socket?.close();chrome.kill();}
