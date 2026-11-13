(() => {
 const root=document.querySelector('[data-speaking-showcase]');if(!root)return;
 for(const gallery of root.querySelectorAll('[data-conference-carousel]')){
  const figures=[...gallery.querySelectorAll('.sp-gallery-stage > figure')];
  const thumbnails=[...gallery.querySelectorAll('[data-carousel-select]')];gallery.setAttribute('data-carousel-ready','');let current=0,start=null,suppressClick=false;
  const counter=gallery.querySelector('[data-carousel-counter]');
  const show=index=>{current=(index+figures.length)%figures.length;figures.forEach((figure,i)=>{figure.toggleAttribute('data-current',i===current);figure.hidden=i!==current;});counter.textContent=`${current+1} / ${figures.length}`;thumbnails.forEach((button,i)=>button.setAttribute('aria-current',String(i===current)));};
  const previous=gallery.querySelector('[data-carousel-prev]'),next=gallery.querySelector('[data-carousel-next]');
  gallery.querySelector('.sp-carousel-controls').hidden=figures.length<2;const strip=gallery.querySelector('[data-carousel-thumbnails]');if(strip)strip.hidden=figures.length<2;
  thumbnails.forEach((button,i)=>{button.addEventListener('click',()=>show(i));const img=button.querySelector('img');const failed=()=>{img.hidden=true;};img.addEventListener('error',failed);if(img.complete&&!img.naturalWidth)failed();});previous.addEventListener('click',()=>show(current-1));next.addEventListener('click',()=>show(current+1));
  gallery.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();show(current+(event.key==='ArrowRight'?1:-1));if(event.target.closest('[data-carousel-select]'))thumbnails[current]?.focus();}});
  gallery.addEventListener('pointerdown',event=>{if(event.isPrimary&&event.button===0&&event.target.closest('.sp-gallery-stage'))start={x:event.clientX,y:event.clientY};});
  gallery.addEventListener('pointercancel',()=>{start=null;});
  gallery.addEventListener('pointerup',event=>{if(!start)return;const dx=event.clientX-start.x,dy=event.clientY-start.y;start=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){show(current+(dx<0?1:-1));suppressClick=true;setTimeout(()=>{suppressClick=false;},0);}});
  gallery.addEventListener('click',event=>{if(suppressClick){if(event.target.closest('[data-speaking-photo]')){event.preventDefault();event.stopPropagation();}suppressClick=false;}},true);
  show(0);
 }
})();
