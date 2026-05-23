// Firebase Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDOm2OngRf5DwGOBAyGYk7-rmClkHBMj50",
  authDomain: "delivery-23728.firebaseapp.com",
  databaseURL: "https://delivery-23728-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "delivery-23728",
  storageBucket: "delivery-23728.firebasestorage.app",
  messagingSenderId: "203200824872",
  appId: "1:203200824872:web:2758175b0c8f253647971d"
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드 메시지:', payload);
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || '새 배송 신청', {
    body: body || '새로운 배송 신청이 들어왔습니다',
    icon: icon || '/delivery/icon.png',
    badge: '/delivery/icon.png',
    tag: 'delivery-request',
    requireInteraction: true,
    data: payload.data || {}
  });
});

// 알림 클릭 시 앱으로 이동
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('/delivery') && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow)
        return clients.openWindow('https://sketchkim-hub.github.io/delivery');
    })
  );
});
