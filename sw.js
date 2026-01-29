const CACHE_NAME = 'super-notes-v2';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});

// --- NEW: Background Sync Logic ---
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notes') {
    event.waitUntil(
      // In a real app, you would fetch('/api/sync') here.
      // We will just log to console to prove the trigger works.
      console.log('🔄 Background Sync Triggered: Ready to upload data!')
    );
  }
});
