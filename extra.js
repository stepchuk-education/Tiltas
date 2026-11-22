/* ===================== Робота над помилками ===================== */
const plain = s => String(s ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const mkey = (q, right) => (strip(plain(q)).slice(-160) + '|' + strip(String(right))).slice(0, 260);
function openMistakes() { return (S.mist || []).filter(m => !m.done); }
function addMistake(m) {
  S.mist = S.mist || [];
  const k = mkey(m.it.q, m.right);
  const ex = S.mist.find(x => x.k === k);
  if (ex) { ex.ok = 0; ex.n = (ex.n || 1) + 1; ex.done = false; ex.d = todayStr(); ex.given = m.given; }
  else S.mist.push(Object.assign({ id: 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), k, d: todayStr(), ok: 0, n: 1, done: false }, m));
  if (S.mist.length > 300) S.mist = S.mist.filter(x => !x.done).slice(-300);
  save();
}
function logMistake(it, given, src) {
  if (it.mid) { mistakeHit(it.mid, false); return; }
  const right = it.type === 'type' ? it.a[0] : it.o ? it.o[0] : '';
  addMistake({ kind: 'q', src, given, right, it: { type: it.type, q: it.q, o: it.o, a: it.a, ex: it.ex, rule: it.rule, sec: it.sec, qi: it.qi, rec: it.rec, recId: it.recId, frag: it.frag } });
}
function logFrag(e, src) {
  if (!e || !e.wrong || !e.right || norm(e.wrong) === norm(e.right)) return;
  const rule = RULES.some(r => r.id === e.rule) ? e.rule : undefined;
  addMistake({ kind: 'frag', src, given: e.wrong, right: e.right,
    it: { type: 'type', q: `Виправте помилку: «${e.wrong}»`, a: [e.right], ex: esc(e.why || ''), rule, frag: true } });
}
function mistakeHit(id, ok) {
  const m = (S.mist || []).find(x => x.id === id); if (!m) return;
  if (ok) { m.ok = (m.ok || 0) + 1; if (m.ok >= 2) { m.done = true; m.fixed = todayStr(); } }
  else m.ok = 0;
}
function viewMist() {
  const open = openMistakes(), fixed = (S.mist || []).filter(m => m.done);
  const byRule = {};
  open.forEach(m => { if (m.it.rule) byRule[m.it.rule] = (byRule[m.it.rule] || 0) + 1; });
  const top = Object.entries(byRule).sort((a, b) => b[1] - a[1]).slice(0, 4);
  return `<h1 class="pageh">Робота над помилками</h1>
  <p class="muted">Сюди автоматично потрапляє кожна помилка: з вправ, тестів, листів, відповідей і розмов. Помилка зникає, коли ви двічі відповісте правильно.</p>
  <div class="grid2">
    <div class="card stat"><div class="stat-ic">${ic('target')}</div><div><b>${open.length}</b><small>${plural(open.length,'відкрита','відкриті','відкритих')}</small></div></div>
    <div class="card stat"><div class="stat-ic">${ic('check')}</div><div><b>${fixed.length}</b><small>виправлено</small></div></div>
  </div>
  ${open.length ? `<button class="btn primary big" data-act="mist-practice">${ic('repeat')} Відпрацювати помилки (${Math.min(open.length, 12)})</button>` : ''}
  ${top.length ? `<section class="card"><h2>Найчастіше помиляєтесь</h2><div class="chips">${top.map(([id, n]) => { const r = RULES.find(x => x.id === id); return `<button class="chip weak" data-act="rule:${id}">${esc(r.ua)} · ${n}</button>`; }).join('')}</div><p class="fine">Натисніть, щоб перечитати правило.</p></section>` : ''}
  ${open.length ? `<ul class="mlist">${open.slice().reverse().map(m => { const r = m.it.rule && RULES.find(x => x.id === m.it.rule);
    return `<li class="card"><div class="mhead"><span class="qtag">${esc(m.src || '')}</span><span class="dots" title="Правильних відповідей підряд">${'●'.repeat(m.ok || 0)}${'○'.repeat(2 - (m.ok || 0))}</span></div>
      <p class="mq">${esc(plain(m.it.q)).slice(0, 220)}</p>
      <p>Ви: <s class="lt">${esc(m.given ?? '—')}</s> → <b class="lt">${esc(m.right)}</b></p>
      ${m.it.ex ? `<small class="muted">${m.it.ex}</small>` : ''}
      <div class="btnrow">${r ? `<button class="link" data-act="rule-peek:${r.id}">${ic('read')} ${esc(r.ua)}</button>` : ''}<button class="link danger" data-act="mist-del:${m.id}">Прибрати</button></div></li>`; }).join('')}</ul>`
    : `<p class="empty">${fixed.length ? 'Усі помилки виправлено. Puiku!' : 'Помилок поки немає. Вони з’являться після перших вправ.'}</p>`}`;
}
function startMistPractice() {
  const open = openMistakes().sort((a, b) => a.d < b.d ? -1 : 1).slice(0, 12);
  if (!open.length) { toast('Відкритих помилок немає.'); return; }
  const items = open.map(m => Object.assign({}, m.it, { mid: m.id, tag: m.src }));
  const rules = [...new Set(open.map(m => m.it.rule).filter(Boolean))].slice(0, 3);
  rules.forEach(id => { const r = RULES.find(x => x.id === id); items.push(Object.assign(ruleItems(r, [pick(r.ex)])[0], { tag: 'Закріплення: ' + r.ua })); });
  const before = (S.mist || []).filter(m => m.done).length;
  runQuiz({ title: 'Робота над помилками', items: shuffle(items), onFinish(res) {
    res.forEach(x => { if (x.it.rule) pushHist(S.rules, x.it.rule, x.ok); if (x.it.sec) pushHist(S.ksec, x.it.sec, x.ok); });
    markDone('mist', 10);
    const after = (S.mist || []).filter(m => m.done).length;
    return `<p class="muted">Виправлено назавжди: <b>${after - before}</b>. Решта повернеться в наступному занятті.</p>`;
  }});
}

