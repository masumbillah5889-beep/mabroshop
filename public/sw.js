// Deliberately minimal — no caching strategy. Prices, stock, and orders must
// always be fresh, so this service worker exists only to satisfy "Add to
// Home Screen" installability, not to serve cached/offline content.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {
  // Intentionally not calling event.respondWith — every request just goes to
  // the network as normal.
});
