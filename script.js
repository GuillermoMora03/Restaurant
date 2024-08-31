if ('Notification' in window && navigator.serviceWorker) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Permiso de notificaciones concedido.');
      subscribeUserToPush();
    } else {
      console.log('Permiso de notificaciones denegado.');
    }
  });
}

function subscribeUserToPush() {
  navigator.serviceWorker.ready.then(function(registration) {
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('BH1rT6Y-59sms3YT13VY4umsgzBOGvuIjignGHLpz77mjCr0GUkic_UcgJZJ-MugTmV_LKtWG4f2PPy_oDxSfE4')
    };

    return registration.pushManager.subscribe(subscribeOptions);
  })
  .then(function(pushSubscription) {
    console.log('Usuario suscrito:', JSON.stringify(pushSubscription));
    // Aquí podrías enviar la suscripción a tu servidor
  })
  .catch(function(error) {
    console.error('Fallo en la suscripción:', error);
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function toggleMenu() {
    const navLinks = document.getElementById('navbar-links');
    navLinks.classList.toggle('show');
}

// Simular una notificación push desde el frontend
navigator.serviceWorker.ready.then(function(registration) {
  registration.showNotification('Promocion del Dia', {
    body: 'Solo por hoy tendremos buffete por solo $169 por persona adulta, niños $119.',
    icon: 'src/icons/promo.png',
    badge: 'src/icons/alert.png',
  });
});
