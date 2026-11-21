/* ===================== Базові утиліти ===================== */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad = n => String(n).padStart(2, '0');
const dstr = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const todayStr = () => dstr(new Date());
const parseD = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); };
const addDays = (s, n) => { const d = parseD(s); d.setDate(d.getDate()+n); return dstr(d); };
const diffDays = (a, b) => Math.round((parseD(b) - parseD(a)) / 86400000);
const shuffle = a => { a = a.slice(); for (let i = a.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random()*a.length)];
const MONTHS_UA = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];
const fmtD = s => { const d = parseD(s); return `${d.getDate()} ${MONTHS_UA[d.getMonth()]}`; };
const plural = (n, a, b, c) => { const m10 = n%10, m100 = n%100; if (m10===1 && m100!==11) return a; if (m10>=2 && m10<=4 && (m100<10||m100>=20)) return b; return c; };
const LT_LETTERS = ['ą','č','ę','ė','į','š','ų','ū','ž'];
const INTERVALS = [0,1,2,4,7,14,30];

/* SVG-іконки (лінійні) */
const ICON = {
  play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>',
  home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  lang:'<path d="M4 5h11M9.5 3v2M6 5c1 4 4 7 8 8M13 5c-1 4-4 7-8 9"/><path d="M14 21l4-9 4 9M15.5 18h5"/>',
  konst:'<path d="M3 21h18M5 18h14M4 9h16L12 4z"/><path d="M7 10v7M12 10v7M17 10v7"/>',
  dict:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
  chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  speaker:'<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  flame:'<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2-5 .8 1.5 1.5 2 2.5 2C11 7 11 5 12 3z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
  bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  ear:'<path d="M7 10a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0"/><path d="M10 10a2 2 0 0 1 4 0"/>',
  pen:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
  read:'<path d="M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3zM21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z"/>',
  chat:'<path d="M4 5h16v11H9l-5 4z"/>',
  repeat:'<path d="M4 9a7 7 0 0 1 12-3l2 2M20 15a7 7 0 0 1-12 3l-2-2"/><path d="M18 4v4h-4M6 20v-4h4"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
};
const ic = (n, cls='') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]||''}</svg>`;

/* ===================== Стан ===================== */
const LS_KEY = 'lt-a2-oleg-v1';
function defState() {
  const st = todayStr();
  return { v:1, name:'Олег', start:st, exam:addDays(st, 42), remind:'19:00', voice:'auto', onboarded:false,
    rules:{}, diag:null, read:{}, listen:{}, write:{}, speak:{}, role:{}, ksec:{}, mocks:[], weekly:[],
    srs:{}, words:[], days:{}, factI:0, mist:[], chat:[], exams:{}, official:[], updated:Date.now() };
}
let S = (() => { try { const j = localStorage.getItem(LS_KEY); if (j) return Object.assign(defState(), JSON.parse(j)); } catch(e) {} return defState(); })();
const cap = { db:null, ref:null, sample:null, tts:null, dict:null, dl:null };
let syncTimer = null, syncBusy = false, syncAgain = false;

function save() {
  S.updated = Date.now();
  try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch(e) {}
  if (cap.ref) { clearTimeout(syncTimer); syncTimer = setTimeout(pushRemote, 1500); }
}
async function pushRemote() {
  if (!cap.ref) return;
  if (syncBusy) { syncAgain = true; return; }
  syncBusy = true;
  try { await cap.ref.set({ json: JSON.stringify(S), updated: S.updated }); }
  catch(e) { if (e && (e.code === 'invalid_argument' || e.code === 'revoked' || e.code === 'not_granted')) cap.ref = null; }
  syncBusy = false;
  if (syncAgain) { syncAgain = false; pushRemote(); }
}

/* ===================== Дні, тижні, план ===================== */
const dayIdx = () => Math.max(0, diffDays(S.start, todayStr()));
const curWeek = () => Math.min(6, Math.floor(dayIdx()/7) + 1);
const daysLeft = () => diffDays(todayStr(), S.exam);
function dayRec(d = todayStr()) { if (!S.days[d]) S.days[d] = { done:{}, min:0 }; return S.days[d]; }
function markDone(key, min) { const r = dayRec(); if (!r.done[key]) { r.done[key] = 1; r.min += min || 0; } save(); }
function streak() {
  let n = 0, d = todayStr();
  if (!S.days[d] || !Object.keys(S.days[d].done).length) d = addDays(d, -1);
  while (S.days[d] && Object.keys(S.days[d].done).length) { n++; d = addDays(d, -1); }
  return n;
}

/* Майстерність */
const pct = h => h && h.length ? Math.round(100 * h.reduce((a,b)=>a+b,0) / h.length) : null;
const ruleM = id => pct(S.rules[id]?.hist);
const ksecM = id => pct(S.ksec[id]?.hist);
function pushHist(obj, id, v) { if (!obj[id]) obj[id] = { hist:[] }; obj[id].hist.push(v ? 1 : 0); if (obj[id].hist.length > 12) obj[id].hist.shift(); }
function lvl(m) { if (m === null) return ['new','Нове']; if (m < 60) return ['weak','Слабко']; if (m < 85) return ['mid','Майже']; return ['good','Добре']; }

function nextRule() {
  const w = curWeek();
  const pool = RULES.filter(r => r.week <= w);
  const notLearned = pool.find(r => !(S.rules[r.id]?.best >= 80));
  if (notLearned) return notLearned;
  const tried = RULES.filter(r => ruleM(r.id) !== null).sort((a,b) => ruleM(a.id) - ruleM(b.id));
  return tried[0] || RULES[0];
}
function weakRules(n = 3) {
  return RULES.filter(r => { const m = ruleM(r.id); return m !== null && m < 70; }).sort((a,b) => ruleM(a.id) - ruleM(b.id)).slice(0, n);
}
function nextOf(list, store, w = curWeek()) {
  const pool = list.filter(x => (x.week || 1) <= w);
  const src = pool.length ? pool : list;
  const nd = src.find(x => store[x.id] === undefined);
  if (nd) return nd;
  return src.slice().sort((a,b) => (store[a.id]?.score ?? store[a.id] ?? 0) - (store[b.id]?.score ?? store[b.id] ?? 0))[0];
}
function nextKSec() {
  const w = curWeek();
  const pool = KSECTIONS.filter(s => s.week <= w);
  const unread = pool.find(s => !S.ksec[s.id]?.read);
  if (unread) return unread;
  const sorted = KSECTIONS.filter(s => S.ksec[s.id]?.read).sort((a,b) => (ksecM(a.id) ?? 0) - (ksecM(b.id) ?? 0));
  return sorted[0] || KSECTIONS[0];
}
const SKILL_ROT = ['read','write','listen','speak','read','role','weekly'];
const SKILL_META = {
  read:  { t:'Читання', i:'read', min:10 },
  write: { t:'Письмо', i:'pen', min:15 },
  listen:{ t:'Аудіювання', i:'ear', min:10 },
  speak: { t:'Говоріння', i:'mic', min:10 },
  role:  { t:'Розмова', i:'chat', min:10 },
};
function todayPlan() {
  const tasks = [];
  if (!S.diag) {
    tasks.push({ key:'diag', icon:'target', title:'Діагностика', sub:`${RULES.length * 2} коротких завдань з усієї граматики A2.`+' Покаже, що підтягувати першим.', min:15, act:'diag' });
    return tasks;
  }
  const due = dueItems().length;
  tasks.push({ key:'rev', icon:'repeat', title:'Повторення', sub: due ? `${due} ${plural(due,'картка','картки','карток')}: слова, правила, факти` : 'Усе повторено. Можна додати слова в словник.', min:10, act:'review', empty:!due });
  const openM = openMistakes().length;
  if (openM >= 3) tasks.push({ key:'mist', icon:'target', title:'Робота над помилками', sub:`${openM} ${plural(openM,'помилка','помилки','помилок')} чекають на виправлення`, min:10, act:'mist-practice' });
  const r = nextRule();
  tasks.push({ key:'gram', icon:'lang', title:'Граматика: ' + r.ua, sub: r.lt + ' · теорія і практика', min:12, act:'rule:'+r.id });
  const dow = dayIdx() % 7, w = curWeek();
  const kind = skillKind(dow);
  const special = planSpecial(dayIdx(), w, dow);
  if (special) {
    if (special.min >= 40) { const gi = tasks.findIndex(t => t.key === 'gram'); if (gi >= 0) tasks.splice(gi, 1); }
    tasks.push(special);
  } else if (kind === 'weekly') {
    tasks.push({ key:'skill', icon:'target', title:'Підсумок тижня ' + w, sub:'Коротка перевірка граматики й Конституції за тиждень', min:10, act:'weekly' });
  } else {
    const list = {read:READING, write:WRITING, listen:LISTENING, speak:SPEAKING, role:ROLEPLAYS}[kind];
    const store = {read:S.read, write:S.write, listen:S.listen, speak:S.speak, role:S.role}[kind];
    const it = nextOf(list, store);
    const m = SKILL_META[kind];
    tasks.push({ key:'skill', icon:m.i, title:m.t + ': ' + (it.title || it.q), sub: it.ua || '', min:m.min, act:kind+':'+it.id });
  }
  if (w === 6) {
    tasks.push({ key:'konst', icon:'konst', title:'Пробний іспит з Конституції', sub:'20 питань, для успіху потрібно 14', min:15, act:'mock' });
  } else if ([1,3,5].includes(dow)) {
    const s = nextKSec();
    tasks.push({ key:'konst', icon:'konst', title:'Конституція: ' + s.ua, sub: s.lt + ' · ' + s.arts, min:15, act:'ksec:'+s.id });
  }
  return tasks;
}

/* ===================== Інтервальне повторення ===================== */
function srsAdd(id) { if (!S.srs[id]) S.srs[id] = { b:0, d:todayStr() }; }
function srsGrade(id, ok) {
  const it = S.srs[id] || { b:0 };
  it.b = ok ? Math.min(it.b + 1, INTERVALS.length - 1) : 0;
  it.d = addDays(todayStr(), ok ? INTERVALS[it.b] : 1);
  S.srs[id] = it;
}
function dueItems() {
  const t = todayStr();
  return Object.keys(S.srs).filter(id => S.srs[id].d <= t && srsResolve(id));
}
function srsResolve(id) {
  const [k, a, b] = id.split('|');
  if (k === 'w') { const w = S.words.find(x => x.lt === a); return w ? { k, w } : null; }
  if (k === 'r') { const r = RULES.find(x => x.id === a); return r ? { k, r } : null; }
  if (k === 'n' || k === 'q') { const s = KSECTIONS.find(x => x.id === a); if (!s) return null; const it = (k === 'n' ? s.nums : s.q)[+b]; return it ? { k, s, it, i:+b } : null; }
  return null;
}

/* ===================== Можливості середовища ===================== */
async function initCaps() {
  if (!window.claude || !claude.use) return;
  const safe = p => p.catch(() => null);
  const [db, user, sample, tts, dict, dl] = await Promise.all(['db','user','sample','tts','dictation','downloads'].map(n => safe(claude.use(n))));
  cap.sample = sample; cap.tts = tts; cap.dict = dict; cap.dl = dl;
  if (dict) {
    dict.onFinal(({text}) => { if (dictTarget) { dictTarget.value = (dictTarget.value ? dictTarget.value.replace(/\s+$/,'') + ' ' : '') + text; dictTarget.dispatchEvent(new Event('input')); } });
    dict.onState(({state}) => { dictOn = state === 'listening'; document.querySelectorAll('[data-act="mic"]').forEach(b => b.classList.toggle('on', dictOn)); });
  }
  if (db && user) {
    try {
      const id = await user.id();
      if (id) {
        const ref = db.collection('data/users/' + id).doc('state');
        const timer = new Promise(r => setTimeout(() => r('timeout'), 10000));
        const snap = await Promise.race([ref.get(), timer]);
        if (snap !== 'timeout') {
          cap.ref = ref;
          if (snap.exists) {
            const body = snap.data();
            if (body && body.json && (body.updated || 0) > (S.updated || 0)) {
              S = Object.assign(defState(), JSON.parse(body.json));
              try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch(e) {}
            } else if ((body?.updated || 0) < (S.updated || 0) && S.onboarded) pushRemote();
          } else if (S.onboarded) pushRemote();
          cap.synced = true;
        }
      }
    } catch(e) { cap.ref = null; }
  }
  render();
}

/* Озвучення литовською */
let speakingBtn = null;
async function say(text, opts = {}) {
  const lines = Array.isArray(text) ? text : [text];
  if (cap.tts && S.voice !== 'browser') {
    try {
      const voices = ['buttery','airy'];
      await cap.tts.speak(lines.map((t, i) => ({ text:t, voice: opts.dialog ? voices[i%2] : 'buttery', language:'lt' })), { rate: opts.rate || 0.9 });
      return true;
    } catch(e) { if (e && e.code === 'not_granted') cap.tts = null; if (e && e.code === 'viewer_stopped') return true; }
  }
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const vs = speechSynthesis.getVoices();
    const v = vs.find(v => /^lt/i.test(v.lang));
    lines.forEach(t => { const u = new SpeechSynthesisUtterance(t); u.lang = 'lt-LT'; u.rate = opts.rate || 0.9; if (v) u.voice = v; speechSynthesis.speak(u); });
    if (!v) toast('На цьому пристрої немає литовського голосу — вимова може бути неточною.');
    return true;
  }
  toast('Озвучення недоступне на цьому пристрої. Текст можна відкрити кнопкою «Показати текст».');
  return false;
}

/* Диктування */
let dictTarget = null, dictOn = false;
function micBtn(target) { return (cap.dict || (typeof browserDictAvailable === 'function' && browserDictAvailable())) ? `<button class="btn ghost mic" data-act="mic" data-target="${target}" type="button">${ic('mic')}<span>Сказати голосом</span></button>` : ''; }

/* Запит до ШІ */
async function askAI(prompt) {
  if (!cap.sample) throw { code:'none' };
  const r = await cap.sample(prompt, { modelTier:'default' });
  const t = r.text || '';
  const m = t.match(/\{[\s\S]*\}/);
  if (!m) throw { code:'parse', text:t };
  return JSON.parse(m[0]);
}
const RULE_IDS = () => RULES.map(r => `${r.id} (${r.ua})`).join('; ');

/* ===================== Тости й модальні вікна ===================== */
function toast(msg) {
  const t = $('#toast'); t.innerHTML = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 3500);
}
const sheetStack = [];
function openSheet(html, opts = {}) {
  const el = document.createElement('div');
  el.className = 'sheet' + (opts.small ? ' small' : '');
  el.innerHTML = `<div class="sheet-in" role="dialog" aria-modal="true"><header class="sheet-h"><button class="iconbtn" data-act="close" aria-label="Закрити">${ic(opts.small ? 'x' : 'back')}</button><div class="sheet-t">${opts.title || ''}</div></header><div class="sheet-b">${html}</div></div>`;
  $('#device').appendChild(el);
  sheetStack.push(el);
  document.body.classList.add('noscroll');
  requestAnimationFrame(() => el.classList.add('open'));
  return el.querySelector('.sheet-b');
}
function closeSheet() {
  const el = sheetStack.pop(); if (!el) return;
  if (cap.tts) { try { cap.tts.stop(); } catch(e) {} }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (dictOn && cap.dict) cap.dict.stop().catch(()=>{});
  el.remove();
  if (!sheetStack.length) { document.body.classList.remove('noscroll'); render(); }
}
const topSheet = () => sheetStack[sheetStack.length - 1]?.querySelector('.sheet-b');

/* ===================== Рендер вкладок ===================== */
const TABS = [
  ['today','Сьогодні','home'], ['mova','Мова','lang'], ['konst','Конституція','konst'], ['klaidos','Помилки','target'], ['zodynas','Словник','dict'], ['progresas','Прогрес','chart']
];
let tab = 'today', langSeg = 'gram', dictQuery = '';
function readHash() { const h = location.hash.replace('#',''); if (TABS.some(t => t[0] === h)) tab = h; }

function render() {
  $('#main').classList.toggle('onbm', !S.onboarded);
  $('#device').classList.toggle('lav', !S.onboarded || tab === 'today');
  if (!S.onboarded) { $('#main').innerHTML = viewOnboard(); $('#nav').innerHTML = ''; $('#top').innerHTML = ''; $('#tutor').hidden = true; mountRig(); return; }
  $('#tutor').hidden = false;
  $('#top').innerHTML = topBar();
  const openN = typeof openMistakes === 'function' ? openMistakes().length : 0;
  $('#nav').innerHTML = TABS.map(([id, t, i]) => `<a href="#${id}" class="${tab === id ? 'on' : ''}" data-tab="${id}">${ic(i)}<span>${t}</span>${id === 'klaidos' && openN ? `<em class="badge">${openN}</em>` : ''}</a>`).join('');
  const v = { today:viewToday, mova:viewLang, konst:viewKonst, klaidos:viewMist, zodynas:viewDict, progresas:viewProg }[tab];
  $('#main').innerHTML = v();
  mountRig();
  if (tab === 'zodynas') { const i = $('#dq'); if (i && dictQuery) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }
}

function topBar() {
  const left = daysLeft(), w = curWeek();
  const prog = Math.min(100, Math.round(100 * dayIdx() / Math.max(1, diffDays(S.start, S.exam))));
  return `<div class="top-in">
    <div class="brand"><svg class="logo" viewBox="0 0 32 20" aria-hidden="true"><path d="M2 15 Q16 2 30 15" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M6 11.5v6M11 8v9.5M16 7v10.5M21 8v9.5M26 11.5v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".55"/><path d="M1 17.5h30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span>Tiltas</span></div>
    <div class="count" title="Дата іспиту: ${fmtD(S.exam)}"><b>${left >= 0 ? left : 0}</b> ${plural(Math.max(left,0),'день','дні','днів')} до іспиту · тиждень ${w} з 6</div>
    <div class="track"><i style="width:${prog}%"></i></div></div>`;
}

/* Живий Pūkas (pet-rig.js): вставляємо полотно в контейнер, фраза — у хмаринку */
function mountRig() {
  const host = document.querySelector('.rig-host');
  if (!host || typeof Rig === 'undefined') return;
  Rig.onSay = (lt, ua) => {
    const b = document.querySelector('.say'); if (!b) return;
    b.innerHTML = `<b class="lt">${esc(lt)}</b><small>${esc(ua)}</small>`; b.classList.add('open', 'pop');
    clearTimeout(Rig.timers.say); Rig.timers.say = setTimeout(() => b.classList.remove('pop'), 400);
  };
  Rig.onPet = () => { if (!S.onboarded || S.petted) return; S.petted = true; save(); const h = document.querySelector('.pet-hint'); if (h) h.remove(); };
  try { Rig.mount(host, host.dataset.mood || 'happy'); } catch (e) { console.warn(e); }
}

let obStep = 0;
function viewOnboard() {
  const dots = `<div class="ob-dots">${[0,1,2].map(i => `<i class="${i === obStep ? 'on' : ''}"></i>`).join('')}</div>`;
  const shell = (title, mood, body, cls = '') => `<section class="ob scr ${cls}">
    <h1 class="scr-h">${title}</h1>
    ${mood === 'happy' ? `<div class="scr-pet rig-host" data-mood="happy">${petSVG(mood, 300, 'big rig-fallback')}</div>` : `<div class="scr-pet">${petSVG(mood, 300, 'big')}</div>`}
    <div class="scr-bot">${body}</div></section>`;
  if (obStep === 0) return shell('Labas!<br>Будуймо міст<br>до іспиту?', 'happy', `
      <button class="btn pill" data-act="onb-next">Почати</button>
      <details class="more"><summary>Що вміє Tiltas?</summary>
        <ul class="onb-list">
          <li>${ic('target')}<span>Діагностика покаже слабкі місця.</span></li>
          <li>${ic('repeat')}<span>Повторення саме тоді, коли починаєш забувати.</span></li>
          <li>${ic('chat')}<span>ШІ перевіряє письмо й говоріння.</span></li>
        </ul>
        <p class="fine">Литовська мова A2 і основи Конституції — за програмами NŠA.</p>
      </details>`);
  if (obStep === 1) return shell('Як мене<br>звати?', 'joy', `${dots}
      <input class="ob-in" id="ob-pet" maxlength="20" value="${esc(S.pet || 'Pūkas')}" autocomplete="off" aria-label="Ім'я друга">
      <button class="btn pill" data-act="onb-next">Далі</button>`);
  return shell('Коли<br>іспит?', 'calm', `${dots}
      <input class="ob-in" type="date" id="ob-exam" value="${S.exam}" aria-label="Дата іспиту">
      <label class="ob-lbl"><span>Нагадувати о</span><input class="ob-in sm" type="time" id="ob-time" value="${S.remind}"></label>
      <button class="btn pill" data-act="onb-go">Готово</button>`);
}

function hello() {
  const h = new Date().getHours();
  if (h < 11) return 'Labas rytas';
  if (h < 18) return 'Laba diena';
  return 'Labas vakaras';
}

function viewToday() {
  const tasks = todayPlan();
  const rec = dayRec();
  const doneN = tasks.filter(t => rec.done[t.key]).length;
  const total = tasks.reduce((a,t) => a + t.min, 0);
  const weak = weakRules();
  const fact = FACTS[S.factI % FACTS.length];
  const st = streak();
  const mood = petMood(), [plt, pua] = petLine(mood), bs = bridgeState();
  const next = tasks.find(t => !rec.done[t.key]);
  const left = tasks.filter(t => !rec.done[t.key]).reduce((a,t) => a + t.min, 0);
  const left0 = Math.max(daysLeft(), 0);
  return `
  <section class="scr home ${mood}">
    <h1 class="scr-h">${hello()},<br>Olegai!</h1>
    <button class="say" data-act="bubble" aria-label="Показати переклад"><b class="lt">${esc(plt)}</b><small>${esc(pua)}</small></button>
    <div class="scr-pet rig-host" data-mood="${mood}" aria-label="${esc(petName())}: погладь мене">${petSVG(mood, 280, 'big rig-fallback')}${S.petted ? '' : '<span class="pet-hint">Погладь мене ☝</span>'}</div>
    <div class="scr-bot">
      <p class="scr-lbl">${bs.built} з ${bs.total} дошок</p>
      <div class="slide" style="--p:${Math.round(100 * bs.built / Math.max(1, bs.total))}%"><i></i><b></b></div>
      <div class="slide-ends"><span>Старт</span><span>Іспит · ${left0} ${plural(left0,'день','дні','днів')}</span></div>
      ${next ? `<button class="btn pill" data-act="${next.act}" data-task="${next.key}">${doneN ? 'Продовжити' : 'Почати заняття'} · ${left} хв</button>`
        : `<div class="all-done">${ic('check')}<span>Сьогодні все зроблено!</span></div>`}
    </div>
  </section>
  <div class="tiles">
    <div class="tile">${ic('flame')}<b>${st}</b><small>${plural(st,'день','дні','днів')} поспіль</small></div>
    <div class="tile">${ic('dict')}<b>${S.words.length}</b><small>${plural(S.words.length,'слово','слова','слів')}</small></div>
    <details class="tile fold">
      <summary>${ic('spark')}<b>Факт</b><small>натисни</small></summary>
      <div class="fold-in"><p>${fact}</p><button class="link" data-act="next-fact">Ще один</button></div>
    </details>
    ${weak.length ? `<details class="tile fold">
      <summary>${ic('target')}<b>${weak.length}</b><small>слабкі місця</small></summary>
      <div class="fold-in"><div class="chips">${weak.map(r => `<button class="chip weak" data-act="rule:${r.id}">${esc(r.ua)} · ${ruleM(r.id)}%</button>`).join('')}</div></div>
    </details>` : `<details class="tile fold">
      <summary>${ic('bell')}<b>${S.remind}</b><small>нагадування</small></summary>
      <div class="fold-in"><p>Додай щоденне нагадування в календар телефона.</p><button class="btn" data-act="ics">Додати в календар</button></div>
    </details>`}
  </div>`;
}

/* ----- Мова ----- */
function viewLang() {
  const seg = [['gram','Граматика'],['skills','Навички'],['exam','Іспит'],['topics','Слова']];
  let body = '';
  if (langSeg === 'exam') {
    body = viewExamSeg();
  } else if (langSeg === 'gram') {
    body = `
    <section class="card">
      <h2>Відмінки: шпаргалка</h2>
      <div class="cases">${CASES.map(c => `<div class="case"><b class="lt">${c[1]}</b><span>${c[2]}</span><small>${c[0]}</small><em class="lt">${c[3]}</em></div>`).join('')}</div>
      <p class="fine">Відмінок визначаємо питанням. Українською — ті самі питання, тож аналогії працюють.</p>
    </section>
    ${[1,2,3,4,5].map(w => {
      const rs = RULES.filter(r => r.week === w); if (!rs.length) return '';
      return `<h3 class="wk">Тиждень ${w}</h3><div class="list">${rs.map(r => { const m = ruleM(r.id); const [c, l] = lvl(m);
        return `<button class="row" data-act="rule:${r.id}"><span class="rowt"><b>${esc(r.ua)}</b><small class="lt">${esc(r.lt)}</small></span><span class="pill ${c}">${l}${m !== null ? ' · ' + m + '%' : ''}</span></button>`; }).join('')}</div>`; }).join('')}
    <section class="card"><h2>Діагностика</h2><p class="muted">${S.diag ? `Пройдено ${fmtD(S.diag.date)}: ${S.diag.score} з ${S.diag.total}. Можна пройти ще раз, щоб побачити прогрес.` : 'Ще не пройдено.'}</p><button class="btn" data-act="diag">Пройти діагностику</button></section>`;
  } else if (langSeg === 'skills') {
    const block = (title, icon, desc, list, store, kind, label) => `
      <h3 class="wk">${ic(icon)} ${title}</h3><p class="muted small">${desc}</p>
      <div class="list">${list.map(x => { const s = store[x.id]; const sc = s === undefined ? null : (typeof s === 'object' ? s.score : s);
        return `<button class="row" data-act="${kind}:${x.id}"><span class="rowt"><b>${esc(x.title || x.q)}</b><small>${esc(x.ua || '')}</small></span><span class="pill ${sc === null ? 'new' : sc >= 80 || (kind==='write' && sc >= 7) ? 'good' : 'mid'}">${sc === null ? 'тиждень ' + (x.week||1) : label(sc)}</span></button>`; }).join('')}</div>`;
    body = `
      <p class="muted">Іспит з мови має три частини: читання й письмо, аудіювання (електронно) та розмову з екзаменатором. Повна симуляція — у розділі «Іспит».</p>
      ${cap.sample ? `<div class="grid2"><button class="card action" data-act="ai-read">${ic('read')}<b>Новий текст</b><small>ШІ складе текст і питання на тему тижня</small></button><button class="card action" data-act="ai-listen">${ic('ear')}<b>Новий запис</b><small>ШІ складе оголошення чи діалог</small></button></div>` : ''}
      ${block('Читання','read','Оголошення, графіки, листи. Шукаємо час, ціну, адресу.', READING, S.read, 'read', s => s + '%')}
      ${block('Аудіювання','ear','Телефонні повідомлення, оголошення, діалоги. Числа й дати на слух.', LISTENING, S.listen, 'listen', s => s + '%')}
      ${block('Письмо','pen','Анкета й короткий лист 50–80 слів. Виконати всі пункти завдання.', WRITING, S.write, 'write', s => s + '/10')}
      ${block('Говоріння','mic','Питання екзаменатора про вас. Відповідайте 2–3 реченнями.', SPEAKING, S.speak, 'speak', s => 'тренувано')}
      ${block('Розмова з ШІ','chat','Живий діалог у побутовій ситуації: ШІ грає роль і виправляє помилки.', ROLEPLAYS, S.role, 'role', s => s + ' ' + plural(s,'раз','рази','разів'))}
      <section class="card"><h2>Рятівні фрази</h2><p class="muted">На іспиті їх не вважають помилкою: це частина навички спілкування.</p>
      <ul class="phr">${RESCUE.map(p => `<li><button class="iconbtn sm" data-act="say" data-text="${esc(p[0])}" aria-label="Озвучити">${ic('speaker')}</button><span><b class="lt">${esc(p[0])}</b><small>${esc(p[1])}</small></span></li>`).join('')}</ul></section>`;
  } else {
    body = `<p class="muted">12 тем програми іспиту. Відкрий тему, перевір слова й додай незнайомі до повторення.</p>
      <div class="list">${TOPICS.map(t => { const n = t.words.filter(w => S.words.some(x => x.lt === w[0])).length;
        return `<button class="row" data-act="topic:${t.id}"><span class="rowt"><b>${esc(t.ua)}</b><small class="lt">${esc(t.lt)}</small></span><span class="pill ${n ? 'mid' : 'new'}">${n}/${t.words.length} у словнику</span></button>`; }).join('')}</div>`;
  }
  return `<h1 class="pageh">Мова A2</h1>
    <div class="seg" role="tablist">${seg.map(([id, t]) => `<button role="tab" aria-selected="${langSeg === id}" class="${langSeg === id ? 'on' : ''}" data-act="seg:${id}">${t}</button>`).join('')}</div>${body}`;
}

/* ----- Конституція ----- */
function viewKonst() {
  const last = S.mocks[S.mocks.length - 1];
  const readN = KSECTIONS.filter(s => S.ksec[s.id]?.read).length;
  return `<h1 class="pageh">Основи Конституції</h1>
  <section class="card exam">
    <div class="examfmt"><div><b>20</b><small>питань</small></div><div><b>3</b><small>варіанти</small></div><div><b>14</b><small>щоб скласти</small></div></div>
    <p class="fine">Формат за офіційною програмою NŠA. Питання складають з усіх розділів Конституції, тож вчимо всі 14. Офіційного банку питань NŠA не публікує: питання в застосунку тренувальні, з номерами статей.</p>
  </section>
  <div class="note">${ic('bell')}<span>Іспит з Конституції (21 €) можна складати лише після того, як складено мовний іспит. Реєстрація — на migracija.lt.</span></div>
  <div class="grid2">
    <button class="card action" data-act="mock">${ic('target')}<b>Пробний іспит</b><small>${last ? `Останній: ${last.score}/20` : '20 питань з усіх розділів'}</small></button>
    <button class="card action" data-act="numgame">${ic('spark')}<b>Гра «Числа»</b><small>141, 4/5, 300 000…</small></button>
  </div>
  <h3 class="wk">Розділи програми · прочитано ${readN} з ${KSECTIONS.length}</h3>
  <div class="list">${KSECTIONS.map((s, i) => { const m = ksecM(s.id); const [c, l] = lvl(m); const read = S.ksec[s.id]?.read;
    return `<button class="row" data-act="ksec:${s.id}"><span class="knum">${i+1}</span><span class="rowt"><b>${esc(s.ua)}</b><small class="lt">${esc(s.lt)} · ${s.arts}</small></span><span class="pill ${read ? c : 'new'}">${read ? (m === null ? 'прочитано' : l + ' · ' + m + '%') : 'тиждень ' + s.week}</span></button>`; }).join('')}</div>
  <section class="card"><h2>Хронологія</h2><ol class="timeline">${TIMELINE.map(t => `<li><b>${t[0]}</b><span>${t[1]}</span></li>`).join('')}</ol></section>`;
}

/* ----- Словник ----- */
function viewDict() {
  const q = dictQuery.trim().toLowerCase();
  const list = S.words.slice().reverse().filter(w => !q || w.lt.toLowerCase().includes(q) || (w.ua || '').toLowerCase().includes(q));
  return `<h1 class="pageh">Мій словник</h1>
  <section class="card">
    <h2>Додати слово</h2>
    <div class="addw">
      <label class="fld"><span>Литовською</span><input id="nw-lt" class="ltin" autocomplete="off" placeholder="pvz. sąskaita"></label>
      ${ltBar('nw-lt')}
      <label class="fld"><span>Українською</span><input id="nw-ua" autocomplete="off" placeholder="рахунок"></label>
      <label class="fld"><span>Приклад або примітка (необов’язково)</span><input id="nw-ex" autocomplete="off" placeholder="Sąskaitą, prašau."></label>
      <div class="btnrow"><button class="btn primary" data-act="addword">${ic('plus')} Додати</button>${cap.sample ? `<button class="btn ghost" data-act="ai-word">${ic('spark')} Підказати переклад</button>` : ''}</div>
    </div>
  </section>
  <div class="btnrow"><button class="btn" data-act="review-words" ${S.words.length ? '' : 'disabled'}>${ic('repeat')} Тренувати слова</button></div>
  <label class="fld search"><span class="sr">Пошук</span><input id="dq" value="${esc(dictQuery)}" placeholder="Пошук у словнику" autocomplete="off"></label>
  ${list.length ? `<ul class="words">${list.map(w => { const s = S.srs['w|' + w.lt];
    return `<li><button class="iconbtn sm" data-act="say" data-text="${esc(w.lt)}" aria-label="Озвучити">${ic('speaker')}</button>
    <span class="wbody"><b class="lt">${esc(w.lt)}</b><span>${esc(w.ua)}</span>${w.ex ? `<small>${esc(w.ex)}</small>` : ''}</span>
    <span class="box" title="Рівень запам’ятовування">${'●'.repeat(s ? s.b : 0)}${'○'.repeat(6 - (s ? s.b : 0))}</span>
    <button class="iconbtn sm" data-act="delword" data-lt="${esc(w.lt)}" aria-label="Видалити">${ic('x')}</button></li>`; }).join('')}</ul>`
    : `<p class="empty">${q ? 'Нічого не знайдено.' : 'Тут з’являтимуться незнайомі слова. Додавай їх з текстів, тем і з порад ШІ — вони автоматично потраплять у щоденне повторення.'}</p>`}`;
}

/* ----- Прогрес ----- */
function viewProg() {
  const total = diffDays(S.start, S.exam) + 1;
  const cells = [];
  for (let i = 0; i < Math.max(total, 42); i++) {
    const d = addDays(S.start, i), r = S.days[d], n = r ? Object.keys(r.done).length : 0;
    const cls = d === S.exam ? 'exam' : d > todayStr() ? 'fut' : n >= 3 ? 'full' : n ? 'part' : 'miss';
    cells.push(`<i class="${cls} ${d === todayStr() ? 'today' : ''}" title="${fmtD(d)}${n ? ': ' + n + ' ' + plural(n,'крок','кроки','кроків') : ''}"></i>`);
  }
  const ruleAvg = Math.round(RULES.reduce((a, r) => a + (ruleM(r.id) || 0), 0) / RULES.length);
  const skillCov = Math.round(100 * (Object.keys(S.read).length + Object.keys(S.listen).length + Object.keys(S.write).length + Object.keys(S.speak).length) / (READING.length + LISTENING.length + WRITING.length + SPEAKING.length));
  const langReady = Math.round(ruleAvg * 0.6 + skillCov * 0.4);
  const kAvg = Math.round(KSECTIONS.reduce((a, s) => a + (ksecM(s.id) || 0), 0) / KSECTIONS.length);
  const lastM = S.mocks.slice(-3);
  const kReady = lastM.length ? Math.round((lastM.reduce((a, m) => a + m.score, 0) / lastM.length) / 20 * 100 * 0.6 + kAvg * 0.4) : Math.round(kAvg * 0.8);
  const mins = Object.values(S.days).reduce((a, r) => a + (r.min || 0), 0);
  const avgW = (() => { const v = Object.values(S.write).map(x => x.score).filter(x => x != null); return v.length ? (v.reduce((a,b)=>a+b,0)/v.length).toFixed(1) : '—'; })();
  return `<h1 class="pageh">Прогрес</h1>
  <div class="grid2">
    <div class="card ready"><div class="ring big" style="--p:${langReady}"><span>${langReady}%</span></div><b>Мова</b><small>граматика + навички</small></div>
    <div class="card ready"><div class="ring big" style="--p:${kReady}"><span>${kReady}%</span></div><b>Конституція</b><small>розділи + пробні тести</small></div>
  </div>
  <div class="grid4">
    <div class="mini"><b>${daysLeft() >= 0 ? daysLeft() : 0}</b><small>днів до іспиту</small></div>
    <div class="mini"><b>${streak()}</b><small>днів поспіль</small></div>
    <div class="mini"><b>${Math.round(mins/60*10)/10}</b><small>год навчання</small></div>
    <div class="mini"><b>${dueItems().length}</b><small>карток сьогодні</small></div>
  </div>
  <section class="card"><h2>6 тижнів підготовки</h2>
    <div class="cal">${['пн','вт','ср','чт','пт','сб','нд'].map((x,i) => `<b>${['П','В','С','Ч','П','С','Н'][(parseD(S.start).getDay()+6+i)%7]}</b>`).join('')}${cells.join('')}</div>
    <div class="legend"><span><i class="full"></i>план виконано</span><span><i class="part"></i>частково</span><span><i class="miss"></i>пропущено</span><span><i class="exam"></i>іспит</span></div></section>
  <section class="card"><h2>Граматика</h2>
    <div class="bars">${RULES.map(r => { const m = ruleM(r.id); const [c] = lvl(m);
      return `<button class="bar" data-act="rule:${r.id}"><span class="bl">${esc(r.ua)}</span><span class="bt"><i class="${c}" style="width:${m || 0}%"></i></span><span class="bv">${m === null ? '—' : m + '%'}</span></button>`; }).join('')}</div></section>
  <section class="card"><h2>Навички</h2>
    <div class="skills">
      <div>${ic('read')}<b>${Object.keys(S.read).length}/${READING.length}</b><small>текстів прочитано</small></div>
      <div>${ic('ear')}<b>${Object.keys(S.listen).length}/${LISTENING.length}</b><small>аудіо прослухано</small></div>
      <div>${ic('pen')}<b>${Object.keys(S.write).length}/${WRITING.length}</b><small>листів · середній бал ${avgW}</small></div>
      <div>${ic('mic')}<b>${Object.keys(S.speak).length}/${SPEAKING.length}</b><small>питань відпрацьовано</small></div>
    </div></section>
  <section class="card"><h2>Конституція за розділами</h2>
    <div class="bars">${KSECTIONS.map(s => { const m = ksecM(s.id); const [c] = lvl(m);
      return `<button class="bar" data-act="ksec:${s.id}"><span class="bl">${esc(s.ua)}</span><span class="bt"><i class="${c}" style="width:${m || 0}%"></i></span><span class="bv">${m === null ? '—' : m + '%'}</span></button>`; }).join('')}</div></section>
  <section class="card"><h2>Пробні іспити з Конституції</h2>${mockChart()}</section>
  <section class="card settings"><h2>${ic('gear')} Налаштування</h2>
    <label class="fld"><span>Ім’я пухнастого друга</span><input id="set-pet" maxlength="20" value="${esc(petName())}" autocomplete="off"></label>
    <label class="fld"><span>Дата іспиту</span><input type="date" id="set-exam" value="${S.exam}"></label>
    <label class="fld"><span>Час нагадування</span><input type="time" id="set-time" value="${S.remind}"></label>
    <label class="fld"><span>Озвучення</span><select id="set-voice"><option value="auto" ${S.voice==='auto'?'selected':''}>Автоматично</option><option value="browser" ${S.voice==='browser'?'selected':''}>Голос браузера (литовський)</option></select></label>
    <div class="btnrow"><button class="btn" data-act="intro">${ic('spark')} Переглянути інтро</button><button class="btn" data-act="ics">${ic('bell')} Нагадування в календар</button><button class="btn ghost" data-act="backup">Резервна копія</button></div>
    <p class="fine">${cap.synced ? 'Прогрес зберігається у вашому обліковому записі й доступний з будь-якого пристрою.' : 'Прогрес зберігається в цьому браузері. Щоб не загубити його, зробіть резервну копію.'}</p>
    <button class="link danger" data-act="reset">Почати все спочатку</button>
  </section>`;
}
function mockChart() {
  const m = S.mocks.slice(-10);
  if (!m.length) return `<p class="empty">Ще немає спроб. Перший пробний іспит варто пройти після 3-го тижня, а на 6-му тижні — щодня.</p>`;
  const W = 320, H = 150, bw = W / 10, y = v => H - 20 - (v / 20) * (H - 34);
  const bars = m.map((x, i) => `<rect x="${i*bw + 6}" y="${y(x.score)}" width="${bw - 12}" height="${H - 20 - y(x.score)}" rx="3" class="${x.score >= 14 ? 'pass' : 'fail'}"/><text x="${i*bw + bw/2}" y="${y(x.score) - 4}" text-anchor="middle" class="cv">${x.score}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Результати пробних іспитів">
    <line x1="0" x2="${W}" y1="${y(14)}" y2="${y(14)}" class="thr"/><text x="${W}" y="${y(14) - 4}" text-anchor="end" class="cl">поріг 14</text>
    <line x1="0" x2="${W}" y1="${H-20}" y2="${H-20}" class="axis"/>${bars}</svg>
    <p class="fine">Мета на 6-му тижні — стабільно 17 і більше з 20.</p>`;
}

/* ===================== Літери з діакритикою ===================== */
function ltBar(target) { return `<div class="ltbar" aria-label="Литовські літери">${LT_LETTERS.map(l => `<button type="button" data-act="ltl" data-l="${l}" data-target="${target}">${l}</button>`).join('')}</div>`; }
function insertAt(el, txt) {
  const s = el.selectionStart ?? el.value.length, e = el.selectionEnd ?? el.value.length;
  el.value = el.value.slice(0, s) + txt + el.value.slice(e);
  el.focus(); el.setSelectionRange(s + txt.length, s + txt.length);
  el.dispatchEvent(new Event('input'));
}
const norm = s => s.toLowerCase().replace(/[.,!?;:„“"«»]/g, '').replace(/\s+/g, ' ').trim();
const strip = s => norm(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
function sim(a, b) {
  if (a === b) return 1; if (!a || !b) return 0;
  const m = a.length, n = b.length, d = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { let prev = d[0]; d[0] = i; for (let j = 1; j <= n; j++) { const t = d[j]; d[j] = Math.min(d[j] + 1, d[j-1] + 1, prev + (a[i-1] === b[j-1] ? 0 : 1)); prev = t; } }
  return 1 - d[n] / Math.max(m, n);
}

/* ===================== Рушій вправ ===================== */
let Q = null;
function runQuiz(cfg) {
  Q = Object.assign({ i:0, res:[] }, cfg);
  Q.items = Q.items.map(it => it.type === 'choice' ? Object.assign({}, it, { _o: it.o.every(x => TF.includes(x)) ? TF.slice() : shuffle(it.o) }) : it);
  Q.plays = {};
  openSheet('<div id="quiz"></div>', { title: cfg.title });
  Q.t0 = Date.now();
  renderQ();
  if (Q.timer || Q.limit) {
    const me = Q;
    const tick = setInterval(() => {
      if (Q !== me) { clearInterval(tick); return; }
      const el = $('#qtime'), spent = Date.now() - me.t0;
      if (me.limit && spent >= me.limit) { clearInterval(tick); timeUp(); return; }
      if (el) el.textContent = me.limit ? fmtTime(me.limit - spent) : fmtTime(spent);
    }, 1000);
  }
}
function timeUp() {
  if (!Q) return;
  toast('Час вийшов. Завдання без відповіді зараховано як неправильні.');
  for (let i = Q.res.length; i < Q.items.length; i++) Q.res.push({ ok:false, it:Q.items[i], given:'—' });
  Q.i = Q.items.length;
  finishQuiz();
}
function renderQ() {
  const box = $('#quiz'); if (!box) return;
  const it = Q.items[Q.i];
  if (!it) return finishQuiz();
  const n = Q.items.length;
  let body = '';
  const spent = Date.now() - Q.t0;
  const head = `<div class="qprog"><i style="width:${100*Q.i/n}%"></i></div><p class="qcount">${Q.i+1} з ${n}${Q.limit ? ` · залишилось <span id="qtime">${fmtTime(Math.max(0, Q.limit - spent))}</span>` : Q.timer ? ` · <span id="qtime">${fmtTime(spent)}</span>` : ''}</p>`;
  const tag = it.tag ? `<p class="qtag">${it.tag}</p>` : '';
  const rec = it.rec ? (() => { const left = Q.plays[it.recId] ?? 2; return `<div class="recbox"><button class="btn primary" data-act="qplay" ${left ? '' : 'disabled'}>${ic('speaker')} Слухати запис</button><small>${left ? `можна прослухати ще ${left} ${plural(left,'раз','рази','разів')}` : 'запис уже прослухано двічі'}</small></div>`; })() : '';
  if (it.type === 'choice') {
    body = `${tag}${rec}<p class="qq">${it.q}${it.say ? ` <button class="iconbtn sm" data-act="say" data-text="${esc(it.say)}" aria-label="Озвучити">${ic('speaker')}</button>` : ''}</p>
      <div class="opts">${it._o.map((o, k) => `<button class="opt" data-act="ans" data-k="${k}"><span class="ol">${'ABC'[k] || k+1}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
  } else if (it.type === 'type') {
    body = `${tag}<p class="qq">${esc(it.q).replace('___', '<span class="gap">___</span>')}</p>
      <input id="qin" class="ltin big" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Впишіть слово">
      ${ltBar('qin')}<button class="btn primary big" data-act="ans-type">Перевірити</button>`;
  } else if (it.type === 'flash') {
    body = `${tag}<div class="flash"><div class="front">${it.front}${it.say ? ` <button class="iconbtn sm" data-act="say" data-text="${esc(it.say)}" aria-label="Озвучити">${ic('speaker')}</button>` : ''}</div>
      <div class="back" hidden>${it.back}</div></div>
      <button class="btn primary big" data-act="flip">Показати відповідь</button>
      <div class="btnrow grade" hidden><button class="btn bad" data-act="fgrade" data-ok="0">${ic('x')} Не пам’ятав</button><button class="btn good" data-act="fgrade" data-ok="1">${ic('check')} Пам’ятав</button></div>`;
  }
  box.innerHTML = head + body + '<div id="fb"></div>';
  const inp = $('#qin'); if (inp) { inp.focus(); inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); checkType(); } }); }
}
function fmtTime(ms) { const s = Math.floor(ms/1000); return `${Math.floor(s/60)}:${pad(s%60)}`; }
function feedback(ok, it, extra = '') {
  const fb = $('#fb');
  const ruleBtn = it.rule ? `<button class="link" data-act="rule-peek:${it.rule}">${ic('read')} Подивитися правило</button>` : '';
  Q.run = ok ? 0 : (Q.run || 0) + 1;
  const pm = ok ? (Q.res.filter(r => r.ok).length % 3 === 0 ? 'proud' : 'joy') : Q.run >= 2 ? 'angry' : 'sad';
  const say1 = ok ? pick(['Šaunu!', 'Teisingai!', 'Puiku!', 'Gerai!']) : Q.run >= 2 ? 'Grrr! Dar kartą…' : 'Oi… Nieko baisaus.';
  fb.innerHTML = `<div class="fbbox ${ok ? 'ok' : 'no'}"><div class="fbpet">${petSVG(pm, 52)}<span class="lt">${say1}</span></div><b>${ok ? 'Правильно!' : 'Не зовсім.'}</b>${extra}${it.ex ? `<p>${it.ex}</p>` : ''}${ruleBtn}</div>
    <button class="btn primary big" data-act="qnext" id="qnext">${Q.i + 1 < Q.items.length ? 'Далі' : 'Завершити'}</button>`;
  $('#qnext').focus();
}
function record(ok, it, given) { Q.res.push({ ok, it, given }); }
function answerChoice(k) {
  const it = Q.items[Q.i]; if ($('#fb').innerHTML) return;
  const chosen = it._o[k], ok = chosen === it.o[0];
  document.querySelectorAll('.opt').forEach((b, j) => { b.disabled = true; if (it._o[j] === it.o[0]) b.classList.add('right'); else if (j === k) b.classList.add('wrong'); });
  record(ok, it, chosen);
  feedback(ok, it, ok ? '' : `<p>Правильна відповідь: <b class="lt">${esc(it.o[0])}</b></p>`);
}
function checkType() {
  const it = Q.items[Q.i], inp = $('#qin'); if (!inp || $('#fb').innerHTML) return;
  const v = inp.value; if (!v.trim()) { inp.focus(); return; }
  const ok = it.a.some(a => norm(a) === norm(v)) || (it.frag && it.a.some(a => sim(norm(a), norm(v)) >= 0.88));
  const near = !ok && it.a.some(a => strip(a) === strip(v));
  inp.disabled = true; inp.classList.add(ok ? 'right' : 'wrong');
  record(ok, it, v);
  feedback(ok, it, ok ? '' : near ? `<p>Майже! Літери з діакритикою важливі. Правильно: <b class="lt">${esc(it.a[0])}</b></p>` : `<p>Правильно: <b class="lt">${esc(it.a[0])}</b></p>`);
}
function finishQuiz() {
  const res = Q.res, ok = res.filter(r => r.ok).length, n = res.length;
  if (!Q.noLog) res.forEach(r => { if (r.it.type !== 'flash') { if (!r.ok) logMistake(r.it, r.given, Q.title); else if (r.it.mid) mistakeHit(r.it.mid, true); } });
  const extra = Q.onFinish ? Q.onFinish(res) || '' : '';
  const nextBtn = Q.next ? `<button class="btn primary big" data-act="${Q.next.act}">${Q.next.label}</button>` : '';
  const wrong = res.filter(r => !r.ok);
  const p = n ? Math.round(100 * ok / n) : 0;
  const rm = p >= 85 ? 'proud' : p >= 60 ? 'happy' : wrong.length >= 3 ? 'angry' : 'sad';
  if (p >= 85 || wrong.length >= 3) petFlash(rm);
  $('#quiz').innerHTML = `<div class="result">
    <div class="respet">${petSVG(rm, 110)}<div class="ring big" style="--p:${p}"><span>${ok}/${n}</span></div></div>
    <h2>${p >= 85 ? 'Puiku! Чудовий результат.' : p >= 60 ? 'Gerai! Ще трохи практики.' : 'Нічого, саме для цього й тренуємося.'}</h2>
    ${extra}
    ${wrong.length ? `<h3>Помилки</h3><ul class="wrongs">${wrong.map(r => `<li><p>${r.it.q || r.it.front || ''}</p><p>Ви: <s>${esc(r.given ?? '—')}</s> → <b class="lt">${esc(r.it.type === 'type' ? r.it.a[0] : r.it.type === 'choice' ? r.it.o[0] : '')}</b></p>${r.it.ex ? `<small>${r.it.ex}</small>` : ''}</li>`).join('')}</ul>` : ''}
    ${wrong.length && !Q.noLog ? '<p class="fine">Усі помилки збережено у вкладці «Помилки» — там їх можна відпрацювати.</p>' : ''}
    ${nextBtn || '<button class="btn primary big" data-act="close">Готово</button>'}</div>`;
  Q = null;
}

/* ===================== Активності ===================== */
function ruleItems(r, ex) {
  return ex.map(e => e.o ? { type:'choice', q:e.q, o:e.o, ex:e.ex, rule:r.id, tag:r.ua } : { type:'type', q:e.q, a:e.a, ex:e.ex, rule:r.id, tag:r.ua });
}
function ruleTheoryHtml(r) {
  return `<p class="eyebrow lt">${esc(r.lt)} · тиждень ${r.week}</p><h1>${esc(r.ua)}</h1>
    <div class="keybox"><b>Головне:</b> ${esc(r.summary)}</div>
    <div class="theory">${r.theory}</div>
    <h3>Типові помилки</h3><ul class="mist">${r.mistakes.map(m => `<li><s class="lt">${esc(m[0])}</s> → <b class="lt">${esc(m[1])}</b><small>${esc(m[2])}</small></li>`).join('')}</ul>`;
}
function openRule(id, fromTask) {
  const r = RULES.find(x => x.id === id); if (!r) return;
  const m = ruleM(id);
  const b = openSheet(`${ruleTheoryHtml(r)}
    ${cap.sample ? `<button class="btn ghost" data-act="ai-ex:${id}">${ic('spark')} Ще 6 нових вправ від ШІ</button>` : `<button class="btn ghost" data-act="ex-chat:${id}">${ic('spark')} Нові вправи від ШІ (через чат)</button>`}
    <button class="btn ghost" data-act="tutor-ask" data-q="${esc('Поясни простіше правило «' + r.ua + '» і дай 3 приклади з мого життя (робота, дім, магазин).')}">${ic('chat')} Запитати викладача про це правило</button>
    <div class="sticky-cta"><button class="btn primary big" data-act="rule-practice:${id}" data-task="${fromTask ? 'gram' : ''}">Практика: ${r.ex.length} завдань${m !== null ? ` · зараз ${m}%` : ''}</button></div>`, { title:'Граматика' });
  b.scrollTop = 0;
}
function practiceRule(id, fromTask) {
  const r = RULES.find(x => x.id === id);
  closeSheet();
  runQuiz({ title: r.ua, items: shuffle(ruleItems(r, r.ex)), onFinish(res) {
    res.forEach(x => pushHist(S.rules, id, x.ok));
    const p = Math.round(100 * res.filter(x => x.ok).length / res.length);
    S.rules[id].best = Math.max(S.rules[id].best || 0, p);
    srsAdd('r|' + id); srsGrade('r|' + id, p >= 80);
    markDone('gram', 12);
    return `<p class="muted">${p >= 80 ? 'Правило засвоєно. Воно повернеться на повторення через кілька днів.' : 'Правило повернеться на повторення завтра. Перечитайте помилки нижче.'}</p>`;
  }});
}
function startDiag() {
  const items = [];
  RULES.forEach(r => items.push(...ruleItems(r, r.ex.slice(0, 2))));
  runQuiz({ title:'Діагностика', items, onFinish(res) {
    const by = {};
    res.forEach(x => { pushHist(S.rules, x.it.rule, x.ok); (by[x.it.rule] = by[x.it.rule] || []).push(x.ok); });
    const ok = res.filter(x => x.ok).length;
    S.diag = { date: todayStr(), score: ok, total: res.length };
    const weak = RULES.filter(r => by[r.id] && by[r.id].some(v => !v));
    weak.forEach(r => { srsAdd('r|' + r.id); });
    markDone('diag', 15);
    return weak.length ? `<div class="keybox"><b>Що підтягуємо першим:</b><div class="chips">${weak.map(r => `<span class="chip weak">${esc(r.ua)}</span>`).join('')}</div><p class="small">Ці правила вже додано в повторення. План на кожен день їх враховує.</p></div>` : `<p class="muted">Жодної помилки — відмінна база! Зосередимося на письмі, говорінні та Конституції.</p>`;
  }});
}
function startReview(onlyWords) {
  let ids = onlyWords ? S.words.map(w => 'w|' + w.lt) : dueItems();
  if (!ids.length) { toast(onlyWords ? 'Словник порожній.' : 'На сьогодні все повторено. Puiku!'); if (!onlyWords) markDone('rev', 2), render(); return; }
  ids = shuffle(ids).slice(0, 20);
  const items = ids.map(id => {
    const r = srsResolve(id);
    if (r.k === 'w') return { type:'flash', srs:id, tag:'Слово', front:`<b class="lt big">${esc(r.w.lt)}</b>`, say:r.w.lt, back:`<b>${esc(r.w.ua)}</b>${r.w.ex ? `<small class="lt">${esc(r.w.ex)}</small>` : ''}` };
    if (r.k === 'r') { const e = pick(r.r.ex); const it = ruleItems(r.r, [e])[0]; it.srs = id; it.ex = `<b>Правило:</b> ${esc(r.r.summary)}<br>${e.ex}`; return it; }
    if (r.k === 'n') return { type:'flash', srs:id, tag:'Конституція · ' + r.s.ua, front:`Яке число? <b>${esc(r.it[1])}</b>`, back:`<b class="big">${esc(r.it[0])}</b>` };
    if (r.k === 'q') return { type:'choice', srs:id, tag:'Конституція · ' + r.s.ua, q:r.it.q, o:r.it.o, ex:r.it.ex + (r.it.art ? ` <span class="art">${r.it.art} str.</span>` : '') };
  });
  runQuiz({ title:'Повторення', items, onFinish(res) {
    res.forEach(x => { if (x.it.srs) srsGrade(x.it.srs, x.ok); if (x.it.rule) pushHist(S.rules, x.it.rule, x.ok); });
    if (!onlyWords) markDone('rev', 10); else save();
    const left = dueItems().length;
    return `<p class="muted">${left ? `Залишилось ще ${left} ${plural(left,'картка','картки','карток')} — можна повторити зараз або завтра.` : 'Повторення на сьогодні завершено.'}</p>`;
  }});
}
function glossHtml(g) {
  return `<ul class="gloss">${g.map(w => { const has = S.words.some(x => x.lt === w[0]);
    return `<li><b class="lt">${esc(w[0])}</b><span>${esc(w[1])}</span><button class="btn xs ${has ? 'done' : ''}" data-act="addgloss" data-lt="${esc(w[0])}" data-ua="${esc(w[1])}" ${has ? 'disabled' : ''}>${has ? 'у словнику' : '+ до словника'}</button></li>`; }).join('')}</ul>`;
}
const getRead = id => id === 'ai' ? window.AI_READ : READING.find(x => x.id === id);
const getListen = id => id === 'ai' ? window.AI_LISTEN : LISTENING.find(x => x.id === id);
function openReading(id) {
  const r = getRead(id);
  openSheet(`<p class="eyebrow">Читання · ${esc(r.ua)}</p><h1 class="lt">${esc(r.title)}</h1>
    <article class="ltext lt">${esc(r.text)}</article>
    <button class="btn ghost" data-act="say" data-text="${esc(r.text)}">${ic('speaker')} Послухати текст</button>
    <h3>Слова з тексту</h3>${glossHtml(r.gloss)}
    <p class="tip">Порада для іспиту: спершу прочитайте питання, а потім шукайте в тексті конкретне — число, день, місце.</p>
    <div class="sticky-cta"><button class="btn primary big" data-act="read-q:${id}">Відповісти на питання (${r.q.length})</button></div>`, { title:'Читання' });
}
function readingQuiz(id) {
  const r = getRead(id);
  closeSheet();
  runQuiz({ title:r.title, items: r.q.map(q => ({ type:'choice', q:`<span class="ctx lt">${esc(r.text)}</span>${esc(q.q)}`, o:q.o })), onFinish(res) {
    const p = Math.round(100 * res.filter(x => x.ok).length / res.length);
    if (id !== 'ai') S.read[id] = Math.max(S.read[id] || 0, p); markDone('skill', 10); return '';
  }});
}
function openListening(id) {
  const l = getListen(id);
  openSheet(`<p class="eyebrow">Аудіювання · ${esc(l.ua)}</p><h1 class="lt">${esc(l.title)}</h1>
    <p class="muted">Прослухайте запис двічі, як на іспиті. Спершу перегляньте питання — так легше вловити потрібне.</p>
    <ul class="preq">${l.q.map(q => `<li class="lt">${esc(q.q)}</li>`).join('')}</ul>
    <div class="player"><button class="btn primary big" data-act="play:${id}">${ic('speaker')} Слухати</button><button class="btn ghost" data-act="play-slow:${id}">Повільніше</button></div>
    <details class="transcript"><summary>Показати текст</summary><div class="lt">${l.lines.map(x => `<p>${esc(x)}</p>`).join('')}</div></details>
    <div class="sticky-cta"><button class="btn primary big" data-act="listen-q:${id}">Відповісти на питання</button></div>`, { title:'Аудіювання' });
}
function listeningQuiz(id) {
  const l = getListen(id);
  closeSheet();
  runQuiz({ title:l.title, items: l.q.map((q, i) => ({ type:'choice', q:esc(q.q), o:q.o, say: i === 0 ? l.lines.join(' ') : null })), onFinish(res) {
    const p = Math.round(100 * res.filter(x => x.ok).length / res.length);
    if (id !== 'ai') S.listen[id] = Math.max(S.listen[id] || 0, p); markDone('skill', 10);
    return `<details class="transcript" open><summary>Текст запису</summary><div class="lt">${l.lines.map(x => `<p>${esc(x)}</p>`).join('')}</div></details>`;
  }});
}

/* ----- Письмо ----- */
function openWriting(id) {
  const w = WRITING.find(x => x.id === id);
  const prev = S.write[id];
  const form = w.kind === 'anketa'
    ? `<div class="anketa">${w.fields.map((f, i) => `<label class="fld"><span class="lt">${esc(f)}</span>${i === w.fields.length - 1 ? `<textarea id="af${i}" class="ltin" rows="3"></textarea>` : `<input id="af${i}" class="ltin" autocomplete="off">`}</label>`).join('')}</div>`
    : `<label class="fld"><span>Ваш текст</span><textarea id="wtext" class="ltin" rows="9" placeholder="Labas, …">${esc(prev?.text || '')}</textarea></label><p class="wc" id="wc">0 слів</p>`;
  openSheet(`<p class="eyebrow">Письмо · ${esc(w.ua)}</p><h1 class="lt">${esc(w.title)}</h1>
    <div class="taskbox lt">${esc(w.task)}</div>
    ${w.points ? `<p class="small"><b>Обов’язково згадайте:</b></p><ul class="points">${w.points.map(p => `<li class="lt">${esc(p)}</li>`).join('')}</ul>` : ''}
    <details><summary>Корисні фрази</summary><ul class="phr2">${w.phrases.map(p => `<li class="lt">${esc(p)}</li>`).join('')}</ul></details>
    ${w.kind !== 'anketa' ? `<details><summary>План листа</summary><ol class="small"><li>Привітання: <span class="lt">Labas, …! / Laba diena,</span></li><li>Вступ: <span class="lt">Ačiū už laišką. / Rašau, nes…</span></li><li>Головне: усі пункти завдання, 3–5 речень зі сполучниками <span class="lt">nes, todėl, bet, kai</span></li><li>Питання або прохання: <span class="lt">Parašyk, ar…</span></li><li>Прощання: <span class="lt">Iki greito! / Su pagarba,</span></li></ol></details>` : ''}
    ${form}${ltBar(w.kind === 'anketa' ? 'af0' : 'wtext')}${w.kind !== 'anketa' ? micBtn('wtext') : ''}
    <div id="wfb"></div>
    <div class="btnrow">${cap.sample ? `<button class="btn primary big" data-act="w-ai:${id}">${ic('spark')} Перевірити з ШІ-викладачем</button>` : `<button class="btn primary big" data-act="w-chat:${id}">${ic('spark')} Перевірити з ШІ через чат</button>`}<button class="btn ghost" data-act="w-self:${id}">Самоперевірка і зразок</button></div>`, { title:'Письмо' });
  const t = $('#wtext'); if (t) { const upd = () => { const n = t.value.trim() ? t.value.trim().split(/\s+/).length : 0; $('#wc').textContent = `${n} ${plural(n,'слово','слова','слів')}`; }; t.addEventListener('input', upd); upd(); }
  topSheet().addEventListener('focusin', e => { if (e.target.matches('.ltin')) topSheet().querySelectorAll('.ltbar button').forEach(b => b.dataset.target = e.target.id); });
}
function writingText(w) {
  if (w.kind === 'anketa') return w.fields.map((f, i) => `${f}: ${($('#af' + i)?.value || '').trim()}`).join('\n');
  return ($('#wtext')?.value || '').trim();
}
async function writingAI(id) {
  const w = WRITING.find(x => x.id === id), text = writingText(w);
  if (text.replace(/[^a-ząčęėįšųūž]/gi, '').length < 15) { toast('Спершу напишіть текст.'); return; }
  const fb = $('#wfb'); fb.innerHTML = `<div class="loading">${ic('spark')} Викладач читає ваш текст…</div>`;
  const prompt = `Ти — доброзичливий, але вимогливий викладач литовської мови й екзаменатор державного іспиту NŠA (I категорія = рівень A2). Учень — україномовний чоловік 46 років, словниковий запас хороший, слабке місце — граматика.
Завдання (литовською): ${w.task}
${w.points ? 'Обов’язкові пункти: ' + w.points.join('; ') : 'Це анкета: перевір правильність заповнення полів і речення в останньому полі.'}
Текст учня:
"""${text}"""
Оціни за критеріями письма A2: виконання завдання (усі пункти), зв’язність (сполучники nes, todėl, bet, kai…), граматика, лексика, обсяг.
Відповідай ТІЛЬКИ JSON без markdown:
{"score": ціле 0-10, "verdict": "одне речення українською", "points":[{"point":"пункт","done":true}], "errors":[{"wrong":"фрагмент з тексту учня","right":"виправлено литовською","why":"коротке пояснення українською з литовським терміном (напр. galininkas)","rule":"один id з переліку або other"}], "good":["що вдалося, українською"], "tips":["2-3 конкретні поради українською"], "improved":"виправлений текст литовською, максимально близький до тексту учня", "words":[["литовське слово з виправлень, корисне вивчити","переклад"]]}
Перелік id правил: ${RULE_IDS()}.
Не вигадуй помилок. Якщо помилок немає — порожній масив. Максимум 8 помилок, найважливіші.`;
  try {
    const r = await askAI(prompt);
    const errs = r.errors || [];
    errs.forEach(e => { if (e.rule && RULES.some(x => x.id === e.rule)) { pushHist(S.rules, e.rule, 0); srsAdd('r|' + e.rule); srsGrade('r|' + e.rule, false); } });
    errs.forEach(e => logFrag(e, 'Письмо: ' + w.title));
    S.write[id] = { score: r.score, text, date: todayStr() };
    markDone('skill', 15);
    fb.innerHTML = aiReport(r, true);
  } catch(e) {
    fb.innerHTML = `<div class="fbbox no"><b>Не вдалося отримати перевірку.</b><p>${e.code === 'rate_limited' ? 'Забагато запитів — спробуйте за хвилину.' : 'Скористайтеся самоперевіркою нижче або спробуйте ще раз.'}</p></div>`;
  }
}
function aiReport(r, writing) {
  const errs = r.errors || [];
  return `<div class="aibox">
    <div class="aihead"><div class="score"><b>${r.score ?? '—'}</b><small>/10</small></div><p>${esc(r.verdict || '')}</p></div>
    ${r.points && r.points.length ? `<ul class="checks">${r.points.map(p => `<li class="${p.done ? 'ok' : 'no'}">${ic(p.done ? 'check' : 'x')}<span class="lt">${esc(p.point)}</span></li>`).join('')}</ul>` : ''}
    ${errs.length ? `<h3>Помилки</h3><ul class="errs">${errs.map(e => { const rr = RULES.find(x => x.id === e.rule);
      return `<li><p><s class="lt">${esc(e.wrong)}</s> → <b class="lt">${esc(e.right)}</b></p><small>${esc(e.why)}</small>${rr ? `<button class="link" data-act="rule-peek:${rr.id}">${ic('read')} ${esc(rr.ua)}</button>` : ''}</li>`; }).join('')}</ul>` : '<p class="ok-line">Граматичних помилок не знайдено.</p>'}
    ${r.good && r.good.length ? `<h3>Що вдалося</h3><ul class="small">${r.good.map(g => `<li>${esc(g)}</li>`).join('')}</ul>` : ''}
    ${r.tips && r.tips.length ? `<h3>Як покращити</h3><ul class="small">${r.tips.map(g => `<li>${esc(g)}</li>`).join('')}</ul>` : ''}
    ${r.improved || r.better ? `<h3>${writing ? 'Виправлений текст' : 'Як сказати краще'}</h3><div class="ltext lt">${esc(r.improved || r.better).replace(/\n/g,'<br>')}</div><button class="btn ghost" data-act="say" data-text="${esc(r.improved || r.better)}">${ic('speaker')} Послухати</button>` : ''}
    ${r.words && r.words.length ? `<h3>Слова, які варто вивчити</h3>${glossHtml(r.words.filter(w => Array.isArray(w) && w[0]))}` : ''}
  </div>`;
}
function writingSelf(id) {
  const w = WRITING.find(x => x.id === id), text = writingText(w);
  const n = text.trim() ? text.trim().split(/\s+/).length : 0;
  const conj = ['nes','todėl','bet','kai','jeigu','jei','kad','ir','o'].filter(c => new RegExp('(^|[^a-ząčęėįšųūž])' + c + '([^a-ząčęėįšųūž]|$)', 'i').test(text));
  $('#wfb').innerHTML = `<div class="aibox"><h3>Перевірте себе</h3>
    <ul class="checks">
      ${w.points ? w.points.map((p, i) => `<li><label><input type="checkbox" class="selfchk"> <span class="lt">${esc(p)}</span></label></li>`).join('') : ''}
      <li><label><input type="checkbox" class="selfchk"> Є привітання і прощання</label></li>
      <li><label><input type="checkbox" class="selfchk"> Дієслова в правильному часі (вчора — минулий, завтра — майбутній)</label></li>
      <li><label><input type="checkbox" class="selfchk"> Після «nėra / neturiu» — родовий відмінок</label></li>
    </ul>
    <p class="small">Слів: <b>${n}</b>. Сполучники у тексті: <b>${conj.length ? conj.join(', ') : 'не знайдено'}</b>${conj.length < 3 ? ' — додайте ще кілька (nes, todėl, bet).' : '.'}</p>
    <h3>Зразок відповіді</h3><div class="ltext lt">${esc(w.model).replace(/\n/g,'<br>')}</div>
    <button class="btn" data-act="w-selfdone:${id}">${ic('check')} Зарахувати</button></div>`;
}

/* ----- Говоріння ----- */
function openSpeaking(id) {
  const s = SPEAKING.find(x => x.id === id);
  openSheet(`<p class="eyebrow">Говоріння · питання екзаменатора</p>
    <div class="speakq"><button class="iconbtn lg" data-act="say" data-text="${esc(s.q)}" aria-label="Послухати питання">${ic('speaker')}</button><div><h1 class="lt">${esc(s.q)}</h1><p class="muted">${esc(s.ua)}</p></div></div>
    <ol class="steps small"><li>Послухайте питання.</li><li>Скажіть відповідь <b>уголос</b> 2–3 реченнями.</li><li>${cap.dict ? 'Натисніть «Сказати голосом» — або напишіть те, що сказали.' : 'Запишіть те, що сказали, щоб перевірити.'}</li></ol>
    <label class="fld"><span>Ваша відповідь</span><textarea id="stext" class="ltin" rows="4"></textarea></label>
    ${ltBar('stext')}${micBtn('stext')}
    <details><summary>Підказка: відповідь-шаблон</summary><div class="ltext lt">${esc(s.a)}</div><button class="btn ghost" data-act="say" data-text="${esc(s.a.replace(/[\[\]]/g,''))}">${ic('speaker')} Послухати</button><p class="fine">Підставте свої дані замість [дужок] і повторіть 3 рази без пауз.</p></details>
    <div id="sfb"></div>
    <div class="btnrow">${cap.sample ? `<button class="btn primary big" data-act="s-ai:${id}">${ic('spark')} Перевірити відповідь</button>` : `<button class="btn primary big" data-act="s-chat:${id}">${ic('spark')} Перевірити з ШІ через чат</button>`}<button class="btn ghost" data-act="s-done:${id}">${ic('check')} Я сказав уголос</button></div>`, { title:'Говоріння' });
}
async function speakingAI(id) {
  const s = SPEAKING.find(x => x.id === id), text = ($('#stext')?.value || '').trim();
  if (text.length < 5) { toast('Скажіть або напишіть відповідь.'); return; }
  const fb = $('#sfb'); fb.innerHTML = `<div class="loading">${ic('spark')} Слухаю…</div>`;
  const prompt = `Ти — екзаменатор усної частини іспиту з литовської мови NŠA (рівень A2) і доброзичливий викладач. Учень — україномовний чоловік 46 років.
Питання екзаменатора: "${s.q}"
Відповідь учня (могла бути отримана з розпізнавання мовлення — ігноруй пунктуацію та великі літери): """${text}"""
Оціни: чи відповів по суті, чи достатньо розгорнуто (2–3 речення), граматика, лексика.
Відповідай ТІЛЬКИ JSON без markdown:
{"score": ціле 0-10, "verdict":"одне речення українською", "errors":[{"wrong":"...","right":"...","why":"українською","rule":"id з переліку або other"}], "tips":["1-2 поради українською: що додати, щоб відповідь була повнішою"], "better":"покращена відповідь литовською рівня A2, 2-4 речення, на основі відповіді учня", "words":[["корисне литовське слово","переклад"]]}
Перелік id правил: ${RULE_IDS()}.`;
  try {
    const r = await askAI(prompt);
    (r.errors || []).forEach(e => { if (RULES.some(x => x.id === e.rule)) { pushHist(S.rules, e.rule, 0); srsAdd('r|' + e.rule); srsGrade('r|' + e.rule, false); } });
    (r.errors || []).forEach(e => logFrag(e, 'Говоріння: ' + s.q));
    S.speak[id] = (S.speak[id] || 0) + 1; markDone('skill', 10);
    fb.innerHTML = aiReport(r, false);
  } catch(e) { fb.innerHTML = `<div class="fbbox no"><b>Не вдалося перевірити.</b><p>Спробуйте ще раз трохи згодом.</p></div>`; }
}

/* ----- Рольова гра ----- */
let RP = null;
function openRole(id) {
  const p = ROLEPLAYS.find(x => x.id === id);
  RP = { p, hist:[{ who:'ai', lt:p.start, ua:'' }], fixes:[], busy:false };
  const noAI = !cap.sample;
  openSheet(`<p class="eyebrow">Розмова · ${esc(p.ua)}</p><h1 class="lt">${esc(p.title)}</h1>
    <div class="taskbox"><b>Ваша мета:</b> ${esc(p.goal)}</div>
    ${noAI ? `<button class="btn primary big" data-act="role-chat:${id}">${ic('chat')} Розмовляти з ШІ в чаті</button>
      <p class="muted small">ШІ зіграє роль у вашому безкоштовному чаті й виправлятиме помилки. Або відпрацюйте діалог уголос самостійно:</p>
      <div class="chat"><div class="msg ai"><b class="lt">${esc(p.start)}</b></div></div>
      <ul class="phr">${RESCUE.map(x => `<li><span><b class="lt">${esc(x[0])}</b><small>${esc(x[1])}</small></span></li>`).join('')}</ul>
      <button class="btn primary big" data-act="role-end">Готово</button>`
    : `<div class="chat" id="chat"></div>
      <div class="composer"><textarea id="rpin" class="ltin" rows="2" placeholder="Ваша відповідь литовською"></textarea>${ltBar('rpin')}
      <div class="btnrow">${micBtn('rpin')}<button class="btn primary" data-act="role-send">Надіслати</button><button class="btn ghost" data-act="role-end">Завершити</button></div></div>`}`, { title:'Розмова' });
  if (!noAI) { renderChat(); say(p.start); const t = $('#rpin'); t.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); roleSend(); } }); }
}
function renderChat() {
  const c = $('#chat'); if (!c) return;
  c.innerHTML = RP.hist.map(m => m.who === 'ai'
    ? `<div class="msg ai"><button class="iconbtn sm" data-act="say" data-text="${esc(m.lt)}" aria-label="Озвучити">${ic('speaker')}</button><div><b class="lt">${esc(m.lt)}</b>${m.ua ? `<details><summary>переклад</summary><small>${esc(m.ua)}</small></details>` : ''}</div></div>`
    : `<div class="msg me"><div><span class="lt">${esc(m.lt)}</span>${m.fix ? `<div class="fix">${ic('pen')}<span>${esc(m.fix)}${m.better ? `<br><b class="lt">${esc(m.better)}</b>` : ''}</span></div>` : m.checked ? `<div class="fix ok">${ic('check')}<span>Без помилок</span></div>` : ''}</div></div>`).join('') + (RP.busy ? '<div class="msg ai typing"><i></i><i></i><i></i></div>' : '');
  c.scrollTop = c.scrollHeight;
  topSheet().scrollTop = topSheet().scrollHeight;
}
async function roleSend() {
  const inp = $('#rpin'); const msg = inp.value.trim(); if (!msg || RP.busy) return;
  inp.value = ''; RP.hist.push({ who:'me', lt:msg }); RP.busy = true; renderChat();
  const p = RP.p;
  const transcript = RP.hist.map(m => (m.who === 'ai' ? 'Ти: ' : 'Учень: ') + m.lt).join('\n');
  const prompt = `Ти граєш роль: ${p.role}. Це розмовна практика литовської мови рівня A2 для україномовного чоловіка 46 років. Говори ТІЛЬКИ простою литовською рівня A2: 1–2 короткі речення, природно, як у реальному житті в Литві. Мета учня: ${p.goal}
Розмова досі:
${transcript}
Відповідай ТІЛЬКИ JSON без markdown:
{"reply":"твоя наступна репліка литовською","reply_ua":"переклад репліки українською","fix":"якщо в ОСТАННІЙ репліці учня є граматична чи лексична помилка — коротко українською, що не так; інакше порожній рядок","better":"як правильно або природніше сказати останню репліку учня литовською; порожньо, якщо все добре","rule":"id правила з переліку або порожньо","done":true або false — чи досягнута мета розмови}
Перелік id правил: ${RULE_IDS()}.`;
  try {
    const r = await askAI(prompt);
    const me = RP.hist[RP.hist.length - 1];
    me.checked = true; if (r.fix) { me.fix = r.fix; me.better = r.better; RP.fixes.push({ wrong:msg, fix:r.fix, better:r.better, rule:r.rule }); if (r.better) logFrag({ wrong:msg, right:r.better, why:r.fix, rule:r.rule }, 'Розмова: ' + p.title); if (RULES.some(x => x.id === r.rule)) { pushHist(S.rules, r.rule, 0); srsAdd('r|' + r.rule); } }
    RP.hist.push({ who:'ai', lt:r.reply || '…', ua:r.reply_ua || '' });
    RP.busy = false; renderChat(); if (r.reply) say(r.reply);
    if (r.done) { const c = $('#chat'); c.insertAdjacentHTML('beforeend', `<div class="note">${ic('check')}<span>Мету досягнуто! Можна завершити розмову.</span></div>`); }
  } catch(e) { RP.busy = false; renderChat(); toast('Не вдалося отримати відповідь. Спробуйте ще раз.'); }
}
function roleEnd() {
  if (!RP) { closeSheet(); return; }
  const turns = RP.hist.filter(m => m.who === 'me').length;
  if (turns || !cap.sample) { S.role[RP.p.id] = (S.role[RP.p.id] || 0) + 1; markDone('skill', 10); }
  const fixes = RP.fixes;
  closeSheet();
  if (turns) openSheet(`<div class="result"><h2>Розмову завершено</h2><p class="muted">${turns} ${plural(turns,'репліка','репліки','реплік')} · ${fixes.length ? fixes.length + ' ' + plural(fixes.length,'виправлення','виправлення','виправлень') : 'без помилок'}</p>
    ${fixes.length ? `<ul class="errs">${fixes.map(f => `<li><p><s class="lt">${esc(f.wrong)}</s>${f.better ? ` → <b class="lt">${esc(f.better)}</b>` : ''}</p><small>${esc(f.fix)}</small></li>`).join('')}</ul>` : '<p>Puiku! Спробуйте наступного разу довші відповіді.</p>'}
    <button class="btn primary big" data-act="close">Готово</button></div>`, { title:'Підсумок' });
  RP = null;
}

/* ----- Теми ----- */
function openTopic(id) {
  const t = TOPICS.find(x => x.id === id);
  openSheet(`<p class="eyebrow">Тема програми · тиждень ${t.week}</p><h1>${esc(t.ua)}</h1><p class="lt muted">${esc(t.lt)}</p>
    <p class="muted">Перевірте себе: закрийте праву колонку і згадайте переклад. Незнайомі слова додайте до словника.</p>
    ${glossHtml(t.words)}
    <button class="btn" data-act="topic-all:${id}">${ic('plus')} Додати всі до повторення</button>`, { title:'Слова' });
}

/* ----- Конституція: розділ ----- */
function diagramHtml(key) {
  const flow = steps => `<div class="flow">${steps.map((s, i) => `${i ? '<div class="farrow" aria-hidden="true"></div>' : ''}<div class="fstep ${s[2] || ''}"><b class="lt">${s[0]}</b><small>${s[1]}</small></div>`).join('')}</div>`;
  switch (key) {
    case 'power': return `<div class="dg"><div class="fstep top"><b class="lt">TAUTA</b><small>народ — носій суверенітету</small></div><div class="farrow" aria-hidden="true"></div>
      <div class="dg3"><div class="fstep"><b class="lt">Seimas</b><small>законодавча влада</small></div><div class="fstep"><b class="lt">Prezidentas ir Vyriausybė</b><small>виконавча влада</small></div><div class="fstep"><b class="lt">Teismas</b><small>судова влада</small></div></div>
      <p class="fine">5 ст.: державну владу здійснюють Сейм, Президент і Уряд, Суд.</p></div>`;
    case 'law': return flow([['Iniciatyva','члени Сейму · Президент · Уряд · 50 000 громадян'],['Seimas priima','розглядає і голосує'],['Prezidentas','протягом 10 днів підписує або повертає', 'hl'],['Paskelbimas','офіційне оприлюднення'],['Įsigalioja','набирає чинності']]);
    case 'gov': return flow([['Prezidentas','пропонує кандидата в Прем’єри'],['Seimas pritaria','дає згоду','hl'],['Ministras Pirmininkas','призначений Президентом'],['Ministrai','Президент призначає за поданням Прем’єра'],['Per 15 dienų','програма уряду — Сейму','hl']]);
    case 'kt': return `<div class="dg"><div class="dg3"><div class="fstep"><b>3</b><small>кандидати від Президента</small></div><div class="fstep"><b>3</b><small>від Голови Сейму</small></div><div class="fstep"><b>3</b><small>від Голови Верховного Суду</small></div></div>
      <div class="farrow" aria-hidden="true"></div><div class="fstep hl"><b class="lt">Seimas skiria</b><small>призначає суддів</small></div><div class="farrow" aria-hidden="true"></div>
      <div class="fstep top"><b class="lt">Konstitucinis Teismas</b><small>9 суддів · 9 років · кожні 3 роки оновлюється третина</small></div></div>`;
    case 'courts': return `<div class="dg"><div class="pyr"><div style="--w:40%"><b class="lt">Aukščiausiasis Teismas</b></div><div style="--w:58%"><b class="lt">Apeliacinis teismas</b></div><div style="--w:78%"><b class="lt">Apygardų teismai</b><small>окружні</small></div><div style="--w:100%"><b class="lt">Apylinkių teismai</b><small>районні</small></div></div>
      <p class="fine">Окремо: спеціалізовані адміністративні суди. Конституційний Суд не входить у цю систему — він перевіряє закони.</p></div>`;
    case 'amend': return `<div class="dg"><div class="fstep top"><b>Пропозиція</b><small>≥ 1/4 членів Сейму або 300 000 виборців</small></div><div class="farrow" aria-hidden="true"></div>
      <div class="dg2"><div class="fstep hl"><b class="lt">1 str., I ir XIV skirsniai</b><small>лише референдум; для 1 ст. — «за» ≥ 3/4 виборців</small></div><div class="fstep"><b>Інші розділи</b><small>Сейм голосує двічі, перерва ≥ 3 місяці, щоразу ≥ 2/3 усіх членів</small></div></div>
      <div class="farrow" aria-hidden="true"></div><div class="fstep"><b>Президент — 5 днів</b><small>набирає чинності не раніше ніж через місяць</small></div></div>`;
  }
  return '';
}
function openKSec(id, fromTask) {
  const s = KSECTIONS.find(x => x.id === id);
  const flag = id === 'k1' ? `<div class="bigflag" role="img" aria-label="Прапор Литви: жовтий, зелений, червоний"><i></i><i></i><i></i></div>` : '';
  openSheet(`<p class="eyebrow lt">${esc(s.lt)} · ${s.arts}</p><h1>${esc(s.ua)}</h1>
    ${s.diagram ? `<div class="card dgcard"><h3>Схема</h3>${diagramHtml(s.diagram)}</div>` : ''}
    ${flag}<div class="theory">${s.theory}</div>
    ${s.nums.length ? `<h3>Числа, які треба знати</h3><div class="nums">${s.nums.map(n => `<div><b>${esc(n[0])}</b><small>${esc(n[1])}</small></div>`).join('')}</div>` : ''}
    <p class="fine">Джерело: Конституція Литовської Республіки (актуальна редакція на e-seimas.lrs.lt).</p>
    <div class="sticky-cta"><button class="btn primary big" data-act="ksec-q:${id}" data-task="${fromTask ? 1 : ''}">Перевірити себе: ${s.q.length} ${plural(s.q.length,'питання','питання','питань')}</button></div>`, { title:'Конституція' });
  if (!S.ksec[id]) S.ksec[id] = { hist:[] };
  if (!S.ksec[id].read) { S.ksec[id].read = todayStr(); s.nums.forEach((n, i) => srsAdd(`n|${id}|${i}`)); save(); }
}
function kQuestion(s, i) { const q = s.q[i]; return { type:'choice', q:esc(q.q), o:q.o, ex:esc(q.ex) + (q.art ? ` <span class="art">${q.art} str.</span>` : ''), sec:s.id, qi:i, tag:s.ua }; }
function kSecQuiz(id) {
  const s = KSECTIONS.find(x => x.id === id);
  closeSheet();
  runQuiz({ title:s.ua, items: shuffle(s.q.map((q, i) => kQuestion(s, i))), onFinish(res) {
    res.forEach(x => { pushHist(S.ksec, id, x.ok); if (!x.ok) { srsAdd(`q|${id}|${x.it.qi}`); srsGrade(`q|${id}|${x.it.qi}`, false); } });
    markDone('konst', 15);
    return res.some(x => !x.ok) ? '<p class="muted">Питання з помилками додано в повторення.</p>' : '';
  }});
}
function startMock() {
  const chosen = [];
  KSECTIONS.forEach(s => { const i = Math.floor(Math.random() * s.q.length); chosen.push([s, i]); });
  const rest = shuffle(KSECTIONS.flatMap(s => s.q.map((_, i) => [s, i])).filter(([s, i]) => !chosen.some(c => c[0] === s && c[1] === i))).slice(0, 20 - chosen.length);
  const items = shuffle(chosen.concat(rest)).map(([s, i]) => kQuestion(s, i));
  runQuiz({ title:'Пробний іспит', timer:true, items, onFinish(res) {
    const score = res.filter(x => x.ok).length;
    res.forEach(x => { pushHist(S.ksec, x.it.sec, x.ok); if (!x.ok) { srsAdd(`q|${x.it.sec}|${x.it.qi}`); srsGrade(`q|${x.it.sec}|${x.it.qi}`, false); } });
    S.mocks.push({ date: todayStr(), score });
    if (curWeek() === 6) markDone('konst', 15); else save();
    const bad = {}; res.filter(x => !x.ok).forEach(x => bad[x.it.sec] = (bad[x.it.sec] || 0) + 1);
    const badS = Object.keys(bad).map(id => KSECTIONS.find(s => s.id === id));
    return `<div class="verdict ${score >= 14 ? 'pass' : 'fail'}"><b>${score >= 14 ? 'Іспит складено' : 'Поки не складено'}</b><span>${score} з 20 · потрібно 14</span></div>
      ${badS.length ? `<p class="small">Перечитайте розділи:</p><div class="chips">${badS.map(s => `<button class="chip weak" data-act="ksec:${s.id}">${esc(s.ua)}</button>`).join('')}</div>` : ''}`;
  }});
}
function startNumGame() {
  const pool = KSECTIONS.flatMap(s => s.nums.map(n => ({ n:n[0], d:n[1] })));
  const items = shuffle(pool).slice(0, 10).map(x => {
    const wrong = shuffle(pool.filter(y => y.n !== x.n)).slice(0, 2).map(y => y.d);
    return { type:'choice', q:`<span class="bignum">${esc(x.n)}</span>Що означає це число?`, o:[x.d, ...wrong], tag:'Гра «Числа Конституції»' };
  });
  runQuiz({ title:'Числа Конституції', items, onFinish(res) { save(); return ''; } });
}
function startWeekly() {
  const w = curWeek();
  const rs = RULES.filter(r => r.week <= w).slice(-3);
  const ritems = shuffle(rs.flatMap(r => ruleItems(r, r.ex))).slice(0, 8);
  const ks = KSECTIONS.filter(s => s.week <= w);
  const kitems = shuffle(ks.flatMap(s => s.q.map((_, i) => kQuestion(s, i)))).slice(0, 4);
  runQuiz({ title:'Підсумок тижня ' + w, items: ritems.concat(kitems), onFinish(res) {
    res.forEach(x => { if (x.it.rule) pushHist(S.rules, x.it.rule, x.ok); if (x.it.sec) pushHist(S.ksec, x.it.sec, x.ok); });
    S.weekly.push({ week:w, date:todayStr(), score:res.filter(x => x.ok).length, total:res.length });
    markDone('skill', 10); return '';
  }});
}

/* ----- Словник ----- */
function addWord(lt, ua, ex) {
  lt = (lt || '').trim(); ua = (ua || '').trim();
  if (!lt) { toast('Впишіть литовське слово.'); return false; }
  if (S.words.some(w => w.lt.toLowerCase() === lt.toLowerCase())) { toast('Це слово вже є у словнику.'); return false; }
  S.words.push({ lt, ua, ex:(ex || '').trim(), d:todayStr() }); srsAdd('w|' + lt); save();
  return true;
}
async function aiWord() {
  const lt = $('#nw-lt').value.trim(); if (!lt) { toast('Спершу впишіть литовське слово.'); return; }
  const b = document.querySelector('[data-act="ai-word"]'); b.disabled = true; b.lastChild.textContent = ' Шукаю…';
  try {
    const r = await askAI(`Литовське слово або вираз: "${lt}". Дай для україномовного учня рівня A2 JSON без markdown: {"ua":"переклад українською (1-3 варіанти)","ex":"коротке просте речення литовською з цим словом","note":"граматична примітка українською: рід, основні форми (для дієслова — три форми, для іменника — родовий), до 12 слів"}`);
    $('#nw-ua').value = r.ua || ''; $('#nw-ex').value = [r.ex, r.note].filter(Boolean).join(' — ');
  } catch(e) { toast('Не вдалося отримати переклад.'); }
  b.disabled = false; b.lastChild.textContent = ' Підказати переклад';
}

/* ----- Нагадування (.ics) ----- */
function buildIcs() {
  const [hh, mm] = S.remind.split(':');
  const start = addDays(todayStr(), 1).replace(/-/g, '') + `T${hh}${mm}00`;
  const until = S.exam.replace(/-/g, '') + 'T235900';
  const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Lietuviu A2//UA','CALSCALE:GREGORIAN',
    'BEGIN:VEVENT', `UID:lt-a2-daily-${stamp}@lietuviu-a2`, `DTSTAMP:${stamp}`, `DTSTART:${start}`, 'DURATION:PT40M', `RRULE:FREQ=DAILY;UNTIL=${until}`,
    'SUMMARY:Литовська A2 — заняття на 40 хв', 'DESCRIPTION:Відкрий тренажер «Lietuvių A2» і пройди план на сьогодні. Sėkmės!',
    'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:Час для литовської!','TRIGGER:PT0M','END:VALARM','END:VEVENT',
    'BEGIN:VEVENT', `UID:lt-a2-exam-${stamp}@lietuviu-a2`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${S.exam.replace(/-/g,'')}`, 'SUMMARY:Іспит: литовська мова і Конституція', 'DESCRIPTION:Візьміть документ, що посвідчує особу.',
    'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:Завтра іспит!','TRIGGER:-P1D','END:VALARM','END:VEVENT','END:VCALENDAR'];
  return lines.join('\r\n');
}
async function offerIcs() {
  const ics = buildIcs();
  if (cap.dl) {
    try { await cap.dl.save({ filename:'nagaduvannia-lytovska.ics', data:new Blob([ics], { type:'text/calendar' }) }); toast('Відкрийте завантажений файл — календар запропонує додати нагадування.'); return; }
    catch(e) { if (e && e.code === 'declined') return; }
  }
  openSheet(`<h2>Нагадування в календар</h2>
    <p>Тут не вдалося створити файл. Додайте нагадування вручну — це хвилина:</p>
    <ol class="steps"><li>Відкрийте «Календар» на телефоні.</li><li>Створіть подію «Литовська A2» на ${S.remind}, тривалість 40 хв.</li><li>Повторення — <b>щодня</b>, до ${fmtD(S.exam)}.</li><li>Сповіщення — «під час події».</li></ol>`, { title:'Нагадування', small:true });
}

