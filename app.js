if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(registration => {
        console.log('SW Funcionando: ', registration);        
    })
    .catch(error =>{
        console.log('Fallo en el registro del SW: ', error);        
    });
} 