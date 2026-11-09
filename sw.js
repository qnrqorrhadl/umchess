const CACHE = "face-chess-v30";
const FILES = ["./", "index.html", "manifest.json",
  "pawn.png", "bishop.png", "knight.png",
  "rook.png", "queen.png", "king.png",
  "wK_evo.png","wP.png","wN.png","wB.png","wR.png","wQ.png","wK.png",
  "bP.png","bN.png","bB.png","bR.png","bQ.png","bK.png",
  "bg1.jpg","bg2.jpg","bg3.jpg",
  "logo.png","skill1.png","skill2_1.png","skill2_2.png","skill2_3.png","skill_dagu.png",
  "icon-192.png", "icon-512.png",
  "stockfish-19-lite-single.js", "stockfish-19-lite-single.wasm"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