/* ----- Резервна копія ----- */
function openBackup() {
  const b = openSheet(`<h2>Резервна копія</h2><p class="muted">Скопіюйте текст і збережіть (наприклад, надішліть собі в месенджер). Щоб відновити — вставте його в поле і натисніть «Відновити».</p>
    <textarea id="bk" rows="6" class="mono">${esc(JSON.stringify(S))}</textarea>
    <div class="btnrow"><button class="btn" data-act="bk-copy">Скопіювати</button><button class="btn ghost" data-act="bk-restore">Відновити з тексту</button></div>`, { title:'Копія', small:true });
}

/* ===================== Обробка подій ===================== */
document.addEventListener('click', async e => {
  const t = e.target.closest('[data-act]'); if (!t) {
    const tb = e.target.closest('[data-tab]'); if (tb) { e.preventDefault(); tab = tb.dataset.tab; history.replaceState(null, '', '#' + tab); render(); $('#app').scrollTop = 0; }
    return;
  }
  const act = t.dataset.act, [a, arg] = act.split(/:(.*)/s);
  const fromTask = !!t.dataset.task;
  switch (a) {
    case 'close': closeSheet(); break;
    case 'onb-next': if ($('#ob-pet')) S.pet = ($('#ob-pet').value || '').trim() || 'Pūkas'; obStep++; render(); $('#app').scrollTop = 0; break;
    case 'bubble': t.classList.toggle('open'); break;
    case 'pet-tap': { petTaps++; const [l1, l2] = petLine(petMood()); const b = $('.home .say'); if (b) b.innerHTML = `<b class="lt">${esc(l1)}</b><small>${esc(l2)}</small>`; const pe = t.querySelector('.pet'); if (pe) { pe.classList.remove('hop1'); void pe.offsetWidth; pe.classList.add('hop1'); } break; }
    case 'onb-go': S.exam = $('#ob-exam').value || S.exam; S.remind = $('#ob-time').value || S.remind; S.start = todayStr(); S.onboarded = true; save(); render(); $('#app').scrollTop = 0; break;
    case 'diag': startDiag(); break;
    case 'review': startReview(false); break;
    case 'review-words': startReview(true); break;
    case 'rule': openRule(arg, fromTask); break;
    case 'rule-peek': { const r = RULES.find(x => x.id === arg); openSheet(ruleTheoryHtml(r), { title:'Правило', small:true }); break; }
    case 'rule-practice': practiceRule(arg, fromTask); break;
    case 'read': openReading(arg); break;
    case 'read-q': readingQuiz(arg); break;
    case 'listen': openListening(arg); break;
    case 'listen-q': listeningQuiz(arg); break;
    case 'play': { const l = LISTENING.find(x => x.id === arg); say(l.lines, { dialog: l.lines.length > 1 }); break; }
    case 'play-slow': { const l = LISTENING.find(x => x.id === arg); say(l.lines, { dialog: l.lines.length > 1, rate:0.75 }); break; }
    case 'write': openWriting(arg); break;
    case 'w-ai': writingAI(arg); break;
    case 'w-self': writingSelf(arg); break;
    case 'w-selfdone': { const w = WRITING.find(x => x.id === arg); const n = document.querySelectorAll('.selfchk').length, c = document.querySelectorAll('.selfchk:checked').length; S.write[arg] = { score: Math.round(10 * c / Math.max(1, n)), text: writingText(w), date: todayStr(), self:true }; markDone('skill', 15); toast('Зараховано. Наступного разу спробуйте перевірку з ШІ.'); closeSheet(); break; }
    case 'speak': openSpeaking(arg); break;
    case 's-ai': speakingAI(arg); break;
    case 's-done': S.speak[arg] = (S.speak[arg] || 0) + 1; markDone('skill', 10); toast('Šaunu! Зараховано.'); closeSheet(); break;
    case 'role': openRole(arg); break;
    case 'role-send': roleSend(); break;
    case 'role-end': roleEnd(); break;
    case 'topic': openTopic(arg); break;
    case 'topic-all': { const tp = TOPICS.find(x => x.id === arg); let n = 0; tp.words.forEach(w => { if (!S.words.some(x => x.lt === w[0])) { S.words.push({ lt:w[0], ua:w[1], ex:'', d:todayStr() }); srsAdd('w|' + w[0]); n++; } }); save(); toast(n ? `Додано ${n} ${plural(n,'слово','слова','слів')}.` : 'Усі слова вже у словнику.'); closeSheet(); openTopic(arg); break; }
    case 'ksec': openKSec(arg, fromTask); break;
    case 'ksec-q': kSecQuiz(arg); break;
    case 'mock': startMock(); break;
    case 'numgame': startNumGame(); break;
    case 'weekly': startWeekly(); break;
    case 'seg': langSeg = arg; render(); break;
    case 'ans': answerChoice(+t.dataset.k); break;
    case 'ans-type': checkType(); break;
    case 'qnext': if (Q) { Q.i++; renderQ(); } break;
    case 'flip': { const box = $('#quiz'); box.querySelector('.back').hidden = false; t.hidden = true; box.querySelector('.grade').hidden = false; break; }
    case 'fgrade': { const it = Q.items[Q.i]; record(t.dataset.ok === '1', it, t.dataset.ok === '1' ? 'пам’ятав' : 'не пам’ятав'); Q.i++; renderQ(); break; }
    case 'say': say(t.dataset.text); break;
    case 'ltl': { const el = document.getElementById(t.dataset.target); if (el) insertAt(el, t.dataset.l); break; }
    case 'mic': {
      if (!cap.dict) { const tg = document.getElementById(t.dataset.target); if (tg && typeof startBrowserDict === 'function') startBrowserDict(tg, t); break; }
      if (dictOn) { cap.dict.stop().catch(()=>{}); break; }
      dictTarget = document.getElementById(t.dataset.target);
      cap.dict.start().catch(err => { if (err && err.code === 'not_granted') { cap.dict = null; document.querySelectorAll('[data-act="mic"]').forEach(b => b.remove()); toast('Мікрофон вимкнено — можна писати текстом.'); } });
      break; }
    case 'addword': if (addWord($('#nw-lt').value, $('#nw-ua').value, $('#nw-ex').value)) { toast('Слово додано й потрапить у повторення.'); render(); } break;
    case 'ai-word': aiWord(); break;
    case 'addgloss': if (addWord(t.dataset.lt, t.dataset.ua, '')) { t.textContent = 'у словнику'; t.disabled = true; t.classList.add('done'); } break;
    case 'delword': S.words = S.words.filter(w => w.lt !== t.dataset.lt); delete S.srs['w|' + t.dataset.lt]; save(); render(); break;
    case 'next-fact': S.factI++; save(); render(); break;
    case 'ics': offerIcs(); break;
    case 'backup': openBackup(); break;
    case 'bk-copy': try { await navigator.clipboard.writeText($('#bk').value); toast('Скопійовано.'); } catch(err) { $('#bk').select(); toast('Виділено — скопіюйте вручну.'); } break;
    case 'bk-restore': try { const v = JSON.parse($('#bk').value); if (!v || !v.v) throw 0; S = Object.assign(defState(), v); save(); closeSheet(); render(); toast('Відновлено.'); } catch(err) { toast('Текст копії пошкоджений.'); } break;
    case 'reset': openSheet(`<h2>Почати спочатку?</h2><p>Увесь прогрес і словник буде видалено. Цю дію не можна скасувати.</p><div class="btnrow"><button class="btn bad" data-act="reset-yes">Так, видалити все</button><button class="btn ghost" data-act="close">Скасувати</button></div>`, { title:'Скидання', small:true }); break;
    case 'reset-yes': S = defState(); save(); while (sheetStack.length) closeSheet(); render(); break;
    case 'qplay': { const it = Q && Q.items[Q.i]; if (!it || !it.rec) break; const left = Q.plays[it.recId] ?? 2; if (!left) break; Q.plays[it.recId] = left - 1; say(it.rec, { dialog: it.rec.length > 1 }); const fbWas = $('#fb').innerHTML; const sm = t.parentElement.querySelector('small'); if (sm) sm.textContent = left - 1 ? `можна прослухати ще ${left - 1} раз` : 'запис уже прослухано двічі'; if (left - 1 === 0) t.disabled = true; break; }
    default: extraAct(a, arg, t, fromTask);
  }
});
document.addEventListener('input', e => {
  if (e.target.id === 'dq') { dictQuery = e.target.value; render(); }
});
document.addEventListener('change', e => {
  if (e.target.id === 'set-exam' && e.target.value) { S.exam = e.target.value; save(); render(); }
  if (e.target.id === 'set-time' && e.target.value) { S.remind = e.target.value; save(); }
  if (e.target.id === 'set-voice') { S.voice = e.target.value; save(); }
  if (e.target.id === 'set-pet') { S.pet = e.target.value.trim() || 'Pūkas'; save(); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && sheetStack.length) closeSheet();
  if (Q && !e.target.matches('input, textarea') && ['1','2','3'].includes(e.key) && Q.items[Q.i]?.type === 'choice' && !$('#fb').innerHTML) answerChoice(+e.key - 1);
});
window.addEventListener('hashchange', () => { readHash(); render(); });
if ('speechSynthesis' in window) speechSynthesis.getVoices();

/* Запуск — у кінці extra.js, після того як завантажено всі модулі. */
