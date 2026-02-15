// sw.js (Link English v3.9.7)
const CACHE_NAME = 'link-english-v3.9.7';
const ASSETS = [
    './',
    './index.html'
];

// インストール時にキャッシュを作成
self.addEventListener('install', (e) => {
    // 古いキャッシュと競合しないよう skipWaiting を呼ぶことも多いが、
    // ここではシンプルに新しいキャッシュを作成
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

// 古いキャッシュを削除（バージョンアップ用）
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                // 今回のバージョン名と違うキャッシュはすべて削除
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
});

// オフライン時はキャッシュから表示
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
