(() => {
 for(const carousel of document.querySelectorAll('[data-video-carousel]')){
  if(carousel.dataset.ready==='true')continue;
  const track=carousel.querySelector('[data-video-track]'),slides=[...carousel.querySelectorAll('[data-video-slide]')];
  if(!track||!slides.length)continue;carousel.dataset.ready='true';
  const previous=carousel.querySelector('[data-video-prev]'),next=carousel.querySelector('[data-video-next]'),status=carousel.querySelector('[data-video-position]'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let current=0,visible=1,max=0,scheduled=false,drag=null,suppressUntil=0;
  const step=()=>slides[1]?slides[1].offsetLeft-slides[0].offsetLeft:track.clientWidth;
  const update=()=>{
   const distance=step();if(distance<=0)return;
   visible=Math.min(slides.length,Math.max(1,Math.round((track.clientWidth+24)/distance)));
   max=Math.max(0,slides.length-visible);current=Math.max(0,Math.min(max,Math.round(track.scrollLeft/distance)));
   previous.disabled=current===0;next.disabled=current===max;
   const text=`Videos ${current+1}–${Math.min(slides.length,current+visible)} of ${slides.length}`;if(status.textContent!==text)status.textContent=text;
  };
  const go=index=>{update();const target=Math.max(0,Math.min(max,index));track.scrollTo({left:slides[target].offsetLeft-slides[0].offsetLeft,behavior:reduced.matches?'instant':'smooth'});};
  previous.addEventListener('click',()=>go(current-1));next.addEventListener('click',()=>go(current+1));
  track.addEventListener('keydown',event=>{if(event.target!==track||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();go(event.key==='Home'?0:event.key==='End'?max:current+(event.key==='ArrowRight'?1:-1));});
  track.addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{update();scheduled=false;});},{passive:true});
  track.addEventListener('pointerdown',event=>{if(event.isPrimary&&event.button===0){update();drag={x:event.clientX,y:event.clientY,left:track.scrollLeft,index:current,snap:track.style.scrollSnapType,moved:false};}});
  track.addEventListener('pointermove',event=>{if(!drag)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)*1.5){drag.moved=true;suppressUntil=performance.now()+500;if(event.pointerType!=='touch'){event.preventDefault();track.style.scrollSnapType='none';track.scrollTo({left:drag.left-dx,behavior:'instant'});}}});
  track.addEventListener('pointerup',event=>{if(!drag)return;const start=drag,dx=event.clientX-start.x,dy=event.clientY-start.y;drag=null;track.style.scrollSnapType=start.snap;if(start.moved||Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){suppressUntil=performance.now()+500;if(event.pointerType!=='touch')go(start.index+(dx<0?1:-1));}});
  track.addEventListener('pointercancel',()=>{if(drag){if(drag.moved)suppressUntil=performance.now()+500;track.style.scrollSnapType=drag.snap;drag=null;}});
  track.addEventListener('dragstart',event=>{if(event.target.closest('[data-video-play]'))event.preventDefault();});
  // Capture before video.js so a drag never turns into Play or external navigation.
  track.addEventListener('click',event=>{if(event.detail!==0&&performance.now()<suppressUntil){event.preventDefault();event.stopImmediatePropagation();}},true);
  new ResizeObserver(update).observe(track);carousel.querySelector('[data-video-controls]').hidden=false;update();
 }
})();
