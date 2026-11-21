/* ===================== ШІ через чат користувача (безкоштовний режим) =====================
   Коли вбудованого ШІ немає (застосунок відкрито не на claude.ai), застосунок складає готовий запит,
   користувач копіює його у свій безкоштовний чат (Claude чи інший), а відповідь за бажанням вставляє назад —
   тоді застосунок зберігає оцінку й помилки у вкладку «Помилки». */

const CHAT_URL = 'https://claude.ai/new';
const OUT_CONTRACT = `
Наприкінці відповіді ОБОВ’ЯЗКОВО додай окремий блок рівно в такому форматі (він потрібен моєму застосунку):
ОЦІНКА: X/10
ПОМИЛКИ:
- неправильний фрагмент → правильний варіант литовською | коротке пояснення українською
(по одному рядку на помилку, максимум 8; якщо помилок немає — напиши «ПОМИЛКИ: немає»)`;
const WHO = 'Я — Олег, 46 років, українець, готуюся до державного іспиту з литовської мови NŠA (I категорія = рівень A2). Словниковий запас у мене непоганий, слабке місце — граматика. Відповідай українською, литовські слова й приклади виділяй жирним.';

function hpWriting(task, points, text) {
  return `${WHO}
Ти — доброзичливий, але вимогливий викладач і екзаменатор письмової частини іспиту A2.

Завдання (литовською): ${task}
${points && points.length ? 'Обов’язкові пункти: ' + points.join('; ') : ''}

Мій текст:
"""
${text || '(вставте свій текст сюди)'}
"""

Перевір за критеріями A2: чи виконані всі пункти, зв’язність (сполучники nes, todėl, bet, kai), граматика, лексика, обсяг.
Дай: 1) коротку оцінку; 2) список помилок з поясненням правила; 3) що вдалося; 4) 2–3 поради; 5) виправлений текст, максимально близький до мого.${OUT_CONTRACT}`;
}
function hpSpeaking(q, ans) {
  return `${WHO}
Ти — екзаменатор усної частини іспиту A2. Питання екзаменатора: «${q}».
Моя відповідь (могла бути надиктована — ігноруй пунктуацію):
"""
${ans || '(вставте свою відповідь сюди)'}
"""
Оціни: чи відповів по суті, чи достатньо розгорнуто (2–3 речення), граматика, лексика. Покажи помилки, дай 1–2 поради і покращену відповідь литовською на 3–4 речення.${OUT_CONTRACT}`;
}
function hpRole(p) {
  return `${WHO}
Давай рольову гру для розмовної практики. Ти — ${p.role}. Ситуація: «${p.ua}». Моя мета: ${p.goal}
Правила:
- Говори ТІЛЬКИ простою литовською рівня A2, 1–2 короткі речення за раз, природно, як у реальному житті в Литві.
- Після кожної моєї репліки, якщо в ній є помилка, коротко в дужках українською поясни її і покажи правильний варіант. Потім продовжуй розмову литовською.
- Коли мету досягнуто, заверши розмову і дай короткий підсумок: що вийшло добре і мої помилки списком.
Почни першим із фрази: «${p.start}»`;
}
function hpTutor(q) {
  const weak = weakRules(4).map(r => r.ua).join(', ');
  return `${WHO}
Ти — мій терплячий персональний викладач литовської. ${weak ? 'Мої слабкі теми зараз: ' + weak + '.' : ''}
Пояснюй просто й коротко, з прикладами з побуту (робота, магазин, лікар, транспорт). Якщо я пишу литовською — спершу виправ помилки. Про Конституцію Литви кажи лише те, в чому впевнений, з номером статті. Наприкінці дай одне коротке завдання для самоперевірки.

Моє питання: ${q || '(напишіть своє питання тут)'}`;
}
function hpExercises(r) {
  return `${WHO}
Склади мені 8 нових вправ рівня A2 на литовське правило «${r.lt}» (${r.ua}). Суть правила: ${r.summary}
Речення — з побуту дорослого чоловіка в Литві. Спершу дай лише вправи (речення з пропуском ___ і, де треба, 3 варіанти), без відповідей. Коли я напишу свої відповіді — перевір їх, поясни помилки й дай ще 3 вправи на те, де я помилився.`;
}
function hpSpeakExam(v) {
  const s = v.speak;
  return `${WHO}
Проведи зі мною тренувальну усну частину іспиту A2 як екзаменатор NŠA. Говори тільки литовською, просто й повільно. Задавай по ОДНОМУ питанню й чекай моєї відповіді.
Частина 1 (2–3 хв): особисті питання: ${s.p1.join(' / ')}
Частина 2 (4–5 хв): попроси мене розповісти на тему «${s.p2.topic}» за пунктами: ${s.p2.hints.join(' ')} Дай хвилину на підготовку.
Частина 3: дві рольові ситуації по 2 хв.
 A) ${s.p3[0].sit} — ти граєш: ${s.p3[0].role}.
 B) ${s.p3[1].sit} — ти граєш: ${s.p3[1].role}.
Під час розмови помилки НЕ виправляй. Після частини 3 оціни кожну частину від 0 до 10 українською, покажи мої помилки й дай 3 поради.${OUT_CONTRACT}`;
}