/* ===================== План: особливі дні ===================== */
function skillKind(dow) {
  let k = SKILL_ROT[dow];
  const last = (S.official || [])[S.official.length - 1];
  if (last) { if (last.l === 'hard' && k === 'read' && dow === 4) k = 'listen'; if (last.r === 'hard' && k === 'role') k = 'read'; }
  return k;
}
function planSpecial(di, w, dow) {
  const PART = ['', 'читання і письмо', 'аудіювання', 'говоріння'];
  const ex = (v, p) => ({ key: 'skill', icon: 'target', title: `Іспит, ${EXAMS[v].title.toLowerCase()}: ${PART[p]}`, sub: 'Симуляція частини іспиту з таймером', min: [0, 90, 25, 15][p], act: `exam:${v}:${p}` });
  if (di === 1 || (w === 6 && dow === 3)) return { key: 'skill', icon: 'target', title: 'Офіційний пробний тест NŠA', sub: 'Пройдіть тест на сайті NŠA і внесіть результат у застосунок', min: 40, act: 'official' };
  if (w === 4 && dow === 4) return ex(0, 1);
  if (w === 5 && dow === 2) return ex(0, 2);
  if (w === 5 && dow === 5) return ex(0, 3);
  if (w === 6) { const m = { 0: [1, 1], 1: [1, 2], 2: [1, 3], 4: [2, 1], 5: [2, 2], 6: [2, 3] }[dow]; if (m) return ex(m[0], m[1]); }
  return null;
}

/* ===================== Розділ «Іспит» ===================== */
function examScore(v) { return S.exams[v.id] || {}; }
function viewExamSeg() {
  const off = (S.official || []).slice(-3).reverse();
  const lv = { easy: 'легко', ok: 'нормально', hard: 'важко' };
  return `
  <section class="card"><h2>Як влаштований іспит</h2>
    <ol class="parts">${EXAM_INFO.parts.map(p => `<li><b>${p[0]} · ${p[1]}</b><small>${p[2]}</small></li>`).join('')}</ol>
    <dl class="facts">${EXAM_INFO.facts.map(f => `<dt>${f[0]}</dt><dd>${f[1]}</dd>`).join('')}</dl>
    <p class="fine">Джерела: пам’ятка NŠA для кандидатів; інструкція NŠA 2026 до частини говоріння (A1–A2). Для дорослих тривалість частин може трохи відрізнятися. Порогів за частинами NŠA у цих документах не наводить; у застосунку орієнтир — 60% у кожній частині.</p>
  </section>
  <section class="card official"><h2>${ic('target')} Офіційний пробний тест NŠA</h2>
    <p>Справжній тренувальний тест від NŠA. Його варто пройти двічі: на початку (щоб побачити рівень) і на 6-му тижні.</p>
    <div class="btnrow"><a class="btn primary" href="${OFFICIAL_URL}" target="_blank" rel="noopener">Відкрити тест на сайті NŠA</a><button class="btn" data-act="official">Внести результат</button></div>
    ${off.length ? `<ul class="small">${off.map(o => `<li>${fmtD(o.date)}: читання і письмо — ${lv[o.r] || '—'}${o.rp ? ` (${o.rp}%)` : ''}, аудіювання — ${lv[o.l] || '—'}${o.lp ? ` (${o.lp}%)` : ''}</li>`).join('')}</ul>` : ''}
  </section>
  <h3 class="wk">Тренувальні варіанти іспиту</h3>
  ${EXAMS.map((v, vi) => { const s = examScore(v);
    const cell = (p, label, val) => `<button class="row" data-act="exam:${vi}:${p}"><span class="rowt"><b>${label}</b><small>${['', EXAM_INFO.readMin + ' хв, з них письмо — у кінці', EXAM_INFO.listenMin + ' хв, кожен запис — двічі', '12–14 хв з ШІ-екзаменатором'][p]}</small></span><span class="pill ${val == null ? 'new' : val >= 60 ? 'good' : 'weak'}">${val == null ? 'не пройдено' : val + '%'}</span></button>`;
    const pw = s.r != null && s.w != null ? Math.round((s.r + s.w) / 2) : (s.r ?? null);
    return `<section class="card variant"><h2>${v.title} <span class="ua">· ${v.theme}</span></h2><div class="list flat">${cell(1, '1. Читання і письмо', pw)}${cell(2, '2. Аудіювання', s.l ?? null)}${cell(3, '3. Говоріння', s.s ?? null)}</div></section>`; }).join('')}`;
}

