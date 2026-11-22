/* Офлайн-режим Tiltas: зберігає файли застосунку, щоб він відкривався без інтернету.
   Після зміни файлів збільште номер версії, щоб телефони отримали оновлення. */
const VERSION = 'tiltas-v22';
const FILES = ['./', 'index.html', 'lang.js', 'konst.js', 'exams.js', 'app.js', 'mascot.js', 'pet-rig.js', 'speech.js', 'learn.js', 'pet/still/calm.webp', 'pet/still/joy.webp', 'pet/still/cheer.webp', 'pet/still/bliss.webp', 'pet/still/angry.webp', 'pet/still/sad.webp', 'extra.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Спершу мережа (щоб бачити свіжу версію), без мережі — збережена копія. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  /* Відео — напряму з мережі: Safari відтворює їх лише з частковими відповідями (Range). */
  if (e.request.headers.has('range') || /\.mp4$/.test(new URL(e.request.url).pathname)) return;
  e.respondWith(
    fetch(e.request.url, { cache: 'no-cache', credentials: 'same-origin' }).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
