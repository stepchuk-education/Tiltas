/* ===================== Tiltas: живий Pūkas =====================
   Одна картинка (pet/rig.webp) деформується сіткою у WebGL: дихання, вушка, лапки, нахил.
   Очі, повіки, рот і рум'янець малюються поверх у шейдері, тож він кліпає, дивиться навколо,
   мружиться від задоволення. Реагує на дотики: вушка, голова, живіт, ніжки, погладжування. */
const RIG_SRC = 'pet/rig.webp';
const RIG = {
  eyeL: [0.459, 0.381, 0.079, 0.070], eyeR: [0.628, 0.379, 0.077, 0.071], pupil: 0.036, conv: 0.42,
  mouth: [0.539, 0.487], cheekL: [0.395, 0.455], cheekR: [0.700, 0.452],
  earPivL: [0.34, 0.15], earPivR: [0.66, 0.14], pawL: [0.227, 0.672], pawR: [0.805, 0.664], pawR0: 0.072,
};
const VS = `
attribute vec2 a; uniform float uBreath, uSquash, uLean, uEarL, uEarR, uRuffle, uTime, uHop;
uniform float uPart, uK, uAng, uSide; uniform vec2 uC, uT, uTouch; varying vec2 v;
vec2 rot(vec2 p, vec2 c, float an){ vec2 d=p-c; float s=sin(an), k=cos(an); return c+vec2(k*d.x-s*d.y, s*d.x+k*d.y); }
void main(){
  vec2 p; float wb;
  if(uPart>0.5){
    float R=${RIG.pawR0}; vec2 d=(a-0.5)*2.0*R; v=uC+d;
    vec2 pc=mix(uC, uT, uK)+vec2(uSide*0.05, -0.02)*sin(uK*3.14159);
    p=pc+rot(d, vec2(0.0), uAng);
    wb=1.0;
  } else {
    p=a; v=a; wb=smoothstep(0.93,0.80,a.y);
    float wl=smoothstep(0.40,0.25,a.x)*smoothstep(0.66,0.42,a.y);
    float wr=smoothstep(0.60,0.75,a.x)*smoothstep(0.66,0.42,a.y);
    p=rot(p, vec2(${RIG.earPivL}), uEarL*wl);
    p=rot(p, vec2(${RIG.earPivR}), -uEarR*wr);
    float dt=distance(a,uTouch); float ru=uRuffle*exp(-dt*dt/0.02);
    p+=ru*0.011*vec2(sin(uTime*31.0+a.y*70.0), cos(uTime*27.0+a.x*70.0));
  }
  p.y=0.87+(p.y-0.87)*(1.0+0.024*uBreath*wb);
  p.x=0.5+(p.x-0.5)*(1.0+0.012*uBreath*wb);
  p.x+=(0.87-p.y)*uLean*wb;
  p.y=0.95+(p.y-0.95)*(1.0-uSquash); p.x=0.5+(p.x-0.5)*(1.0+uSquash*0.7);
  p.y-=uHop;
  vec2 s=vec2(0.08+p.x*0.84, 0.14+p.y*0.84);
  gl_Position=vec4(s.x*2.0-1.0, 1.0-s.y*2.0, 0.0, 1.0);
}`;
const FS = `
precision mediump float; varying vec2 v; uniform sampler2D uTex;
uniform vec2 uLook; uniform float uBlink, uHappy, uMouth, uBlush, uTilt, uPupil, uPartF, uKL, uKR; uniform vec2 uCF; uniform vec4 uTint;
vec3 eye(vec3 col, vec2 uv, vec4 e, float side, inout float done){
  vec2 q=(uv-e.xy)/e.zw; float d=length(q);
  float cl=smoothstep(0.45,1.0,uBlink); float R=1.0+0.18*cl;
  if(d>R) return col;
  vec3 c=col;
  if(d<1.0){
    vec3 b=mix(vec3(1.0), vec3(0.80,0.84,0.93), smoothstep(0.35,1.0,d));
    b*=1.0-0.20*smoothstep(-0.1,-1.0,q.y);
    vec2 pc=e.xy+vec2((uLook.x+side*${RIG.conv})*e.z*0.52, uLook.y*e.w*0.45);
    float pr=${RIG.pupil}*uPupil; float pd=length(uv-pc)/pr;
    vec3 pcol=mix(vec3(0.04,0.06,0.15), vec3(0.20,0.27,0.50), smoothstep(0.45,0.95,pd));
    pcol=mix(pcol, vec3(0.03,0.04,0.10), smoothstep(0.90,0.99,pd));
    float h1=length(uv-pc-vec2(-0.32,-0.36)*pr)/(pr*0.24); float h2=length(uv-pc-vec2(0.34,-0.30)*pr)/(pr*0.13);
    pcol=mix(pcol, vec3(1.0), clamp((1.0-smoothstep(0.7,1.0,h1))+(1.0-smoothstep(0.65,1.0,h2)),0.0,1.0));
    b=mix(b, pcol, 1.0-smoothstep(0.97,1.04,pd));
    c=mix(col, b, smoothstep(1.0,0.93,d));
  }
  float k=mix(0.30,-0.70,uHappy);
  float lid=-1.15+2.3*uBlink+k*(q.x*q.x-0.5)*uBlink+uTilt*q.x*side;
  vec3 fur=texture2D(uTex, uv-vec2(0.0, e.w*(1.7+uBlink))).rgb;
  fur=mix(fur, vec3(0.50,0.64,0.92), 0.45);
  fur*=mix(1.0,0.80,smoothstep(lid-0.35,lid,q.y));
  float lm=1.0-smoothstep(lid-0.05,lid+0.03,q.y);
  float reach=d<1.0 ? 1.0 : cl*(1.0-smoothstep(1.0,R,d));
  c=mix(c, fur, lm*reach);
  if(uBlink>0.75){ float yl=0.12+k*0.9*(q.x*q.x-0.45); float ln=(1.0-smoothstep(0.035,0.09,abs(q.y-yl)))*smoothstep(0.75,0.95,uBlink); c=mix(c, vec3(0.10,0.13,0.30), ln*0.85*smoothstep(1.02,0.85,d)); }
  done=1.0;
  return c;
}
float pawM(vec2 c){ return 1.0-smoothstep(0.78,1.0,distance(v,c)/${RIG.pawR0}); }
void main(){
  vec4 t=texture2D(uTex, v); vec3 col=t.rgb; float dn=0.0;
  if(uPartF>0.5){ float m=pawM(uCF); float l=dot(col, vec3(0.3,0.59,0.11)); col=mix(col, uTint.rgb*(l*1.25), uTint.a); gl_FragColor=vec4(col*t.a*m, t.a*m); return; }
  float mL=pawM(vec2(${RIG.pawL}))*clamp(uKL*4.0,0.0,1.0), mR=pawM(vec2(${RIG.pawR}))*clamp(uKR*4.0,0.0,1.0);
  if(mL>0.0) col=mix(col, texture2D(uTex, v+vec2(0.11,-0.02)).rgb, mL);
  if(mR>0.0) col=mix(col, texture2D(uTex, v+vec2(-0.11,-0.02)).rgb, mR);
  col=eye(col, v, vec4(${RIG.eyeL}), 1.0, dn);
  col=eye(col, v, vec4(${RIG.eyeR}), -1.0, dn);
  vec2 mq=(v-vec2(${RIG.mouth}))/vec2(0.030, 0.026*uMouth+0.001);
  float md=length(mq);
  if(uMouth>0.02 && md<1.0 && mq.y>-0.35){ vec3 m=mix(vec3(0.26,0.07,0.16), vec3(0.93,0.50,0.60), smoothstep(0.25,1.0,mq.y)*smoothstep(0.3,0.8,uMouth)); col=mix(col, m, smoothstep(1.0,0.85,md)); }
  float b1=distance(v, vec2(${RIG.cheekL}))/0.055, b2=distance(v, vec2(${RIG.cheekR}))/0.055;
  col=mix(col, vec3(1.0,0.55,0.66), uBlush*0.45*((1.0-smoothstep(0.2,1.0,b1))+(1.0-smoothstep(0.2,1.0,b2))));
  float l=dot(col, vec3(0.3,0.59,0.11)); col=mix(col, uTint.rgb*(l*1.25), uTint.a);
  gl_FragColor=vec4(col*t.a, t.a);
}`;

