// EDIT IMAGE PATHS HERE. Missing images fall back to a styled placeholder automatically.
const CATS=[
{id:'frames',name:'Frames',icon:'image',d:'Personalized photo frames from pocket-size to wall statement.'},
{id:'bouquets',name:'Bouquets',icon:'flower-2',d:'Handmade bouquets, polaroid and frame bouquets.'},
{id:'hampers',name:'Hampers',icon:'gift',cover:'hampers-oth-birthday-hamper',d:'Wedding and celebration hampers, designed around you.'},
{id:'polaroids',name:'Polaroids',icon:'images',d:'Tiny prints of your favourite moments.'},
{id:'magazines',name:'Magazines',icon:'book-open',d:'Magazines and ring albums with your own cover.'},
{id:'cups',name:'Crafts',icon:'palette',d:'Printed cups and customized wallets, made with your photo and name.'},
{id:'mirrors',name:'Magic Mirrors',icon:'sparkles',d:'Magic mirrors and crystal lamps.'},
{id:'teddy',name:'Teddy Collection',icon:'paw-print',d:'Soft companions, breathing and glowing.'},
{id:'wellness',name:'Period Pain Relief',icon:'heart-pulse',d:'Gentle heat belts for comfort, in a gift-ready box.'}];
const FRAMES=[['Mini Frame','Mini',100],['5×7 Frame','5×7 in',250],['A5 Frame','A5 · 5.8×8.3 in',300],['A4 Frame','A4 · 8.3×11.7 in',400],['A4 Box Frame','A4 deep box',500],['A3 Frame','A3 · 11.7×16.5 in',600],['A2 Frame','A2 · 16.5×23.4 in',1500],['A1 Frame','A1 · 23.4×33.1 in',2800]];
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
const mk=(cat,name,d,price,type,o={})=>{const k=(o.grp?o.grp+'-':'')+slug(name);return {id:cat+'-'+k,cat,name,d,price,type,img:`assets/${cat}/${k}.jpg`,vars:null,...o}};
const WED='Wedding hamper pricing is customized according to your selected products, design, quantity and requirements.',OTH='Every hamper is uniquely designed according to your budget and preferences. Contact us for a customized quotation.';
const PRODUCTS=[
...FRAMES.map(f=>mk('frames',f[0],`${f[1]}. Printed with your photo; add a caption or date in the notes.`,f[2],'fixed')),
mk('frames','A4 Cartoon Frame','Hand-drawn cartoon portrait made from your photo, in an A4 frame. Add the profession, theme and caption in the notes.',null,'quote',{label:'Contact for pricing'}),
mk('bouquets','Bride & Groom Bouquet','8–10 flowers, styled for the couple.',600,'fixed'),
mk('bouquets','Normal Bouquet','10–15 flowers in your preferred colours.',900,'fixed'),
mk('bouquets','Polaroid Bouquet','Flowers woven with your polaroid prints.',1000,'from'),
mk('bouquets','Frame Bouquet','Bouquet with a framed photo. ₹500 + the frame you choose.',500,'from',{vars:FRAMES.map(f=>({l:f[0],p:f[2]})),addVar:true}),
mk('bouquets','Flower Bouquet','Choose your own flowers, from ₹100 per flower.',100,'from',{perUnit:100}),
...['Dress Hamper','Chocolate Tower','Chocolate Hamper','Footwear Hamper','Nuts Hamper','Dry Fruits Hamper','Spray Hamper'].map(n=>mk('hampers',n,'Wedding hamper, designed to your products and theme.',null,'quote',{grp:'wed',label:'Customized quotation'})),
...['Trolley Hamper','Basket Hamper','Chocolate Hamper','Birthday Hamper'].map(n=>mk('hampers',n,'Designed around your budget and preferences.',null,'quote',{grp:'oth',label:'Quotation on request'})),
...[['Micro',5],['Mini',8],['Medium',10],['Large',20]].map(p=>mk('polaroids',p[0]+' Polaroid Set',`${p[1]} photos. Share photos with us on WhatsApp after ordering.`,null,'quote',{label:'Contact for pricing',upload:true})),
mk('magazines','A5 Magazine 8 Pages','A5 size, 8 pages, custom cover.',199,'fixed'),mk('magazines','A5 Magazine 16 Pages','A5 size, 16 pages, custom cover.',299,'fixed'),
mk('magazines','A4 Magazine 8 Pages','A4 size, 8 pages, custom cover.',250,'fixed'),mk('magazines','A4 Magazine 16 Pages','A4 size, 16 pages, custom cover.',499,'fixed'),
mk('magazines','Ring Album 18 Pictures','Ring-bound album holding 18 pictures.',199,'fixed'),mk('magazines','Ring Album 9 Pictures','Ring-bound album holding 9 pictures.',130,'fixed'),
mk('cups','Customized Photo Cup','Your photo and text printed on a cup. Pricing may vary depending on customization.',350,'fixed',{upload:true}),
mk('cups','Customized Wallet','Leather wallet with your names or initials on a gold plate, plus an optional love charm. Add the names and design in the notes.',null,'request',{label:'Price on request'}),
mk('mirrors','Small Magic Mirror','Compact magic mirror with your photo.',699,'fixed'),mk('mirrors','Large Magic Mirror','Large magic mirror with your photo.',899,'fixed'),mk('mirrors','Crystal Lamp','Crystal lamp with a personalised engraving.',999,'fixed'),
...['Breathing Teddy','Sleeping Cat','Mini Light Toy','Big Panda'].map(n=>mk('teddy',n,'Ask us about sizes and availability.',null,'request',{label:'Available on request'})),
mk('wellness','Period Pain Relief Belt','A soft warming belt with a digital display, presented in a pink gift box that says "Especially for you!". Ask us about colours and availability.',null,'request',{label:'Price on request'})];
const byId=id=>PRODUCTS.find(p=>p.id===id);
const coverOf=id=>{const c=CATS.find(x=>x.id==id);return (byId(c&&c.cover)||PRODUCTS.find(x=>x.cat==id)).img};
const inr=n=>'₹'+n.toLocaleString('en-IN');
const priceLabel=p=>p.type=='fixed'?inr(p.price):p.type=='from'?'From '+inr(p.price):p.label;
