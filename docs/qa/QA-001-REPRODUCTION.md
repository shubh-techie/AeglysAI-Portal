# QA-001 — Reproduction and evidence

Run from the repository root on the recorded QA baseline. Evidence is local and ignored under `.community-drafts/qa-001`; it is not deployed. Results are observations on 2026-10-26, not guarantees about later external responses.

## Environment and baseline

Record `git status --short`, `git branch --show-current`, `git rev-parse HEAD origin/main`, `git remote -v`, `git worktree list`, `npm run dev -- status`, and the listening PID/cwd/runtime before testing. Preserve existing work. Select Node24 through NVM:

```sh
unset npm_config_prefix
source "$HOME/.nvm/nvm.sh"
nvm use
npm run check
npm run build
npm test
npm ls --all --json
npm audit --json
```

The existing test suite needs its documented Python contract dependencies. This run reused the existing offline environment through `AEGLYSAI_CONTRACT_PYTHON=/private/tmp/aeglysai-portal-ci-001/.community-drafts/contract-venv/bin/python`; no new dependency/install was performed. Audit intentionally exits nonzero. Do not suppress it.

## Browser scripts

Existing scripts under `scripts/community/`: `homepage.browser.mjs`, `research-navigation.browser.mjs`, `hackathon-interactions.browser.mjs`, `registration-channels.browser.mjs`, `event-showcase.browser.mjs`. Run with Node24, one at a time. **Archive their existing output directories before running:** some use fixed paths and overwrite generated evidence. QA did not capture pre-run copies of every such artifact; QA-L04 documents this limitation. Current results/screenshots were subsequently archived under `existing-harness-evidence`.

Below are the complete independent harness sources, retained in Markdown rather than adding application/test infrastructure. Extract each named fenced block into `.community-drafts/qa-001/` and check its SHA-256. They use Node built-ins, installed Chrome and Python standard library; no package additions. Create `baseline-html.json` mapping each `dist/**/*.html` path relative to `dist` to its SHA-256 after the clean baseline build. Run `node .community-drafts/qa-001/all-routes.mjs`, `python3 .community-drafts/qa-001/http-assets.py`, then sequentially `node .community-drafts/qa-001/performance.mjs` and `node .community-drafts/qa-001/contrast.mjs`.

Reserve the explicit localhost ports shown in the scripts; do not kill unrelated listeners. Scripts close their own browser/server processes. The primary4321 server remains active. Outputs may overwrite the named QA run directories; archive first. Chrome profile caches are disposable verification artifacts, not evidence to publish.

The route harness below includes the corrected intentional404 noindex expectation. The original run's raw28 canonical flags remain in `route-browser/results.json`; `results-assessed.json` records their source-backed assessment. It was not rerun after this harness expectation correction. The performance session-window initialization was clarified after the run; every final sample had at most one shift, so reported values are unaffected. The initial concurrent performance run is retained separately and excluded from final medians.

## Additional bounded checks

Signed-out GETs checked seven official Form links, six external media images, Unstop and Luma. Discord's public invite API supplied the expiration. No submissions, account joins, private Sheets or registration exports were accessed. Preserve HTTP status/body hashes/timestamps when repeating; external claims are not authoritative Portal approvals.

Safari26.6.2: launch an isolated `safaridriver --port 39453`, GET `/status`, POST `/session` with Safari capabilities and a15-second client timeout, then terminate only that driver. This run timed out before obtaining a usable session. Do not enable remote automation or infer a Safari rendering failure from that timeout. Firefox was absent from checked application locations/PATH. No physical-device or manual screen-reader coverage.

Bounded credential/privacy scans covered readable tracked files up to1MiB and generated HTML; no exhaustive secret-history scan or private human-approval audit is claimed. Review the production registry loader/validator and run the existing registry tests for positive, rejected, withdrawal and digest-change paths.

## Evidence integrity

Local `evidence-manifest.json` hashes selected logs, JSON, harnesses and screenshots (excluding browser profiles); `review-manifest.json` freezes documentation inventory/diff hashes and source/HTML preservation results. These ignored artifacts are review evidence, not a public consent packet. Re-running generates new evidence and must not silently replace the recorded observations.

## `cdp.mjs`

