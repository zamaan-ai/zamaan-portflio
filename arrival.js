// Run in the head so the same veil bridges both documents without a flash.
(() => {
  let arriving=false;
  try { const stamp=Number(sessionStorage.getItem('portfolio-crossing')); arriving=Date.now()-stamp<15000; sessionStorage.removeItem('portfolio-crossing'); } catch {}
  if(!arriving || matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  document.documentElement.classList.add('is-arriving');
  const reveal=()=>{document.documentElement.classList.remove('is-arriving')};
  document.addEventListener('scene-ready',()=>requestAnimationFrame(()=>requestAnimationFrame(reveal)),{once:true});
  setTimeout(reveal,5000);
  addEventListener('pageshow',e=>{if(e.persisted)reveal()});
})();
