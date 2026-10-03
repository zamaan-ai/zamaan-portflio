const container=document.querySelector('#project-list');
const el=(tag,text,cls)=>{const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n};
try{
 const response=await fetch('projects.json');if(!response.ok)throw Error('Unavailable');const projects=await response.json();container.replaceChildren();
 projects.forEach((p,i)=>{
  const article=el('article','','project-story');article.id=p.id;article.append(el('span',String(i+1).padStart(2,'0'),'project-num'));
  const title=el('div','');title.append(el('div',p.discipline,'discipline'),el('h2',p.title),el('p',p.note,'note'),el('span',p.status,'status'));
  const body=el('div','');body.append(el('p',p.deck),el('p',p.detail));const dl=el('dl','');['Built with','Engineering focus'].forEach((key,j)=>{const item=el('div','');item.append(el('dt',key),el('dd',j?p.focus:p.stack));dl.append(item)});body.append(dl);
  const links=el('div','','story-links');const volume=el('a','Open project volume');volume.href='work.html?project='+p.id;links.append(volume);
  if(p.live){const demo=el('a',p.id==='portfolio'?'Explore the 3D realm':'Visit live project ↗');demo.href=p.live;if(p.live.startsWith('http')){demo.target='_blank';demo.rel='noopener noreferrer'}links.append(demo)}
  const source=el('a',p.private?'Request a walkthrough':'View source ↗');source.href=p.private?'mailto:akhtarzamaan997@gmail.com?subject='+encodeURIComponent('Tell me about '+p.title):(p.repo.startsWith('http')?p.repo:'https://github.com/zamaan-ai/'+p.repo);if(!p.private){source.target='_blank';source.rel='noopener noreferrer'}links.append(source);body.append(links);article.append(title,body);container.append(article);
 });
 if(location.hash){document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({behavior:'instant'})}
}catch{container.replaceChildren(el('p','The collection could not load. Please refresh, or contact Mohd Zamaan Akhtar by email at akhtarzamaan997@gmail.com.'))}
