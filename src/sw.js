var currentCacheName = 'my-Cache';
var filesToCache = [
	'./',
	'./index.html',
	'./App.js',
	'./App.css',
	'./index.js',
	'./MapContainer.js',

];
self.addEventListener('install', function(event) {
	 event.waitUntil(
        caches.open(currentCacheName).then(function(cache) {
            console.log('cache opened');
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener('activate', function(event) {
    console.log('sw activated');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            /*return a function to delete old caches */
            return Promise.all(cacheNames.map(function(cacheName) {
                if (cacheName !== currentCacheName) {
                    return caches.delete(cacheName);
                }
            }));
        })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            /*If the event.request match anything in the cache, return it*/
            if (response) {
                return response;
            /* If the event.request does not match, then it will get 
                from the network and cloned into the cache*/
            } else {
                return fetch(event.request).then(function(res) {
                    return caches.open(currentCacheName).then(function(cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
                    });
                });
            }
        })
    );
});