SHA-256: `d3f4a6e6196f564e97e27c44b57bd42573d4fafa3331d9c81db840780fd1d5df`

```javascript
import {spawn} from 'node:child_process';
import {mkdirSync} from 'node:fs';
export const pause=ms=>new Promise(r=>setTimeout(r,ms));
export async function browser(output,port){
 mkdirSync(output,{recursive:true});
 const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking',`--remote-debugging-port=${port}`,`--user-data-dir=${output}/chrome`,'about:blank'],{stdio:'ignore'});
 let socket,sequence=0;const pending=new Map(),handlers=[];
 try{
  let tabs;for(let n=0;n<120;n++){try{tabs=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();if(tabs.some(t=>t.type==='page'))break;}catch{}await pause(50);}
  if(!tabs?.some(t=>t.type==='page'))throw Error('Chrome endpoint unavailable');
  socket=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
  socket.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);if(p){clearTimeout(p.timer);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}}else handlers.forEach(fn=>fn(m));};
  const call=(method,params={})=>new Promise((r,j)=>{const id=++sequence;const timer=setTimeout(()=>{pending.delete(id);j(Error(`CDP timeout: ${method}`));},15000);pending.set(id,{resolve:r,reject:j,timer});socket.send(JSON.stringify({id,method,params}));});
  const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description??r.exceptionDetails.text);return r.result.value;};
  return{call,evaluate,on:fn=>handlers.push(fn),close(){for(const p of pending.values())clearTimeout(p.timer);socket?.close();chrome.kill();}};
 }catch(error){socket?.close();chrome.kill();throw error;}
}

```

## `all-routes.mjs`

SHA-256: `077c772717dd68106df2f5d450ed339e974e9967f00a8db2010729312f7e041d`

