// sw.js (Link English v5.1)
const CACHE_NAME = 'link-english-v5.5'; // index.html を更新したら、ここも必ず書き換える
const ASSETS = [
    './',
    './index.html'
];

// インストール時にキャッシュを作成
self.addEventListener('install', (e) => {
    self.skipWaiting(); // 待機せずにすぐ最新版を適用する
    // HTTPキャッシュ(GitHub Pagesは約10分)を飛ばして、必ず最新のファイルを取得する
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
});

// 古いキャッシュを削除（バージョンアップ用）
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
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
