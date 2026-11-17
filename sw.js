const V="moscow-guide-20261116-01";const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET")return;
 const swr=u.origin===location.origin||/unpkg\.com|upload\.wikimedia\.org/.test(u.host);if(!swr)return;
 e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==="opaque"))c.put(e.request,r.clone());return r}).catch(()=>hit);return hit||net}))});
self.addEventListener("notificationclick",e=>{e.waitUntil(self.clients.matchAll({type:"window"}).then(l=>l[0]?l[0].focus():self.clients.openWindow("./")))});
