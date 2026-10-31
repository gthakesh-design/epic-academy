/* ==========================================================================
   CARTOON CONTROLLER - CINEMATIC COMBO SEQUENCE & NATURAL RIG
   ========================================================================== */

const dots = document.getElementById('dots');
const nav = document.getElementById('nav');

if (dots && nav) {
  dots.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    dots.setAttribute('aria-expanded', isOpen);
  });
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') nav.classList.remove('open');
  });
}

document.documentElement.classList.add('js');
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => io.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('in'));
}

/* ==========================================================================
   CARTOON FIGHTERS: CLEAN ARENA & NO CROWD DISTURBANCE
   ========================================================================== */
const intro = document.getElementById('intro');

if (intro) {
  const $ = id => document.getElementById(id);
  const scene = $('scene');
  const arena = $('arena');
  const call = $('call');
  const win = $('win');
  const explore = $('explore');
  const flash = $('flash');
  
  const score = { r: 0, b: 0 };
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  let done = false;
  let fwI;

  function finish() {
    if (done) return;
    done = true;
    clearInterval(fwI);
    intro.classList.add('out');
    document.body.classList.remove('intro-on');
    setTimeout(() => intro.remove(), 600);
  }

  explore.onclick = finish;
  $('skip').onclick = finish;

  if (location.hash) {
    intro.remove();
    document.body.classList.remove('intro-on');
  } else {
    let K = 1;
    const fit = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      K = Math.max(0.6, Math.min(1.2, w / 440, h / 540));
      intro.style.setProperty('--k', K);
    };
    fit();
    window.addEventListener('resize', fit);

    const OUTLINE = '#111';
    function buildAnatomicalFighter(o) {
      const pants = o.pants || o.gi;
      const strokeW = 4;

      const arm = n => `
        <g class="p" data-p="${n}A" style="transform-origin:60px 56px">
          <line x1="60" y1="56" x2="60" y2="80" stroke="${OUTLINE}" stroke-width="${strokeW + 9}" stroke-linecap="round"/>
          <line x1="60" y1="56" x2="60" y2="80" stroke="${o.gi}" stroke-width="${strokeW + 3}" stroke-linecap="round"/>
          <g class="p" data-p="${n}F" style="transform-origin:60px 80px">
            <line x1="60" y1="80" x2="60" y2="102" stroke="${OUTLINE}" stroke-width="${strokeW + 6}" stroke-linecap="round"/>
            <line x1="60" y1="80" x2="60" y2="102" stroke="${o.skin}" stroke-width="${strokeW + 1}" stroke-linecap="round"/>
            <rect x="52" y="96" width="16" height="15" rx="7" fill="${o.guard}" stroke="${OUTLINE}" stroke-width="${strokeW}"/>
            <circle cx="56" cy="100" r="2.5" fill="#fff" opacity="0.6"/>
          </g>
        </g>
      `;

      const leg = (n, isFront) => {
        const hipX = isFront ? 66 : 52;
        const kneeX = hipX;
        const footX = hipX;
        return `
          <g class="p" data-p="${n}L" style="transform-origin:${hipX}px 104px">
            <line x1="${hipX}" y1="104" x2="${kneeX}" y2="140" stroke="${OUTLINE}" stroke-width="${strokeW + 11}" stroke-linecap="round"/>
            <line x1="${hipX}" y1="104" x2="${kneeX}" y2="140" stroke="${pants}" stroke-width="${strokeW + 5}" stroke-linecap="round"/>
            
            <g class="p" data-p="${n}S" style="transform-origin:${kneeX}px 140px">
              <line x1="${kneeX}" y1="140" x2="${footX}" y2="172" stroke="${OUTLINE}" stroke-width="${strokeW + 8}" stroke-linecap="round"/>
              <line x1="${kneeX}" y1="140" x2="${footX}" y2="172" stroke="${pants}" stroke-width="${strokeW + 3}" stroke-linecap="round"/>
              <path d="M${footX - 10} 172 Q${footX - 10} 184 ${footX} 184 L${footX + 16} 184 Q${footX + 22} 180 ${footX + 14} 172 Z" fill="${o.guard}" stroke="${OUTLINE}" stroke-width="${strokeW}" stroke-linejoin="round"/>
            </g>
          </g>
        `;
      };

      return `
        <svg viewBox="0 0 130 205">
          <g class="p" data-p="body" style="transform-origin:60px 182px">
            ${arm('b')}
            ${leg('b', false)}
            
            <path d="M43 52 Q60 44 77 52 L80 102 Q60 108 40 102 Z" fill="${o.gi}" stroke="${OUTLINE}" stroke-width="${strokeW}" stroke-linejoin="round"/>
            <path d="M49 52 L68 102 M71 52 L52 102" stroke="${OUTLINE}" stroke-width="${strokeW - 1}" fill="none"/>
            
            <rect x="38" y="98" width="44" height="12" rx="4" fill="${o.belt}" stroke="${OUTLINE}" stroke-width="${strokeW}"/>
            ${o.ref ? '' : `
              <circle cx="60" cy="104" r="5" fill="${o.belt}" stroke="${OUTLINE}" stroke-width="2"/>
              <path d="M57 108 L50 126 M63 108 L70 126" stroke="${OUTLINE}" stroke-width="8" stroke-linecap="round"/>
              <path d="M57 108 L50 126 M63 108 L70 126" stroke="${o.belt}" stroke-width="4.5" stroke-linecap="round"/>
            `}
            
            ${leg('f', true)}
            ${arm('f')}
            
            <ellipse cx="60" cy="27" rx="18" ry="19" fill="${o.skin}" stroke="${OUTLINE}" stroke-width="${strokeW}"/>
            <path d="M40 22 Q38 4 60 5 Q82 4 80 22 Q72 11 60 12 Q48 11 40 22 Z" fill="${o.hair}" stroke="${OUTLINE}" stroke-width="${strokeW}"/>
            <rect x="42" y="16" width="36" height="8" rx="3" fill="${o.belt}" stroke="${OUTLINE}" stroke-width="2.5"/>
            <ellipse cx="68" cy="27" rx="5" ry="6.5" fill="#FFF" stroke="${OUTLINE}" stroke-width="2.5"/>
            <circle cx="69.5" cy="27" r="3.2" fill="${OUTLINE}"/>
            <circle cx="68" cy="25" r="1.5" fill="#FFF"/>
            <path d="M62 17 L76 21" stroke="${OUTLINE}" stroke-width="3.5" stroke-linecap="round"/>
            <path class="m1" d="M63 37 Q68 40 74 36" stroke="${OUTLINE}" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path class="m2" d="M63 35 Q69 45 76 35 Z" fill="#FF2E56" stroke="${OUTLINE}" stroke-width="2.5"/>
            ${o.ref ? `
              <circle cx="68" cy="26" r="7" fill="none" stroke="${OUTLINE}" stroke-width="2.5"/>
              <path d="M61 26 H50" stroke="${OUTLINE}" stroke-width="2.5"/>
            ` : ''}
          </g>
        </svg>
      `;
    }

    function makeFighter(o) {
      const el = document.createElement('div');
      el.className = 'fw' + (o.flip ? ' flip' : '');
      el.innerHTML = '<div class="sh"></div>' + buildAnatomicalFighter(o) + (o.tag ? `<div class="tag">${o.tag}</div>` : '');
      arena.appendChild(el);
      const F = { el, x: o.x, dir: o.flip ? -1 : 1, parts: {}, busy: false };
      el.querySelectorAll('.p').forEach(p => F.parts[p.dataset.p] = p);
      el.style.transform = `translateX(${F.x}px)`;
      return F;
    }

    const IDLE = {
      fA: -30, fF: -90, bA: -10, bF: -110,
      fL: -18, fS: 28,
      bL: 20,  bS: -22,
      body: [0, 0, 0]
    };
    
    const ST2 = {
      fL: -24, fS: 36,
      bL: 24,  bS: -30,
      body: [0, 4, 0]
    };

    const P = {
      idle: IDLE,
      jab: { fA: -90, fF: 0, bA: -10, bF: -115, fL: -24, fS: 36, bL: 22, bS: -18, body: [5, 6, 0] },
      cross: { bA: -90, bF: 0, fA: -30, fF: -115, fL: -26, fS: 40, bL: 30, bS: -14, body: [12, 10, 0] },
      kick: {
        fL: -88, fS: 8,
        bL: 14,  bS: 6,
        fA: 20,  fF: -50,
        bA: -30, bF: -95,
        body: [-14, -2, 0]
      },
      round: {
        fL: -82, fS: -35,
        bL: 10,  bS: 4,
        fA: 30,  fF: -35,
        bA: -60, bF: -100,
        body: [-22, -6, 0]
      },
      block: { fA: -15, fF: -145, bA: -35, bF: -125, fL: -30, fS: 45, bL: 26, bS: -30 },
      dodge: { body: [-18, -14, 0], fL: -35, fS: 50, bL: 15, bS: -10, fA: -10, fF: -60 },
      hit: { body: [-24, -16, 0], fL: -10, fS: 15, bL: 28, bS: -20, fA: 25, fF: -20, bA: 40, bF: -25 },
      fall: { body: [-90, -32, 10], fA: 45, fF: 0, bA: 65, bF: 0, fL: 10, fS: 0, bL: 10, bS: 0 },
      win: { fA: -170, fF: 0, bA: 170, bF: 0, fL: -10, fS: 16, bL: 10, bS: -12, body: [0, -5, 0] },
      ref: { fA: -168, fF: 0, bA: -5, bF: -5, fL: -5, fS: 5, bL: 5, bS: -5 },
      stand: { fA: -5, fF: -5, bA: -5, bF: -5, fL: -5, fS: 5, bL: 5, bS: -5 }
    };

    function pose(F, p, t = 0.2) {
      const f = { ...IDLE, ...p };
      for (const k in F.parts) {
        const e = F.parts[k];
        e.style.transitionDuration = t + 's';
        if (k === 'body') {
          const [b, x, y] = f.body;
          e.style.transform = `translate(${x}px,${y}px) rotate(${b}deg)`;
        } else {
          e.style.transform = `rotate(${f[k]}deg)`;
        }
      }
    }

    const move = (F, x, t = 0.35) => {
      F.x = x;
      F.el.style.transitionDuration = t + 's';
      F.el.style.transform = `translateX(${x}px)`;
    };

    async function walk(F, x, ms) {
      F.busy = true;
      move(F, x, ms / 1000);
      let step = 0;
      const iv = setInterval(() => {
        step ^= 1;
        pose(F, step ? { fL: -40, fS: 25, bL: 30, bS: -40 } : { fL: 25, fS: -35, bL: -35, bS: 20 }, 0.2);
      }, 220);
      await sleep(ms);
      clearInterval(iv);
      pose(F, IDLE, 0.2);
      F.busy = false;
    }

    function burstParticles(par, x, y, n, color, d, size = 10, dur = 700) {
      for (let i = 0; i < n; i++) {
        const p = document.createElement('div');
        p.className = 'pt';
        p.style.cssText = `left:${x}px;bottom:${y}px;background:${color};width:${size}px;height:${size}px;`;
        par.appendChild(p);
        const a = Math.random() * 6.28;
        const r = d * (0.5 + Math.random() * 0.5);
        p.animate([
          { transform: 'translate(0,0) scale(1)', opacity: 1 },
          { transform: `translate(${Math.cos(a) * r}px,${-Math.sin(a) * r}px) scale(0)`, opacity: 0 }
        ], { duration: dur, easing: 'ease-out' }).onfinish = () => p.remove();
      }
    }

    const shakeScene = () => {
      scene.classList.remove('shake');
      void scene.offsetWidth;
      scene.classList.add('shake');
    };

    const flashScreen = () => flash.animate([{ opacity: 0.8 }, { opacity: 0 }], { duration: 380 });

    const comicWords = ['BAM!', 'POW!', 'KAPOW!', 'WHAM!', 'SMACK!'];
    const rnd = arr => arr[Math.floor(Math.random() * arr.length)];

    function showComicWord(x, y) {
      const w = document.createElement('div');
      w.className = 'comic-word';
      w.textContent = rnd(comicWords);
      w.style.left = (x - 45) + 'px';
      w.style.bottom = y + 'px';
      arena.appendChild(w);
      setTimeout(() => w.remove(), 600);
    }

    function hitFx(F, big) {
      const x = 330 + F.x - F.dir * 14;
      showComicWord(x, 115);

      const r = document.createElement('div');
      r.className = 'ring';
      r.style.left = x + 'px';
      r.style.bottom = '125px';
      arena.appendChild(r);
      setTimeout(() => r.remove(), 520);

      burstParticles(arena, x, 125, big ? 16 : 9, '#FFD600', big ? 90 : 55, 10);
      shakeScene();
    }

    function say(t) {
      call.textContent = t;
      call.classList.remove('pop');
      void call.offsetWidth;
      call.classList.add('pop');
    }

    function addPoints(side, n) {
      score[side] += n;
      const el = $('s' + side);
      el.textContent = (side === 'r' ? 'RED: ' : 'BLUE: ') + score[side];
      el.animate([{ transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 240 });
    }

    const RedHero = makeFighter({ x: -220, gi: '#FFFFFF', belt: '#FF2E56', guard: '#FF2E56', skin: '#FFD5B8', hair: '#121214' });
    const BlueRival = makeFighter({ x: 220, flip: true, gi: '#FFFFFF', belt: '#0A84FF', guard: '#0A84FF', skin: '#E0A980', hair: '#121214' });
    const Referee = makeFighter({ x: 30, flip: true, ref: true, gi: '#FFFEEA', pants: '#222', belt: '#FFD600', guard: '#E0A980', skin: '#E0A980', hair: '#888', tag: 'SENSEI' });

    pose(RedHero, IDLE, 0);
    pose(BlueRival, IDLE, 0);
    pose(Referee, P.stand, 0);
    Referee.el.style.opacity = '0';

    let bounceToggle = 0;
    setInterval(() => {
      bounceToggle ^= 1;
      for (const F of [RedHero, BlueRival]) {
        if (!F.busy) pose(F, bounceToggle ? ST2 : IDLE, 0.32);
      }
    }, 380);

    async function executeAttack(att, def, type, result, pt) {
      att.busy = def.busy = true;
      att.el.classList.add('shout');
      move(att, att.x + att.dir * 32, 0.16);
      pose(att, P[type], 0.14);
      await sleep(170);

      if (result === 'hit' || result === 'ko') hitFx(def, result === 'ko');
      if (pt) addPoints(pt[0], pt[1]);

      if (result === 'hit') {
        pose(def, P.hit, 0.1);
        move(def, def.x - def.dir * 18, 0.15);
      } else if (result === 'ko') {
        flashScreen();
        say('CRITICAL HIT!!');
        pose(def, P.hit, 0.1);
      } else if (result === 'block') {
        pose(def, P.block, 0.1);
        burstParticles(arena, 330 + def.x - def.dir * 16, 120, 6, '#FFF', 35, 6);
      } else {
        pose(def, P.dodge, 0.12);
      }

      await sleep(result === 'ko' ? 250 : 400);
      move(att, att.x - att.dir * 32, 0.25);
      pose(att, IDLE, 0.25);

      if (result === 'ko') {
        pose(def, P.fall, 0.9);
        move(def, def.x - def.dir * 40, 0.9);
        await sleep(700);
        burstParticles(arena, 330 + def.x, 10, 16, '#FFD600', 85, 12, 900);
        shakeScene();
      } else {
        move(def, def.x + (result === 'hit' ? def.dir * 18 : 0), 0.25);
        pose(def, IDLE, 0.25);
        def.busy = false;
      }

      att.busy = false;
      att.el.classList.remove('shout');
      await sleep(result === 'ko' ? 700 : 500);
    }

    async function celebrateVictory() {
      intro.classList.add('won');
      pose(RedHero, P.win, 0.3);
      RedHero.busy = true;
      RedHero.el.classList.add('glow');
      BlueRival.el.style.opacity = '0';

      call.style.opacity = '0';
      win.classList.add('show');

      let jumpToggle = 0;
      setInterval(() => {
        jumpToggle ^= 1;
        RedHero.parts.body.style.transitionDuration = '0.28s';
        RedHero.parts.body.style.transform = `translate(0, ${jumpToggle ? -34 : 0}px)`;
      }, 320);

      const confettiColors = ['#FF2E56', '#FFD600', '#0A84FF', '#00D664', '#FF7B00'];
      for (let i = 0; i < 70; i++) {
        const conf = document.createElement('div');
        conf.className = 'conf';
        conf.style.cssText = `left:${Math.random() * 100}%;background:${confettiColors[i % 5]};animation-duration:${2.4 + Math.random() * 2}s;animation-delay:${Math.random() * 1.5}s;`;
        intro.appendChild(conf);
      }

      let fwCount = 0;
      fwI = setInterval(() => {
        burstParticles(intro, innerWidth * (0.15 + Math.random() * 0.7), innerHeight * (0.4 + Math.random() * 0.4), 22, confettiColors[fwCount++ % 5], 120, 10, 1100);
        flashScreen();
      }, 650);
    }

    async function runTournamentArc() {
      await sleep(700);
      say('READY... FIGHT!!');
      await Promise.all([walk(RedHero, -55, 1900), walk(BlueRival, 55, 1900)]);
      say('');

      // Combo 1
      await executeAttack(RedHero, BlueRival, 'jab', 'hit', ['r', 1]);
      await executeAttack(BlueRival, RedHero, 'round', 'block');
      
      // Combo 2 (Counter-attack)
      await executeAttack(BlueRival, RedHero, 'kick', 'hit', ['b', 1]);
      await executeAttack(RedHero, BlueRival, 'cross', 'hit', ['r', 2]);
      
      // Final Finish
      await executeAttack(BlueRival, RedHero, 'round', 'dodge');
      scene.classList.add('zoom');
      await executeAttack(RedHero, BlueRival, 'kick', 'ko', ['r', 3]);
      scene.classList.remove('zoom');

      move(RedHero, -95, 0.8);
      Referee.el.style.opacity = '1';
      await sleep(900);
      pose(Referee, P.ref, 0.4);
      say('RED HERO WINS!!');
      await sleep(1800);

      celebrateVictory();
      await sleep(1800);
      explore.hidden = false;
      explore.focus({ preventScroll: true });
    }

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      move(RedHero, -95, 0);
      move(BlueRival, 125, 0);
      pose(BlueRival, P.fall, 0);
      BlueRival.el.style.opacity = '0';
      Referee.el.style.opacity = '1';
      pose(Referee, P.ref, 0);
      pose(RedHero, P.win, 0);
      call.style.opacity = '0';
      win.classList.add('show');
      explore.hidden = false;
    } else {
      runTournamentArc();
    }
  }
}

/* ==========================================================================
   FORM SUBMISSION
   ========================================================================== */
const form = document.getElementById('joinForm');
if (form) {
  const err = document.getElementById('err');
  const btn = document.getElementById('send');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    err.textContent = '';
    btn.disabled = true;
    btn.textContent = 'TRANSMITTING... ⚡';

    const formData = Object.fromEntries(new FormData(form));
    formData._subject = 'New Epic Academy Trainee: ' + formData.Name;
    formData._template = 'table';

    try {
      const response = await fetch('https://formsubmit.co/ajax/epicacademycoimbatore20@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData)
      });
      const resJson = await response.json();
      if (!response.ok || resJson.success === 'false') throw new Error();

      document.getElementById('who').textContent = formData.Name;
      form.hidden = true;
      document.getElementById('thanks').hidden = false;
    } catch (errExp) {
      err.textContent = 'Signal interrupted! Please try again or call +91 93631 97914 directly.';
      btn.disabled = false;
      btn.textContent = 'SUBMIT APPLICATION 🚀';
    }
  });
}