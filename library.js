// A useful catalog survives a blocked renderer or module load.
setTimeout(()=>{
 const canvas=document.querySelector('#scene');
 const loading=document.querySelector('#loading');
 if(canvas&&loading&&getComputedStyle(loading).opacity!=='0'&&!loading.hidden){
  const fallback=document.querySelector('#static-fallback');
  if(fallback){fallback.hidden=false;loading.hidden=true;}
 }
},18000);
