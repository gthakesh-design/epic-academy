/* ---------- menu (both pages) ---------- */
const dots=document.getElementById('dots'),nav=document.getElementById('nav');
if(dots){
  dots.addEventListener('click',()=>{const o=nav.classList.toggle('open');dots.setAttribute('aria-expanded',o)});
  nav.addEventListener('click',e=>{if(e.target.tagName==='A')nav.classList.remove('open')});
}

/* ---------- scroll reveal ---------- */
document.documentElement.classList.add('js');
{const els=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window){const io=new IntersectionObserver(en=>en.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});els.forEach(e=>io.observe(e))}
 else els.forEach(e=>e.classList.add('in'));}

/* ---------- intro fight (index.html) ---------- */
const intro=document.getElementById('intro');
if(intro){
  const $=id=>document.getElementById(id);
  const scene=$('scene'),arena=$('arena'),call=$('call'),win=$('win'),explore=$('explore'),flash=$('flash'),crowd=$('crowd'),crowdF=$('crowdF');
  const score={r:0,b:0};
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  let done=false,fwI;
  function finish(){
    if(done)return;done=true;clearInterval(fwI);
    intro.classList.add('out');document.body.classList.remove('intro-on');
    setTimeout(()=>intro.remove(),700);
  }
  explore.onclick=finish;$('skip').onclick=finish;

  if(location.hash){intro.remove();document.body.classList.remove('intro-on')}
  else{
    let K=1;const fit=()=>{K=Math.max(.55,Math.min(1.3,innerWidth/480,innerHeight/520));intro.style.setProperty('--k',K)};
    fit();

    /* spectators */
    const cc=['#8a2b2b','#2d4f7c','#c79a2e','#3c6b4a','#6b4a7a','#d9d2c3','#a65f2a'],sk=['#e8b98f','#c68b5f','#9a6a45','#f0c8a0'];
    const rnd=a=>a[Math.floor(Math.random()*a.length)];
    function buildCrowd(){
      crowd.innerHTML='';crowdF.innerHTML='';
      const H=innerHeight,W=innerWidth,floorTop=H*.56,matB=H*.05,half=310*K,cx=W/2;
      const add=(par,x,y,sc,dark)=>{
        const s=document.createElement('div'),c=rnd(cc);s.className='sp';
        s.style.cssText=`left:${x}px;bottom:${y}px;scale:${K*sc};--hc:${rnd(['#1b1613','#3a2416','#6b4a2a','#8a8a8a','#c79a2e'])};animation-delay:-${Math.random()}s${dark?`;filter:brightness(${dark})`:''}`;
        s.innerHTML=`<i class="h" style="background:${rnd(sk)}"></i><i class="b" style="background:${c}"></i><i class="a1" style="background:${c}"></i><i class="a2" style="background:${c}"></i>`;
        par.appendChild(s)};
      for(let r=1;r>=0;r--)for(let x=-20*K+(r?18*K:0);x<W+30;x+=36*K)add(crowd,x+Math.random()*8,floorTop+r*30*K,r?.88:1,r?.65:0);
      for(let r=2;r>=0;r--){const y=matB+(10+r*45)*K,sc=1-.1*r;
        for(let x=cx-half-30*K;x>-30;x-=34*K*sc)add(crowd,x+Math.random()*6,y,sc,r?.85:0);
        for(let x=cx+half+8*K;x<W+30;x+=34*K*sc)add(crowd,x+Math.random()*6,y,sc,r?.85:0)}
      for(let x=-10;x<W+30;x+=44*K)add(crowdF,x+Math.random()*8,-14*K,1.25,.38);
    }
    buildCrowd();
    addEventListener('resize',()=>{fit();buildCrowd()});

    /* fighter drawing */
    const INK='#1B1613',SKIN='#E8B98F';
    function build(o){
      const pants=o.pants||o.gi;
      const L=(x1,y1,x2,y2,w,f)=>`<g stroke-linecap="round"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="${w+3.5}"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${f}" stroke-width="${w}"/><line x1="${x1+w/4}" y1="${y1+1}" x2="${x2+w/4}" y2="${y2-1}" stroke="#000" stroke-opacity=".12" stroke-width="${w/2.2}"/></g>`;
      const arm=n=>`<g class="p" data-p="${n}A" style="transform-origin:60px 58px">${L(60,58,60,80,13,o.gi)}<g class="p" data-p="${n}F" style="transform-origin:60px 80px">${L(60,80,60,96,9,o.skin)}<circle cx="60" cy="102" r="8" fill="${o.guard}" stroke="${INK}" stroke-width="1.8"/><ellipse cx="57.5" cy="99" rx="2.5" ry="1.8" fill="#fff" opacity=".5"/></g><circle cx="60" cy="58" r="8" fill="${o.gi}" stroke="${INK}" stroke-width="1.8"/></g>`;
      const leg=n=>`<g class="p" data-p="${n}L" style="transform-origin:60px 108px">${L(60,108,60,142,17,pants)}<g class="p" data-p="${n}S" style="transform-origin:60px 142px">${L(60,142,60,162,13,pants)}${L(60,162,60,171,8,o.skin)}<path d="M52 170Q52 183 64 183L79 183Q85 178 75 172Z" fill="${o.guard}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/></g></g>`;
      return `<svg viewBox="0 0 120 200"><g class="p" data-p="body" style="transform-origin:60px 185px">
        ${arm('b')}${leg('b')}
        <rect x="45" y="94" width="30" height="20" rx="9" fill="${pants}" stroke="${INK}" stroke-width="1.8"/>
        <rect x="55" y="38" width="11" height="16" rx="4" fill="${o.skin}" stroke="${INK}" stroke-width="1.5"/>
        <path d="M44 52Q60 42 76 52Q79 80 74 100Q60 108 46 100Q41 80 44 52Z" fill="${o.gi}" stroke="${INK}" stroke-width="2"/>
        <path d="M54 48L63 94M67 48L58 92" stroke="${INK}" stroke-width="1.4" fill="none"/>
        <rect x="45" y="91" width="30" height="8" rx="2" fill="${o.belt}" stroke="${INK}" stroke-width="1.4"/>
        ${o.ref?'':`<circle cx="60" cy="95" r="3.8" fill="${o.belt}" stroke="${INK}" stroke-width="1"/><path d="M59 98L53 115M61 98L67 113" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M59 98L53 115M61 98L67 113" stroke="${o.belt}" stroke-width="3.4" stroke-linecap="round"/>`}
        ${o.ref?`<path d="M60 52L49 46L49 59ZM60 52L71 46L71 59Z" fill="#C8202F" stroke="${INK}" stroke-width="1.3"/><circle cx="60" cy="52" r="2.6" fill="#C8202F" stroke="${INK}" stroke-width="1"/>`:''}
        ${leg('f')}${arm('f')}
        <ellipse cx="61" cy="27" rx="14" ry="15" fill="${o.skin}" stroke="${INK}" stroke-width="2"/>
        <path d="M46 28Q43 8 62 9Q81 10 76 29Q72 17 62 18Q52 18 46 28Z" fill="${o.hair}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="53.5" cy="31" r="3.6" fill="${o.skin}" stroke="${INK}" stroke-width="1.2"/>
        <circle cx="66" cy="34" r="3.2" fill="#e0807a" opacity=".35"/>
        <ellipse cx="68" cy="27" rx="3.6" ry="4.2" fill="#fff" stroke="${INK}" stroke-width="1.2"/><circle cx="69.4" cy="27.6" r="2" fill="${INK}"/>
        <path d="M62 21L73 24.5" stroke="${INK}" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M74.5 29Q79 33 74.5 34" stroke="${INK}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path class="m1" d="M66 39Q70 41 74 38" stroke="${INK}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <ellipse class="m2" cx="70" cy="39" rx="4" ry="3.4" fill="#7a1620" stroke="${INK}" stroke-width="1.3"/>
        ${o.ref?`<circle cx="68" cy="27" r="6.5" fill="none" stroke="${INK}" stroke-width="1.4"/><path d="M62 27H50" stroke="${INK}" stroke-width="1.4"/><path d="M65 36Q71 33 77 36Q71 39.5 65 36Z" fill="#bbb" stroke="${INK}" stroke-width="1"/>`:''}
      </svg>`;
    }
    function make(o){
      const el=document.createElement('div');el.className='fw'+(o.flip?' flip':'');
      el.innerHTML='<div class="sh"></div>'+build(o)+(o.tag?`<div class="tag">${o.tag}</div>`:'');
      arena.appendChild(el);
      const F={el,x:o.x,dir:o.flip?-1:1,parts:{},busy:false};
      el.querySelectorAll('.p').forEach(p=>F.parts[p.dataset.p]=p);
      el.style.transform=`translateX(${F.x}px)`;return F;
    }
    const IDLE={fA:-35,fF:-95,bA:-15,bF:-110,fL:-25,fS:35,bL:22,bS:-20,body:[0,0,0]};
    const ST2={fL:-30,fS:42,bL:26,bS:-28,body:[0,3,0]};
    const P={idle:IDLE,
      jab:{fA:-90,fF:0,bA:-10,bF:-115,body:[4,4,0]},
      cross:{bA:-90,bF:0,fA:-30,fF:-115,body:[11,8,0]},
      kick:{fL:-88,fS:-2,bL:12,bS:-4,fA:20,fF:-60,bA:-30,bF:-100,body:[-14,0,0]},
      round:{fL:-78,fS:-40,bL:8,bS:-4,fA:30,fF:-40,bA:-60,bF:-100,body:[-22,-4,0]},
      block:{fA:-15,fF:-150,bA:-30,bF:-125},
      dodge:{body:[-18,-12,0],fA:-10,fF:-60},
      hit:{body:[-20,-14,0],fA:15,fF:-20,bA:30,bF:-30},
      fall:{body:[-88,-30,10],fA:40,fF:0,bA:60,bF:0,fL:10,fS:0,bL:10,bS:0},
      win:{fA:-170,fF:0,bA:170,bF:0,fL:-10,fS:15,bL:10,bS:-10},
      ref:{fA:-170,fF:0,bA:-5,bF:-5,fL:-5,fS:5,bL:5,bS:-5},
      stand:{fA:-5,fF:-5,bA:-5,bF:-5,fL:-5,fS:5,bL:5,bS:-5}};
    function pose(F,p,t=.2){
      const f={...IDLE,...p};
      for(const k in F.parts){const e=F.parts[k];e.style.transitionDuration=t+'s';
        if(k==='body'){const[b,x,y]=f.body;e.style.transform=`translate(${x}px,${y}px) rotate(${b}deg)`}
        else e.style.transform=`rotate(${f[k]}deg)`}
    }
    const move=(F,x,t=.35)=>{F.x=x;F.el.style.transitionDuration=t+'s';F.el.style.transform=`translateX(${x}px)`};
    async function walk(F,x,ms){
      F.busy=true;move(F,x,ms/1000);let s=0;
      const iv=setInterval(()=>{s^=1;pose(F,s?{fL:-45,fS:30,bL:35,bS:-45}:{fL:-5,fS:15,bL:-5,bS:-5},.2)},220);
      await sleep(ms);clearInterval(iv);pose(F,IDLE,.2);F.busy=false;
    }
    function burst(par,x,y,n,color,d,size=8,dur=700){
      for(let i=0;i<n;i++){const p=document.createElement('div');p.className='pt';
        p.style.cssText=`left:${x}px;bottom:${y}px;background:${color};width:${size}px;height:${size}px`;par.appendChild(p);
        const a=Math.random()*6.28,r=d*(.5+Math.random()*.5);
        p.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${Math.cos(a)*r}px,${-Math.sin(a)*r}px)`,opacity:0}],{duration:dur,easing:'ease-out'}).onfinish=()=>p.remove()}
    }
    const shake=()=>{scene.classList.remove('shake');void scene.offsetWidth;scene.classList.add('shake')};
    const react=()=>{[crowd,crowdF].forEach(c=>c.classList.add('react'));setTimeout(()=>[crowd,crowdF].forEach(c=>c.classList.remove('react')),400)};
    const flashFx=()=>flash.animate([{opacity:.85},{opacity:0}],{duration:420});
    function hitfx(F,big){
      const x=330+F.x-F.dir*14;
      const s=document.createElement('div');s.className='spark';s.textContent='✸';s.style.left=(x-35)+'px';s.style.bottom='100px';arena.appendChild(s);setTimeout(()=>s.remove(),500);
      const r=document.createElement('div');r.className='ring';r.style.left=x+'px';r.style.bottom='125px';arena.appendChild(r);setTimeout(()=>r.remove(),520);
      burst(arena,x,125,big?16:9,'#D9A21B',big?90:55,7);shake();react();
    }
    function say(t){call.textContent=t;call.classList.remove('pop');void call.offsetWidth;call.classList.add('pop')}
    function pts(s,n){score[s]+=n;const e=$('s'+s);e.textContent=score[s];e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop')}

    const A=make({x:-240,gi:'#FBFAF6',belt:'#C8202F',guard:'#C8202F',skin:SKIN,hair:'#1B1613'});
    const B=make({x:240,flip:true,gi:'#FBFAF6',belt:'#2a5bd7',guard:'#2a5bd7',skin:'#C68B5F',hair:'#1B1613'});
    const R=make({x:30,flip:true,ref:true,gi:'#F6F3EC',pants:'#2b2623',belt:'#111',guard:'#C68B5F',skin:'#C68B5F',hair:'#9a9a9a',tag:'REFEREE'});
    pose(A,IDLE,0);pose(B,IDLE,0);pose(R,P.stand,0);R.el.style.opacity=0;

    let t2=0;const bobI=setInterval(()=>{t2^=1;for(const F of[A,B])if(!F.busy)pose(F,t2?ST2:IDLE,.3)},380);

    async function atk(att,def,type,out,pt){
      att.busy=def.busy=true;att.el.classList.add('shout');
      move(att,att.x+att.dir*30,.16);pose(att,P[type],.14);
      await sleep(170);
      if(out==='hit'||out==='ko')hitfx(def,out==='ko');
      if(pt)pts(pt[0],pt[1]);
      if(out==='hit')pose(def,P.hit,.1),move(def,def.x-def.dir*18,.15);
      else if(out==='ko'){flashFx();say('IPPON!');pose(def,P.hit,.1)}
      else if(out==='block'){pose(def,P.block,.1);burst(arena,330+def.x-def.dir*16,120,5,'#fff',30,4)}
      else pose(def,P.dodge,.12);
      await sleep(out==='ko'?250:400);
      move(att,att.x-att.dir*30,.25);pose(att,IDLE,.25);
      if(out==='ko'){pose(def,P.fall,.9);move(def,def.x-def.dir*40,.9);await sleep(700);
        burst(arena,330+def.x,6,14,'#c9b88a',80,10,900);shake();react()}
      else{move(def,def.x+(out==='hit'?def.dir*18:0),.25);pose(def,IDLE,.25);def.busy=false}
      att.busy=false;att.el.classList.remove('shout');await sleep(out==='ko'?700:500);
    }

    async function celebrate(){
      intro.classList.add('won');pose(A,P.win,.3);A.busy=true;A.el.classList.add('glow');B.el.style.opacity=0;
      [crowd,crowdF].forEach(c=>c.classList.add('cheer'));call.style.opacity=0;win.classList.add('show');
      let up=0;setInterval(()=>{up^=1;A.parts.body.style.transitionDuration='.28s';A.parts.body.style.transform=`translate(0,${up?-34:0}px)`},320);
      const cols=['#C8202F','#D9A21B','#2a5bd7','#2f8f4e','#fff'];
      for(let i=0;i<80;i++){const c=document.createElement('div');c.className='conf';
        c.style.cssText=`left:${Math.random()*100}%;background:${cols[i%5]};animation-duration:${2.5+Math.random()*2.5}s;animation-delay:${Math.random()*1.5}s`;intro.appendChild(c)}
      let n=0;fwI=setInterval(()=>{burst(intro,innerWidth*(.1+Math.random()*.8),innerHeight*(.45+Math.random()*.4),28,cols[n++%5],130,6,1100);flashFx()},650);
    }

    async function run(){
      await sleep(700);say('HAJIME!');
      await Promise.all([walk(A,-55,1900),walk(B,55,1900)]);say('');
      await atk(A,B,'jab','hit',['r',1]);
      await atk(B,A,'round','block');
      await atk(B,A,'kick','hit',['b',1]);
      await atk(A,B,'cross','hit',['r',2]);
      await atk(B,A,'round','dodge');
      scene.classList.add('zoom');
      await atk(A,B,'kick','ko',['r',3]);
      scene.classList.remove('zoom');
      move(A,-95,.8);R.el.style.opacity=1;
      await sleep(900);pose(R,P.ref,.4);say('RED WINS!');
      await sleep(1900);
      celebrate();await sleep(1800);
      explore.hidden=false;explore.focus({preventScroll:true});
    }

    if(matchMedia('(prefers-reduced-motion:reduce)').matches){
      move(A,-95,0);move(B,125,0);pose(B,P.fall,0);B.el.style.opacity=0;R.el.style.opacity=1;pose(R,P.ref,0);pose(A,P.win,0);
      call.style.opacity=0;win.classList.add('show');[crowd,crowdF].forEach(c=>c.classList.add('cheer'));explore.hidden=false;
    }else run();
  }
}

/* ---------- apply form (karate.html) ---------- */
const form=document.getElementById('joinForm');
if(form){
  const err=document.getElementById('err'),btn=document.getElementById('send');
  form.addEventListener('submit',async e=>{
    e.preventDefault();err.textContent='';
    btn.disabled=true;btn.textContent='Sending...';
    const d=Object.fromEntries(new FormData(form));
    d._subject='New Epic Academy application: '+d.Name;
    d._template='table';
    try{
      const r=await fetch('https://formsubmit.co/ajax/epicacademycoimbatore20@gmail.com',{
        method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)});
      const j=await r.json();
      if(!r.ok||j.success==='false')throw new Error();
      document.getElementById('who').textContent=d.Name;
      form.hidden=true;document.getElementById('thanks').hidden=false;
    }catch(x){
      err.textContent='We could not send your application. Please try again, or call +91 93631 97914.';
      btn.disabled=false;btn.textContent='Submit';
    }
  });
}