/* ----- Частина 1: читання і письмо ----- */
function startExamPart(vi, p) {
  const v = EXAMS[vi]; if (!v) return;
  S.exams[v.id] = S.exams[v.id] || {};
  if (p === 1) {
    const items = v.read.flatMap((t, k) => t.q.map(q => ({ type: 'choice', q: `<span class="ctx lt">${esc(t.text)}</span>${esc(q.q)}`, o: q.o, tag: t.h })));
    runQuiz({ title: v.title + ' · 1 частина', items, limit: EXAM_INFO.readMin * 60000, next: { act: 'exam-write:' + vi, label: 'Далі: письмо' }, onFinish(res) {
      const pc = Math.round(100 * res.filter(x => x.ok).length / res.length);
      S.exams[v.id].r = pc; S.examRun = { vi, until: Q.t0 + EXAM_INFO.readMin * 60000 }; save();
      return `<p class="muted">Читання: ${pc}%. Тепер письмо — час іде далі.</p>`;
    }});
  } else if (p === 2) {
    const items = v.listen.flatMap((t, k) => t.q.map(q => ({ type: 'choice', q: esc(q.q), o: q.o, tag: t.h, rec: t.lines, recId: k })));
    runQuiz({ title: v.title + ' · 2 частина', items, limit: EXAM_INFO.listenMin * 60000, onFinish(res) {
      const pc = Math.round(100 * res.filter(x => x.ok).length / res.length);
      S.exams[v.id].l = pc; markDone('skill', 25);
      return `<details class="transcript"><summary>Тексти записів</summary><div class="lt">${v.listen.map(t => `<p><b>${esc(t.h)}</b><br>${t.lines.map(esc).join('<br>')}</p>`).join('')}</div></details>`;
    }});
  } else openSpeakExam(vi);
}
let wTick = null;
function openExamWriting(vi) {
  const v = EXAMS[vi], w = v.write;
  closeSheet();
  const until = S.examRun && S.examRun.vi === vi ? S.examRun.until : Date.now() + 40 * 60000;
  openSheet(`<p class="eyebrow">${v.title} · 1 частина · письмо</p>
    <p class="timer">${ic('clock')} Залишилось: <b id="wtime">${fmtTime(Math.max(0, until - Date.now()))}</b></p>
    <h2 class="lt">1. ${esc(w.anketa.title)}</h2><p class="small muted">Užpildykite anketą.</p>
    <div class="anketa">${w.anketa.fields.map((f, i) => `<label class="fld"><span class="lt">${esc(f)}</span>${i === w.anketa.fields.length - 1 ? `<textarea id="ea${i}" class="ltin" rows="2"></textarea>` : `<input id="ea${i}" class="ltin" autocomplete="off">`}</label>`).join('')}</div>
    <h2 class="lt">2. Laiškas</h2><div class="taskbox lt">${esc(w.letter.task)}</div>
    <label class="fld"><span>Ваш лист</span><textarea id="elet" class="ltin" rows="9"></textarea></label><p class="wc" id="ewc">0 слів</p>
    ${ltBar('elet')}${micBtn('elet')}
    <div id="ewfb"></div>
    <button class="btn primary big" data-act="exam-wsubmit:${vi}" id="ewbtn">Здати письмо</button>`, { title: 'Іспит' });
  const t = $('#elet'), upd = () => { const n = t.value.trim() ? t.value.trim().split(/\s+/).length : 0; $('#ewc').textContent = `${n} ${plural(n,'слово','слова','слів')} · потрібно ${w.letter.min}–${w.letter.max}`; };
  t.addEventListener('input', upd); upd();
  topSheet().addEventListener('focusin', e => { if (e.target.matches('.ltin')) topSheet().querySelectorAll('.ltbar button').forEach(b => b.dataset.target = e.target.id); });
  clearInterval(wTick);
  wTick = setInterval(() => { const el = $('#wtime'); if (!el) { clearInterval(wTick); return; } const left = until - Date.now(); el.textContent = fmtTime(Math.max(0, left)); if (left <= 0) { clearInterval(wTick); toast('Час вийшов — письмо здано автоматично.'); examWriteSubmit(vi); } }, 1000);
}
async function examWriteSubmit(vi) {
  const v = EXAMS[vi], w = v.write;
  if (!$('#elet')) return;
  clearInterval(wTick);
  const anketa = w.anketa.fields.map((f, i) => `${f}: ${($('#ea' + i)?.value || '').trim()}`).join('\n');
  const letter = $('#elet').value.trim();
  const btn = $('#ewbtn'); if (btn) btn.remove();
  const fb = $('#ewfb');
  if (cap.sample && letter.length > 10) {
    fb.innerHTML = `<div class="loading">${ic('spark')} Екзаменатор перевіряє письмо…</div>`;
    try {
      const r = await askAI(`Ти — екзаменатор письмової частини державного іспиту з литовської мови NŠA (I категорія = A2). Кандидат — україномовний чоловік 46 років.
ЗАВДАННЯ 1 — анкета «${w.anketa.title}». Заповнення:
${anketa}
ЗАВДАННЯ 2 — лист: ${w.letter.task}
Обов’язкові пункти: ${w.letter.points.join('; ')}. Обсяг: ${w.letter.min}–${w.letter.max} слів.
Лист кандидата:
"""${letter}"""
Оціни як на іспиті A2: анкета (правильність і повнота), лист (виконання пунктів, обсяг, зв’язність, граматика, лексика).
Відповідай ТІЛЬКИ JSON без markdown:
{"score": ціле 0-10 за все письмо, "verdict":"одне речення українською", "points":[{"point":"пункт листа","done":true}], "anketa":"коротко українською, що не так в анкеті, або порожньо", "errors":[{"wrong":"фрагмент","right":"виправлення литовською","why":"українською","rule":"id з переліку або other"}], "good":["..."], "tips":["2-3 поради українською"], "improved":"виправлений лист литовською, близький до тексту кандидата", "words":[["слово","переклад"]]}
Перелік id правил: ${RULE_IDS()}. Не вигадуй помилок; максимум 8.`);
      (r.errors || []).forEach(e => { logFrag(e, v.title + ': письмо'); if (RULES.some(x => x.id === e.rule)) { pushHist(S.rules, e.rule, 0); srsAdd('r|' + e.rule); } });
      S.exams[v.id].w = Math.round((r.score || 0) * 10); markDone('skill', 90);
      fb.innerHTML = examPartSummary(v) + (r.anketa ? `<div class="note">${ic('pen')}<span><b>Анкета:</b> ${esc(r.anketa)}</span></div>` : '') + aiReport(r, true) + `<button class="btn primary big" data-act="close">Готово</button>`;
      return;
    } catch (e) { fb.innerHTML = `<div class="fbbox no"><b>Не вдалося перевірити з ШІ.</b><p>Оцініть себе за списком нижче.</p></div>`; }
  }
  fb.innerHTML += `<div class="aibox"><h3>Самоперевірка листа</h3><ul class="checks">${w.letter.points.concat(['привітання і прощання', `обсяг ${w.letter.min}–${w.letter.max} слів`, 'сполучники nes, todėl, bet']).map(p => `<li><label><input type="checkbox" class="exchk"> <span class="lt">${esc(p)}</span></label></li>`).join('')}</ul>
    <div class="btnrow"><button class="btn primary big" data-act="exam-wself:${vi}">Зарахувати за самоперевіркою</button></div></div>`;
}
function examPartSummary(v) {
  const s = examScore(v);
  return `<div class="verdict ${((s.r || 0) + (s.w || 0)) / 2 >= 60 ? 'pass' : 'fail'}"><b>1 частина: ${Math.round(((s.r || 0) + (s.w || 0)) / 2)}%</b><span>читання ${s.r ?? '—'}% · письмо ${s.w ?? '—'}% · орієнтир 60%</span></div>`;
}

