const WA_NUM='918304095645';
const waLink=m=>`https://wa.me/${WA_NUM}?text=${encodeURIComponent(m)}`;
function sendWA(m){const a=document.createElement('a');a.href=waLink(m);a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();a.remove();
try{navigator.clipboard.writeText(m)}catch(e){}
toast('Opening WhatsApp… If it is blocked, your message is copied. Paste it in a WhatsApp chat to 8304095645.',7000)}
function toast(t,ms=3200){const e=document.getElementById('toast');e.textContent=t;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),ms)}
function check(form){let ok=true;form.querySelectorAll('[required]').forEach(i=>{const b=!i.checkValidity();i.classList.toggle('err',b);if(b)ok=false});if(!ok)toast('Please fill the highlighted fields.');return ok}
