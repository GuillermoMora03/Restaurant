if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(registration => {
        console.log('SW Funcionando: ', registration);
    })
    .catch(error => {
        console.log('Fallo en el registro del SW: ', error);
    });
}

// Enviar notificación después de la instalación
window.addEventListener('appinstalled', () => {
    console.log('PWA instalada');
    notifyServiceWorker(); // Notificar al Service Worker después de la instalación
});

function notifyServiceWorker() {
    navigator.serviceWorker.ready.then(registration => {
        if (registration.active) {
            registration.active.postMessage({ action: 'sendNotification' });
        }
    });
}
