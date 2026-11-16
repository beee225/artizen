const NAV=[['MAIN MENU',[['Home','house','#home'],['Collections','grid-2x2','#collections'],['Customize','wand-sparkles','#customize'],['Gallery','camera','#gallery'],['About','heart','#about'],['Contact','phone','#contact']]],
['OUR COLLECTIONS',CATS.map(c=>[c.name,c.icon,'cat:'+c.id])],
['QUICK ACTIONS',[['My Order','shopping-bag','order'],['WhatsApp','message-circle','https://wa.me/918304095645'],['Instagram','instagram','https://www.instagram.com/_art_i_zen_/']]]];
const sb=$('#sb');const SOC='<div class="soc2">'+[['Instagram','instagram','https://www.instagram.com/_art_i_zen_/'],['WhatsApp','message-circle','https://wa.me/918304095645'],['YouTube','youtube','https://youtube.com/@art_i_zen']].map(([t,i,u])=>`<a href="${u}" target="_blank" rel="noopener" data-t="${u}" data-tip="${t}" data-k="soc-${i}" aria-label="${t}"><i data-lucide="${i}"></i></a>`).join('')+'</div>';
sb.innerHTML=`<div class="top"><span class="nsym" aria-hidden="true"></span><span class="lb"><b class="brand2">ART i ZEN</b><small>Creative Gifting Studio</small></span><button class="tg" aria-label="Expand or collapse navigation" aria-expanded="false"><i data-lucide="panel-left"></i></button></div><input type="search" id="ns" placeholder="Search navigation" aria-label="Search navigation">`+NAV.map(([h,l])=>`<h4>${h}</h4>`+l.map(([n,i,t])=>`<a href="${t.startsWith('http')?t:t[0]=='#'?t:'#collections'}" data-t="${t}" data-tip="${n}" data-k="${t.startsWith('cat:')?'cat-'+t.slice(4):t.slice(1)}"${t.startsWith('http')?' target="_blank" rel="noopener"':''}><i data-lucide="${i}"></i><span>${n}</span></a>`).join('')).join('')+SOC;
const tg=$('.tg',sb),setOpen=o=>{sb.classList.toggle('open',o);tg.setAttribute('aria-expanded',o)};
tg.onclick=()=>setOpen(!sb.classList.contains('open'));sb.addEventListener('mouseenter',()=>matchMedia('(hover:hover) and (min-width:701px)').matches&&setOpen(true));sb.addEventListener('mouseleave',()=>setOpen(false));
sb.onclick=e=>{const a=e.target.closest('a');if(!a)return;sb.classList.remove('show');const t=a.dataset.t;if(t.startsWith('cat:')){e.preventDefault();showCat(t.slice(4))}else if(t=='order'){e.preventDefault();openCart()}};
$('#ns').oninput=e=>{const q=e.target.value.toLowerCase();$$('a',sb).forEach(a=>a.style.display=a.dataset.tip.toLowerCase().includes(q)?'':'none')};
function setActive(k){$$('a',sb).forEach(a=>a.classList.toggle('on',a.dataset.k==k))}
const secObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!$$('a.on',sb).some(a=>a.dataset.k.startsWith('cat-')&&$('#catView').innerHTML&&e.target.id=='collections'))setActive(e.target.id)}),{threshold:.45});
$$('#home,#collections,#gallery,#customize,#about,#contact').forEach(s=>secObs.observe(s));
const darkObs=new IntersectionObserver(es=>es.forEach(e=>{e.target._v=e.isIntersecting;sb.classList.toggle('dark',$$('[data-dark]').some(x=>x._v))}),{rootMargin:'-50% 0px -50% 0px'});$$('[data-dark]').forEach(s=>darkObs.observe(s));

const mq=matchMedia('(max-width:700px)');$('#menuBtn').onclick=()=>sb.classList.toggle('show');
$('#srchBtn').onclick=()=>{mq.matches?sb.classList.add('show'):setOpen(true);$('#ns').focus()};
document.addEventListener('click',e=>{if(mq.matches&&!e.target.closest('#sb,#menuBtn,#srchBtn'))sb.classList.remove('show')});
