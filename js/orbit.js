// 3D circular photo orbit (pure CSS 3D + JS). Edit OR_IDS to change photos.
const OR_IDS=['frames-a4-frame','bouquets-polaroid-bouquet','bouquets-bride-groom-bouquet','hampers-oth-birthday-hamper','frames-a4-box-frame','bouquets-normal-bouquet','frames-a3-frame','bouquets-frame-bouquet'];
const OR=OR_IDS.map(byId),N=OR.length,STEP=360/N,stage=document.getElementById('orbit'),ring=document.getElementById('r3d'),dots=document.getElementById('odots');
ring.innerHTML=OR.map((p,i)=>`<figure class="ph" data-i="${i}"><div class="in"><img src="${p.img}" alt="${p.name}" draggable="false"></div></figure>`).join('');
dots.innerHTML=OR.map((p,i)=>`<button data-i="${i}" aria-label="Show ${p.name}"></button>`).join('');
const items=[...ring.children],db=[...dots.children],reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
let cur=0,tgt=0,paused=false,drag=null,R=300;
function layout(){const w=Math.max(110,Math.min(230,stage.clientWidth*.27));stage.style.setProperty('--w',w+'px');R=w*1.55;items.forEach((el,i)=>el.style.transform=`rotateY(${i*STEP}deg) translateZ(${R}px)`)}
function paint(){ring.style.transform=`translateZ(${-R}px) rotateY(${-cur}deg)`;items.forEach((el,i)=>{const d=((i*STEP-cur)%360+540)%360-180,a=Math.abs(d);el.style.opacity=(1-a/180*.55).toFixed(2);el.firstChild.style.transform=a>90?'scaleX(-1)':'';el.classList.toggle('front',a<STEP/2)});const k=((Math.round(tgt/STEP)%N)+N)%N;db.forEach((b,i)=>b.classList.toggle('on',i==k))}
function go(i){tgt+=((i*STEP-tgt)%360+540)%360-180}
(function tick(){cur+=(tgt-cur)*.09;if(Math.abs(tgt-cur)<.01)cur=tgt;paint();requestAnimationFrame(tick)})();
if(!reduce)setInterval(()=>{if(!paused&&!drag)tgt+=STEP},3800);
stage.addEventListener('mouseenter',()=>paused=true);stage.addEventListener('mouseleave',()=>paused=false);stage.addEventListener('focusin',()=>paused=true);stage.addEventListener('focusout',()=>paused=false);
stage.querySelector('.prev').onclick=()=>tgt-=STEP;stage.querySelector('.next').onclick=()=>tgt+=STEP;
dots.onclick=e=>{const b=e.target.closest('button');if(b)go(+b.dataset.i)};
stage.addEventListener('pointerdown',e=>{if(e.target.closest('.ob,.odots'))return;drag={x:e.clientX,t:tgt,m:false}});
addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>6)drag.m=true;tgt=drag.t-dx*.35});
addEventListener('pointerup',()=>{if(!drag)return;if(drag.m){tgt=Math.round(tgt/STEP)*STEP;setTimeout(()=>drag=null,0)}else drag=null});
ring.addEventListener('click',e=>{const f=e.target.closest('.ph');if(!f||(drag&&drag.m))return;f.classList.contains('front')?openModal(OR[+f.dataset.i].id):go(+f.dataset.i)});
addEventListener('resize',layout);layout();