/* Аркуш передачі в чат */
let HO = null;
function openHandoff({ title, intro, prompt, kind, onScore }) {
  HO = { kind, onScore, src: title };
  openSheet(`<h1>${esc(title)}</h1>
    <p class="muted">${intro || 'Скопіюйте запит і вставте його у свій безкоштовний чат з ШІ. Він розбере помилки й підкаже, як покращити.'}</p>
    <ol class="steps small"><li>Натисніть <b>«Скопіювати запит»</b>.</li><li>Натисніть <b>«Відкрити Claude»</b> (або будь-який інший чат з ШІ) і вставте запит.</li>${kind === 'score' ? '<li>Скопіюйте відповідь ШІ і вставте її нижче — застосунок збереже оцінку й помилки.</li>' : ''}</ol>
    <label class="fld"><span>Запит для ШІ (можна відредагувати)</span><textarea id="hoq" rows="8" class="mono">${esc(prompt)}</textarea></label>
    <div class="btnrow"><button class="btn primary" data-act="ho-copy">${ic('repeat')} Скопіювати запит</button><a class="btn" href="${CHAT_URL}" target="_blank" rel="noopener">Відкрити Claude</a></div>
    ${kind === 'score' ? `<h3>Відповідь ШІ</h3><label class="fld"><span>Вставте сюди відповідь повністю</span><textarea id="hoa" rows="6" class="ltin"></textarea></label><div id="hofb"></div><button class="btn primary big" data-act="ho-save">Зберегти оцінку й помилки</button>` : ''}`, { title: 'ШІ через чат' });
}
async function hoCopy(btn) {
  const t = $('#hoq'); if (!t) return;
  try { await navigator.clipboard.writeText(t.value); }
  catch (e) { t.focus(); t.select(); try { document.execCommand('copy'); } catch (e2) {} }
  btn.innerHTML = `${ic('check')} Скопійовано`;
  setTimeout(() => { if (btn.isConnected) btn.innerHTML = `${ic('repeat')} Скопіювати запит`; }, 2500);
}
function parseAIReply(text) {
  const score = (text.match(/ОЦІНКА:\s*(\d+(?:[.,]\d+)?)\s*\/\s*10/i) || [])[1];
  const errs = [];
  const block = text.split(/ПОМИЛКИ:/i)[1] || '';
  block.split('\n').forEach(line => {
    const m = line.match(/^\s*[-•*–]?\s*(.+?)\s*(?:→|->|=>)\s*(.+?)\s*(?:\|\s*(.+))?$/);
    if (m && m[1].length < 200) errs.push({ wrong: m[1].replace(/^[«"„]|[»"“]$/g, '').trim(), right: m[2].replace(/^[«"„]|[»"“]$/g, '').trim(), why: (m[3] || '').trim() });
  });
  return { score: score ? Math.round(parseFloat(score.replace(',', '.'))) : null, errs };
}
function hoSave() {
  const t = $('#hoa'); if (!t || !t.value.trim()) { toast('Вставте відповідь ШІ.'); return; }
  const r = parseAIReply(t.value);
  r.errs.forEach(e => logFrag(e, HO.src));
  if (HO.onScore && r.score != null) HO.onScore(r.score);
  markDone('skill', 10);
  $('#hofb').innerHTML = `<div class="fbbox ok"><b>Збережено.</b><p>${r.score != null ? `Оцінка: ${r.score}/10. ` : 'Оцінку не знайдено. '}Помилок додано у «Помилки»: ${r.errs.length}.</p></div>`;
  const b = document.querySelector('[data-act="ho-save"]'); if (b) b.remove();
}

