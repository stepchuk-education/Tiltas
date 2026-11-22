/* ===================== Tiltas: шпаргалки, письмо, говоріння, картки =====================
   Без ШІ й без переходів у чат: вчимося за шпаргалками, зразками й тестами, а слова та фрази
   завчаємо картками з інтервальним повторенням. */

/* ---------- Сполучні слова (як linking words в англійській) ---------- */
const LINKERS = [
  ['ir', 'і, та', 'Gyvenu Vilniuje ir dirbu banke.'],
  ['taip pat', 'також', 'Taip pat mėgstu žvejoti.'],
  ['be to', 'крім того', 'Be to, butas yra arti darbo.'],
  ['bet', 'але', 'Norėjau ateiti, bet susirgau.'],
  ['o', 'а (порівняння)', 'Aš dirbu, o žmona studijuoja.'],
  ['tačiau', 'однак', 'Buvo šalta, tačiau smagu.'],
  ['deja', 'на жаль', 'Deja, negalėsiu ateiti.'],
  ['nes', 'бо, тому що', 'Neatėjau, nes sirgau.'],
  ['todėl', 'тому (наслідок)', 'Sirgau, todėl neatėjau.'],
  ['kai', 'коли', 'Kai grįžtu namo, gaminu vakarienę.'],
  ['jeigu / jei', 'якщо', 'Jeigu turėsiu laiko, paskambinsiu.'],
  ['kad', 'що; щоб', 'Manau, kad tai gera idėja.'],
  ['pirmiausia', 'спочатку', 'Pirmiausia nuėjome į parduotuvę.'],
  ['paskui / po to', 'потім', 'Paskui pietavome kavinėje.'],
  ['galiausiai', 'нарешті, врешті', 'Galiausiai grįžome namo.'],
  ['pavyzdžiui', 'наприклад', 'Mėgstu sportą, pavyzdžiui, krepšinį.'],
  ['žinoma', 'звичайно', 'Žinoma, ateisiu!'],
  ['apskritai', 'загалом', 'Apskritai savaitgalis buvo puikus.'],
];
/* Тест на сполучні слова: речення з пропуском, правильна відповідь першою. */
const LINK_Q = [
  ['Sirgau, ___ neatėjau į darbą.', 'todėl', 'nes', 'kai', 'Спершу причина, потім наслідок → todėl (тому).'],
  ['Neatėjau į darbą, ___ sirgau.', 'nes', 'todėl', 'jeigu', 'Спершу дія, потім причина → nes (бо).'],
  ['Norėjau ateiti, ___ neturėjau laiko.', 'bet', 'nes', 'kad', 'Протиставлення → bet (але).'],
  ['___ turėsiu laiko, paskambinsiu.', 'Jeigu', 'Todėl', 'Bet', 'Умова → jeigu (якщо).'],
  ['___ grįžtu namo, gaminu vakarienę.', 'Kai', 'Bet', 'Todėl', 'Час → kai (коли).'],
  ['Manau, ___ tai gera idėja.', 'kad', 'nes', 'bet', 'Після «manau, žinau, sakau» → kad (що).'],
  ['Aš dirbu banke, ___ žmona – mokykloje.', 'o', 'nes', 'jeigu', 'Порівнюємо двох людей → o (а).'],
  ['___ nuėjome į parduotuvę, paskui – į kavinę.', 'Pirmiausia', 'Galiausiai', 'Deja', 'Початок розповіді → pirmiausia (спочатку).'],
  ['Pirmiausia pavalgėme, ___ nuėjome į kiną.', 'paskui', 'pirmiausia', 'deja', 'Наступна дія → paskui (потім).'],
  ['___, negalėsiu ateiti į gimtadienį.', 'Deja', 'Žinoma', 'Pavyzdžiui', 'Погана новина → deja (на жаль).'],
  ['Mėgstu sportą, ___, krepšinį.', 'pavyzdžiui', 'deja', 'todėl', 'Приклад → pavyzdžiui (наприклад).'],
  ['Butas didelis ir šviesus. ___, jis arti darbo.', 'Be to', 'Deja', 'Todėl', 'Додаємо ще один плюс → be to (крім того).'],
  ['Lauke lijo, ___ likome namie.', 'todėl', 'nes', 'kad', 'Причина → наслідок: todėl.'],
  ['Likome namie, ___ lauke lijo.', 'nes', 'todėl', 'o', 'Наслідок → причина: nes.'],
  ['Visą dieną dirbau. ___ grįžau namo pavargęs.', 'Galiausiai', 'Pirmiausia', 'Pavyzdžiui', 'Кінець розповіді → galiausiai (нарешті).'],
];

