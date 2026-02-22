// app/sw.ts
import { defaultCache } from '@serwist/next/worker';
import { installSerwist } from '@serwist/sw';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';

// این declare global خیلی مهمه! TypeScript رو آگاه می‌کنه که __SW_MANIFEST وجود داره
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: WorkerGlobalScope;

installSerwist({
  precacheEntries: self.__SW_MANIFEST,  // ← حالا TypeScript قبول می‌کنه
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  // اگر می‌خوای استراتژی‌های بیشتری اضافه کنی، اینجا بگذار
  // مثلاً fallback به صفحه آفلاین:
  // fallbacks: { entries: [{ matcher: /.*/, url: '/offline.html' }] }
});