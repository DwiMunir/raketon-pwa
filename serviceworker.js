var CACHE_NAME = 'raketon-v1.0.2';
var urlsToCache = [
    '/',
    '/?category=travel',
    '/?category=natural',
    '/?category=car',
    '/?category=motorcycle',
    '/assets/css/tailwind.css',
    '/assets/js/jquery.min.js',
    '/assets/js/main.js',
    '/assets/fonts/Dosis-Bold.ttf',
    '/assets/fonts/Dosis-ExtraBold.ttf',
    '/assets/fonts/Dosis-ExtraLight.ttf',
    '/assets/fonts/Dosis-Light.ttf',
    '/assets/fonts/Dosis-Medium.ttf',
    '/assets/fonts/Dosis-Regular.ttf',
    '/assets/fonts/Dosis-SemiBold.ttf',
    '/data.json',
    '/assets/images/image-1.jpg',
    '/assets/images/image-2.jpg',
    '/assets/images/image-3.jpg',
    '/assets/images/image-4.jpg',
    '/assets/images/image-5.jpg',
    '/assets/images/image-6.jpg',
    '/assets/images/image-7.jpg',
    '/assets/images/image-8.jpg',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    let request = event.request;
    let url = new URL(request.url);

    // console.log('url origin: ', url.href);
    // console.log('request origin', request.url);
    //Memisahkan request API dan assets internal
    event.respondWith(
        caches.match(request).then((response) => {
            return response || fetch(request)
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName != CACHE_NAME
                }).map(function (cacheName) {
                    return caches.delete(cacheName)
                })
            );
        })
    );
});