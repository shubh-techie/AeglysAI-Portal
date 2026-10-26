/* Optional local Chrome/CDP checks; Node 24, Python 3, no npm/browser dependency. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const stage = 'navigation';
const serverPort=14000+process.pid%10000;
const browserPort=serverPort+10000;
const output = resolve('.community-drafts/ux-001a');
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
    // Let the site's smooth keyboard-focus scrolling settle before a physical tap.
    await pause(350);
    await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'nearest',behavior:'instant'})`);
    await pause(40);
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
  await call('Page.enable');await call('Runtime.enable');
  const onlyFallback = process.argv.includes('--no-js');
  const menu='[data-menu-toggle]', research='[data-research-navigation] summary';
  const tap=async (selector,mobile)=>click(selector,mobile);
  const ax=async()=>{const tree=await call('Accessibility.getFullAXTree');return tree.nodes.filter(n=>!n.ignored);};
  for(const [width,height] of [[320,640],[375,812],[390,844],[430,932],[768,1024],[1024,768],[1440,900]]) {
    const mobile=width<=1024;
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
    await call('Emulation.setTouchEmulationEnabled',{enabled:mobile});
    for(const theme of (onlyFallback ? [] : ['light','dark'])) {
      await navigate();
      await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`);
      assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false);
      if(mobile) {
        assert.equal(await evaluate(`document.querySelector('[data-site-menu]').open`),false);
        assert.equal(await evaluate(`document.querySelector('.header-inner').getBoundingClientRect().height<=90`),true);
        assert.equal(await evaluate(`document.querySelector(${JSON.stringify(menu)}).getAttribute('aria-expanded')`),'false');
        await screenshot(`closed-${width}-${theme}`);
        await evaluate(`document.querySelector(${JSON.stringify(menu)}).focus()`);
        await key('Enter','Enter',13);
        assert.equal(await evaluate(`document.querySelector('dialog').open`),true);
        assert.equal(await evaluate(`document.querySelector(${JSON.stringify(menu)}).getAttribute('aria-expanded')`),'true');
        assert.equal(await evaluate(`document.activeElement.hasAttribute('data-menu-close')`),true);
        assert.equal(await evaluate(`document.body.style.overflow`),'hidden');
        const nodes=await ax();assert.ok(nodes.some(n=>n.role?.value==='dialog'&&n.name?.value==='Navigation'));
        assert.equal(nodes.some(n=>n.role?.value==='link'&&n.name?.value==='Explore Research'),false,'background inert');
        await key('Tab','Tab',9);assert.equal(await evaluate(`document.activeElement.textContent.trim()`),'Home');
        await evaluate(`document.querySelector('[data-menu-close]').focus()`);
        await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9,modifiers:8});
        await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9,modifiers:8});
        assert.equal(await evaluate(`document.activeElement.hasAttribute('data-menu-system')`),true,'reverse focus containment');
        await key('Tab','Tab',9);assert.equal(await evaluate(`document.activeElement.hasAttribute('data-menu-close')`),true,'forward containment');
      } else {
        assert.equal(await evaluate(`document.querySelector('[data-site-menu]').open`),true);
        assert.equal(await evaluate(`document.querySelector(${JSON.stringify(menu)}).hidden`),true);
      }
      await evaluate(`document.querySelector(${JSON.stringify(research)}).focus()`);
      await key('Enter','Enter',13);
      assert.equal(await opened(),true);
      assert.equal(await evaluate(`document.querySelector(${JSON.stringify(research)}).getAttribute('aria-expanded')`),'true');
      assert.equal(await evaluate(`getComputedStyle(document.querySelector(${JSON.stringify(research)})).outlineStyle`),'solid');
      for(const destination of ['/research/','/experiments/','/publications/']) {
        await key('Tab','Tab',9);assert.equal(await evaluate(`document.activeElement.getAttribute('href')`),destination);
      }
      const nodes=await ax();
      for(const name of ['Research','Experiments','Publications']) assert.ok(nodes.some(n=>n.role?.value==='link'&&n.name?.value===name));
      assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false);
      if(mobile) {
        assert.equal(await evaluate(`(()=>{const d=document.querySelector('dialog');return d.clientHeight<=innerHeight&&d.scrollHeight>=d.clientHeight;})()`),true);
        assert.equal(await evaluate(`([...document.querySelectorAll('dialog a,dialog button,dialog summary')].filter(e=>e.getClientRects().length).every(e=>{const r=e.getBoundingClientRect();return r.width>=44&&r.height>=44;}))`),true,'44px targets');
      }
      await screenshot(`open-${width}-${theme}`);
      await key('Escape','Escape',27);
      assert.equal(await opened(),false);
      if(mobile) {
        assert.equal(await evaluate(`document.querySelector('dialog').open`),false);
        assert.equal(await evaluate(`document.activeElement===document.querySelector(${JSON.stringify(menu)})`),true);
        assert.equal(await evaluate(`document.body.style.overflow`),'');
        await key(' ','Space',32);assert.equal(await evaluate(`document.querySelector('dialog').open`),true);
        await tap('[data-menu-close]',mobile);assert.equal(await evaluate(`document.querySelector('dialog').open`),false);
        assert.equal(await evaluate(`document.activeElement===document.querySelector(${JSON.stringify(menu)})`),true);
        await tap(menu,mobile);
        await call('Input.dispatchMouseEvent',{type:'mousePressed',x:2,y:height/2,button:'left',clickCount:1});
        await call('Input.dispatchMouseEvent',{type:'mouseReleased',x:2,y:height/2,button:'left',clickCount:1});
        await pause(100);assert.equal(await evaluate(`document.querySelector('dialog').open`),false,'backdrop dismissal');
        await key('Tab','Tab',9);assert.equal(await evaluate(`document.querySelector('#site-navigation').contains(document.activeElement)`),false,'no closed-menu trap');
        await tap(menu,mobile);assert.equal(await evaluate(`document.querySelector('dialog').open`),true,'touch reopen');await tap(research,mobile);assert.equal(await opened(),true,'touch research');
        await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
        assert.equal(await evaluate(`getComputedStyle(document.querySelector('dialog')).animationName`),'none');
        await key('Escape','Escape',27);
        await call('Emulation.setEmulatedMedia',{features:[]});
      } else {
        assert.equal(await evaluate(`document.activeElement===document.querySelector(${JSON.stringify(research)})`),true);
        await key(' ','Space',32);assert.equal(await opened(),true);
        await tap('.wordmark',false);assert.equal(await opened(),false);
      }
      // Both groups share the drawer/disclosure controller; exercise the new destination too.
      await navigate('/hackathons/2027/');
      await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`);
      assert.equal(await evaluate(`document.querySelector('h1').textContent`),'ComingSoon');
      assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false);
      await screenshot(`coming-soon-${width}-${theme}`);
      if(mobile) await tap(menu,true);
      const hackathon='[data-hackathon-navigation] summary';
      await evaluate(`document.querySelector(${JSON.stringify(hackathon)}).focus()`);
      await key('Enter','Enter',13);
      assert.equal(await evaluate(`document.querySelector('[data-hackathon-navigation]').open`),true);
      assert.equal(await evaluate(`document.querySelector(${JSON.stringify(hackathon)}).getAttribute('aria-expanded')`),'true');
      for(const destination of ['/hackathons/','/hackathons/2027/']) {
        await key('Tab','Tab',9);assert.equal(await evaluate(`document.activeElement.getAttribute('href')`),destination);
      }
      const hackNodes=await ax();
      for(const name of ['AEGYTHON 2026','Hackathon 2027']) assert.ok(hackNodes.some(n=>n.role?.value==='link'&&n.name?.value===name));
      assert.equal(await evaluate(`([...document.querySelectorAll('#hackathons-destinations a')].every(e=>{const r=e.getBoundingClientRect();return r.width>=44&&r.height>=44;}))`),true);
      await screenshot(`hackathon-menu-${width}-${theme}`);
      await key('Escape','Escape',27);
      assert.equal(await evaluate(`document.querySelector('[data-hackathon-navigation]').open`),false);
      assert.equal(await evaluate(`document.activeElement===document.querySelector(${JSON.stringify(mobile?menu:hackathon)})`),true);
      if(mobile) await tap(menu,true);
      await tap(hackathon,mobile);
      await tap('#hackathons-destinations a[href="/hackathons/2027/"]',mobile);
      assert.equal(await evaluate(`location.pathname`),'/hackathons/2027/');
      if(mobile) assert.equal(await evaluate(`document.querySelector('dialog').open`),false);
      results.push({width,height,theme,compactHeader:mobile,keyboard:true,escape:true,focus:true,accessibilityTree:true,touch:mobile,targets44px:mobile,overflow:false,reducedMotion:mobile});
    }
    for(const fallbackTheme of ['light','dark']) {
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:fallbackTheme}]});
    await navigate('/',true);
    assert.equal(await evaluate(`document.querySelector('[data-site-menu]').open`),false);
    if(mobile) assert.equal(await evaluate(`document.querySelector('.header-inner').getBoundingClientRect().height<=90`),true);
    await tap('.menu-fallback',mobile);
    assert.equal(await evaluate(`document.querySelector('[data-site-menu]').open`),true);
    await tap(research,mobile);assert.equal(await opened(),true);
    await screenshot(`no-js-${width}-${fallbackTheme}`);
    assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false);
    await tap('.menu-fallback',mobile);assert.equal(await evaluate(`document.querySelector('[data-site-menu]').open`),false);
    await tap('.menu-fallback',mobile);await tap('.research-destinations a',mobile);
    for(let n=0;n<60;n++){if(await evaluate(`location.pathname==='/research/'&&document.readyState==='complete'`))break;await pause(50);}
    assert.equal(await evaluate(`location.pathname`),'/research/');
    await navigate('/',true);
    await tap('.menu-fallback',mobile);
    await tap('[data-hackathon-navigation] summary',mobile);
    assert.equal(await evaluate(`document.querySelector('[data-hackathon-navigation]').open`),true);
    await tap('#hackathons-destinations a[href="/hackathons/2027/"]',mobile);
    for(let n=0;n<60;n++){if(await evaluate(`location.pathname==='/hackathons/2027/'&&document.readyState==='complete'`))break;await pause(50);}
    assert.equal(await evaluate(`location.pathname`),'/hackathons/2027/');
    assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false);
    await screenshot(`coming-soon-no-js-${width}-${fallbackTheme}`);
    await tap('.next-event-copy a',mobile);
    for(let n=0;n<60;n++){if(await evaluate(`location.pathname==='/hackathons/'&&document.readyState==='complete'`))break;await pause(50);}
    assert.equal(await evaluate(`location.pathname`),'/hackathons/');
    results.push({width,theme:fallbackTheme,noJavaScriptDisclosureCloseAndDestination:true});
    }
    await call('Emulation.setEmulatedMedia',{features:[]});
  }
  if (!onlyFallback) {
  // Open-modal breakpoint changes must release modality, scroll locking and hidden focus.
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
  await navigate();await tap(menu,true);
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});await pause(200);
  assert.equal(await evaluate(`document.querySelector('dialog').open`),false);
  assert.equal(await evaluate(`document.body.style.overflow`),'');
  assert.equal(await evaluate(`document.querySelector('[data-site-menu]').open`),true);
  for(const path of ['/research/','/experiments/','/publications/','/hackathons/','/hackathons/2027/','/community/']) {
    await navigate(path);
    assert.equal(await evaluate(`document.querySelector('.site-header [aria-current="page"]')?.getAttribute('href')`),path);
  }
  }
  assert.deepEqual(exceptions,[]);
  writeFileSync(`${output}/${onlyFallback ? "browser-no-js-results" : "browser-results"}.json`,JSON.stringify({results,exceptions,resize:!onlyFallback},null,2));
  console.log(JSON.stringify({cases:results.length,exceptions:exceptions.length,result:'PASS'}));
} catch(error) {console.error(error.stack);process.exitCode=1;} finally {socket?.close();chrome.kill('SIGTERM');server.kill('SIGTERM');}