```javascript
import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {browser,pause} from './cdp.mjs';
const output=resolve('.community-drafts/qa-001/route-browser');
const files=Object.keys(JSON.parse(readFileSync('.community-drafts/qa-001/baseline-html.json','utf8'))).sort();
const server=spawn('python3',['-m','http.server','39460','--bind','127.0.0.1','--directory',resolve('dist')],{stdio:'ignore'});
let b;const results=[],exceptions=[],network=[],consoleErrors=[];let current={};
const textChecks=`(()=>{
 const ids=[...document.querySelectorAll('[id]')].map(e=>e.id),meta=document.querySelector('meta[name="description"]'),canonical=document.querySelector('link[rel="canonical"]');
 const duplicates=[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))];
 const images=[...document.images].filter(i=>i.complete&&i.currentSrc&&!i.naturalWidth&&getComputedStyle(i).display!=='none').map(i=>i.currentSrc);
 const insecure=[...document.querySelectorAll('a[target="_blank"]')].filter(a=>!a.relList.contains('noopener')).map(a=>a.href);
 const emptyControls=[...document.querySelectorAll('button,a[href],summary,input:not([type="hidden"])')].filter(e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height)return false;return !(e.getAttribute('aria-label')||e.getAttribute('aria-labelledby')||e.textContent.trim()||e.getAttribute('title')||e.querySelector('img[alt]')?.alt||e.labels?.length);}).map(e=>e.outerHTML.slice(0,180));
 const wide=[...document.querySelectorAll('body *')].filter(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return s.position!=='fixed'&&s.display!=='none'&&r.width>0&&r.right>innerWidth+1&&r.left<innerWidth;}).slice(0,8).map(e=>({tag:e.tagName,class:e.className,id:e.id,right:e.getBoundingClientRect().right}));
 return{h1:document.querySelectorAll('h1').length,main:document.querySelectorAll('main').length,lang:document.documentElement.lang,title:document.title,description:meta?.content,canonical:canonical?.href,overflow:document.documentElement.scrollWidth>innerWidth+1,duplicates,images,insecure,emptyControls,wide,theme:document.documentElement.dataset.theme,background:getComputedStyle(document.body).backgroundColor};
})()`;
try{
 b=await browser(output,39451);await b.call('Page.enable');await b.call('Runtime.enable');await b.call('Network.enable');
 const version=await b.call('Browser.getVersion');writeFileSync(`${output}/version.json`,JSON.stringify(version,null,2));
 b.on(m=>{if(m.method==='Runtime.exceptionThrown')exceptions.push({...current,message:m.params.exceptionDetails.exception?.description??m.params.exceptionDetails.text});if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')consoleErrors.push({...current,message:m.params.args.map(a=>a.value??a.description??'').join(' ')});if(m.method==='Network.responseReceived'&&m.params.response.status>=400)network.push({...current,url:m.params.response.url,status:m.params.response.status});if(m.method==='Network.loadingFailed'&&!m.params.canceled&&m.params.errorText!=='net::ERR_ABORTED')network.push({...current,error:m.params.errorText});});
 for(const file of files){
  const path=file==='index.html'?'/':file==='404.html'?'/404.html':'/'+file.replace(/index\.html$/,'');
  for(const width of [320,375,390,430,768,1024,1440])for(const theme of ['light','dark'])for(const js of [true,false]){
   current={file,width,theme,js};const failures=[];
   try{
    await b.call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});
    await b.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});await b.call('Emulation.setScriptExecutionDisabled',{value:!js});
    const query=`?qa001=${results.length}`;await b.call('Page.navigate',{url:`http://127.0.0.1:39460${path}${query}`});
    let ready=false;for(let n=0;n<160;n++){try{if(await b.evaluate(`location.search===${JSON.stringify(query)}&&document.readyState==='complete'`)){ready=true;break;}}catch{}await pause(25);}if(!ready)failures.push('load-timeout-4s');await pause(90);
    const checks=await b.evaluate(textChecks);
    if(checks.h1!==1)failures.push('h1-count');if(checks.main!==1)failures.push('main-count');if(!checks.lang)failures.push('missing-lang');if(!checks.title||!checks.description)failures.push('missing-metadata');if(file!=='404.html'&&!checks.canonical?.startsWith('https://aeglysai.com/'))failures.push('canonical');if(file==='404.html'&&!(await b.evaluate(`document.querySelector('meta[name="robots"]')?.content==='noindex, follow'`)))failures.push('404-noindex');if(checks.overflow)failures.push('overflow');if(checks.duplicates.length)failures.push('duplicate-ids');if(checks.insecure.length)failures.push('blank-without-noopener');if(checks.emptyControls.length)failures.push('empty-control-name');
    if(js&&checks.theme!==theme)failures.push('theme');if(!js&&checks.background!==(theme==='light'?'rgb(246, 247, 249)':'rgb(8, 15, 28)'))failures.push('no-js-theme');
    if(js&&width===1440&&theme==='light'){
     await b.call('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});await b.call('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
     checks.firstTab=await b.evaluate(`(()=>{const a=document.activeElement,s=getComputedStyle(a);return{tag:a.tagName,href:a.getAttribute('href'),visible:a.getBoundingClientRect().height>0,focus:a.matches(':focus-visible'),outline:s.outlineStyle};})()`);
     if(!checks.firstTab.visible||!checks.firstTab.focus||checks.firstTab.outline==='none')failures.push('first-tab-focus');
    }
    results.push({...current,path,ready,failures,checks});
    if(failures.length&&results.filter(r=>r.failures.length).length<=12){const shot=await b.call('Page.captureScreenshot',{format:'png'});writeFileSync(`${output}/finding-${results.length}.png`,Buffer.from(shot.data,'base64'));}
   }catch(error){results.push({...current,path,failures:[String(error)]});}
  }
  writeFileSync(`${output}/results.json`,JSON.stringify({version,results,exceptions,consoleErrors,network},null,2));console.log(JSON.stringify({route:file,cases:results.length,failed:results.filter(r=>r.failures.length).length,exceptions:exceptions.length}));
 }
 console.log(JSON.stringify({total:results.length,failed:results.filter(r=>r.failures.length).length,exceptions:exceptions.length,consoleErrors:consoleErrors.length,network:network.length}));
}finally{b?.close();server.kill();}

