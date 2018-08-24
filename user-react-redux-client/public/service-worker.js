var CACHE_VERSION = 'react-pwa-v1';

self.addEventListener('install', function(event) {
  
  
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function(cache) {
        // The asset-manifest.json contains the names of assets to cache 
        fetch("asset-manifest.json")
          .then(response => {
            return response.json()
          })
          .then(assets => {
          
            cache.addAll(
              [
                "/",
                assets["main.js"],
                assets["main.css"],
                assets["static/media/logo.svg"]
              ]
            );
          })
      })
  );

});
// Serves the cached response for the corresponding request
self.addEventListener('fetch', function(event) {
  
  event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response) return response;
            return fetch(event.request);
        })
  );
  
});

// Delete old cach different from the current version
self.addEventListener("activate", event => {


event.waitUntil(
  caches.keys()
    .then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_VERSION) {
         
          return caches.delete(key);
        }
      }))
    )
);
});