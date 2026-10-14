/* Conceptual examples only. All event content remains server rendered. */
(() => {
 const lifecycle=new AbortController();
 function start() {
  window.__aeglysInteractionsDispose?.();
  const root = document.querySelector('.hx-global-event');
  if (!root) return;
  const abort = new AbortController();
  const on = (target, type, fn, options = {}) => target.addEventListener(type, fn, { ...options, signal: abort.signal });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  try { paused = reduced.matches || sessionStorage.getItem('aeglys-hack-motion') === 'paused'; } catch {}
  const control = document.createElement('button');
  control.className = 'hx-motion-toggle'; control.type = 'button'; root.prepend(control);
  function preferences() {
   root.dataset.paused = String(paused);
   control.textContent = paused ? 'RESUME MOTION' : 'PAUSE MOTION';
   control.setAttribute('aria-pressed', String(paused));
   root.querySelectorAll('[data-pointer]').forEach(el => el.removeAttribute('data-pointer'));
  }
  on(control,'click',()=> { paused = !paused; try { sessionStorage.setItem('aeglys-hack-motion',paused?'paused':'running'); } catch {} preferences(); });
  on(reduced,'change',()=> { paused = reduced.matches; preferences(); }); preferences();
  const network = root.querySelector('.hx-intelligence');
  const domains = [...network.querySelectorAll('[data-node]')];
  const edges = [...network.querySelectorAll('[data-edge]')];
  const status = network.querySelector('.hx-network-selection');
  const plane = network.querySelector('.hx-network-plane');
  let panX=0, panY=0, drag;
  const pan = () => plane.setAttribute('transform', `translate(${panX} ${panY})`);
  function select(index) {
   const neighbors = new Set([index]);
   edges.forEach(edge => { const active = +edge.dataset.from===index || +edge.dataset.to===index; edge.classList.toggle('is-connected',active); if(active){neighbors.add(+edge.dataset.from);neighbors.add(+edge.dataset.to);} });
   domains.forEach((node,i)=> {node.classList.toggle('is-neighbor',neighbors.has(i));node.classList.toggle('is-selected',i===index);node.setAttribute('aria-pressed',String(i===index));});
   status.textContent = `${domains[index].querySelector('text').textContent} connections highlighted · conceptual only`;
  }
  domains.forEach((node,i)=> {node.setAttribute('role','button');node.setAttribute('tabindex','0');node.setAttribute('aria-pressed',String(node.classList.contains('is-selected')));on(node,'click',()=>select(i));on(node,'keydown',event=>{if(['Enter',' '].includes(event.key)){event.preventDefault();select(i);}if(event.key.startsWith('Arrow')){event.preventDefault();panX=Math.max(-30,Math.min(30,panX+(event.key==='ArrowRight'?8:event.key==='ArrowLeft'?-8:0)));panY=Math.max(-25,Math.min(25,panY+(event.key==='ArrowDown'?8:event.key==='ArrowUp'?-8:0)));pan();}});});
  network.querySelectorAll('[data-example]').forEach(button=>on(button,'click',()=>{
   const path = button.dataset.example==='identity'?[0,1,2]:[2,3,4]; select(path[0]);
   edges.forEach(edge=>edge.classList.remove('is-pulsing')); void network.offsetWidth;
   path.slice(0,-1).forEach((id,i)=>{edges[id].style.setProperty('--pulse-delay',`${i*.35}s`);edges[id].classList.add('is-pulsing');});
   status.textContent = `${button.textContent}: ${path.map(id=>domains[id].querySelector('text').textContent).join(' → ')} · synthetic example`;
  }));
  on(network.querySelector('[data-network-reset]'),'click',()=>{panX=panY=0;pan();edges.forEach(e=>e.classList.remove('is-connected','is-pulsing'));domains.forEach(n=>{n.classList.remove('is-neighbor','is-selected');n.setAttribute('aria-pressed','false');});status.textContent='Select a domain to explore its connections.';});
  const stage=network.querySelector('.hx-network-stage');
  on(stage,'pointerdown',e=>{if(e.target.closest('[data-node]'))return;drag={x:e.clientX,y:e.clientY,px:panX,py:panY};stage.setPointerCapture(e.pointerId);});
  on(stage,'pointermove',e=>{if(!drag)return;panX=Math.max(-30,Math.min(30,drag.px+(e.clientX-drag.x)*.15));panY=Math.max(-25,Math.min(25,drag.py+(e.clientY-drag.y)*.15));pan();});
  on(stage,'pointerup',()=>{drag=undefined;});on(stage,'pointercancel',()=>{drag=undefined;});
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.toggleAttribute('data-interaction-visible',entry.isIntersecting)));
  observer.observe(network);
  const additions = [control];
  const timers = new Set();
  const later = (fn,ms) => {const id=setTimeout(()=>{timers.delete(id);fn();},ms);timers.add(id);};
  const frameIds = new Set();
  const frame = fn => {const id=requestAnimationFrame(()=>{frameIds.delete(id);fn();});frameIds.add(id);return id;};
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  const cursor=document.createElement('div');cursor.className='hx-context-cursor';cursor.hidden=true;cursor.setAttribute('aria-hidden','true');root.append(cursor);additions.push(cursor);
  let cursorFrame, cursorPoint;
  on(root,'pointermove',event=>{
   if(paused || document.hidden || !fine.matches || event.pointerType!=='mouse'){cursor.hidden=true;return;}
   const target=event.target.closest('[data-cursor],button,a,summary');
   if(!target || event.target.closest('input,textarea,[contenteditable]')){cursor.hidden=true;return;}
   cursor.hidden=false;cursor.textContent=target.dataset.cursor || (target.matches('a')?(target.getAttribute('href')?.startsWith('#')?'EXPLORE':'OPEN'):'SELECT');
   cursorPoint={x:event.clientX,y:event.clientY};
   if(cursorFrame)return;
   cursorFrame=frame(()=>{cursor.style.transform=`translate(${Math.min(innerWidth-115,cursorPoint.x+18)}px,${Math.min(innerHeight-50,cursorPoint.y+18)}px)`;cursorFrame=undefined;});
  },{passive:true});
  on(root,'pointerleave',()=>{cursor.hidden=true;});on(control,'click',()=>{cursor.hidden=true;root.querySelectorAll('.hx-scramble').forEach(e=>e.classList.remove('hx-scramble'));});
  on(document,'visibilitychange',()=>{root.toggleAttribute('data-document-hidden',document.hidden);cursor.hidden=true;});
  const rail=document.createElement('nav');rail.className='hx-progress-rail';rail.setAttribute('aria-label','Page position');
  const navLinks=[...root.querySelectorAll('[data-event-section]')];
  rail.innerHTML='<span class="hx-progress-line" aria-hidden="true"></span>';
  navLinks.forEach(link=>{const a=document.createElement('a');a.href=link.getAttribute('href');a.dataset.railSection=link.dataset.eventSection;a.textContent=link.textContent;rail.append(a);});root.append(rail);additions.push(rail);
  const visibleSections=new Map();
  const railObserver=new IntersectionObserver(entries=>{entries.forEach(e=>visibleSections.set(e.target.id,e));const current=[...visibleSections.values()].filter(e=>e.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top)-Math.abs(b.boundingClientRect.top))[0];if(current)rail.querySelectorAll('a').forEach(a=>{if(a.dataset.railSection===current.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});},{rootMargin:'-10% 0px -45% 0px'});
  navLinks.forEach(link=>railObserver.observe(document.getElementById(link.dataset.eventSection)));
  let scrollFrame;
  const progress=()=>{const bounds=root.getBoundingClientRect();const amount=Math.max(0,Math.min(1,-bounds.top/(root.offsetHeight-innerHeight)));rail.style.setProperty('--page-progress',amount);const timeline=root.querySelector('.hx-competition-timeline');const t=timeline.getBoundingClientRect();timeline.style.setProperty('--timeline-progress',Math.max(0,Math.min(1,(innerHeight*.65-t.top)/t.height)));root.style.setProperty('--scroll-emphasis',Math.max(.65,1-Math.max(0,-bounds.top)/1800));};
  on(window,'scroll',()=>{if(!scrollFrame)scrollFrame=frame(()=>{progress();scrollFrame=undefined;});},{passive:true});progress();
  root.querySelectorAll('.challenge-tile').forEach(card=>{
   const flowLabels=[...card.querySelectorAll('.challenge-svg .label')].map(el=>el.textContent);
   const controls=document.createElement('div');controls.className='hx-flow-controls';controls.setAttribute('aria-label',`Synthetic signal flow for ${card.querySelector('h3')?.textContent}`);
   const caption=document.createElement('p');caption.className='hx-flow-caption';caption.textContent='Conceptual signal · select a stage';
   const paths=[...card.querySelectorAll('.challenge-svg .flow')];const nodes=[...card.querySelectorAll('.challenge-svg .node')];
   flowLabels.forEach((label,i)=>{const button=document.createElement('button');button.type='button';button.textContent=label;button.setAttribute('aria-pressed','false');on(button,'click',()=>{controls.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));paths.forEach((p,n)=>{p.classList.toggle('hx-flow-selected',nodes.length===5?(i<3?n<i:n<3||n===i):n<i);p.style.setProperty('--pulse-delay',`${n*.16}s`);});nodes.forEach((n,j)=>n.classList.toggle('hx-node-selected',j===i));caption.textContent=`Synthetic example: ${(nodes.length===5&&i>=3?[...flowLabels.slice(0,3),flowLabels[i]]:flowLabels.slice(0,i+1)).join(' → ')}`;});controls.append(button);});
   const diagram=card.querySelector('[data-challenge-diagram]');diagram.after(controls,caption);additions.push(controls,caption);observer.observe(card);
  });
  function navigator(selector,label) {
   const list=root.querySelector(selector);const items=[...list.children];
   const controls=document.createElement('div');controls.className='hx-process-controls';controls.setAttribute('aria-label',label);
   const panel=document.createElement('div');panel.className='hx-selection-panel';panel.setAttribute('role','status');panel.setAttribute('aria-live','polite');
   const title=document.createElement('strong'), detail=document.createElement('p');panel.append(title,detail);
   const select=i=>{items.forEach((item,j)=>item.classList.toggle('hx-process-selected',i===j));controls.querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));title.textContent=items[i].querySelector('h3').textContent;detail.textContent=items[i].querySelector('p').textContent;};
   items.forEach((item,i)=>{const button=document.createElement('button');button.type='button';button.textContent=`${String(i+1).padStart(2,'0')} / ${item.querySelector('h3').textContent}`;on(button,'click',()=>select(i));on(button,'keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?items.length-1:(i+(e.key==='ArrowRight'?1:-1)+items.length)%items.length;controls.children[next].focus();select(next);}});controls.append(button);});list.before(controls,panel);additions.push(controls,panel);select(0);observer.observe(list);
   const note=document.createElement('p');note.className='hx-fine';note.textContent=label.includes('Qualification')?'Selection is a reading aid, not completed qualification.':'Selected milestone is a reading aid. All dates remain TBA.';panel.append(note);
  }
  navigator('.hx-journey','Qualification step selection');navigator('.hx-competition-timeline','Event milestone selection');
  const rounds=[...root.querySelectorAll('.hx-round')];
  const roundControls=document.createElement('div');roundControls.className='hx-round-controls';
  const explanations=[
   ['Working MVP, executable prototype or functional proof of concept.','AI/ML or intelligent feature in the working prototype.','Selected challenge: explain your decisions and show the evidence.','Source code, project README and reproducibility.','Required video of at most two minutes. Narrated screen recordings or silent captioned demonstrations are accepted.'],
   ['Five-minute live demonstration over Google Meet.','Explain your decisions and show the evidence.','Teams remain responsible for safety and correctness.','Five minutes of technical Q&A.','Finalist demonstration and technical Q&A; Round 2 determines final ranking.']
  ];
  rounds.forEach((round,i)=>{const button=document.createElement('button');button.type='button';button.textContent=`ROUND ${i+1} / 100 POINTS`;button.setAttribute('aria-pressed',String(i===0));on(button,'click',()=>{rounds.forEach((r,j)=>r.classList.toggle('hx-round-selected',i===j));roundControls.querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));if(innerWidth<=760)round.scrollIntoView({block:'start',behavior:paused?'instant':'smooth'});});roundControls.append(button);round.querySelectorAll('li').forEach((row,j)=>{row.tabIndex=0;const help=document.createElement('span');help.className='hx-criterion-help';help.textContent=explanations[i][j];row.append(help);additions.push(help);});});rounds[0].classList.add('hx-round-selected');root.querySelector('.hx-round-grid').before(roundControls);additions.push(roundControls);
  const ticker=document.createElement('div');ticker.className='hx-technical-ticker';ticker.setAttribute('aria-hidden','true');ticker.innerHTML='<span>IDENTITY / API / CLOUD / DATA / AI & ML / SECURITY / IDENTITY / API / CLOUD / DATA / AI & ML / SECURITY / </span>';root.querySelector('.hx-facts').after(ticker);additions.push(ticker);observer.observe(ticker);
  // Short visual-only scramble: original label remains the accessible name.
  const scrambleObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting || paused || entry.target.dataset.scrambled)return;const label=entry.target;label.dataset.scrambled='true';const original=label.textContent;const visual=document.createElement('span');visual.setAttribute('aria-hidden','true');visual.className='hx-scramble-visual';label.setAttribute('aria-label',original);label.classList.add('hx-scramble');label.append(visual);additions.push(visual);for(let i=0;i<5;i++)later(()=>{visual.textContent=i===4||paused?original:[...original].map((c,j)=>j<i*original.length/4?c:c===' '?' ':'01/+'.charAt((j+i)%4)).join('');if(i===4){label.classList.remove('hx-scramble');visual.remove();}},i*70);}),{threshold:.8});
  root.querySelectorAll('.hx-section > .hx-eyebrow').forEach(label=>scrambleObserver.observe(label));
  window.__aeglysInteractionsDispose=()=>{abort.abort();observer.disconnect();railObserver.disconnect();scrambleObserver.disconnect();timers.forEach(clearTimeout);frameIds.forEach(cancelAnimationFrame);additions.forEach(el=>el.remove());root.querySelectorAll('.hx-scramble').forEach(el=>el.classList.remove('hx-scramble'));root.querySelectorAll('.hx-round li').forEach(el=>el.removeAttribute('tabindex'));delete window.__aeglysInteractionsDispose;};
  on(document,'astro:before-swap',()=>{window.__aeglysInteractionsDispose?.();lifecycle.abort();});
  on(window,'pagehide',()=>window.__aeglysInteractionsDispose?.());
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true,signal:lifecycle.signal});else start();
 window.addEventListener('pageshow',event=>{if(event.persisted)start();},{signal:lifecycle.signal});
})();