/* ---------- Як написати лист ---------- */
const WRITE_PLAN = [
  { lt: 'Pasisveikinimas', ua: 'Привітання', tip: 'Ім’я — у кличному відмінку: Tomas → Tomai, Jonas → Jonai, Rūta → Rūta.',
    ph: [['Labas, Tomai!', 'Привіт, Томе! (другу)'], ['Sveika, Rūta!', 'Привіт, Руто! (подрузі)'], ['Laba diena,', 'Добрий день, (офіційно)']] },
  { lt: 'Pradžia', ua: 'Початок: навіщо пишете', tip: 'Одне речення: подякуйте або скажіть, чому пишете.',
    ph: [['Ačiū už laišką!', 'Дякую за лист!'], ['Rašau, nes noriu…', 'Пишу, бо хочу…'], ['Seniai nerašiau.', 'Давно не писав.'], ['Kaip tau sekasi?', 'Як у тебе справи?']] },
  { lt: 'Pagrindinė dalis', ua: 'Головне: усі пункти завдання', tip: 'На кожен пункт — 1–2 речення. З’єднуйте їх словами pirmiausia, paskui, nes, todėl, bet.',
    ph: [['Pirmiausia…', 'Спочатку…'], ['Paskui…', 'Потім…'], ['…, nes…', '…, бо…'], ['…, todėl…', '…, тому…']] },
  { lt: 'Pabaiga', ua: 'Кінець', tip: 'Попросіть відповісти або побажайте чогось.',
    ph: [['Parašyk, ar galėsi ateiti.', 'Напиши, чи зможеш прийти.'], ['Lauksiu tavo laiško.', 'Чекатиму твого листа.'], ['Iki greito susitikimo!', 'До швидкої зустрічі!'], ['Gero savaitgalio!', 'Гарних вихідних!']] },
  { lt: 'Atsisveikinimas', ua: 'Підпис', tip: 'Прощання й ваше ім’я.',
    ph: [['Iki! Olegas', 'Бувай! Олег'], ['Linkėjimai, Olegas', 'Вітаю, Олег'], ['Su pagarba, Olegas', 'З повагою, Олег (офіційно)']] },
];
const WRITE_TIPS = [
  '50–80 слів — це приблизно 6–9 коротких речень.',
  'Кожен пункт завдання — окреме речення. Пропущений пункт = втрачені бали.',
  'Учора → минулий час (buvau, dirbau). Завтра → майбутній (būsiu, dirbsiu).',
  'Перевірте літери ą č ę ė į š ų ū ž — вони змінюють слово.',
];
const WRITE_Q = [
  ['Як почати лист другові Tomas?', 'Labas, Tomai!', 'Labas, Tomas!', 'Su pagarba, Tomai', 'Звертання — у кличному відмінку: Tomas → Tomai.'],
  ['Як почати лист другові Jonas?', 'Labas, Jonai!', 'Labas, Jonas!', 'Iki, Jonai!', 'Jonas → Jonai.'],
  ['Як закінчити офіційний лист?', 'Su pagarba,', 'Iki!', 'Labas,', '«Su pagarba» — «з повагою», для офіційних листів.'],
  ['Ви відповідаєте на лист. Що написати на початку?', 'Ačiū už laišką!', 'Iki greito!', 'Su pagarba,', 'Подякуйте за лист.'],
  ['Що написати в кінці запрошення?', 'Parašyk, ar galėsi ateiti.', 'Ačiū už laišką!', 'Laba diena,', 'Попросіть відповісти.'],
  ['Скільки речень писати на кожен пункт завдання?', '1–2', 'Жодного', '10', 'Коротко, але про кожен пункт.'],
];
/* Неправильні варіанти для пропусків у зразках: підібрані так, щоб не підходили за змістом. */
const LINK_WRONG = { nes: ['todėl', 'jeigu'], 'todėl': ['nes', 'jeigu'], bet: ['jeigu', 'kad'], ir: ['nes', 'todėl'], o: ['nes', 'jeigu'], kai: ['bet', 'todėl'],
  jeigu: ['bet', 'todėl'], jei: ['bet', 'todėl'], kad: ['nes', 'bet'], paskui: ['deja', 'pavyzdžiui'], 'po to': ['deja', 'pavyzdžiui'], pirmiausia: ['galiausiai', 'deja'],
  galiausiai: ['pirmiausia', 'pavyzdžiui'], 'taip pat': ['deja', 'todėl'], 'be to': ['deja', 'todėl'], 'tačiau': ['todėl', 'kad'], deja: ['žinoma', 'pavyzdžiui'] };
const FIELD_UA = { 'Vardas': 'ім’я', 'Pavardė': 'прізвище', 'Gimimo data': 'дата народження', 'Pilietybė': 'громадянство', 'Šeiminė padėtis': 'сімейний стан',
  'Gyvenamoji vieta, adresas': 'місце проживання, адреса', 'Profesija, darbovietė': 'професія, місце роботи', 'Telefono numeris': 'номер телефону', 'El. paštas': 'електронна пошта',
  'Gimimo vieta': 'місце народження', 'Adresas': 'адреса', 'Profesija': 'професія', 'Darbovietė': 'місце роботи' };