/* ===================== Розпізнавання мовлення браузером ===================== */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let srObj = null;
function browserDictAvailable() { return !!SR && !cap.dict; }
function startBrowserDict(target, btn) {
  if (srObj) { srObj.stop(); return; }
  try {
    srObj = new SR(); srObj.lang = 'lt-LT'; srObj.interimResults = false; srObj.continuous = true;
    srObj.onresult = e => { for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) { const tx = e.results[i][0].transcript.trim(); target.value = (target.value ? target.value.replace(/\s+$/, '') + ' ' : '') + tx; target.dispatchEvent(new Event('input')); } };
    srObj.onend = () => { srObj = null; document.querySelectorAll('[data-act="mic"]').forEach(b => b.classList.remove('on')); };
    srObj.onerror = e => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') toast('Немає доступу до мікрофона. Дозвольте його в налаштуваннях браузера або пишіть текстом.'); else if (e.error === 'language-not-supported') toast('Цей браузер не розпізнає литовську. Спробуйте Chrome на Android або пишіть текстом.'); };
    srObj.start();
    document.querySelectorAll('[data-act="mic"]').forEach(b => b.classList.add('on'));
  } catch (e) { srObj = null; toast('Розпізнавання мовлення недоступне. Пишіть текстом.'); }
}

/* ===================== Дії ===================== */
function chatAct(a, arg, t) {
  switch (a) {
    case 'ho-copy': hoCopy(t); return true;
    case 'ho-save': hoSave(); return true;
    case 'w-chat': { const w = WRITING.find(x => x.id === arg); openHandoff({ title: 'Перевірка листа з ШІ', prompt: hpWriting(w.task, w.points || w.fields, writingText(w)), kind: 'score', onScore: sc => { S.write[arg] = { score: sc, text: writingText(w), date: todayStr() }; } }); return true; }
    case 's-chat': { const s = SPEAKING.find(x => x.id === arg); openHandoff({ title: 'Перевірка відповіді з ШІ', prompt: hpSpeaking(s.q, ($('#stext')?.value || '').trim()), kind: 'score', onScore: () => { S.speak[arg] = (S.speak[arg] || 0) + 1; } }); return true; }
    case 'role-chat': { const p = ROLEPLAYS.find(x => x.id === arg); S.role[arg] = (S.role[arg] || 0) + 1; markDone('skill', 10); openHandoff({ title: 'Розмова з ШІ: ' + p.ua, intro: 'ШІ зіграє роль і виправлятиме ваші помилки після кожної репліки. Можна писати або говорити голосом у застосунку чату.', prompt: hpRole(p), kind: 'chat' }); return true; }
    case 'tutor-chat': openHandoff({ title: 'Запитати викладача', prompt: hpTutor(t.dataset.q || ($('#tin')?.value || '').trim()), kind: 'chat' }); return true;
    case 'ex-chat': { const r = RULES.find(x => x.id === arg); openHandoff({ title: 'Нові вправи від ШІ', intro: 'ШІ дасть нові вправи, перевірить ваші відповіді й пояснить помилки.', prompt: hpExercises(r), kind: 'chat' }); return true; }
    case 'exam-wchat': { const v = EXAMS[+arg], w = v.write; const txt = (w.anketa.fields.map((f, i) => `${f}: ${($('#ea' + i)?.value || '').trim()}`).join('\n')) + '\n\nLaiškas:\n' + ($('#elet')?.value || '').trim(); openHandoff({ title: v.title + ': перевірка письма', prompt: hpWriting(`1) анкета «${w.anketa.title}»; 2) ${w.letter.task}`, w.letter.points, txt), kind: 'score', onScore: sc => { S.exams[v.id].w = sc * 10; } }); return true; }
    case 'se-chat': { const v = EXAMS[+arg]; openHandoff({ title: v.title + ': розмова з екзаменатором', intro: 'ШІ проведе розмову як екзаменатор, а в кінці оцінить кожну частину. Коли закінчите — вставте його оцінку нижче.', prompt: hpSpeakExam(v), kind: 'score', onScore: sc => { S.exams[v.id].s = sc * 10; } }); return true; }
  }
  return false;
}