/* ----- Частина 3: говоріння з ШІ-екзаменатором ----- */
let SE = null;
function openSpeakExam(vi) {
  const v = EXAMS[vi];
  SE = { vi, v, step: 'intro', i: 0, log: [], p3: 0, turns: 0, busy: false, iv: null, t0: 0 };
  openSheet('<div id="se"></div>', { title: v.title + ' · говоріння' });
  renderSE();
}
function seTimer(sec, label, onEnd) {
  clearInterval(SE.iv); SE.t0 = Date.now();
  SE.iv = setInterval(() => {
    const el = $('#setime'); if (!el || !SE) { clearInterval(SE && SE.iv); return; }
    const left = sec * 1000 - (Date.now() - SE.t0);
    el.textContent = fmtTime(Math.max(0, left));
    if (left <= 0) { clearInterval(SE.iv); if (onEnd) onEnd(); }
  }, 500);
  return `<p class="timer">${ic('clock')} ${label}: <b id="setime">${fmtTime(sec * 1000)}</b></p>`;
}
function seLogHtml(part) {
  return `<div class="chat">${SE.log.filter(m => m.part === part).map(m => m.who === 'ex'
    ? `<div class="msg ai"><button class="iconbtn sm" data-act="say" data-text="${esc(m.text)}" aria-label="Озвучити">${ic('speaker')}</button><div><b class="lt">${esc(m.text)}</b></div></div>`
    : `<div class="msg me"><div><span class="lt">${esc(m.text)}</span></div></div>`).join('')}${SE.busy ? '<div class="msg ai typing"><i></i><i></i><i></i></div>' : ''}</div>`;
}
const seInput = (ph, btnAct, btnLabel) => `<div class="composer"><textarea id="sein" class="ltin" rows="3" placeholder="${ph}"></textarea>${ltBar('sein')}<div class="btnrow">${micBtn('sein')}<button class="btn primary" data-act="${btnAct}">${btnLabel}</button></div></div>`;
function renderSE() {
  const box = $('#se'); if (!box || !SE) return;
  const v = SE.v, sp = v.speak;
  let h = '';
  if (SE.step === 'intro') {
    h = `<h1>Розмова з екзаменатором</h1>
      <p>Як на іспиті: три частини, 12–14 хвилин. ${cap.sample ? 'Роль екзаменатора виконує ШІ, а в кінці він оцінить кожну частину й покаже помилки.' : 'ШІ тут недоступний, тож говоріть уголос і записуйте відповіді — у кінці буде самоперевірка.'}</p>
      <ol class="parts"><li><b>1 частина · 2–3 хв</b><small>Особисті питання.</small></li><li><b>2 частина · 4–5 хв</b><small>Розповідь на тему: 1 хв підготовки.</small></li><li><b>3 частина · A і B</b><small>Дві ситуації: по 1 хв підготовки і по 2 хв розмови.</small></li></ol>
      <p class="tip">Говоріть уголос${cap.dict ? ' і натискайте «Сказати голосом»' : ', а потім коротко записуйте сказане'}. Відповідайте повними реченнями, 2–3 речення на питання.</p>
      <button class="btn primary big" data-act="se-start">Почати</button>`;
  } else if (SE.step === 'p1') {
    h = `<p class="qtag">1 частина · питання ${Math.min(SE.i + 1, sp.p1.length)} з ${sp.p1.length}</p>${seLogHtml('p1')}${seInput('Ваша відповідь литовською', 'se-p1', 'Відповісти')}`;
  } else if (SE.step === 'p2prep') {
    h = `<p class="qtag">2 частина · підготовка</p><div class="taskbox"><h2 class="lt">${esc(sp.p2.topic)}</h2><ul class="lt">${sp.p2.hints.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
      ${seTimer(60, 'Підготовка', () => { SE.step = 'p2'; renderSE(); })}
      <p class="muted small">Подумайте, що скажете за кожним пунктом. Можна записати кілька слів.</p>
      <button class="btn primary big" data-act="se-p2go">Я готовий говорити</button>`;
  } else if (SE.step === 'p2') {
    h = `<p class="qtag">2 частина · розповідь</p><div class="taskbox"><b class="lt">${esc(sp.p2.topic)}</b><ul class="lt small">${sp.p2.hints.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
      ${seTimer(300, 'Час розповіді (4–5 хв)', null)}
      ${seInput('Розповідайте литовською…', 'se-p2done', 'Завершити розповідь')}`;
  } else if (SE.step === 'p3prep') {
    const s = sp.p3[SE.p3];
    h = `<p class="qtag">3 частина · ситуація ${s.label} · підготовка</p><div class="taskbox lt">${esc(s.sit)}</div>
      ${seTimer(60, 'Підготовка', () => { seStartP3(); })}
      <button class="btn primary big" data-act="se-p3go">Почати розмову</button>`;
  } else if (SE.step === 'p3') {
    const s = sp.p3[SE.p3];
    h = `<p class="qtag">3 частина · ситуація ${s.label}</p><div class="taskbox lt small">${esc(s.sit)}</div>
      ${seTimer(120, 'Час розмови (2 хв)', null)}${seLogHtml('p3' + s.label)}
      ${seInput('Ваша репліка литовською', 'se-p3send', 'Сказати')}
      <button class="btn ghost" data-act="se-p3end">Завершити ситуацію ${s.label}</button>`;
  } else if (SE.step === 'eval') {
    h = `<div class="loading">${ic('spark')} Екзаменатор оцінює вашу розмову…</div>`;
  } else if (SE.step === 'result') {
    h = SE.resultHtml;
  }
  box.innerHTML = h;
  const inp = $('#sein');
  if (inp) { inp.focus(); inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); const b = box.querySelector('.composer .btn.primary'); if (b) b.click(); } }); }
  const sb = topSheet(); if (sb) sb.scrollTop = sb.scrollHeight;
}
function seAsk(text, part) { SE.log.push({ who: 'ex', text, part }); renderSE(); say(text); }
function seTake() { const el = $('#sein'); const t = el ? el.value.trim() : ''; return t; }
function seStartP3() {
  clearInterval(SE.iv);
  const s = SE.v.speak.p3[SE.p3];
  SE.step = 'p3'; SE.turns = 0;
  if (!SE.log.some(m => m.part === 'p3' + s.label)) SE.log.push({ who: 'ex', text: s.start, part: 'p3' + s.label });
  renderSE(); say(s.start);
}
async function seP3Send() {
  const t = seTake(); if (!t || SE.busy) return;
  const s = SE.v.speak.p3[SE.p3], part = 'p3' + s.label;
  SE.log.push({ who: 'me', text: t, part }); SE.turns++;
  if (!cap.sample) { renderSE(); return; }
  SE.busy = true; renderSE();
  const hist = SE.log.filter(m => m.part === part).map(m => (m.who === 'ex' ? 'Tu: ' : 'Kandidatas: ') + m.text).join('\n');
  try {
    const r = await askAI(`Tu esi egzaminuotojas, kuris valstybinės kalbos egzamino (A2) kalbėjimo dalyje vaidina vaidmenį: ${s.role}. Situacija kandidatui: ${s.sit}
Kalbėk tik paprasta lietuvių kalba (A2), 1–2 trumpi sakiniai, natūraliai. Netaisyk klaidų – tik tęsk pokalbį. Jei kandidatas jau gavo visą informaciją, mandagiai užbaik pokalbį.
Pokalbis:
${hist}
Atsakyk TIK JSON be markdown: {"reply":"tavo replika lietuviškai","end":true arba false}`);
    SE.busy = false;
    SE.log.push({ who: 'ex', text: r.reply || '…', part }); renderSE(); if (r.reply) say(r.reply);
    if (r.end || SE.turns >= 6) toast('Ситуацію можна завершувати.');
  } catch (e) { SE.busy = false; renderSE(); toast('Екзаменатор не відповів. Спробуйте ще раз.'); }
}
function seNextAfterP3() {
  clearInterval(SE.iv);
  if (SE.p3 === 0) { SE.p3 = 1; SE.step = 'p3prep'; renderSE(); }
  else seEvaluate();
}
async function seEvaluate() {
  clearInterval(SE.iv);
  const v = SE.v, sp = v.speak;
  const tr = (part, name) => `${name}:\n` + SE.log.filter(m => m.part === part).map(m => (m.who === 'ex' ? 'Egzaminuotojas: ' : 'Kandidatas: ') + m.text).join('\n');
  const transcript = [tr('p1', '1 DALIS (asmeniniai klausimai)'), tr('p2', `2 DALIS (tema „${sp.p2.topic}“, punktai: ${sp.p2.hints.join(' ')})`), tr('p3A', `3 DALIS A (${sp.p3[0].sit})`), tr('p3B', `3 DALIS B (${sp.p3[1].sit})`)].join('\n\n');
  const meN = SE.log.filter(m => m.who === 'me').length;
  if (!cap.sample || !meN) {
    SE.step = 'result';
    SE.resultHtml = `<h2>Самоперевірка</h2><ul class="checks">${['Відповідав на кожне питання 2–3 реченнями','У розповіді охопив усі пункти теми','У ситуаціях дізнався всю потрібну інформацію','Використовував сполучники nes, todėl, bet, kai','Коли не розумів — перепитував литовською'].map(x => `<li><label><input type="checkbox" class="exchk"> ${x}</label></li>`).join('')}</ul><button class="btn primary big" data-act="se-self">Зарахувати</button>`;
    renderSE(); return;
  }
  SE.step = 'eval'; renderSE();
  try {
    const r = await askAI(`Ти — екзаменатор усної частини державного іспиту з литовської мови NŠA (I категорія = A2). Кандидат — україномовний чоловік 46 років. Текст отримано з розпізнавання мовлення або набраний — ігноруй пунктуацію й великі літери.
Стенограма:
${transcript}
Оціни кожну частину як на іспиті A2: виконання завдання, зв’язність, граматика, лексика, взаємодія.
Відповідай ТІЛЬКИ JSON без markdown:
{"parts":[{"part":"1","score":0-10,"comment":"українською"},{"part":"2","score":0-10,"comment":"..."},{"part":"3A","score":0-10,"comment":"..."},{"part":"3B","score":0-10,"comment":"..."}],"total": ціле 0-100,"verdict":"одне-два речення українською","errors":[{"wrong":"...","right":"литовською","why":"українською","rule":"id з переліку або other"}],"tips":["3 конкретні поради українською"],"better":"зразкова розповідь для 2 частини литовською (A2, 6-8 речень) на основі відповіді кандидата"}
Перелік id правил: ${RULE_IDS()}. Максимум 8 найважливіших помилок.`);
    (r.errors || []).forEach(e => { logFrag(e, v.title + ': говоріння'); if (RULES.some(x => x.id === e.rule)) { pushHist(S.rules, e.rule, 0); srsAdd('r|' + e.rule); } });
    S.exams[v.id].s = Math.max(0, Math.min(100, Math.round(r.total || 0))); markDone('skill', 15);
    const names = { '1': 'Особисті питання', '2': 'Розповідь', '3A': 'Ситуація A', '3B': 'Ситуація B' };
    SE.step = 'result';
    SE.resultHtml = `<div class="verdict ${S.exams[v.id].s >= 60 ? 'pass' : 'fail'}"><b>Говоріння: ${S.exams[v.id].s}%</b><span>орієнтир 60%</span></div>
      <p>${esc(r.verdict || '')}</p>
      <div class="bars">${(r.parts || []).map(p => `<div class="bar"><span class="bl">${names[p.part] || p.part}</span><span class="bt"><i class="${p.score >= 6 ? 'good' : p.score >= 4 ? 'mid' : 'weak'}" style="width:${p.score * 10}%"></i></span><span class="bv">${p.score}/10</span></div><p class="small muted">${esc(p.comment || '')}</p>`).join('')}</div>
      ${aiReport({ score: Math.round((r.total || 0) / 10), verdict: '', errors: r.errors, tips: r.tips, better: r.better }, false)}
      <button class="btn primary big" data-act="close">Готово</button>`;
    renderSE();
  } catch (e) {
    SE.step = 'result'; SE.resultHtml = `<div class="fbbox no"><b>Не вдалося отримати оцінку.</b><p>Розмову збережено не буде. Спробуйте ще раз пізніше.</p></div><button class="btn primary big" data-act="close">Закрити</button>`; renderSE();
  }
}