```

## `http-assets.py`

SHA-256: `d18d6f4819bdad3a729e3957400aa9ddacaf9aeeee1fc6f1f2a64693fccc0a85`

```python
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit,unquote
from concurrent.futures import ThreadPoolExecutor
import subprocess,json,hashlib,re
root=Path('dist');out=Path('.community-drafts/qa-001/http');out.mkdir(parents=True,exist_ok=True)
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.assets=[];self.ids=set();self.canonical=None;self.images=[];self.blank=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  if tag=='a' and a.get('href'):
   self.links.append(a['href'])
   if a.get('target')=='_blank' and 'noopener' not in a.get('rel','').split():self.blank.append(a['href'])
  if tag in ['img','script','iframe','source'] and a.get('src'):self.assets.append(a['src'])
  if tag=='img':self.images.append({k:a.get(k) for k in ['src','width','height','loading','srcset','alt']})
  if tag=='link' and a.get('href') and any(x in a.get('rel','') for x in ['stylesheet','icon']):self.assets.append(a['href'])
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
pages={};refs=set();internal=[];unsafe=[];external=set()
def path_for(url):
 path=unquote(urlsplit(url).path).lstrip('/');p=root/path
 if p.is_dir():p=p/'index.html'
 return p
for f in sorted(root.rglob('*.html')):
 rel=str(f.relative_to(root));route='/' if rel=='index.html' else '/404.html' if rel=='404.html' else '/'+rel.replace('index.html','')
 parser=Page();parser.feed(f.read_text());pages[route]={'file':rel,'parser':parser};unsafe.extend({'route':route,'url':u} for u in parser.blank)
 for href in parser.links:
  url=urljoin('https://aeglysai.com'+route,href);parts=urlsplit(url)
  if parts.scheme not in ['http','https','mailto','tel']:continue
  if parts.hostname=='aeglysai.com':internal.append((route,url))
  elif parts.scheme in ['http','https']:external.add(url)
 for href in parser.assets:
  u=urljoin('https://aeglysai.com'+route,href)
  if urlsplit(u).hostname=='aeglysai.com':refs.add(u)
for css in root.rglob('*.css'):
 for href in re.findall(r'url\([\'"]?([^\)\'"\s]+)',css.read_text()):
  if not href.startswith('data:'):
   u=urljoin('https://aeglysai.com/'+str(css.relative_to(root)),href)
   if urlsplit(u).hostname=='aeglysai.com':refs.add(u)
broken=[]
for origin,url in internal:
 p=path_for(url)
 if not p.is_file():broken.append({'route':origin,'url':url,'reason':'missing-file'});continue
 fragment=urlsplit(url).fragment
 if fragment and p.suffix=='.html':
  parser=Page();parser.feed(p.read_text())
  if unquote(fragment) not in parser.ids:broken.append({'route':origin,'url':url,'reason':'missing-fragment'})
def get(item):
 name,url,head=item;token=hashlib.sha256(url.encode()).hexdigest()[:16];headers=out/(token+'.headers');body=out/(token+'.body')
 cmd=['curl','--connect-timeout','15','--max-time','35','-sS','-L','--compressed','-D',str(headers),'-o',str(body),'-w','%{json}']
 if head:cmd.append('--head')
 cmd.append(url);r=subprocess.run(cmd,text=True,capture_output=True)
 try:d=json.loads(r.stdout)
 except:d={}
 result={'name':name,'url':url,'curlExit':r.returncode,'http':d.get('http_code'),'effectiveUrl':d.get('url_effective'),'seconds':d.get('time_total'),'ttfbSeconds':d.get('time_starttransfer'),'transferBytes':d.get('size_download'),'contentType':d.get('content_type'),'error':r.stderr[:160] if r.returncode else None}
 if not head and body.exists() and name in pages:result.update({'bytes':body.stat().st_size,'matchesBuild':hashlib.sha256(body.read_bytes()).hexdigest()==hashlib.sha256((root/pages[name]['file']).read_bytes()).hexdigest()})
 if headers.exists():result['headers']={k.lower():v.strip() for k,v in re.findall(r'^([^:\r\n]+):([^\r\n]*)',headers.read_text(),re.M)}
 return result
