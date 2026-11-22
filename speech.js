/* ===================== Розпізнавання мовлення браузером (lt-LT) ===================== */
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