/* ---------- Як відповідати усно ---------- */
const SPEAK_PLAN = [
  { n: 1, ua: 'Пряма відповідь', ex: 'Gyvenu Vilniuje.' },
  { n: 2, ua: 'Деталь: де, коли, з ким', ex: 'Gyvenu su žmona, nedideliame bute.' },
  { n: 3, ua: 'Чому або приклад', ex: 'Man patinka, nes butas šviesus ir šiltas.' },
];
const SPEAK_START = [
  ['Manau, kad…', 'Думаю, що…'], ['Man atrodo, kad…', 'Мені здається, що…'], ['Man patinka…, nes…', 'Мені подобається…, бо…'],
  ['Paprastai…', 'Зазвичай…'], ['Dažniausiai…', 'Найчастіше…'], ['Kartais…', 'Іноді…'],
];
const SPEAK_TIME = [
  ['Hmm… Leiskite pagalvoti.', 'Хм… Дайте подумати.'], ['Tai geras klausimas.', 'Це гарне питання.'], ['Kaip čia pasakyti…', 'Як би це сказати…'],
];

/* ---------- Колоди карток ---------- */
function cardDecks() {
  const decks = TOPICS.map(t => ({ id: t.id, title: t.ua, sub: t.lt, icon: 'dict', cards: t.words.map(w => ({ f: w[0], b: w[1] })) }));
  decks.push({ id: 'link', title: 'Сполучні слова', sub: 'ir, bet, nes, todėl…', icon: 'repeat', cards: LINKERS.map(l => ({ f: l[0], b: l[1], ex: l[2] })) });
  decks.push({ id: 'wphr', title: 'Фрази для листа', sub: 'Labas, Tomai! Su pagarba…', icon: 'pen', cards: WRITE_PLAN.flatMap(s => s.ph).map(p => ({ f: p[0], b: p[1] })) });
  decks.push({ id: 'sphr', title: 'Фрази для розмови', sub: 'Manau, kad… Gal galite pakartoti?', icon: 'mic', cards: SPEAK_START.concat(SPEAK_TIME, RESCUE).map(p => ({ f: p[0], b: p[1] })) });
  decks.push({ id: 'kn', title: 'Конституція: числа', sub: '141 · 4/5 · 300 000…', icon: 'konst', ua: true, cards: KSECTIONS.flatMap(s => s.nums || []).map(n => ({ f: n[1], b: n[0] })) });
  return decks;
}
let DECKS = null;
const decks = () => DECKS || (DECKS = cardDecks());
const deckById = id => id === 'mine' ? mineDeck() : decks().find(d => d.id === id);
function mineDeck() { return { id: 'mine', title: 'Мої слова', sub: 'слова, які ви додали', icon: 'plus', cards: S.words.map(w => ({ f: w.lt, b: w.ua, ex: w.ex, key: 'w|' + w.lt })) }; }
const cardKey = (d, i) => d.cards[i].key || `c|${d.id}|${i}`;
function deckStats(d) {
  const t = todayStr(); let learned = 0, due = 0, seen = 0;
  d.cards.forEach((c, i) => { const s = S.srs[cardKey(d, i)]; if (!s) return; seen++; if (s.b >= 3) learned++; if (s.d <= t) due++; });
  return { total: d.cards.length, learned, due, seen, fresh: d.cards.length - seen };
}
function allDue() { return decks().concat([mineDeck()]).reduce((a, d) => a + deckStats(d).due, 0); }
function nextDeck() {
  const w = curWeek();
  const pool = decks().filter(d => !TOPICS.some(t => t.id === d.id && t.week > w));
  return pool.map(d => [d, deckStats(d)]).sort((a, b) => (b[1].due - a[1].due) || (a[1].learned / a[1].total - b[1].learned / b[1].total))[0][0];
}

