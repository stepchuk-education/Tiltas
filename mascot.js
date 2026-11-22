/* ===================== Tiltas: персонаж, міст, інтро ===================== */

/* Зображення персонажа (папка pet/). Якщо якогось настрою тут немає, персонаж малюється вектором.
   У папці pet/ лежать усі 21 емоції — будь-яку можна підставити замість наявної. */
const PET_IMG = {
  /* спокій — блакитний */
  happy:  'pet/main.webp',        // звичайний настрій
  calm:   'pet/calm.webp',
  /* радість — світлішає до білого */
  joy:    'pet/hd-joy.webp',     // правильна відповідь
  joy2:   'pet/hd-joy.webp',        // кілька правильних поспіль, день виконано
  joy3:   'pet/hd-bliss.webp',   // серія правильних, чудовий результат
  proud:  'pet/hd-joy.webp',
  done:   'pet/hd-bliss.webp',   // міст добудовано
  /* злість — від рожевого до червоного */
  angry:  'pet/hd-angry.webp',     // помилка
  angry2: 'pet/hd-angry.webp',      // дві помилки поспіль
  angry3: 'pet/rage.webp',        // три і більше поспіль
  /* сум — насичений синій */
  sad:    'pet/hd-worry.webp',        // 2–3 дні без занять
  sad2:   'pet/hd-sad.webp',        // 4–6 днів
  sad3:   'pet/hd-sad.webp',     // тиждень і більше
};
/* Чіткіші великі версії для показу на весь екран. */
const PET_IMG_BIG = { happy: 'pet/main-big.webp' };
/* Шлях до відео-інтро (напр. 'intro.mp4'). Поки порожньо — показується анімований мультик із міста. */
const INTRO_VIDEO = 'pet/intro.mp4';
/* Підписи до інтро: [початок, кінець (с), заголовок, литовською] */
const INTRO_CAPS = [
  [0.0, 1.8, 'Це — Pūkas.', 'Čia – Pūkas.', 'Йому дуже треба на той берег.'],
  [1.8, 3.5, 'Але мосту немає…', 'Tilto nėra…', ''],
  [3.5, 7.3, 'Кожне завдання — нова дошка.', 'Viena užduotis – viena lenta.', ''],
  [7.3, 10.0, 'Помилка? Pūkas злиться…', 'Klaida? Nieko baisaus!', '…але не здається.'],
  [10.0, 12.8, 'Крок за кроком міст росте.', 'Žingsnis po žingsnio.', ''],
];

const PET_COLORS = {
  happy:  ['#ffffff', '#dbe8fb'],
  calm:   ['#ffffff', '#dbe8fb'],
  sad:    ['#e9f2ff', '#6f9ef0'],
  angry:  ['#ffe6e3', '#ef6a62'],
  proud:  ['#ffffff', '#bcd8ff'],
};
const PET_LINES = {
  happy: [['Labas, Olegai! Statom toliau?', 'Привіт! Будуємо далі?'], ['Viena lenta per dieną – ir būsime kitame krante!', 'Одна дошка на день — і ми на тому березі!'], ['Šiandien išmoksim kažką naujo.', 'Сьогодні вивчимо щось нове.']],
  sad:   [['Pasiilgau tavęs… Grįžk, statykim tiltą!', 'Я скучив… Повертайся, будуймо міст!'], ['Be tavęs tiltas nestatomas…', 'Без тебе міст не будується…']],
  angry: [['Grrr! Klaidos! Bet nieko – pataisysim.', 'Гррр! Помилки! Але нічого — виправимо.']],
  proud: [['Šaunu! Šiandien tiltas paaugo!', 'Чудово! Сьогодні міст підріс!'], ['Puiku! Tu – tikras statybininkas!', 'Супер! Ти справжній будівельник!']],
  done:  [['Mes kitame krante! Sėkmės egzamine!', 'Ми на тому березі! Успіху на іспиті!']],
};
const petName = () => (S.pet && S.pet.trim()) || 'Pūkas';