/* ===================== Офіційний пробний тест ===================== */
function openOfficial() {
  const lv = (name) => `<div class="seg small3" role="radiogroup">${[['easy','Легко'],['ok','Нормально'],['hard','Важко']].map(([k, t]) => `<label><input type="radio" name="${name}" value="${k}"><span>${t}</span></label>`).join('')}</div>`;
  openSheet(`<h1>Офіційний пробний тест NŠA</h1>
    <ol class="steps"><li>Натисніть кнопку нижче — відкриється сайт NŠA.</li><li>У блоці <b class="lt">«Lietuvių kalbos bazinė – I kategorija (A1–A2 lygis)»</b> натисніть <b class="lt">«Spręsti bandomąjį testą»</b>, потім <b class="lt">«Tęsti»</b>.</li><li>Пройдіть тест до кінця, як на іспиті: без словника.</li><li>Поверніться сюди і запишіть, як пройшло. Застосунок підлаштує план.</li></ol>
    <a class="btn primary big" href="${OFFICIAL_URL}" target="_blank" rel="noopener">Відкрити тест на сайті NŠA</a>
    <h3>Мій результат</h3>
    <p class="small"><b>Читання і письмо</b></p>${lv('or')}
    <label class="fld"><span>Результат у відсотках, якщо сайт показав (необов’язково)</span><input id="orp" type="number" min="0" max="100" inputmode="numeric"></label>
    <p class="small"><b>Аудіювання</b></p>${lv('ol')}
    <label class="fld"><span>Результат у відсотках (необов’язково)</span><input id="olp" type="number" min="0" max="100" inputmode="numeric"></label>
    <label class="fld"><span>Що було незрозуміло? Слова, завдання, теми</span><textarea id="onote" class="ltin" rows="3"></textarea></label>
    <button class="btn primary big" data-act="official-save">Зберегти результат</button>`, { title: 'Пробний тест NŠA' });
}
function saveOfficial() {
  const g = n => (document.querySelector(`input[name="${n}"]:checked`) || {}).value;
  const rec = { date: todayStr(), r: g('or'), l: g('ol'), rp: +$('#orp').value || null, lp: +$('#olp').value || null, note: $('#onote').value.trim() };
  if (!rec.r && !rec.l) { toast('Позначте, як пройшла хоча б одна частина.'); return; }
  S.official.push(rec); markDone('skill', 40);
  closeSheet();
  if (rec.note && cap.sample) openTutor(`Я пройшов офіційний пробний тест NŠA. Мені було незрозуміло: ${rec.note}. Поясни це і дай короткі вправи.`, true);
  else toast('Результат збережено. План на наступні дні враховує його.');
}

