const CACHE_NAME = 'static-resources-v1';
const STATIC_RESOURCES = [
  // 添加需要缓存的静态资源
  '/public/icons/建筑.png',
  "/public/icons/入职.png",
  "/public/icons/喇叭.png",
  '/public/icons/个人优势.png',
  "/public/icons/工作经历.png",
  "/public/icons/教育经历.png",
  '/public/icons/求职意向.png',
  "/public/icons/求职状态.png",
  "/public/icons/删除.png",
  "/public/icons/时钟.png",
  "/public/icons/项目经历.png",
  "/public/icons/证书荣誉.png",
  "/public/icons/权威认证.png",
  "/public/images/IT互联网.png",
  "/public/images/制造业.png",
  "/public/images/房地产.png",
  "/public/images/消费品.png",
  "/public/images/金融.png",
  "/public/images/服务业.png",
  '/public/images/work.png',
  '/public/images/firstImg.jpg',
  '/public/images/ad1.jpg',
  '/public/images/ad2.jpg',
  '/public/images/ad3.jpg',
  '/public/images/回到顶部.png',
  '/public/images/默认证件.png',
  '/public/images/默认图像.png',
  '/public/images/右箭头.png',
  '/public/images/swiper1.jpg',
  '/public/images/swiper2.jpg',
  '/public/images/swiper3.jpg',

];

// 安装阶段：缓存静态资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_RESOURCES);
    })
  );
});

// 拦截网络请求：优先从缓存中加载资源
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 如果缓存中有资源，则返回缓存
      if (cachedResponse) {
        // 后台发起网络请求，比对资源是否有更新
        fetchAndUpdateCache(event.request);
        return cachedResponse;
      }
      // 如果缓存中没有资源，则发起网络请求
      return fetch(event.request);
    })
  );
});

// 后台比对资源并更新缓存
function fetchAndUpdateCache(request) {
  fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, networkResponse);
      });
    }
  });
}
// 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});