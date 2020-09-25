

// self.addEventListener('install', function(e){
//     e.waitUntil(caches.open('pushNotification').then(function(cache){
//         console.log("cahces "+JSON.stringify(cache));
//         return cache.addAll([
//                              '/'
//                            ]);
//     }));
//   });
  
//   self.addEventListener('fetch', function(event){
//     event.respondWith(caches.match(event.request).then(function(response){
//         return response || fetch(event.request);
//     }));
//   }); 
  
  self.addEventListener('push', function(event) {
    
    //isTabActive().then((result) => {
     // if(!result) {
         
        const promiseChain = self.registration.showNotification(event.data.json().message, {
            data: event.data.json().id
          });
        event.waitUntil(promiseChain);
    //  }
    //})
  
      
  });
  
  self.addEventListener('notificationclick', function(event) {
    const clickedNotification = event.notification;
    clickedNotification.close();
  
    // Do something as the result of the notification click
    console.log(event, event.notification)
    const promiseChain = setCurrentChatFromNotification(event.notification.data);
    event.waitUntil(promiseChain);
  });

  
  function isTabActive() {
    const isActive = this.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then(function(windowClients) {
    
    var clientIsVisible = false;
    for (var i = 0; i < windowClients.length; i++) {
     const windowClient = windowClients[i];
    
     if (windowClient.visibilityState==="visible") {
         clientIsVisible = true;
    
       break;
     }
    }
    
    return clientIsVisible;
    });
    return isActive
  }

  function setCurrentChatFromNotification(id) {
    this.clients.openWindow(`${this.location.origin}/chat/${id}`).then(windowClient => {
        console.log(windowClient)
       return  windowClient ? windowClient : null
    });
  }