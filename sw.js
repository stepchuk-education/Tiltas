/* Офлайн-режим Tiltas: зберігає файли застосунку, щоб він відкривався без інтернету.
   Після зміни файлів збільште номер версії, щоб телефони отримали оновлення. */
const VERSION = 'tiltas-v8';
const FILES = ['./', 'index.html', 'lang.js', 'konst.js', 'exams.js', 'app.js', 'mascot.js', 'pet-rig.js', 'chatai.js', 'extra.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'pet/main.webp', 'pet/main-big.webp', 'pet/calm.webp', 'pet/joy2.webp', 'pet/joy3.webp', 'pet/happiness.webp', 'pet/sad.webp', 'pet/hurt.webp', 'pet/despair.webp', 'pet/annoyed.webp', 'pet/content.webp', 'pet/joy1.webp', 'pet/excited.webp'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Спершу мережа (щоб бачити свіжу версію), без мережі — збережена копія. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