jobs=[(route,'https://aeglysai.com'+route,False) for route in pages]+[(url,url,True) for url in sorted(refs)]+[('unknown404','https://aeglysai.com/qa-001-missing-route-check/',False)]
with ThreadPoolExecutor(max_workers=5) as pool:responses=list(pool.map(get,jobs))
inventory=[{'path':str(p.relative_to(root)),'bytes':p.stat().st_size,'referenced':('https://aeglysai.com/'+str(p.relative_to(root))) in refs} for p in root.rglob('*') if p.is_file()]
report={'routes':[{**{k:v for k,v in p.items() if k!='parser'},'route':route,'canonical':p['parser'].canonical,'images':p['parser'].images} for route,p in pages.items()],'responses':responses,'brokenInternal':broken,'blankWithoutNoopener':unsafe,'externalUrls':sorted(external),'assetInventory':sorted(inventory,key=lambda x:x['bytes'],reverse=True)}
(out/'results.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'routes':len(pages),'referencedAssets':len(refs),'requests':len(responses),'htmlMatchingBuild':sum(r.get('matchesBuild',False) for r in responses),'brokenInternal':broken,'unsafeBlank':unsafe,'httpFailures':[r for r in responses if r['curlExit'] or (r['http']!=200 and r['name']!='unknown404')],'custom404':[r for r in responses if r['name']=='unknown404']},indent=2))

```

## `performance.mjs`

SHA-256: `39b135e7b62aa9337269e4f3d8a8e94e9a38566ea0272516cdba2f3824ffe3fa`

```javascript
import {resolve} from 'node:path';
import {writeFileSync} from 'node:fs';
import {browser,pause} from './cdp.mjs';
const out=resolve('.community-drafts/qa-001/performance');let b,current={};const results=[],errors=[];
const observer=`window.__qaPerf={lcp:null,shifts:[],tasks:[]};
try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.__qaPerf.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});}catch{}
try{new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__qaPerf.shifts.push({time:e.startTime,value:e.value});}).observe({type:'layout-shift',buffered:true});}catch{}
try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.__qaPerf.tasks.push(e.duration);}).observe({type:'longtask',buffered:true});}catch{}`;
try{
 b=await browser(out,39452);await b.call('Page.enable');await b.call('Runtime.enable');await b.call('Network.enable');await b.call('Network.setCacheDisabled',{cacheDisabled:true});await b.call('Page.bringToFront');
 b.on(m=>{if(m.method==='Runtime.exceptionThrown')errors.push({...current,error:m.params.exceptionDetails.exception?.description??m.params.exceptionDetails.text});if(m.method==='Network.responseReceived'&&m.params.response.status>=400)errors.push({...current,url:m.params.response.url,status:m.params.response.status});});
 await b.call('Page.addScriptToEvaluateOnNewDocument',{source:observer});
 for(const path of ['/','/hackathons/','/hackathons/community/','/media/'])for(const width of [390,1440])for(let run=1;run<=3;run++){
  current={path,width,run};await b.call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});await b.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:'dark'},{name:'prefers-reduced-motion',value:'no-preference'}]});await b.call('Network.clearBrowserCache');
  const query=`?qa001perf=${Date.now()}-${run}`;await b.call('Page.navigate',{url:`https://aeglysai.com${path}${query}`});let ready=false;
  for(let n=0;n<200;n++){try{if(await b.evaluate(`location.search===${JSON.stringify(query)}&&document.readyState==='complete'`)){ready=true;break;}}catch{}await pause(50);}await pause(1500);
  const metrics=await b.evaluate(`(()=>{const m=window.__qaPerf||{shifts:[],tasks:[],lcp:null},n=performance.getEntriesByType('navigation')[0];let max=0,sum=0,start=0,last=null;for(const e of m.shifts){if(last!==null&&e.time-last<1000&&e.time-start<5000)sum+=e.value;else{sum=e.value;start=e.time;}last=e.time;max=Math.max(max,sum);}return{ttfbMs:n?.responseStart-n?.requestStart,domContentLoadedMs:n?.domContentLoadedEventEnd,loadMs:n?.loadEventEnd,fcpMs:performance.getEntriesByName('first-contentful-paint')[0]?.startTime??null,lcpMs:m.lcp,cls:max,layoutShiftEntries:m.shifts.length,longTaskCount:m.tasks.length,maxLongTaskMs:m.tasks.length?Math.max(...m.tasks):0,bodyBytes:n?.decodedBodySize,navTransferBytes:n?.transferSize,resourceCount:performance.getEntriesByType('resource').length};})()`);
  results.push({...current,ready,...metrics});console.log(JSON.stringify(results.at(-1)));writeFileSync(`${out}/results.json`,JSON.stringify({method:'Sequential cache-disabled unthrottled dark/default-motion production navigations; sample ends1.5s after load; no user interactions/INP; not field CWV or Lighthouse',results,errors},null,2));
 }
}finally{b?.close();}