class Spring { constructor(v = 0, k = 120, d = 14) { this.v = v; this.t = v; this.vel = 0; this.k = k; this.d = d; }
  step(dt) { const f = (this.t - this.v) * this.k - this.vel * this.d; this.vel += f * dt; this.v += this.vel * dt; return this.v; } }

const Rig = {
  canvas: null, gl: null, ok: false, img: null, alpha: null, raf: 0, mood: 'happy', onSay: null,
  P: {}, timers: {}, busy: 0, strokes: 0, lastMove: 0, drag: null, t0: performance.now(),
  init() {
    if (this.failed) return false;
    if (this.canvas) return this.ok;
    const c = this.canvas = document.createElement('canvas'); c.className = 'rig';
    const gl = this.gl = c.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: true });
    if (!gl) { this.canvas = null; this.failed = true; return false; }
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(s); return s; };
    try {
      const pr = this.prog = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw gl.getProgramInfoLog(pr); gl.useProgram(pr);
    } catch (e) { console.warn(e); this.canvas = null; this.failed = true; return false; }
    const N = 56, pts = [], idx = [];
    for (let y = 0; y <= N; y++) for (let x = 0; x <= N; x++) pts.push(x / N, y / N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const i = y * (N + 1) + x; idx.push(i, i + 1, i + N + 1, i + 1, i + N + 2, i + N + 1); }
    this.nIdx = idx.length;
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pts), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(this.prog, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.u = {}; ['uPart','uPartF','uCF','uK','uAng','uSide','uC','uT','uKL','uKR','uBreath','uSquash','uLean','uEarL','uEarR','uRuffle','uTime','uHop','uTouch','uTex','uLook','uBlink','uHappy','uMouth','uBlush','uTilt','uPupil','uTint'].forEach(n => this.u[n] = gl.getUniformLocation(this.prog, n));
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const P = this.P;
    ['squash','lean','earL','earR','armL','armR','ruffle','hop','lookX','lookY','blink','happy','mouth','blush','tilt'].forEach(n => P[n] = new Spring(0));
    P.blink.k = 900; P.blink.d = 50; P.lookX.k = P.lookY.k = 260; P.lookX.d = P.lookY.d = 22; P.pupil = new Spring(1);
    P.squash.k = 320; P.squash.d = 9; P.hop.k = 260; P.hop.d = 12; P.armL.k = P.armR.k = 90; P.armL.d = P.armR.d = 14;
    this.img = new Image(); this.img.onload = () => {
      const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const a = document.createElement('canvas'); a.width = a.height = 128; const x = a.getContext('2d'); x.drawImage(this.img, 0, 0, 128, 128);
      this.alpha = x.getImageData(0, 0, 128, 128).data; this.loaded = true; c.classList.add('ready');
    };
    this.img.src = RIG_SRC;
    this.bind(); this.ok = true; return true;
  },
  /* Вставити полотно в контейнер (зберігає стан між перемальовуваннями) */
  mount(host, mood) {
    if (!this.init()) return false;
    host.appendChild(this.canvas); this.setMood(mood);
    if (!this.raf) { this.last = performance.now(); this.loop(); this.schedule(); }
    return true;
  },
  setMood(m) {
    this.mood = m; const P = this.P, sad = /^sad/.test(m), lvl = m === 'sad3' ? 3 : m === 'sad2' ? 2 : 1;
    this.rest = {
      blink: sad ? 0.28 + lvl * 0.06 : m === 'angry' ? 0.3 : 0, earL: sad ? -0.18 - lvl * 0.05 : 0, earR: sad ? -0.18 - lvl * 0.05 : 0,
      lookY: sad ? 0.55 : 0, tilt: m === 'angry' ? 0.55 : sad ? -0.35 : 0, happy: /proud|done|joy/.test(m) ? 0.6 : 0,
      mouth: /proud|done/.test(m) ? 0.7 : 0, blush: /proud|done|joy/.test(m) ? 0.5 : 0,
    };
    this.tint = m === 'angry' ? [1.0, 0.55, 0.62, 0.45] : sad ? [0.42, 0.55, 0.95, 0.12 * lvl] : /done/.test(m) ? [0.92, 0.95, 1.0, 0.25] : [1, 1, 1, 0];
    for (const k in this.rest) if (P[k]) P[k].t = this.rest[k];
  },
  rel(k) { if (this.P[k]) this.P[k].t = this.rest[k] || 0; },
  say(lt, ua) { if (this.onSay) this.onSay(lt, ua); },
  loop() {
    const now = performance.now(), dt = Math.min(0.033, (now - this.last) / 1000); this.last = now;
    if (!this.canvas.isConnected) { this.raf = 0; clearTimeout(this.timers.idle); clearTimeout(this.timers.blink); return; }
    this.raf = requestAnimationFrame(() => this.loop());
    const gl = this.gl, c = this.canvas, dpr = Math.min(2, devicePixelRatio || 1);
    const w = Math.round(c.clientWidth * dpr), h = Math.round(c.clientHeight * dpr);
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    if (!this.loaded) return;
    gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    const t = (now - this.t0) / 1000, P = this.P, u = this.u, sad = /^sad/.test(this.mood);
    for (const k in P) P[k].step(dt);
    const br = Math.sin(t * (sad ? 1.5 : 2.1));
    gl.uniform1f(u.uBreath, br); gl.uniform1f(u.uTime, t);
    gl.uniform1f(u.uSquash, P.squash.v); gl.uniform1f(u.uLean, P.lean.v + Math.sin(t * 0.7) * 0.012);
    gl.uniform1f(u.uEarL, P.earL.v + Math.sin(t * 1.3) * 0.02); gl.uniform1f(u.uEarR, P.earR.v + Math.sin(t * 1.1 + 1) * 0.02);
    const kL = Math.max(0, P.armL.v), kR = Math.max(0, P.armR.v);
    gl.uniform1f(u.uKL, kL); gl.uniform1f(u.uKR, kR); gl.uniform1f(u.uRuffle, P.ruffle.v); gl.uniform1f(u.uHop, P.hop.v);
    gl.uniform2f(u.uTouch, this.touch ? this.touch[0] : -1, this.touch ? this.touch[1] : -1);
    gl.uniform2f(u.uLook, Math.max(-1, Math.min(1, P.lookX.v)), Math.max(-1, Math.min(1, P.lookY.v)));
    gl.uniform1f(u.uBlink, Math.max(0, Math.min(1, P.blink.v))); gl.uniform1f(u.uHappy, Math.max(0, Math.min(1, P.happy.v)));
    gl.uniform1f(u.uMouth, Math.max(0, Math.min(1, P.mouth.v))); gl.uniform1f(u.uBlush, Math.max(0, P.blush.v));
    gl.uniform1f(u.uTilt, P.tilt.v); gl.uniform1f(u.uPupil, P.pupil.v); gl.uniform4f(u.uTint, ...this.tint);
    gl.uniform1i(u.uTex, 0);
    gl.uniform1f(u.uPart, 0); gl.uniform1f(u.uPartF, 0); gl.drawElements(gl.TRIANGLES, this.nIdx, gl.UNSIGNED_SHORT, 0);
    /* лапки: окремі шматочки, що піднімаються над тілом */
    const paw = (k, c, tgt, side, wig) => { if (k < 0.01) return;
      gl.uniform1f(u.uPart, 1); gl.uniform1f(u.uPartF, 1); gl.uniform2f(u.uC, c[0], c[1]); gl.uniform2f(u.uCF, c[0], c[1]); gl.uniform2f(u.uT, tgt[0], tgt[1]); gl.uniform1f(u.uK, k);
      gl.uniform1f(u.uSide, side); gl.uniform1f(u.uAng, -side * 0.9 * k + wig); gl.drawElements(gl.TRIANGLES, this.nIdx, gl.UNSIGNED_SHORT, 0); };
    paw(kL, RIG.pawL, this.tgtL || [0.08, 0.50], -1, this.wigL ? Math.sin(t * 22) * 0.35 : 0);
    paw(kR, RIG.pawR, this.tgtR || [0.93, 0.48], 1, this.wigR ? Math.sin(t * 13) * 0.45 : 0);
    if (this.drag && now - this.lastMove > 260) { P.ruffle.t = 0; }
  },
  /* Розклад «життя»: кліпання, погляд, дрібні дії */
  schedule() {
    const blink = () => { this.blink(); if (Math.random() < 0.2) setTimeout(() => this.blink(), 260); this.timers.blink = setTimeout(blink, 2200 + Math.random() * 3800); };
    this.timers.blink = setTimeout(blink, 1500);
    const idle = () => {
      if (!this.busy && !this.drag) {
        const r = Math.random(), sad = /^sad/.test(this.mood);
        if (r < 0.45) this.look((Math.random() * 2 - 1) * 0.9, (Math.random() * 2 - 1) * 0.6 + (sad ? 0.4 : 0));
        else if (r < 0.55) this.look(0, this.rest.lookY || 0);
        else if (r < 0.68) sad ? this.sigh() : this.wave();
        else if (r < 0.80) this.scratch();
        else if (r < 0.90) this.earFlick();
        else sad ? this.sigh() : this.hop();
      }
      this.timers.idle = setTimeout(idle, 1800 + Math.random() * 2600);
    };
    this.timers.idle = setTimeout(idle, 2500);
  },
  act(ms, fn) { this.busy++; fn(); setTimeout(() => { this.busy--; }, ms); },
  blink() { if (this.drag) return; const P = this.P; P.blink.t = 1; setTimeout(() => this.rel('blink'), 110); },
  look(x, y) { this.P.lookX.t = x; this.P.lookY.t = y; },
  wave() { const P = this.P; this.act(2000, () => { this.tgtR = [0.95, 0.40]; this.wigR = true; P.armR.t = 1; this.look(0.2, -0.1); P.happy.t = 0.4; P.mouth.t = 0.4;
    let i = 0; const w = setInterval(() => { P.armR.t = i % 2 ? 1 : 0.86; if (++i > 7) { clearInterval(w); P.armR.t = 0; this.wigR = false; this.rel('happy'); this.rel('mouth'); } }, 200); }); },
  scratch() { const P = this.P; this.act(2000, () => { this.tgtL = [0.17, 0.30]; this.wigL = true; P.armL.t = 1; P.lean.t = -0.05; P.earL.t = 0.3; this.look(-0.6, -0.8); P.blink.t = 0.4;
    setTimeout(() => { P.armL.t = 0; this.wigL = false; P.lean.t = 0; this.rel('earL'); this.rel('blink'); this.look(0, this.rest.lookY || 0); }, 1500); }); },
  earFlick() { const P = this.P, side = Math.random() < 0.5 ? 'earL' : 'earR'; P[side].vel += 9; setTimeout(() => this.rel(side), 160); },
  earsUp() { const P = this.P; this.act(1100, () => { P.earL.t = 0.55; P.earR.t = 0.55; P.pupil.t = 1.15; this.look(0, -0.4);
    setTimeout(() => { this.rel('earL'); this.rel('earR'); P.pupil.t = 1; }, 800); }); },
  hop() { const P = this.P; this.act(900, () => { P.squash.t = 0.06; setTimeout(() => { P.squash.t = 0; P.hop.vel -= 1.6; P.squash.vel -= 1.2; }, 140); }); },
  sigh() { const P = this.P; this.act(1600, () => { P.squash.t = 0.03; P.blink.t = 0.6; this.look(0, 0.8); setTimeout(() => { P.squash.t = 0; this.rel('blink'); }, 1100); }); },
  giggle() { const P = this.P; this.act(1300, () => { P.happy.t = 1; P.blink.t = 1; P.mouth.t = 1; P.blush.t = 1; P.squash.vel += 2.2;
    let i = 0; const w = setInterval(() => { P.lean.t = i % 2 ? 0.04 : -0.04; if (++i > 5) { clearInterval(w); P.lean.t = 0; } }, 110);
    setTimeout(() => { ['happy','blink','mouth','blush'].forEach(k => this.rel(k)); }, 1000); }); },
  pat() { const P = this.P; P.squash.vel += 1.6; P.blink.t = 0.85; P.happy.t = 0.8; P.blush.t = 0.6; setTimeout(() => { ['blink','happy','blush'].forEach(k => this.rel(k)); }, 500); },
  toUV(e) { const r = this.canvas.getBoundingClientRect(); return [((e.clientX - r.left) / r.width - 0.08) / 0.84, ((e.clientY - r.top) / r.height - 0.14) / 0.84]; },
  hit(uv) { if (!this.alpha) return false; const x = Math.floor(uv[0] * 128), y = Math.floor(uv[1] * 128); if (x < 0 || y < 0 || x > 127 || y > 127) return false; return this.alpha[(y * 128 + x) * 4 + 3] > 40; },
  part(uv) { const [x, y] = uv; if (y < 0.55 && (x < 0.30 || x > 0.70)) return 'ear'; if (y > 0.84) return 'feet'; if (y < 0.44) return 'head'; return 'belly'; },
  bind() {
    const c = this.canvas; c.style.touchAction = 'none';
    c.addEventListener('pointerdown', e => { const uv = this.toUV(e); if (!this.hit(uv)) return; c.setPointerCapture(e.pointerId);
      this.drag = { x: e.clientX, y: e.clientY, dist: 0, uv, petting: false }; this.lastMove = performance.now(); });
    c.addEventListener('pointermove', e => {
      const uv = this.toUV(e), P = this.P;
      if (!this.drag) { if (e.pointerType === 'mouse' && !this.busy) this.look((uv[0] - 0.54) * 3, (uv[1] - 0.38) * 3); return; }
      const d = this.drag; d.dist += Math.hypot(e.clientX - d.x, e.clientY - d.y); d.x = e.clientX; d.y = e.clientY;
      this.touch = uv; this.lastMove = performance.now();
      if (d.dist > 24) {
        if (!d.petting) { d.petting = true; this.busy++; if (this.onPet) this.onPet(); }
        P.ruffle.t = 1; P.happy.t = 1; P.blink.t = 1; P.blush.t = 1; P.mouth.t = 0.35; P.earL.t = -0.12; P.earR.t = -0.12;
        P.lean.t = Math.max(-0.06, Math.min(0.06, (uv[0] - 0.5) * 0.2));
        if (Math.floor(d.dist / 260) > (d.n || 0)) { d.n = Math.floor(d.dist / 260); this.strokes++; this.heart(e);
          if (this.strokes % 4 === 0) this.say('Murrr… Ačiū!', 'Муррр… Дякую!'); }
      }
    });
    const up = e => {
      const d = this.drag; if (!d) return; this.drag = null; const P = this.P; P.ruffle.t = 0; this.touch = null; P.lean.t = 0;
      if (d.petting) { this.busy--; P.mouth.t = 0.5; setTimeout(() => { ['happy','blink','blush','mouth','earL','earR'].forEach(k => this.rel(k)); }, 600); return; }
      const p = this.part(d.uv);
      if (p === 'ear') { this.earsUp(); this.say('Klausau!', 'Слухаю!'); }
      else if (p === 'head') { this.pat(); this.say('Malonu!', 'Приємно!'); }
      else if (p === 'feet') { this.giggle(); this.hop(); this.say('Cha cha, kutena!', 'Ха-ха, лоскотно!'); }
      else { this.giggle(); this.say('Hi hi!', 'Хі-хі!'); }
    };
    c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
    c.addEventListener('pointerleave', () => { if (!this.drag) this.look(0, this.rest?.lookY || 0); });
  },
  heart(e) {
    const host = this.canvas.parentElement; if (!host) return; const r = host.getBoundingClientRect();
    const h = document.createElement('i'); h.className = 'heart'; h.textContent = Math.random() < 0.7 ? '♥' : '✦';
    h.style.left = (e.clientX - r.left) + 'px'; h.style.top = (e.clientY - r.top) + 'px'; h.style.setProperty('--dx', (Math.random() * 40 - 20) + 'px');
    host.appendChild(h); setTimeout(() => h.remove(), 1200);
  },
};
