// Home-only enhancement of the native track; follows the existing Media scroll/resize pattern.
(() => {
 const track=document.querySelector('#research-models');
 if(!track||track.dataset.ready)return;
 track.dataset.ready='true';
 const cards=[...track.querySelectorAll('article')],controls=document.querySelector('[data-model-controls]');
 if(!cards.length||!controls)return;
 const previous=controls.querySelector('[data-model-prev]'),next=controls.querySelector('[data-model-next]'),status=controls.querySelector('[data-model-position]');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const positions=()=>cards.map(card=>card.offsetLeft-cards[0].offsetLeft);
 let current=0,scheduled=false;
 function update(){
  const left=track.scrollLeft,max=Math.max(0,track.scrollWidth-track.clientWidth);
  current=positions().reduce((best,value,index,all)=>Math.abs(value-left)<Math.abs(all[best]-left)?index:best,0);
  previous.disabled=left<=2;next.disabled=left>=max-2;controls.hidden=max<=2;
  const visible=cards.map((card,index)=>({index,left:card.offsetLeft-cards[0].offsetLeft,right:card.offsetLeft-cards[0].offsetLeft+card.offsetWidth})).filter(card=>card.left>=left-3&&card.right<=left+track.clientWidth+3);
  const first=visible[0]?.index??current,last=visible.at(-1)?.index??current;
  const text=first===last?`Model ${String.fromCharCode(65+first)} · ${first+1} / ${cards.length}`:`Models ${String.fromCharCode(65+first)}–${String.fromCharCode(65+last)} · ${first+1}–${last+1} / ${cards.length}`;
  if(status.textContent!==text)status.textContent=text;
 }
 function go(index){
  const points=positions(),max=Math.max(0,track.scrollWidth-track.clientWidth);
  track.scrollTo({left:Math.min(max,points[Math.max(0,Math.min(cards.length-1,index))]),behavior:reduced.matches?'instant':'smooth'});
 }
 previous.addEventListener('click',()=>{update();go(current-1);});next.addEventListener('click',()=>{update();go(current+1);});
 track.addEventListener('keydown',event=>{
  if(event.target!==track||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();update();go(event.key==='Home'?0:event.key==='End'?cards.length-1:current+(event.key==='ArrowRight'?1:-1));
 });
 // Bring the whole focused card into view, including when only its leading edge was visible.
 track.addEventListener('focusin',event=>{const card=event.target.closest('article');if(!card)return;const r=card.getBoundingClientRect(),t=track.getBoundingClientRect();if(r.left<t.left-2||r.right>t.right+2)go(cards.indexOf(card));});
 track.addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{update();scheduled=false;});},{passive:true});
 new ResizeObserver(update).observe(track);update();
})();
