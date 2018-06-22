importScripts('cache-polyfill.js');
const expectedCaches = ['resto-review-v1'];
// asdaasdf
console.log('tst')
self.addEventListener('install', event => {
 event.waitUntil(
   caches.open('resto-review-v1').then( cache => {
     return cache.addAll([
       '/',
       '/index.html',
       '/css/styles.css',
       '/js/main.js'
     ])
    //.then(() => self.skipWaiting());
   })
 );
});

self.addEventListener('activate', event => {

  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('new cache is now ready to handle fetches!');
    })
  );
});



self.addEventListener('fetch', event => {

  console.log(event.request);

  event.respondWith(

    caches.match(event.request).then( response => {

    return response || fetch(event.request);

    })

  );

});