let petUid = 0;
const moodBase = m => m === 'joy' || m === 'calm' ? 'happy' : m === 'done' ? 'proud' : m.replace(/\d+$/, '');
function petSVG(mood = 'happy', size = 96, cls = '') {
  if (PET_IMG[mood]) {
    const c = `pet petimg ${moodBase(mood)} ${mood} ${cls}`;
    const src = size > 140 && PET_IMG_BIG[mood] ? PET_IMG_BIG[mood] : PET_IMG[mood];
    return cls.includes('onbridge')
      ? `<image class="${c}" href="${src}" width="${size}" height="${size}"/>`
      : `<img class="${c}" src="${src}" width="${size}" height="${size}" alt="${esc(petName())}" draggable="false">`;
  }
  mood = moodBase(mood);
  const id = 'p' + (++petUid), [c1, c2] = PET_COLORS[mood] || PET_COLORS.happy;
  const eyes = mood === 'proud'
    ? `<path d="M38 60 q8 -9 16 0 M66 60 q8 -9 16 0" stroke="#16264a" stroke-width="4" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="47" cy="60" rx="8.5" ry="${mood === 'sad' ? 9 : 10.5}" fill="#16264a"/><ellipse cx="73" cy="60" rx="8.5" ry="${mood === 'sad' ? 9 : 10.5}" fill="#16264a"/>
       <circle cx="${mood === 'sad' ? 44 : 50}" cy="${mood === 'sad' ? 60 : 56}" r="3.2" fill="#fff"/><circle cx="${mood === 'sad' ? 70 : 76}" cy="${mood === 'sad' ? 60 : 56}" r="3.2" fill="#fff"/>`;
  const brows = mood === 'angry' ? `<path d="M37 45 L55 51 M83 45 L65 51" stroke="#7a1d18" stroke-width="4" stroke-linecap="round"/>`
    : mood === 'sad' ? `<path d="M38 50 L54 45 M82 50 L66 45" stroke="#1d3b74" stroke-width="3.5" stroke-linecap="round"/>` : '';
  const mouth = mood === 'angry' ? `<path d="M53 80 q7 -5 14 0" stroke="#7a1d18" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : mood === 'sad' ? `<path d="M54 81 q6 -4 12 0" stroke="#1d3b74" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : `<path d="M52 77 q8 8 16 0" stroke="#16264a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const extra = mood === 'sad' ? `<path class="tear" d="M40 72 q-3 6 0 9 q3 -3 0 -9z" fill="#9cc4ff"/>`
    : mood === 'angry' ? `<g class="steam" fill="#ffd0cc"><circle cx="22" cy="28" r="5"/><circle cx="15" cy="20" r="3.5"/><circle cx="98" cy="28" r="5"/><circle cx="105" cy="20" r="3.5"/></g>`
    : mood === 'proud' ? `<g class="spark" fill="#ffd166"><path d="M18 30 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z"/><path d="M100 22 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z"/><path d="M104 70 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2z"/></g>`
    : `<ellipse cx="36" cy="72" rx="6" ry="3.5" fill="#bcd4fb" opacity=".8"/><ellipse cx="84" cy="72" rx="6" ry="3.5" fill="#bcd4fb" opacity=".8"/>`;
  return `<svg class="pet ${mood} ${cls}" width="${size}" height="${size}" viewBox="0 0 120 120" role="img" aria-label="${esc(petName())}">
    <defs>
      <filter id="${id}f" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="7"/></filter>
      <radialGradient id="${id}g" cx="42%" cy="35%" r="70%"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
    </defs>
    <ellipse cx="60" cy="108" rx="28" ry="5" fill="#0b2a63" opacity=".14"/>
    <g class="feet" fill="${c2}"><ellipse cx="48" cy="103" rx="7" ry="4"/><ellipse cx="72" cy="103" rx="7" ry="4"/></g>
    <g filter="url(#${id}f)"><circle cx="60" cy="64" r="41" fill="url(#${id}g)"/><circle cx="60" cy="62" r="34" fill="${c1}" opacity=".55"/></g>
    ${extra}${brows}${eyes}${mouth}
  </svg>`;
}

/* Настрій персонажа */
function lastActiveDate() { const ds = Object.keys(S.days).filter(d => Object.keys(S.days[d].done || {}).length).sort(); return ds[ds.length - 1] || null; }
function bridgeState() {
  const total = Math.max(7, diffDays(S.start, S.exam));
  const built = Math.min(total, Object.values(S.days).filter(r => Object.keys(r.done || {}).length >= 2).length);
  return { total, built };
}
function petMood() {
  if (S.flash && Date.now() - S.flash.t < 90000) return S.flash.mood;
  const { total, built } = bridgeState();
  if (built >= total) return 'done';
  const last = lastActiveDate(), away = last ? diffDays(last, todayStr()) : dayIdx();
  if (S.onboarded && away >= 2) return away >= 7 ? 'sad3' : away >= 4 ? 'sad2' : 'sad';
  const tasks = todayPlan(), rec = dayRec();
  if (tasks.length && tasks.every(t => rec.done[t.key])) return 'proud';
  return 'happy';
}
function petFlash(mood) { S.flash = { mood, t: Date.now() }; }
let petTaps = 0;
function petLine(mood) {
  const { total, built } = bridgeState();
  const list = built >= total ? PET_LINES.done : (PET_LINES[mood] || PET_LINES[moodBase(mood)] || PET_LINES.happy);
  return list[(new Date().getDate() + built + petTaps) % list.length];
}

/* Міст */
function bridgeSVG(built, total, mood, opts = {}) {
  const W = 360, H = 200, x0 = 74, x1 = 286, yb = 120, peak = 86;
  const ptAt = t => { const x = x0 + (x1 - x0) * t; const y = yb - 4 * (yb - peak) * t * (1 - t); return [x, y]; };
  const n = Math.max(1, total);
  let planks = '';
  for (let i = 0; i < n; i++) {
    const t = (i + .5) / n, [x, y] = ptAt(t);
    const ang = Math.atan2(-4 * (yb - peak) * (1 - 2 * t), x1 - x0) * 180 / Math.PI;
    const w = (x1 - x0) / n + 0.6;
    const state = i < built ? 'on' : i === built && opts.partial ? 'part' : 'off';
    planks += `<rect class="plank ${state}" x="${(x - w / 2).toFixed(1)}" y="${(y - 4).toFixed(1)}" width="${w.toFixed(1)}" height="8" rx="1.5" transform="rotate(${ang.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" style="--d:${(i * 0.03).toFixed(2)}s"/>`;
  }
  const done = built / n;
  const railPts = []; for (let k = 0; k <= 40; k++) { const t = k / 40; if (t > done + 0.001) break; const [x, y] = ptAt(t); railPts.push(`${x.toFixed(1)},${(y - 13).toFixed(1)}`); }
  const pillars = [0.25, 0.5, 0.75].map(t => { const [x, y] = ptAt(t); return `<rect class="pillar ${t <= done ? 'on' : ''}" x="${(x - 2.5).toFixed(1)}" y="${(y + 4).toFixed(1)}" width="5" height="${(150 - y).toFixed(1)}" rx="1.5"/>`; }).join('');
  const petT = built >= n ? 1.12 : Math.max(-0.12, done - 0.5 / n);
  const [px, py] = petT > 1 ? [x1 + 34, yb - 2] : petT < 0 ? [x0 - 30, yb - 2] : ptAt(petT);
  const ps = opts.petSize || 54;
  return `<svg class="bridge" viewBox="0 0 ${W} ${H}" role="img" aria-label="Міст: збудовано ${built} з ${n} дошок">
    <defs>
      <linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sky1"/><stop offset="1" class="sky2"/></linearGradient>
      <linearGradient id="riverg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="riv1"/><stop offset="1" class="riv2"/></linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#skyg)"/>
    <circle class="sun" cx="300" cy="44" r="20"/>
    <g class="clouds"><ellipse cx="70" cy="40" rx="26" ry="8"/><ellipse cx="88" cy="34" rx="16" ry="8"/><ellipse cx="210" cy="26" rx="20" ry="6"/></g>
    <g class="town">
      <rect x="300" y="92" width="14" height="22"/><path d="M298 93 l9 -9 9 9z"/>
      <rect x="318" y="86" width="10" height="28"/><path d="M316 87 l7 -16 7 16z"/>
      <rect x="331" y="96" width="16" height="18"/><path d="M329 97 l10 -9 10 9z"/>
      <line x1="347" y1="80" x2="347" y2="96" class="pole"/><rect x="347" y="80" width="10" height="2.4" fill="#fdb913"/><rect x="347" y="82.4" width="10" height="2.4" fill="#006a44"/><rect x="347" y="84.8" width="10" height="2.4" fill="#c1272d"/>
    </g>
    <rect y="128" width="${W}" height="${H - 128}" fill="url(#riverg)"/>
    <g class="waves"><path d="M-40 150 q10 -4 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"/><path d="M-30 172 q10 -4 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"/></g>
    <path class="bank" d="M0 116 Q36 108 ${x0} 120 L${x0 + 6} ${H} L0 ${H}Z"/>
    <path class="bank" d="M${x1} 120 Q326 106 ${W} 112 L${W} ${H} L${x1 - 6} ${H}Z"/>
    ${pillars}
    ${railPts.length > 1 ? `<polyline class="rail" points="${railPts.join(' ')}"/>` : ''}
    ${planks}
    <g class="petpos" transform="translate(${(px - ps / 2).toFixed(1)} ${(py - ps + 6).toFixed(1)})">${petSVG(mood, ps, 'onbridge')}</g>
  </svg>`;
}

/* Інтро */
function showIntro(onDone) {
  if (!INTRO_VIDEO) return onDone && onDone();
  const first = !S.introSeen;
  const el = document.createElement('div');
  el.className = 'intro vintro';
  el.innerHTML = `<video class="iv" src="${INTRO_VIDEO}" playsinline muted autoplay preload="auto"></video>
    <div class="iv-scrim"></div>
    <div class="iv-bars">${INTRO_CAPS.map(() => '<i><b></b></i>').join('')}</div>
    <div class="iv-top">
      <button class="iv-btn" data-iact="sound" aria-label="Звук">🔇</button>
      ${first ? '' : '<button class="iv-btn skip" data-iact="skip">Пропустити</button>'}
    </div>
    <div class="iv-cap" id="ivcap"></div>
    <div class="iv-end" id="ivend">
      <div class="iv-logo"><svg viewBox="0 0 32 20" aria-hidden="true"><path d="M2 15 Q16 2 30 15" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M6 11.5v6M11 8v9.5M16 7v10.5M21 8v9.5M26 11.5v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".6"/><path d="M1 17.5h30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><b>Tiltas</b></div>
      <p>Міст до іспиту.<br>Будуймо разом!</p>
      <button class="btn pill" data-iact="go">Почати</button>
      ${first ? '' : `<label class="autochk"><input type="checkbox" id="iauto" ${S.introAuto ? 'checked' : ''}> Показувати під час запуску</label>`}
    </div>`;
  $('#device').appendChild(el);
  document.body.classList.add('noscroll');
  requestAnimationFrame(() => el.classList.add('open'));
  const v = $('.iv', el), cap = $('#ivcap', el), end = $('#ivend', el), bars = el.querySelectorAll('.iv-bars b');
  let shown = -1, raf = 0, done = false;
  const tick = () => {
    const t = v.currentTime || 0;
    INTRO_CAPS.forEach((c, k) => { bars[k].style.width = (t >= c[1] ? 100 : t <= c[0] ? 0 : 100 * (t - c[0]) / (c[1] - c[0])) + '%'; });
    const k = INTRO_CAPS.findIndex(c => t >= c[0] && t < c[1]);
    if (k !== shown) { shown = k;
      cap.classList.remove('on');
      if (k >= 0) { const c = INTRO_CAPS[k]; setTimeout(() => { cap.innerHTML = `<small class="lt">${esc(c[3])}</small><h2>${esc(c[2])}</h2>${c[4] ? `<p>${esc(c[4])}</p>` : ''}`; cap.classList.add('on'); }, 160); } }
    if (t >= INTRO_CAPS[INTRO_CAPS.length - 1][1]) end.classList.add('on');
    raf = requestAnimationFrame(tick);
  };
  tick();
  v.addEventListener('ended', () => end.classList.add('on'));
  v.addEventListener('error', () => end.classList.add('on'));
  const pr = v.play(); if (pr && pr.catch) pr.catch(() => end.classList.add('on'));
  function close() {
    if (done) return; done = true; cancelAnimationFrame(raf);
    const chk = $('#iauto', el); if (chk) S.introAuto = chk.checked; S.introSeen = true; save();
    el.classList.remove('open'); setTimeout(() => el.remove(), 300);
    try { v.pause(); } catch (e) {}
    if (!sheetStack.length) document.body.classList.remove('noscroll');
    if (onDone) onDone();
  }
  el.addEventListener('click', e => {
    const b = e.target.closest('[data-iact]'); if (!b) return;
    const a = b.dataset.iact;
    if (a === 'sound') { v.muted = !v.muted; b.textContent = v.muted ? '🔇' : '🔊'; if (v.paused && !end.classList.contains('on')) v.play().catch(() => {}); }
    if (a === 'skip' || a === 'go') close();
  });
}
