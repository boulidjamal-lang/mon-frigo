/* Service worker de Mon Frigo.
   Ne met en cache QUE la coquille de l'app (le HTML, les icônes, le
   manifeste) : les données (Supabase, Spoonacular, traductions, images de
   recettes) doivent toujours venir du réseau, jamais d'un cache qui les
   figerait. Objectif unique : que l'app s'ouvre encore, même hors-ligne
   ou en cas de coupure réseau — pas de synchronisation hors-ligne. */
const CACHE_NAME = 'mon-frigo-v1';
const APP_SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(APP_SHELL))
            .catch(() => {})   // une icone manquante ne doit pas bloquer l'installation
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((noms) =>
            Promise.all(noms.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);
    // Tout ce qui n'est pas servi par ce domaine (Supabase, Spoonacular, CDN,
    // images OpenFoodFacts…) passe directement au réseau, jamais intercepté.
    if (url.origin !== self.location.origin) return;

    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then((res) => {
                    const copie = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, copie));
                    return res;
                })
                .catch(() => caches.match('./index.html'))
        );
        return;
    }

    event.respondWith(
        caches.match(req).then((mis) => mis || fetch(req))
    );
});
