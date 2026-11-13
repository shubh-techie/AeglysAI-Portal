(() => {
 const root=document.querySelector('[data-speaking-showcase]'),dialog=root?.querySelector('[data-speaking-lightbox]');
 if(!root||!dialog||typeof dialog.showModal!=='function'||root.dataset.photoDialogReady==='true')return;
 root.dataset.photoDialogReady='true';
 let entries=[],index=0,opener=null,active=false,start=null;
 const scroll=root.__speakingScroll??={depth:0,original:''};
 const lock=()=>{if(scroll.depth===0){scroll.original=document.body.style.overflow;scroll.paddingRight=document.body.style.paddingRight;const gutter=window.innerWidth-document.documentElement.clientWidth;if(gutter>0)document.body.style.paddingRight=`${parseFloat(getComputedStyle(document.body).paddingRight)+gutter}px`;}scroll.depth++;document.body.style.overflow='hidden';};
 const unlock=()=>{scroll.depth=Math.max(0,scroll.depth-1);if(scroll.depth===0){document.body.style.overflow=scroll.original;document.body.style.paddingRight=scroll.paddingRight??'';}};
 const image=dialog.querySelector('[data-viewer-image]'),caption=dialog.querySelector('[data-photo-description]'),counter=dialog.querySelector('[data-photo-counter]');
 const previous=dialog.querySelector('[data-photo-prev]'),next=dialog.querySelector('[data-photo-next]'),error=dialog.querySelector('[data-photo-error]'),stage=dialog.querySelector('[data-viewer-stage]'),close=dialog.querySelector('[data-photo-close]');
 root.querySelectorAll('[data-speaking-gallery]').forEach(group=>{const links=[...group.querySelectorAll('[data-speaking-photo]')];links.forEach((link,i)=>{link.setAttribute('aria-haspopup','dialog');link.setAttribute('aria-controls',dialog.id);link.setAttribute('aria-label',`Open image ${i+1} of ${links.length} in conference viewer: ${link.dataset.photoAlt??''}`);});});
 root.querySelectorAll('[data-event-trigger],[data-empty-preview]').forEach(trigger=>{trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-controls',dialog.id);trigger.setAttribute('aria-expanded','false');});
 const information=context=>{
  dialog.querySelector('[data-viewer-name]').textContent=context?.dataset.viewerName??'Conference photo viewer';
  dialog.querySelector('[data-viewer-dates]').textContent=context?.dataset.viewerDates??'';
  dialog.querySelector('[data-viewer-status]').textContent=context?.closest('[data-speaking-event]')?.dataset.engagementStatus??'';
  const website=dialog.querySelector('[data-viewer-website]');let href=null;try{const url=new URL(context?.dataset.viewerWebsite);if(url.protocol==='https:'&&!url.username&&!url.password)href=url.href;}catch{}
  website.hidden=!href;if(href)website.href=href;else website.removeAttribute('href');
  const extra=dialog.querySelector('[data-viewer-extra]');extra.replaceChildren();
  if(context)for(const child of context.children){if(child.matches('[data-event-media]'))continue;const copy=child.cloneNode(true);copy.removeAttribute('id');copy.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));extra.append(copy);}
  dialog.querySelector('[data-viewer-more]').open=false;
 };
 const show=value=>{
  if(!entries.length){index=0;image.hidden=true;image.removeAttribute('src');error.hidden=false;error.textContent='No approved conference photographs are currently available.';caption.textContent='';caption.hidden=true;counter.textContent='No photos';previous.hidden=next.hidden=true;previous.disabled=next.disabled=true;return;}
  index=(value+entries.length)%entries.length;const entry=entries[index];image.hidden=false;error.hidden=true;image.src=entry.href;image.alt=entry.dataset.photoAlt??'';
  caption.textContent=[(entry.dataset.photoCaption??'').split(/(?<=[.!?])\s+/)[0],entry.dataset.photoCredit??''].filter(Boolean).join(' · ');caption.hidden=!caption.textContent;
  counter.textContent=`${index+1} / ${entries.length}`;previous.disabled=next.disabled=entries.length<2;previous.hidden=next.hidden=entries.length<2;
 };
 const finish=()=>{if(!active||dialog.open)return;active=false;unlock();image.removeAttribute('src');root.querySelectorAll('[aria-controls=\"'+dialog.id+'\"][aria-expanded]').forEach(trigger=>trigger.setAttribute('aria-expanded','false'));if(opener?.isConnected)opener.focus();};
 const dismiss=()=>{dialog.close();finish();};
 root.addEventListener('click',event=>{
  const photo=event.target.closest('[data-speaking-photo]'),card=event.target.closest('.sp-compact-event'),action=event.target.closest('[data-event-trigger]'),empty=event.target.closest('[data-empty-preview]');
  if(!photo&&!card)return;
  // Independent links and controls retain their native behavior.
  if(!photo&&!action&&!empty&&event.target.closest('a,button,input,select,textarea,summary,[data-event-content]'))return;
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();event.stopPropagation();if(dialog.open)return;
  const context=photo?.closest('[data-event-content]')??card?.querySelector('[data-event-content]');
  const group=photo?.closest('[data-speaking-gallery]')??context?.querySelector('[data-speaking-gallery]');
  entries=group?[...group.querySelectorAll('[data-speaking-photo]')]:[];
  opener=photo??empty??action??card.querySelector('[data-event-trigger]');
  information(context);if(opener.hasAttribute('aria-expanded'))opener.setAttribute('aria-expanded','true');
  active=true;lock();dialog.showModal();show(photo?entries.indexOf(photo):0);dialog.querySelector('.sp-viewer-body').scrollTop=0;close.focus();
 });
 close.addEventListener('click',dismiss);previous.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));
 dialog.addEventListener('cancel',event=>{event.preventDefault();dismiss();});dialog.addEventListener('close',finish);
 dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();show(index+(event.key==='ArrowRight'?1:-1));}
  if(event.key==='Home'||event.key==='End'){event.preventDefault();show(event.key==='Home'?0:entries.length-1);}
  if(event.key==='Tab'){
   const controls=[...dialog.querySelectorAll('button:not([disabled]),a[href],summary')].filter(el=>el.getClientRects().length&&!el.closest('[hidden]')&&!el.closest('details:not([open]) [data-viewer-extra]')),first=controls[0],last=controls.at(-1);
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
 });
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dismiss();});
 stage.addEventListener('pointerdown',event=>{if(event.isPrimary&&event.button===0)start={x:event.clientX,y:event.clientY};});stage.addEventListener('pointercancel',()=>{start=null;});stage.addEventListener('pointerup',event=>{if(!start)return;const dx=event.clientX-start.x,dy=event.clientY-start.y;start=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)show(index+(dx<0?1:-1));});
 image.addEventListener('error',()=>{if(!entries.length)return;image.hidden=true;error.hidden=false;error.textContent='Photo unavailable. Try Next or use the image link in event details.';});
 root.querySelectorAll('[data-speaking-image]').forEach(img=>{const unavailable=()=>{img.hidden=true;const fallback=img.parentElement.querySelector('.sp-image-fallback');if(fallback)fallback.hidden=false;};img.addEventListener('error',unavailable);if(img.complete&&img.naturalWidth===0)unavailable();});
 window.addEventListener('pagehide',()=>{if(dialog.open)dismiss();});
})();