/* ===================== Обробник нових дій ===================== */
function extraAct(a, arg, t, fromTask) {
  switch (a) {
    case 'intro': showIntro(() => render()); break;
    case 'mist-practice': startMistPractice(); break;
    case 'mist-del': S.mist = S.mist.filter(m => m.id !== arg); save(); render(); break;
    case 'exam': { const [vi, p] = arg.split(':').map(Number); startExamPart(vi, p); break; }
    case 'exam-write': openExamWriting(+arg); break;
    case 'exam-wsubmit': examWriteSubmit(+arg); break;
    case 'exam-wself': { const n = document.querySelectorAll('.exchk').length, c = document.querySelectorAll('.exchk:checked').length; S.exams[EXAMS[+arg].id].w = Math.round(100 * c / Math.max(1, n)); markDone('skill', 90); closeSheet(); toast('Зараховано.'); break; }
    case 'se-start': SE.step = 'p1'; SE.i = 0; seAsk(SE.v.speak.p1[0], 'p1'); break;
    case 'se-p1': { const ans = seTake(); if (!ans) { toast('Скажіть або напишіть відповідь.'); break; } SE.log.push({ who: 'me', text: ans, part: 'p1' }); SE.i++;
      if (SE.i < SE.v.speak.p1.length) seAsk(SE.v.speak.p1[SE.i], 'p1');
      else { SE.log.push({ who: 'ex', text: `Dabar antroji dalis. Papasakokite tema „${SE.v.speak.p2.topic}“. Turite vieną minutę pasiruošti.`, part: 'p2' }); say(`Dabar antroji dalis. Papasakokite tema ${SE.v.speak.p2.topic}. Turite vieną minutę pasiruošti.`); SE.step = 'p2prep'; renderSE(); }
      break; }
    case 'se-p2go': clearInterval(SE.iv); SE.step = 'p2'; renderSE(); break;
    case 'se-p2done': { const ans = seTake(); if (!ans) { toast('Розкажіть хоча б кілька речень.'); break; } SE.log.push({ who: 'me', text: ans, part: 'p2' }); clearInterval(SE.iv); SE.p3 = 0; SE.step = 'p3prep'; say('Dabar trečioji dalis.'); renderSE(); break; }
    case 'se-p3go': seStartP3(); break;
    case 'se-p3send': seP3Send(); break;
    case 'se-p3end': { const ans = seTake(); if (ans) SE.log.push({ who: 'me', text: ans, part: 'p3' + SE.v.speak.p3[SE.p3].label }); seNextAfterP3(); break; }
    case 'se-self': { const n = document.querySelectorAll('.exchk').length, c = document.querySelectorAll('.exchk:checked').length; S.exams[SE.v.id].s = Math.round(100 * c / Math.max(1, n)); markDone('skill', 15); closeSheet(); toast('Зараховано.'); break; }
    case 'official': openOfficial(); break;
    case 'official-save': saveOfficial(); break;
    default: learnAct(a, arg, t, fromTask);
  }
}

/* ===================== Запуск ===================== */
readHash();
render();
initCaps();
if (!S.introSeen || S.introAuto) showIntro(() => render());
(function clock() { const el = $('#sbtime'); if (el) el.textContent = new Date().toTimeString().slice(0, 5); setTimeout(clock, 30000); })();
/* Офлайн-режим (PWA). У пісочниці claude.ai service worker недоступний — тоді просто пропускаємо. */
if ('serviceWorker' in navigator && location.protocol === 'https:' && !/claude\.(ai|site)|claudeusercontent/.test(location.hostname)) {
  /* Оновлення без зусиль: застосунок з іконки сам перевіряє нову версію щоразу, коли його відкривають,
     і перезавантажується, щойно вона готова (якщо не відкрита вправа). */
  const hadCtrl = !!navigator.serviceWorker.controller;
  let reloading = false;
  const safeReload = () => { if (reloading) return; if (sheetStack.length) { addEventListener('tiltas-idle', safeReload, { once: true }); return; } reloading = true; location.reload(); };
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadCtrl) safeReload(); });
  navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(reg => {
    const check = () => reg.update().catch(() => {});
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
    setInterval(check, 30 * 60 * 1000);
  }).catch(() => {});
}
