const CACHE = "face-chess-2.2.0";
const FILES = ["./", "index.html", "Jua.woff2","bB.png","bgm_main.mp3","bgm_f.mp3","bgm_m.mp3","bgm_g.mp3","bgm_s.mp3","bgm_e.mp3","bgm_d.mp3","trap.png","eB.png","skill_d1.jpg","skill_d2.jpg","skill_dc.jpg","dQ.png","dK.png","dR.png","dN.png","dB.png","dP.png","dP2.png","dEgg.png","eK.png","eN.png","eP.png","eQ.png","eR.png","skill_e1.jpg","skill_e1b.jpg","skill_e2b.jpg","skill_e2.jpg","skill_et.jpg","skill_ep.jpg","bK.png","bN.png","bP.png","bQ.png","bR.png","bg1.jpg","bg2.jpg","bg3.jpg","dagu_hit.wav","gB.png","gBullet.png","gGun.png","gK.png","gN.png","gP.png","gPortal.png","gPortal2.png","gQ.png","gR.png","gSpic.png","gh_e1.jpg","gh_e2.jpg","gh_e3.jpg","gh_e4.jpg","gh_e5.jpg","icon-192.png","icon-512.png","logo.png","book.png","card_frame.png","ld_char.png","book_set.png","book_wide.png","book_wide_tall.png","manifest.json","peerjs.min.js","res_draw.png","res_lose.png","res_win.png","sB.png","sB_evo.png","sK.png","sK_dr.png","sN.png","sN_evo.png","sP.png","sQ.png","sR.png","sR_evo.png","skill1.png","skill2_1.png","skill2_2.png","skill2_3.png","skill2_4.png","skill2_5.png","skill_carrot.jpg","skill_dagu.png","skill_gh0.jpg","skill_gh1.jpg","skill_gh2.jpg","skill_goseo.jpg","skill_su1.jpg","skill_su2.jpg","skill_su_k.jpg","skill_su_p.jpg","spk_cry.mp3","spk_dont.mp3","stockfish-19-lite-single.js","stockfish-19-lite-single.wasm","stun.png","wB.png","wK.png","wK_evo.png","wN.png","wP.png","wQ.png","wR.png","witch_bishop.jpg","witch_cart.png","witch_court.jpg","witch_passive.jpg","witch_queen.jpg","witch_rook.jpg","zap.mp3"];
self.addEventListener("install", e => {
  let done = 0;
  const tell = () => self.clients.matchAll({includeUncontrolled: true}).then(cs => cs.forEach(c => c.postMessage({t: "p", d: done, n: FILES.length})));
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => fetch(f, {cache: "reload"}).then(r => r.ok ? c.put(f, r) : null).catch(() => null).then(() => { done++; return tell(); })))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(Promise.all([self.clients.claim(), caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))]));
});
self.addEventListener("fetch", e => {
  const rq = e.request, rg = rq.headers.get("range");
  if (rg) {
    e.respondWith(caches.match(rq, {ignoreSearch: true}).then(async r => {
      if (!r) return fetch(rq);
      const buf = await r.arrayBuffer(), m = /bytes=(\d*)-(\d*)/.exec(rg);
      let a = m && m[1] ? +m[1] : 0, b = m && m[2] ? +m[2] : buf.byteLength - 1;
      if (b >= buf.byteLength) b = buf.byteLength - 1;
      return new Response(buf.slice(a, b + 1), {status: 206, headers: {"Content-Type": r.headers.get("Content-Type") || "audio/mpeg", "Content-Range": "bytes " + a + "-" + b + "/" + buf.byteLength, "Content-Length": String(b - a + 1)}});
    }));
    return;
  }
  const u = new URL(rq.url), p = u.pathname;
  const fresh = rq.mode === "navigate" || /(\/|\.html|\.json|sw\.js)$/.test(p);
  if (fresh && u.origin === location.origin) {
    e.respondWith(fetch(rq, {cache: "no-store"}).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(ch => ch.put(rq, c)).catch(() => {}); } return r; }).catch(() => caches.match(rq, {ignoreSearch: true}).then(r => r || caches.match("index.html"))));
    return;
  }
  e.respondWith(caches.match(rq).then(r => r || fetch(rq)));
});
