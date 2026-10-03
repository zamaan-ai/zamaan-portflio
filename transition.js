(() => {
  const home=!document.body.classList.contains('library-page');
  if(home){const skip=document.createElement('a');skip.className='skip-content';skip.href='#pathways';skip.textContent='Skip to selected work';document.body.prepend(skip)}
  let active=false;
  const prefetched=new Set();
  document.addEventListener('pointerover',event=>{
    const link=event.target.closest('a[data-library],a[data-home]');
    if(!link||prefetched.has(link.pathname))return;
    prefetched.add(link.pathname);const hint=document.createElement('link');hint.rel='prefetch';hint.href=link.href;document.head.append(hint);
  },{passive:true});
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[data-library],a[data-home]');
    if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    event.preventDefault();if(active)return;active=true;
    const reverse=link.hasAttribute('data-home');
    const overlay=document.createElement('div');overlay.className='portal-transition'+(reverse?' reverse':'');overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label',reverse?'Returning home':'Entering the project library');
    overlay.innerHTML='<div class="portal-object" aria-hidden="true"><div class="portal-book"><span>Y / A</span><i></i><b>COLLECTED<br>WORKS</b></div></div><div class="portal-caption"><small>'+ (reverse?'Back to the world':'Into the collection') +'</small></div><button class="portal-skip">Skip transition</button>';
    document.body.append(overlay);
    let finished=false;
    const finish=()=>{if(finished)return;finished=true;try{sessionStorage.setItem('portfolio-crossing',String(Date.now()))}catch{} location.assign(link.href)};
    requestAnimationFrame(()=>requestAnimationFrame(()=>overlay.classList.add('entered')));
    const timer=setTimeout(finish,950);
    const button=overlay.querySelector('button');button.onclick=finish;button.focus();
    overlay.addEventListener('keydown',e=>{if(e.key==='Escape')finish();if(e.key==='Tab'){e.preventDefault();button.focus()}});
    addEventListener('pagehide',()=>clearTimeout(timer),{once:true});
  },true);
  addEventListener('pageshow',e=>{if(e.persisted){document.querySelector('.portal-transition')?.remove();document.documentElement.classList.remove('is-arriving');active=false}});
})();