/* ---------- Вкладка «Картки» ---------- */
/* Кожна колода — свого кольору, у синьо-блакитній гамі з кількома теплими акцентами. */
const DECK_COLORS = [
  'linear-gradient(150deg,#4f8dff,#1d4fd0)', 'linear-gradient(150deg,#38c3e6,#1484c7)', 'linear-gradient(150deg,#8b7bff,#4b3cc9)',
  'linear-gradient(150deg,#2fd0b0,#0f8f8a)', 'linear-gradient(150deg,#ff9a7a,#e0566a)', 'linear-gradient(150deg,#5aa0ff,#6a5cff)',
  'linear-gradient(150deg,#ffc36b,#f08a3e)', 'linear-gradient(150deg,#3b6fd8,#0e2f86)', 'linear-gradient(150deg,#7fd1ff,#3e8fe8)',
  'linear-gradient(150deg,#ff8fb8,#c94f9a)', 'linear-gradient(150deg,#60d394,#1f9a6a)', 'linear-gradient(150deg,#9aa8ff,#5b6be0)',
];
function viewCards() {
  const due = allDue(), mine = mineDeck(), ms = deckStats(mine);
  const tile = (d, i) => { const s = deckStats(d), p = s.total ? Math.round(100 * s.learned / s.total) : 0;
    return `<button class="deck" data-act="deck:${d.id}" style="--dg:${DECK_COLORS[i % DECK_COLORS.length]}">${ic(d.icon)}<b>${esc(d.title)}</b><small class="${d.ua ? '' : 'lt'}">${esc(d.sub)}</small>
      <span class="dbar"><i style="width:${p}%"></i></span><em>${s.learned}/${s.total}${s.due ? ` · <span class="due">${s.due} повторити</span>` : ''}</em></button>`; };
  const q = dictQuery.trim().toLowerCase();
  const list = S.words.slice().reverse().filter(w => !q || w.lt.toLowerCase().includes(q) || (w.ua || '').toLowerCase().includes(q));
  return `<h1 class="pageh">Картки</h1>
  ${due ? `<button class="btn primary big" data-act="deck:due">${ic('repeat')} Повторити все на сьогодні · ${due}</button>` : `<p class="muted">Усе повторено. Оберіть колоду й вчіть нові картки.</p>`}
  <h3 class="wk">Слова за темами іспиту</h3>
  <div class="decks">${decks().filter(d => /^t\d/.test(d.id)).map(tile).join('')}</div>
  <h3 class="wk">Фрази й шпаргалки</h3>
  <div class="decks">${decks().filter(d => !/^t\d/.test(d.id)).map((d, i) => tile(d, i + 3)).join('')}${mine.cards.length ? tile(mine, 9) : ''}</div>
  <details class="fold mywords"><summary><span>${ic('plus')} Мої слова · ${S.words.length}</span></summary>
    <div class="fold-in">
      <div class="addw">
        <label class="fld"><span>Литовською</span><input id="nw-lt" class="ltin" autocomplete="off" placeholder="pvz. sąskaita"></label>
        ${ltBar('nw-lt')}
        <label class="fld"><span>Українською</span><input id="nw-ua" autocomplete="off" placeholder="рахунок"></label>
        <label class="fld"><span>Приклад (необов’язково)</span><input id="nw-ex" autocomplete="off" placeholder="Sąskaitą, prašau."></label>
        <button class="btn primary" data-act="addword">${ic('plus')} Додати картку</button>
      </div>
      ${S.words.length > 6 ? `<label class="fld search"><span class="sr">Пошук</span><input id="dq" value="${esc(dictQuery)}" placeholder="Пошук" autocomplete="off"></label>` : ''}
      ${list.length ? `<ul class="words">${list.map(w => `<li><button class="iconbtn sm" data-act="say" data-text="${esc(w.lt)}" aria-label="Озвучити">${ic('speaker')}</button>
        <span class="wbody"><b class="lt">${esc(w.lt)}</b><span>${esc(w.ua)}</span></span>
        <button class="iconbtn sm" data-act="delword" data-lt="${esc(w.lt)}" aria-label="Видалити">${ic('x')}</button></li>`).join('')}</ul>` : `<p class="empty">${q ? 'Нічого не знайдено.' : 'Додайте незнайомі слова — з них зробляться картки.'}</p>`}
    </div></details>`;
}

