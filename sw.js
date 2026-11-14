const CACHE = "face-chess-1.5.2";
const FILES = ["./", "index.html", "Jua.woff2","bB.png","bK.png","bN.png","bP.png","bQ.png","bR.png","bg1.jpg","bg2.jpg","bg3.jpg","dagu_hit.wav","gB.png","gBullet.png","gGun.png","gK.png","gN.png","gP.png","gPortal.png","gPortal2.png","gQ.png","gR.png","gSpic.png","gh_e1.jpg","gh_e2.jpg","gh_e3.jpg","gh_e4.jpg","gh_e5.jpg","icon-192.png","icon-512.png","logo.png","manifest.json","peerjs.min.js","res_draw.png","res_lose.png","res_win.png","sB.png","sB_evo.png","sK.png","sK_dr.png","sN.png","sN_evo.png","sP.png","sQ.png","sR.png","sR_evo.png","skill1.png","skill2_1.png","skill2_2.png","skill2_3.png","skill2_4.png","skill2_5.png","skill_carrot.jpg","skill_dagu.png","skill_gh0.jpg","skill_gh1.jpg","skill_gh2.jpg","skill_goseo.jpg","skill_su1.jpg","skill_su2.jpg","skill_su_k.jpg","skill_su_p.jpg","spk_cry.mp3","spk_dont.mp3","stockfish-19-lite-single.js","stockfish-19-lite-single.wasm","stun.png","wB.png","wK.png","wK_evo.png","wN.png","wP.png","wQ.png","wR.png","witch_bishop.jpg","witch_cart.png","witch_court.jpg","witch_passive.jpg","witch_queen.jpg","witch_rook.jpg","zap.mp3"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => fetch(f, {cache: "reload"}).then(r => r.ok ? c.put(f, r) : null).catch(() => null)))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(Promise.all([self.clients.claim(), caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))]));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
