// v2: as páginas vêm sempre da rede (o cache só é usado sem internet).
// A v1 servia tudo do cache para sempre, e quem visitou antes nunca via a versão nova.
const CACHE_NAME = "ia-fala-brasil-v2";
const STATIC_ASSETS = ["/", "/aprender", "/professor", "/cidadao", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Apaga o cache v1 (e qualquer outro antigo) ao ativar a versão nova.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function guardar(request, response) {
  if (response.ok) {
    const clone = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  // Arquivos com hash no nome (/_next/static) nunca mudam: cache primeiro.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request).then((r) => guardar(event.request, r)))
    );
    return;
  }

  // Páginas e o resto: rede primeiro; o cache só entra se estiver sem internet.
  event.respondWith(
    fetch(event.request)
      .then((r) => guardar(event.request, r))
      .catch(() => caches.match(event.request).then((cached) => cached || Response.error()))
  );
});