/* ---------- Сесія карток ---------- */
let CS = null;
function openDeck(id, fromTask) {
  const t = todayStr(); let queue = [];
  const take = (d, onlyDue) => d.cards.forEach((c, i) => { const k = cardKey(d, i), s = S.srs[k];
    if (s ? s.d <= t : !onlyDue) queue.push({ d, i, k, c, isNew: !s }); });
  let title;
  if (id === 'due') { decks().concat([mineDeck()]).forEach(d => take(d, true)); title = 'Повторення карток'; }
  else { const d = deckById(id); if (!d) return; title = d.title; take(d, false);
    const due = queue.filter(x => !x.isNew), fresh = queue.filter(x => x.isNew); queue = shuffle(due).concat(fresh.slice(0, Math.max(5, 12 - due.length))); }
  queue = (id === 'due' ? shuffle(queue) : queue).slice(0, 20);
  if (!queue.length) { toast('У цій колоді на сьогодні все вивчено. Puiku!'); return; }
  const di = decks().findIndex(d => d.id === id);
  CS = { id, queue, i: 0, ok: 0, again: 0, flipped: false, fromTask, retried: new Set(), color: DECK_COLORS[(di < 0 ? 0 : di < 12 ? di : di - 9) % DECK_COLORS.length] };
  openSheet('<div id="cs"></div>', { title, zone: id === 'kn' ? 'konst' : '' });
  renderCard();
}
function renderCard() {
  const box = $('#cs'); if (!box || !CS) return;
  const it = CS.queue[CS.i];
  if (!it) return finishCards();
  const n = CS.queue.length, rev = !!S.cardRev && !it.d.ua;
  const front = rev ? it.c.b : it.c.f, back = rev ? it.c.f : it.c.b;
  const ltFront = !rev && !it.d.ua, ltBack = rev;
  const sayTxt = it.d.ua ? '' : it.c.f.replace(/…/g, '');
  box.innerHTML = `<div class="qprog"><i style="width:${100 * CS.i / n}%"></i></div>
    <div class="cs-top"><span class="qcount">${CS.i + 1} з ${n}${it.isNew ? ' · <b class="newc">нова</b>' : ''}</span>${it.d.ua ? '' : `<button class="link" data-act="card-rev">${ic('repeat')} ${rev ? 'UA → LT' : 'LT → UA'}</button>`}</div>
    <div class="fc-wrap ${CS.i === 0 && !CS.dealt ? 'deal' : 'next'}" style="--cg:${CS.color || DECK_COLORS[0]}"><div class="fc ${CS.flipped ? 'flip' : ''}" id="fc" data-act="card-flip">
      <div class="fc-face fc-front"><span class="fc-txt ${ltFront ? 'lt' : ''}">${esc(front)}</span>${sayTxt && !rev ? `<button class="iconbtn" data-act="say" data-text="${esc(sayTxt)}" aria-label="Озвучити">${ic('speaker')}</button>` : ''}<small class="fc-hint">торкніться, щоб перевернути</small></div>
      <div class="fc-face fc-back"><span class="fc-txt ${ltBack ? 'lt' : ''}">${esc(back)}</span>${it.c.ex ? `<small class="lt fc-ex">${esc(it.c.ex)}</small>` : ''}${sayTxt ? `<button class="iconbtn" data-act="say" data-text="${esc(sayTxt)}" aria-label="Озвучити">${ic('speaker')}</button>` : ''}</div>
    </div><i class="fc-stamp"></i></div>
    <div class="cs-btns ${CS.flipped ? '' : 'wait'}">
      <button class="btn bad big" data-act="card-grade" data-ok="0">${ic('x')} Ще раз</button>
      <button class="btn good big" data-act="card-grade" data-ok="1">${ic('check')} Знаю</button>
    </div>
    <p class="fine cs-swipe">Можна гортати: вправо — знаю, вліво — ще раз</p>`;
  CS.dealt = true;
  bindSwipe($('#fc'));
}
function bindSwipe(el) {
  if (!el) return; let sx = 0, dx = 0, on = false, moved = false;
  el.addEventListener('pointerdown', e => { if (e.target.closest('.iconbtn')) return; on = true; moved = false; sx = e.clientX; dx = 0; el.style.transition = 'none'; });
  el.addEventListener('pointermove', e => { if (!on) return; dx = e.clientX - sx; if (Math.abs(dx) > 8) { moved = true; try { el.setPointerCapture(e.pointerId); } catch (er) {} }
    el.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)${CS.flipped ? ' rotateY(180deg)' : ''}`;
    el.parentElement.dataset.dir = dx > 40 ? 'ok' : dx < -40 ? 'no' : ''; });
  const end = () => { if (!on) return; on = false; el.style.transition = ''; el.parentElement.dataset.dir = '';
    if (Math.abs(dx) > 90) { el.style.transform = `translateX(${dx > 0 ? 600 : -600}px) rotate(${dx / 8}deg)`; setTimeout(() => gradeCard(dx > 0), 180); }
    else { el.style.transform = ''; } if (moved) el.dataset.moved = '1'; };
  el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
}
function gradeCard(ok) {
  if (!CS) return; const it = CS.queue[CS.i]; if (!it) return;
  if (!CS.retried.has(it.k)) { srsAdd(it.k); srsGrade(it.k, ok); }
  if (ok) CS.ok++; else { CS.again++; if (!CS.retried.has(it.k)) { CS.retried.add(it.k); CS.queue.push(it); } }
  CS.i++; CS.flipped = false; save(); renderCard();
}
function finishCards() {
  const box = $('#cs'); const n = CS.ok + CS.again, p = n ? Math.round(100 * CS.ok / n) : 0;
  if (CS.fromTask) markDone('skill', 10); else if (CS.id === 'due') markDone('rev', 10); else save();
  const mood = p >= 85 ? 'joy3' : p >= 60 ? 'joy' : 'calm';
  const again = CS.id === 'due' ? '' : `<button class="btn" data-act="deck:${CS.id}">${ic('repeat')} Ще картки з цієї колоди</button>`;
  box.innerHTML = `<div class="result"><div class="respet">${petSVG(mood, 130)}</div>
    <h2>${p >= 85 ? 'Puiku!' : p >= 60 ? 'Gerai!' : 'Нічого, повторимо!'}</h2>
    <p class="muted">Знаю: <b>${CS.ok}</b> · ще раз: <b>${CS.again}</b>. Картки повернуться саме тоді, коли почнуть забуватися.</p>
    ${again}<button class="btn primary big" data-act="close">Готово</button></div>`;
  CS = null;
}

/* ---------- Шпаргалки ---------- */
const markLinkers = s => esc(s).replace(new RegExp(`(^|[\\s,(])(${LINKERS.flatMap(l => l[0].split(' / ')).sort((a, b) => b.length - a.length).map(w => w.replace(/ /g, '\\s')).join('|')})(?=[\\s,.!?…]|$)`, 'gi'), '$1<mark>$2</mark>');
function phraseList(ph) { return `<ul class="phr">${ph.map(p => `<li><button class="iconbtn sm" data-act="say" data-text="${esc(p[0].replace(/…/g, ''))}" aria-label="Озвучити">${ic('speaker')}</button><span><b class="lt">${esc(p[0])}</b><small>${esc(p[1])}</small></span></li>`).join('')}</ul>`; }
function openGuide(kind) {
  if (kind === 'write') openSheet(`<p class="eyebrow">Шпаргалка</p><h1>Як написати лист</h1>
    <p class="muted">П’ять кроків. Натисніть на крок, щоб побачити готові фрази.</p>
    <ol class="plan5">${WRITE_PLAN.map((s, i) => `<li><details><summary><span class="pn">${i + 1}</span><span><b class="lt">${s.lt}</b><small>${s.ua}</small></span></summary>
      <div class="fold-in"><p class="tip">${esc(s.tip)}</p>${phraseList(s.ph)}</div></details></li>`).join('')}</ol>
    <details class="fold plan"><summary><span>${ic('spark')} Поради</span></summary><ul class="small">${WRITE_TIPS.map(t => `<li>${esc(t)}</li>`).join('')}</ul></details>
    <div class="btnrow"><button class="btn primary big" data-act="guide-test:write">${ic('target')} Тест: як писати лист</button><button class="btn big" data-act="deck:wphr">${ic('dict')} Картки з фразами</button></div>`, { title: 'Письмо' });
  if (kind === 'link') openSheet(`<p class="eyebrow">Шпаргалка</p><h1>Сполучні слова</h1>
    <p class="muted">Вони з’єднують речення в розповідь. На іспиті за них дають бали за зв’язність.</p>
    <div class="pairs"><div><b class="lt">…, nes …</b><small>причина: «бо»</small></div><div><b class="lt">…, todėl …</b><small>наслідок: «тому»</small></div></div>
    <ul class="phr">${LINKERS.map(l => `<li><button class="iconbtn sm" data-act="say" data-text="${esc(l[2])}" aria-label="Озвучити">${ic('speaker')}</button><span><b class="lt">${esc(l[0])}</b> <small>${esc(l[1])}</small><small class="lt">${markLinkers(l[2])}</small></span></li>`).join('')}</ul>
    <div class="btnrow"><button class="btn primary big" data-act="guide-test:link">${ic('target')} Тест: сполучні слова</button><button class="btn big" data-act="deck:link">${ic('dict')} Картки</button></div>`, { title: 'Сполучні слова' });
  if (kind === 'speak') openSheet(`<p class="eyebrow">Шпаргалка</p><h1>Як відповідати усно</h1>
    <p class="muted">Формула 1‑2‑3: три коротких речення — і відповідь готова.</p>
    <ol class="f123">${SPEAK_PLAN.map(s => `<li><span class="pn">${s.n}</span><span><b>${s.ua}</b><small class="lt">${esc(s.ex)}</small></span></li>`).join('')}</ol>
    <details class="fold plan"><summary><span>Як почати думку</span></summary><div class="fold-in">${phraseList(SPEAK_START)}</div></details>
    <details class="fold plan"><summary><span>Якщо треба подумати</span></summary><div class="fold-in">${phraseList(SPEAK_TIME)}</div></details>
    <details class="fold plan"><summary><span>Якщо не зрозуміли</span></summary><div class="fold-in">${phraseList(RESCUE)}</div></details>
    <div class="btnrow"><button class="btn primary big" data-act="guide-test:speak">${ic('target')} Тест: фрази для розмови</button><button class="btn big" data-act="deck:sphr">${ic('dict')} Картки</button></div>`, { title: 'Говоріння' });
}
const choiceQ = (q, right, w1, w2, ex, tag) => ({ type: 'choice', q: esc(q).replace('___', '<span class="gap">___</span>'), o: [right, w1, w2], ex: esc(ex || ''), tag });
function guideTest(kind) {
  let items;
  if (kind === 'link') items = shuffle(LINK_Q).slice(0, 8).map(x => choiceQ(x[0], x[1], x[2], x[3], x[4], 'Сполучні слова'));
  else if (kind === 'write') items = shuffle(WRITE_Q).slice(0, 4).map(x => choiceQ(x[0], x[1], x[2], x[3], x[4], 'Лист')).concat(shuffle(LINK_Q).slice(0, 3).map(x => choiceQ(x[0], x[1], x[2], x[3], x[4], 'Сполучні слова')));
  else items = shuffle(SPEAK_START.concat(SPEAK_TIME, RESCUE)).slice(0, 7).map((p, i, arr) => {
    const others = shuffle(SPEAK_START.concat(SPEAK_TIME, RESCUE).filter(x => x !== p)).slice(0, 2);
    return { type: 'choice', q: `Як сказати литовською: <b>«${esc(p[1])}»</b>?`, o: [p[0], others[0][0], others[1][0]], tag: 'Фрази для розмови', say: p[0].replace(/…/g, '') }; });
  runQuiz({ title: { link: 'Сполучні слова', write: 'Як писати лист', speak: 'Фрази для розмови' }[kind], items, noLog: false });
}

/* ---------- Письмо: зразок + шпаргалка + тест ---------- */
function openWriting(id) {
  const w = WRITING.find(x => x.id === id); if (!w) return;
  const anketa = w.kind === 'anketa';
  openSheet(`<p class="eyebrow">Письмо · ${esc(w.ua)}</p><h1 class="lt">${esc(w.title)}</h1>
    <div class="taskbox lt">${esc(w.task)}</div>
    ${w.points ? `<p class="small"><b>Обов’язково згадати:</b></p><div class="chips">${w.points.map(p => `<span class="chip lt">${esc(p)}</span>`).join('')}</div>` : ''}
    <details class="fold plan"><summary><span>${ic('read')} Шпаргалка до цього завдання</span></summary><div class="fold-in">
      ${anketa ? `<ul class="phr">${w.fields.map(f => `<li><span><b class="lt">${esc(f)}</b><small>${esc(FIELD_UA[f] || '')}</small></span></li>`).join('')}</ul>`
        : `<ol class="plan5 compact">${WRITE_PLAN.map((s, i) => `<li><span class="pn">${i + 1}</span><span><b>${s.ua}</b><small class="lt">${esc((i === 2 ? w.phrases : s.ph.map(p => p[0])).slice(0, 3).join(' · '))}</small></span></li>`).join('')}</ol>`}
      ${anketa ? `<p class="small"><b>Корисні фрази:</b></p><ul class="small">${w.phrases.map(p => `<li class="lt">${esc(p)}</li>`).join('')}</ul>` : ''}
    </div></details>
    <details class="fold plan"><summary><span>${ic('pen')} Зразок відповіді</span></summary><div class="fold-in">
      <div class="ltext lt">${markLinkers(w.model).replace(/\n/g, '<br>')}</div>
      ${anketa ? '' : '<p class="fine">Жовтим — сполучні слова. Саме вони роблять текст зв’язним.</p>'}
    </div></details>
    <details class="fold plan"><summary><span>${ic('pen')} Написати самому (за бажанням)</span></summary><div class="fold-in">
      <textarea id="wtext" class="ltin" rows="7" placeholder="${anketa ? 'Kodėl norite lankyti kursus?' : 'Labas, …!'}"></textarea>${ltBar('wtext')}
      <p class="wc" id="wc">0 слів</p>
      <ul class="checks small">${(w.points || []).concat(anketa ? ['повні речення', 'літери ą č ę ė į š ų ū ž'] : ['привітання і підпис', '2–3 сполучні слова (nes, todėl, bet…)', '50–80 слів']).map(p => `<li><label><input type="checkbox"> <span>${esc(p)}</span></label></li>`).join('')}</ul>
    </div></details>
    <button class="btn primary big" data-act="w-test:${id}">${ic('target')} Тест до цього завдання</button>`, { title: 'Письмо' });
  const t = $('#wtext'); if (t) { const upd = () => { const n = t.value.trim() ? t.value.trim().split(/\s+/).length : 0; $('#wc').textContent = `${n} ${plural(n, 'слово', 'слова', 'слів')}`; }; t.addEventListener('input', upd); }
}
function writingTest(id, fromTask) {
  const w = WRITING.find(x => x.id === id); if (!w) return;
  let items = [];
  if (w.kind === 'anketa') {
    const fs = w.fields.filter(f => FIELD_UA[f]);
    items = shuffle(fs).slice(0, 6).map(f => { const o = shuffle(fs.filter(x => x !== f)).slice(0, 2);
      return { type: 'choice', q: `Що писати в полі <b class="lt">«${esc(f)}»</b>?`, o: [FIELD_UA[f], FIELD_UA[o[0]], FIELD_UA[o[1]]], tag: 'Анкета' }; });
  } else {
    const words = LINKERS.flatMap(l => l[0].split(' / '));
    const sents = w.model.replace(/\n/g, ' ').split(/(?<=[.!?])\s+/);
    sents.forEach(s => { const hit = words.find(lw => new RegExp(`(^|[\\s,])${lw}(?=[\\s,])`, 'i').test(s)); if (!hit || items.length >= 4) return;
      const blank = s.replace(new RegExp(`(^|[\\s,])${hit}(?=[\\s,])`, 'i'), '$1___');
      const opts = LINK_WRONG[hit.toLowerCase()] || ['deja', 'pavyzdžiui'];
      items.push(choiceQ(blank, /^[A-ZĄČĘĖĮŠŲŪŽ]/.test(s.trim()) && s.trim().toLowerCase().startsWith(hit.toLowerCase()) ? hit[0].toUpperCase() + hit.slice(1) : hit, opts[0], opts[1], 'Речення зі зразка.', 'Зразок листа')); });
    items = items.concat(shuffle(WRITE_Q).slice(0, 6 - Math.min(items.length, 4)).map(x => choiceQ(x[0], x[1], x[2], x[3], x[4], 'Лист')));
  }
  runQuiz({ title: w.title, items, onFinish(res) { const pc = Math.round(100 * res.filter(x => x.ok).length / res.length);
    S.write[id] = { score: Math.round(pc / 10), date: todayStr() }; markDone('skill', 15); return ''; } });
}

/* ---------- Говоріння: формула + зразок + тест ---------- */
function openSpeaking(id) {
  const s = SPEAKING.find(x => x.id === id); if (!s) return;
  const parts = s.a.split(/(?<=[.!?])\s+/).filter(Boolean);
  openSheet(`<p class="eyebrow">Говоріння · питання екзаменатора</p>
    <div class="speakq"><button class="iconbtn lg" data-act="say" data-text="${esc(s.q)}" aria-label="Послухати питання">${ic('speaker')}</button><div><h1 class="lt">${esc(s.q)}</h1><p class="muted">${esc(s.ua)}</p></div></div>
    <ol class="steps small"><li>Послухайте питання.</li><li>Скажіть відповідь <b>уголос</b> за формулою 1‑2‑3.</li><li>Відкрийте зразок і порівняйте.</li></ol>
    <ol class="f123 mini">${SPEAK_PLAN.map(p => `<li><span class="pn">${p.n}</span><span><b>${p.ua}</b></span></li>`).join('')}</ol>
    <details class="fold plan"><summary><span>${ic('speaker')} Зразок відповіді</span></summary><div class="fold-in">
      <ol class="f123">${parts.map((p, i) => `<li><span class="pn">${Math.min(i + 1, 3)}</span><span class="lt txt">${markLinkers(p).replace(/\[([^\]]+)\]/g, '<em class="slot">$1</em>')}</span></li>`).join('')}</ol>
      <p class="fine">У дужках — підставте своє.</p>
      <button class="btn ghost" data-act="say" data-text="${esc(s.a.replace(/[\[\]]/g, ''))}">${ic('speaker')} Послухати зразок</button>
    </div></details>
    <button class="btn primary big" data-act="s-test:${id}">${ic('target')} Тест до цього питання</button>`, { title: 'Говоріння' });
}
function speakingTest(id) {
  const s = SPEAKING.find(x => x.id === id); if (!s) return;
  const clean = a => a.replace(/\[([^\]]+)\]/g, '$1');
  const pickQ = q => { const o = shuffle(SPEAKING.filter(x => x !== q)).slice(0, 2);
    return { type: 'choice', q: `Екзаменатор питає: <b class="lt">«${esc(q.q)}»</b><br><small>${esc(q.ua)}</small><br>Яка відповідь підходить?`, o: [clean(q.a), clean(o[0].a), clean(o[1].a)], tag: 'Говоріння', say: q.q }; };
  const items = [pickQ(s)].concat(shuffle(SPEAKING.filter(x => x !== s)).slice(0, 2).map(pickQ),
    shuffle(SPEAK_START.concat(SPEAK_TIME)).slice(0, 2).map(p => { const o = shuffle(SPEAK_START.concat(SPEAK_TIME, RESCUE).filter(x => x !== p)).slice(0, 2);
      return { type: 'choice', q: `Як сказати литовською: <b>«${esc(p[1])}»</b>?`, o: [p[0], o[0][0], o[1][0]], tag: 'Фрази для розмови' }; }));
  runQuiz({ title: 'Говоріння', items, onFinish() { S.speak[id] = (S.speak[id] || 0) + 1; markDone('skill', 10); return ''; } });
}

/* ---------- Дії ---------- */
function learnAct(a, arg, t, fromTask) {
  switch (a) {
    case 'deck': {
      /* колода «знімається» з місця й перевертається, потім відкривається сесія */
      if (t.classList.contains('deck') && !matchMedia('(prefers-reduced-motion: reduce)').matches) { t.classList.add('opening'); setTimeout(() => { t.classList.remove('opening'); openDeck(arg, fromTask); }, 380); }
      else openDeck(arg, fromTask);
      return true; }
    case 'card-flip': { if (t.dataset.moved) { delete t.dataset.moved; return true; } if (!CS) return true; CS.flipped = !CS.flipped; t.classList.toggle('flip', CS.flipped); document.querySelector('.cs-btns')?.classList.toggle('wait', !CS.flipped); return true; }
    case 'card-grade': gradeCard(t.dataset.ok === '1'); return true;
    case 'card-rev': S.cardRev = !S.cardRev; save(); CS.flipped = false; renderCard(); return true;
    case 'guide': openGuide(arg); return true;
    case 'guide-test': guideTest(arg); return true;
    case 'w-test': writingTest(arg); return true;
    case 's-test': speakingTest(arg); return true;
  }
  return false;
}
