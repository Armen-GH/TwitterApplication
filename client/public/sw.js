// client/public/sw.js

self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const { title, body, icon } = data;

  event.waitUntil(
    self.registration.showNotification(title || 'New Notification', {
      body: body || 'You have a new notification.',
      icon: icon || '/logo192.png',
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