```

## `contrast.mjs`

SHA-256: `c4d8108016db5e3af690d87c4faba112ae88decebbf53302f7f5518254645eec`

```javascript
import {spawn} from 'node:child_process';import {resolve} from 'node:path';import {writeFileSync} from 'node:fs';import {browser,pause} from './cdp.mjs';
const out=resolve('.community-drafts/qa-001/contrast'),results=[];let b;const server=spawn('python3',['-m','http.server','39464','--bind','127.0.0.1','--directory',resolve('dist')],{stdio:'ignore'});
const sample=`(()=>{
 const rgb=s=>{const m=s.match(/^rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?\\)$/);return m?[+m[1],+m[2],+m[3],m[4]===undefined?1:+m[4]]:null;};
 const mix=(a,b)=>[0,1,2].map(i=>a[i]*a[3]+b[i]*(1-a[3]));const lum=c=>c.slice(0,3).map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((v,x,i)=>v+x*[.2126,.7152,.0722][i],0);
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),items=[];let skipped=0;
 while(walker.nextNode()&&items.length<200){const n=walker.currentNode,e=n.parentElement;if(!n.textContent.trim()||!e||e.closest('script,style,svg,option'))continue;const r=e.getBoundingClientRect(),s=getComputedStyle(e);if(r.width<=0||r.height<=0||r.top>=innerHeight||r.bottom<=0||s.visibility!=='visible')continue;
  const parents=[];for(let p=e;p;p=p.parentElement)parents.push(p);if(parents.some(p=>{const c=getComputedStyle(p);return +c.opacity<.99||c.backgroundImage!=='none'||c.backdropFilter!=='none';})){skipped++;continue;}
  let bg=[255,255,255];let okay=true;for(const p of parents.reverse()){const c=rgb(getComputedStyle(p).backgroundColor);if(!c){okay=false;break;}bg=mix(c,bg);}
  const fg=rgb(s.color),fill=rgb(s.webkitTextFillColor);if(!okay||!fg||(fill&&fill[3]===0)){skipped++;continue;}const color=mix(fg,bg),a=lum(color),z=lum(bg),ratio=(Math.max(a,z)+.05)/(Math.min(a,z)+.05),size=parseFloat(s.fontSize),bold=parseFloat(s.fontWeight)>=700,required=size>=24||(size>=18.666&&bold)?3:4.5;
  items.push({text:n.textContent.trim().slice(0,90),tag:e.tagName,id:e.id,className:e.className,ratio,required,size,foreground:s.color,background:bg,pass:ratio+.001>=required});
 }return{items,skipped};})()`;
try{b=await browser(out,39455);await b.call('Page.enable');await b.call('Runtime.enable');
for(const path of ['/','/research/','/hackathons/','/hackathons/2027/','/hackathons/community/','/media/'])for(const width of [390,1440])for(const theme of ['light','dark']){
 await b.call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});await b.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]});const query=`?contrast=${Date.now()}`;await b.call('Page.navigate',{url:`http://127.0.0.1:39464${path}${query}`});for(let n=0;n<100;n++){try{if(await b.evaluate(`location.search===${JSON.stringify(query)}&&document.readyState==='complete'`))break;}catch{}await pause(25);}await pause(50);const s=await b.evaluate(sample);results.push({path,width,theme,...s});}
writeFileSync(`${out}/results.json`,JSON.stringify({method:'Bounded above-fold computed solid-background text contrast; gradients/backdrop/transparency/complex rendering skipped; not full WCAG audit',results},null,2));console.log(JSON.stringify({cases:results.length,samples:results.reduce((n,r)=>n+r.items.length,0),skipped:results.reduce((n,r)=>n+r.skipped,0),failures:results.flatMap(r=>r.items.filter(x=>!x.pass).map(x=>({path:r.path,width:r.width,theme:r.theme,...x})))}));
}finally{b?.close();server.kill();}

```
