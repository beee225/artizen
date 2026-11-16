// Intro
const enter=()=>{$('#intro').classList.add('out');document.body.classList.remove('intro-on');scrollTo(0,0);try{history.replaceState(null,'','#home')}catch(e){}};$('#logoBtn').onclick=enter;$('#skip').onclick=enter;
// Missing image fallback
document.addEventListener('error',e=>{const t=e.target;if(t.tagName=='IMG'&&!t.dataset.f){t.dataset.f=1;const n=(t.alt||'Artizen');t.src='data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#F4D2BD"/><stop offset="1" stop-color="#EED8C4"/></linearGradient></defs><rect width="600" height="800" fill="url(#g)"/><text x="300" y="410" font-family="Georgia" font-size="34" text-anchor="middle" fill="#781D22">${n.replace(/[<&]/g,'')}</text></svg>`)}},true);
// Home content
const pick=ids=>ids.map(byId);
const FEAT=[['frames','Frames'],['bouquets','Bouquets'],['hampers','Hampers'],['polaroids','Polaroids'],['magazines','Magazines'],['cups','Personalized Gifts']];
$('#featCats').innerHTML=FEAT.map(([id,n])=>{const c=CATS.find(x=>x.id==id),p={img:coverOf(id)};return `<article class="card"><div class="im"><img src="${p.img}" alt="${n}"></div><h3>${n}</h3><p>${c.d}</p><div class="bt"><button class="btn ghost" data-cat="${id}">Explore</button></div></article>`}).join('');
$('#why').innerHTML=[['Made with Love','Every piece is finished by hand.'],['Personalized Creations','Your photos, your words, your colours.'],['Thoughtful Details','Small touches that show you care.'],['Memories That Last','Made to be kept and revisited.']].map(([a,b])=>`<div class="card"><h3>${a}</h3><p>${b}</p></div>`).join('');
$('#featProds').innerHTML=pick(['frames-a3-frame','bouquets-bride-groom-bouquet','magazines-a5-magazine-16-pages','mirrors-large-magic-mirror']).map(cardHTML).join('');
$('#chips').innerHTML=CATS.map(c=>`<button class="chip" data-cat="${c.id}">${c.name}</button>`).join('');
$('#catGrid').innerHTML=CATS.map(c=>`<article class="card"><div class="im"><img src="${coverOf(c.id)}" alt="${c.name}"></div><h3>${c.name}</h3><p>${c.d}</p><p class="pr">${PRODUCTS.filter(p=>p.cat==c.id).length} products</p><div class="bt"><button class="btn ghost" data-cat="${c.id}">Explore</button></div></article>`).join('');
$('#social').className='soc';$('#social').innerHTML=[['Call Artizen','tel:7025027353','<i data-lucide="phone"></i>'],['Chat on WhatsApp','https://wa.me/918304095645','<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'],['Follow on Instagram','https://www.instagram.com/_art_i_zen_/','<i data-lucide="instagram"></i>'],['Watch on YouTube','https://youtube.com/@art_i_zen','<i data-lucide="youtube"></i>']].map(([a,h,i])=>`<a href="${h}" target="_blank" rel="noopener" aria-label="${a}" title="${a}">${i}</a>`).join('');
$('#fl').innerHTML=['Home|#home','Collections|#collections','Customize|#customize','About|#about','Contact|#contact'].map(x=>{const[a,b]=x.split('|');return `<a href="${b}">${a}</a>`}).join('')+'<br>'+FEAT.map(([id,n])=>`<a href="#collections" data-cat="${id}">${n}</a>`).join('');
// Global clicks
document.addEventListener('click',e=>{const t=e.target;let x;
if(x=t.closest('[data-cat]')){e.preventDefault();showCat(x.dataset.cat)}
else if(x=t.closest('[data-view]'))openModal(x.dataset.view);
else if(x=t.closest('[data-rm]'))removeFromCart(x.dataset.rm);
else if(t.closest('[data-open-cart]'))openCart();
else if(t.closest('[data-close]')||t.id=='modal')closeAll()});
document.addEventListener('keydown',e=>e.key=='Escape'&&closeAll());
// Scroll reveal
const rv=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target.classList.add('in'),rv.unobserve(e.target))),{threshold:.12});$$('.rv').forEach(x=>rv.observe(x));
// Cursor + magnetic buttons
if(matchMedia('(hover:hover)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const c=$('#cur');let x=0,y=0,cx=0,cy=0;
addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;c.style.opacity=1;const i=e.target.closest('.card'),b=e.target.closest('button,a,.btn');c.classList.toggle('big',!!i&&!b);c.classList.toggle('btn-s',!!b)});
(function f(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;c.style.left=cx+'px';c.style.top=cy+'px';requestAnimationFrame(f)})();
$$('.mag').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')})}
{const g=PRODUCTS.map(p=>`<figure data-view="${p.id}"><img loading="lazy" src="${p.img}" alt="${p.name}"><figcaption>${p.name}</figcaption></figure>`),h=Math.ceil(g.length/2),row=(a,r)=>`<div class="gtrack${r?' rev':''}">${a.join('')}<span aria-hidden="true" style="display:contents">${a.join('')}</span></div>`;$('#gal').innerHTML=row(g.slice(0,h),0)+row(g.slice(h),1)}
renderCart();lucide.createIcons();
