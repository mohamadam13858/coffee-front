// next.config.ts
import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',                    // مسیر فایل service worker خودت
  swDest: 'public/sw.js',                // جایی که فایل نهایی sw.js ساخته می‌شه
  additionalPrecacheEntries: [
    { url: '/offline.html', revision: null },  // اگر صفحه آفلاین داری
  ],
  disable: process.env.NODE_ENV === 'development',  // در dev غیرفعال باشه
  // گزینه‌های اختیاری مفید:
  cacheOnNavigation: true,               // کش صفحات موقع navigation
  reloadOnOnline: true,                  // ریلود وقتی آنلاین می‌شه
});

export default withSerwist({
  // اینجا بقیه تنظیمات Next.js خودت رو بگذار (اگر داری)
  // مثلاً:
  // reactStrictMode: true,
  // images: { ... },
});