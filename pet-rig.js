/* ===================== Tiltas: живий Pūkas (відео) =====================
   Короткі відео (pet/vid/*.mp4) зроблені так: верхня половина кадру — кольори, нижня — прозорість.
   Ми малюємо їх у WebGL, тож Pūkas стоїть на будь-якому фоні без прямокутника.
   Pūkas один: те саме полотно переходить між головним екраном і вправами.
   Якщо відео не можуть грати (старий телефон, режим енергозбереження) — лишається картинка. */
const PET_CLIPS = { idle: 'pet/vid/idle.mp4', think: 'pet/vid/think.mp4', joy: 'pet/vid/joy.mp4', cheer: 'pet/vid/cheer.mp4', bliss: 'pet/vid/bliss.mp4', angry: 'pet/vid/angry.mp4', sad: 'pet/vid/sad.mp4' };
const PET_SAY = {
  pet:  ['Murrr… Ačiū!', 'Муррр… Дякую!'],
  tap:  [['Hi hi!', 'Хі-хі!'], ['Labas!', 'Привіт!'], ['Cha cha, kutena!', 'Ха-ха, лоскотно!'], ['Malonu!', 'Приємно!']],
};
const VS2 = `attribute vec2 a; varying vec2 v; void main(){ v=vec2(a.x, 1.0-a.y); gl_Position=vec4(a*2.0-1.0,0.0,1.0); }`;
const FS2 = `precision mediump float; varying vec2 v; uniform sampler2D t0, t1; uniform float mixv;
vec4 px(sampler2D t){ vec3 c=texture2D(t, vec2(v.x, v.y*0.5)).rgb; float al=texture2D(t, vec2(v.x, 0.5+v.y*0.5)).r; al=clamp((al-0.03)/0.97,0.0,1.0); return vec4(c*al, al); }
void main(){ vec4 a=px(t0); if(mixv<1.0){ a=mix(px(t1), a, mixv); } gl_FragColor=a; }`;

