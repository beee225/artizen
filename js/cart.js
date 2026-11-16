let cart=[];try{cart=JSON.parse(localStorage.getItem('aiz_cart'))||[]}catch(e){}
const save=()=>{try{localStorage.setItem('aiz_cart',JSON.stringify(cart))}catch(e){}};
const unit=i=>i.unit; // null = quotation required
function addToCart(it){const k=[it.id,it.variation,it.notes].join('|'),f=cart.find(c=>c.key===k);f?f.qty+=it.qty:cart.push({...it,key:k});save();renderCart();const b=document.getElementById('cartFab');b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump');toast(it.name+' added to your order')}
function removeFromCart(k){cart=cart.filter(c=>c.key!==k);save();renderCart()}
function totals(){let t=0,q=0;cart.forEach(c=>{c.unit==null?q++:t+=c.unit*c.qty});return{t,q}}
function renderCart(){document.getElementById('cnt').textContent=cart.reduce((s,c)=>s+c.qty,0);
document.getElementById('items').innerHTML=cart.length?cart.map(c=>`<div class="it"><img src="${c.img}" alt=""><div><b>${c.name}</b><br><span class="muted">${c.variation||''} × ${c.qty}</span><br><span class="muted">${c.unit==null?'Quotation required':(c.from?'From ':'')+inr(c.unit)+' each'}</span></div><button class="x" aria-label="Remove ${c.name}" data-rm="${c.key}">✕</button></div>`).join(''):'<p class="muted" style="padding:24px 0">Your order is empty. Add something lovely from the collections.</p>';
const{t,q}=totals();document.getElementById('tot').innerHTML=cart.length?`<p style="margin:14px 0"><b>Subtotal (priced items): ${inr(t)}</b>${q?`<br><span class="muted small">${q} item(s) need a quotation and are not included.</span>`:''}${cart.some(c=>c.from)?'<br><span class="muted small">"From" prices are starting prices.</span>':''}</p>`:'';}
function openCart(o=true){document.getElementById('drawer').classList.toggle('open',o)}
