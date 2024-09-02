self.addEventListener('install', event => {
    console.log('Instalado');
    event.waitUntil(
        caches.open('mi-cache-v1').then(cache => {
            return cache.addAll([  
                '/',              
                '/css/style.css',
                '/src/icons/movil.png',
                '/src/icons/pc.png',
                '/src/icons/alert.png',
                '/src/icons/promo.png',                
                '/src/images/1.jpg',
                '/src/images/logo.png',
                '/src/images/principal.jpg',
                '/src/screenshots/s1.png',
                '/src/screenshots/s2.png',
                '/app.js',
                '/index.html',                
                '/manifest.json',
                '/script.js',                                                              
            ]);
        })
    );
});

self.addEventListener('activate', function(event){ // Cambiado "active" a "activate"
    console.log('Activo');
    const cacheWhiteList = ['mi-cache-v1'];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if(cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim(); // Removido "this"
});

self.addEventListener('fetch', function(event){
    console.log('Fetch: ', event.request.url);
    event.respondWith(
        caches.match(event.request).then(res => {
            return res || fetch(event.request);
        }).catch(() => caches.match('/index.html')) // Removido "this"
    );
});
  

self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'sendNotification') {
        self.registration.showNotification('Promocion del Dia', {
                body: 'Solo por hoy tendremos buffet por solo $169 por persona adulta, niños $119.',
                icon: 'src/icons/promo.png',
                badge: 'src/icons/alert.png'
        });
    }
});
