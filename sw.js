const CACHE = "face-chess-1.3.9";
const FILES = ["./", "index.html", "manifest.json",
  "pawn.png", "bishop.png", "knight.png",
  "rook.png", "queen.png", "king.png",
  "wK_evo.png","sK.png","sQ.png","sR.png","sN.png","sB.png","sP.png","wP.png","wN.png","wB.png","wR.png","wQ.png","wK.png",
  "bP.png","bN.png","bB.png","bR.png","bQ.png","bK.png",
  "bg1.jpg","bg2.jpg","bg3.jpg",
  "logo.png","stun.png","Jua.woff2","dagu_hit.wav","skill1.png","skill2_1.png","skill2_2.png","skill2_3.png","skill_dagu.png","witch_passive.jpg","skill_goseo.jpg","skill_carrot.jpg","witch_bishop.jpg","witch_queen.jpg","witch_rook.jpg","witch_court.jpg","witch_cart.png","peerjs.min.js","res_win.png","res_lose.png","res_draw.png","skill_su1.jpg","skill_su2.jpg","sN_evo.png","sB_evo.png","sR_evo.png","sK_dr.png","skill_su_k.jpg","skill_su_p.jpg",
  "icon-192.png", "icon-512.png",
  "stockfish-19-lite-single.js", "stockfish-19-lite-single.wasm"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => fetch(f, {cache: "reload"}).then(r => r.ok ? c.put(f, r) : null).catch(() => null)))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