const Rig = {
  ok: null, canvas: null, gl: null, vids: {}, cur: null, prev: null, mixv: 1, seq: ['idle'], seqI: 0, busy: false, raf: 0,
  host: null, onSay: null, onPet: null, onEnd: null, timers: {}, drag: null,
  init() {
    if (this.ok !== null) return this.ok;
    this.ok = false;
    const c = this.canvas = document.createElement('canvas'); c.className = 'pet-cv'; c.width = c.height = 480;
    const gl = this.gl = c.getContext('webgl', { premultipliedAlpha: true, alpha: true });
    if (!gl) return false;
    const sh = (t, src) => { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, VS2)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, FS2)); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return false;
    gl.useProgram(p); this.prog = p;
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0, 1,0, 0,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(p, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.tex = [0, 1].map(i => { const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, t);
      [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(k => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); return t; });
    gl.uniform1i(gl.getUniformLocation(p, 't0'), 0); gl.uniform1i(gl.getUniformLocation(p, 't1'), 1);
    this.uMix = gl.getUniformLocation(p, 'mixv');
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    this.shelf = document.createElement('div'); this.shelf.className = 'vid-shelf'; document.body.appendChild(this.shelf);
    Object.keys(PET_CLIPS).forEach(n => this.video(n));
    this.bind();
    this.ok = true; return true;
  },
  video(n) {
    if (this.vids[n]) return this.vids[n];
    const v = document.createElement('video');
    v.muted = true; v.defaultMuted = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.setAttribute('muted', ''); v.preload = 'auto'; v.src = PET_CLIPS[n];
    v.addEventListener('ended', () => { if (this.cur !== n) return; if (this.hold && n === 'sad' && !this.busy) return; this.next(); });
    this.shelf.appendChild(v); return (this.vids[n] = v);
  },
  /* Показати в контейнері. mode: 'home' | 'quiz' */
  mount(host, mode) {
    if (!this.init()) return false;
    this.host = host; this.mode = mode; host.appendChild(this.canvas); host.classList.add('live');
    /* сумний настрій: Pūkas синіє і так і стоїть (останній кадр) */
    this.hold = mode === 'home-sad';
    this.setSeq(mode === 'quiz' ? ['think', 'idle'] : this.hold ? ['sad'] : ['idle', 'idle', 'think']);
    if (!this.raf) this.loop();
    return true;
  },
  setSeq(seq) { this.seq = seq; this.seqI = 0; if (!this.busy) this.play(seq[0]); },
  next() {
    if (this.busy) { this.busy = false; const cb = this.onEnd; this.onEnd = null; if (cb) cb(); }
    this.seqI = (this.seqI + 1) % this.seq.length; this.play(this.seq[this.seqI]);
  },
  play(n, opts = {}) {
    const v = this.video(n); if (!v) return;
    if (this.cur && this.cur !== n) { this.prev = this.cur; this.mixv = 0; }
    this.cur = n; try { v.currentTime = 0; } catch (e) {}
    const pr = v.play(); if (pr && pr.catch) pr.catch(() => { this.host && this.host.classList.remove('ready'); this.blocked = true; });
  },
  /* Реакція: грає один раз, потім повертається до звичайного циклу */
  react(n, onEnd) { if (!this.ok) return false; this.busy = true; this.onEnd = onEnd || null; this.play(n); return true; },
  loop() {
    if (!this.canvas || !this.canvas.isConnected) { this.raf = 0; return; }
    this.raf = requestAnimationFrame(() => this.loop());
    const gl = this.gl, v = this.vids[this.cur]; if (!v || v.readyState < 2) return;
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.tex[0]);
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, v); } catch (e) { return; }
    if (this.mixv < 1 && this.prev) { const pv = this.vids[this.prev];
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.tex[1]);
      try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, pv); } catch (e) {}
      this.mixv = Math.min(1, this.mixv + 0.08); }
    gl.viewport(0, 0, this.canvas.width, this.canvas.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(this.uMix, this.mixv); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!this.host.classList.contains('ready')) this.host.classList.add('ready');
  },
  say(lt, ua) { if (this.onSay) this.onSay(lt, ua); },
  bind() {
    const c = this.canvas; c.style.touchAction = 'none';
    if (this.blockedFix) return; this.blockedFix = true;
    document.addEventListener('pointerdown', () => { if (this.blocked) { this.blocked = false; this.play(this.cur || 'idle'); } }, { passive: true });
    c.addEventListener('pointerdown', e => { if (!/^home/.test(this.mode)) return; c.setPointerCapture(e.pointerId); this.drag = { x: e.clientX, y: e.clientY, dist: 0, n: 0, petting: false }; });
    c.addEventListener('pointermove', e => {
      const d = this.drag; if (!d) return;
      d.dist += Math.hypot(e.clientX - d.x, e.clientY - d.y); d.x = e.clientX; d.y = e.clientY;
      if (d.dist > 30 && !d.petting) { d.petting = true; if (!this.busy) this.react('bliss'); this.say(...PET_SAY.pet); if (this.onPet) this.onPet(); }
      if (d.petting && Math.floor(d.dist / 140) > d.n) { d.n = Math.floor(d.dist / 140); this.heart(e); }
    });
    const up = () => { const d = this.drag; if (!d) return; this.drag = null; if (d.petting || this.busy) return;
      this.tapN = (this.tapN || 0) + 1; this.react(this.tapN % 2 ? 'joy' : 'cheer'); this.say(...PET_SAY.tap[this.tapN % PET_SAY.tap.length]); };
    c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
  },
  heart(e) {
    const host = this.host, r = host.getBoundingClientRect(), h = document.createElement('i');
    h.className = 'heart'; h.textContent = '♥';
    h.style.left = (e.clientX - r.left) + 'px'; h.style.top = (e.clientY - r.top) + 'px'; h.style.setProperty('--dx', (Math.random() * 40 - 20) + 'px');
    host.appendChild(h); setTimeout(() => h.remove(), 1200);
  },
};
