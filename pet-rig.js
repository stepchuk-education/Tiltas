/* ===================== Tiltas: живий Pūkas =====================
   Без деформацій: Pūkas ледь помітно дихає і погойдується, а на дотик змінює вираз обличчя —
   плавно перемикаємося на картинки емоцій з папки pet/. Якщо колись будуть відео-анімації,
   їх можна підставити сюди ж. */
const PET_REACT = {
  pet:   { img: 'pet/content.webp',  lt: 'Murrr… Ačiū!',     ua: 'Муррр… Дякую!',   ms: 1600 },
  head:  { img: 'pet/joy1.webp',     lt: 'Malonu!',          ua: 'Приємно!',        ms: 1300 },
  ear:   { img: 'pet/excited.webp',  lt: 'Klausau!',         ua: 'Слухаю!',         ms: 1300 },
  belly: { img: 'pet/joy2.webp',     lt: 'Hi hi!',           ua: 'Хі-хі!',          ms: 1300 },
  feet:  { img: 'pet/joy3.webp', lt: 'Cha cha, kutena!', ua: 'Ха-ха, лоскотно!', ms: 1400 },
};
const Rig = {
  el: null, base: null, face: null, mood: 'happy', onSay: null, onPet: null, timers: {}, drag: null,
  mount(host, mood) {
    this.mood = mood;
    if (!this.el) this.build();
    const src = mood === 'happy' && typeof PET_IMG_BIG !== 'undefined' ? PET_IMG_BIG.happy : (PET_IMG[mood] || PET_IMG.happy);
    if (this.base.getAttribute('src') !== src) this.base.src = src;
    host.appendChild(this.el); host.classList.add('live');
    return true;
  },
  build() {
    const el = this.el = document.createElement('div'); el.className = 'live-pet';
    el.innerHTML = `<div class="lp-body"><img class="lp-base" alt="" draggable="false"><img class="lp-face" alt="" draggable="false"></div>`;
    this.body = el.firstChild; this.base = el.querySelector('.lp-base'); this.face = el.querySelector('.lp-face');
    Object.values(PET_REACT).forEach(r => { const i = new Image(); i.src = r.img; });
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', e => { el.setPointerCapture(e.pointerId); this.drag = { x: e.clientX, y: e.clientY, dist: 0, uv: this.uv(e), n: 0, petting: false }; });
    el.addEventListener('pointermove', e => {
      const d = this.drag; if (!d) return;
      d.dist += Math.hypot(e.clientX - d.x, e.clientY - d.y); d.x = e.clientX; d.y = e.clientY;
      if (d.dist > 30 && !d.petting) { d.petting = true; this.react('pet', true); if (this.onPet) this.onPet(); }
      if (d.petting) { this.body.classList.add('petting'); if (Math.floor(d.dist / 140) > d.n) { d.n = Math.floor(d.dist / 140); this.heart(e); } }
    });
    const up = () => { const d = this.drag; if (!d) return; this.drag = null; this.body.classList.remove('petting');
      if (d.petting) { this.release(900); return; }
      this.react(this.part(d.uv)); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  },
  uv(e) { const r = this.base.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]; },
  part([x, y]) { if (y < 0.5 && (x < 0.3 || x > 0.7)) return 'ear'; if (y > 0.82) return 'feet'; if (y < 0.45) return 'head'; return 'belly'; },
  react(kind, hold) {
    const r = PET_REACT[kind]; if (!r) return;
    clearTimeout(this.timers.face);
    this.face.src = r.img; this.el.classList.add('react');
    this.body.classList.remove('bounce'); void this.body.offsetWidth; this.body.classList.add('bounce');
    if (this.onSay) this.onSay(r.lt, r.ua);
    if (!hold) this.release(r.ms);
  },
  release(ms) { clearTimeout(this.timers.face); this.timers.face = setTimeout(() => this.el.classList.remove('react'), ms); },
  heart(e) {
    const r = this.el.getBoundingClientRect(), h = document.createElement('i');
    h.className = 'heart'; h.textContent = '♥';
    h.style.left = (e.clientX - r.left) + 'px'; h.style.top = (e.clientY - r.top) + 'px'; h.style.setProperty('--dx', (Math.random() * 40 - 20) + 'px');
    this.el.appendChild(h); setTimeout(() => h.remove(), 1200);
  },
};
