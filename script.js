if ('Notification' in window) {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Permiso de notificaciones concedido.');
                notifyServiceWorker(); // Intentar enviar la notificación
            } else {
                console.log('Permiso de notificaciones denegado.');
            }
        });
    } else {
        notifyServiceWorker(); // Intentar enviar la notificación si ya se ha concedido el permiso
    }
  }
  
  function toggleMenu() {
      const navLinks = document.getElementById('navbar-links');
      navLinks.classList.toggle('show');
  }
  
  function notifyServiceWorker() {
      navigator.serviceWorker.ready.then(registration => {
          if (registration.active) {
              registration.active.postMessage({ action: 'sendNotification' });
          }
      });
  }
  