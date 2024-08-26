const checkPermission = () => {
    if(!'serviceWorker' in navigator) {
        throw new Error("No soporto el service worker")
    }

    if(!('Notification' in window)) {
        throw new Error("No soporto las notificaciones")
    }
}

const registerSW = async() => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

const requestNotificationPermission = async() => {
    const permission = await Notification.requestPermission();

    if(permission !== 'granted') {
        throw new Error('Permiso denegado');
    }else{
        new Notification("Hola mundo");
    }
}

checkPermission();

const main = async () => {
    checkPermission()
    const registration = await registerSW();
    registration.showNotification("Service Worker");
}

// main();



function toggleMenu() {
    const navLinks = document.getElementById('navbar-links');
    navLinks.classList.toggle('show');
}


function openModal(formType) {
    var modal = document.getElementById("modal");
    var loginForm = document.getElementById("login-form");
    var registerForm = document.getElementById("register-form");

    if (formType === 'login') {
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
    } else if (formType === 'register') {
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
    }

    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}
