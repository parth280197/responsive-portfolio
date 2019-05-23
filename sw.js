const currentCache = "portfolio-cache-v1";
const itemsToCache = [
  'banner.png',
  'C.png',
  'css.png',
  'fun-icon.png',
  'html.png',
  'index.html',
  'Java.png',
  'logo.png',
  'style.css',
  'sw-init.js',
  'manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(currentCache).then(function(cache) {
      return cache.addAll(itemsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName != currentCache;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(currentCache).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});