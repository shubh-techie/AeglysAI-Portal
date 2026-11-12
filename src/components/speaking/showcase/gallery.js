(() => {
 const root=document.querySelector('[data-speaking-showcase]');const dialog=root?.querySelector('[data-speaking-lightbox]');
 if(!root||!dialog||typeof dialog.showModal!=='function')return;
 let entries=[],index=0,opener=null,previousOverflow='';
 const image=dialog.querySelector('img'),caption=dialog.querySelector('[data-photo-description]'),counter=dialog.querySelector('[data-photo-counter]');
 const previous=dialog.querySelector('[data-photo-prev]'),next=dialog.querySelector('[data-photo-next]');
 const show=i=>{index=(i+entries.length)%entries.length;const entry=entries[index];image.hidden=false;image.src=entry.href;image.alt=entry.dataset.photoAlt;caption.textContent=entry.dataset.photoCaption;counter.textContent=`Photo ${index+1} of ${entries.length}`;dialog.querySelector('[data-original-photo]').href=entry.href;previous.disabled=next.disabled=entries.length<2;};
 root.addEventListener('click',event=>{
  const link=event.target.closest('[data-speaking-photo]');if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();entries=[...link.closest('[data-speaking-gallery]').querySelectorAll('[data-speaking-photo]')];opener=link;show(entries.indexOf(link));previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();dialog.querySelector('[data-photo-close]').focus();
 });
 dialog.querySelector('[data-photo-close]').addEventListener('click',()=>dialog.close());
 previous.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));
 dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();show(index+(event.key==='ArrowRight'?1:-1));}
  if(event.key==='Tab'){
   const controls=[...dialog.querySelectorAll('button:not([disabled]),a[href]')];const first=controls[0],last=controls[controls.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
 });
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;image.removeAttribute('src');if(opener?.isConnected)opener.focus();});
 image.addEventListener('error',()=>{image.hidden=true;caption.textContent='Photo unavailable. Use the full image link or close the gallery.';});
 root.querySelectorAll('[data-speaking-image]').forEach(img=>{const unavailable=()=>{img.hidden=true;const fallback=img.parentElement.querySelector('.sp-image-fallback');if(fallback)fallback.hidden=false;};img.addEventListener('error',unavailable);if(img.complete&&img.naturalWidth===0)unavailable();});
 window.addEventListener('pagehide',()=>{if(dialog.open)dialog.close();});
})();
