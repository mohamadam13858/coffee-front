// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const MOBILE_BREAKPOINT = 768; // می‌تونی تغییر بدی

// لیست صفحاتی که حتی روی دسکتاپ هم باید نشون داده بشن (اختیاری)
// مثلاً داشبورد ادمین یا صفحه لاگین
const PUBLIC_DESKTOP_PATHS = ['/admin', '/login', '/about'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // اگر مسیر جزو صفحات مجاز دسکتاپ باشه → رد شو
  if (PUBLIC_DESKTOP_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // تشخیص موبایل از user-agent (دقیق‌تر از عرض صفحه در سرور)
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // اگر موبایل بود → اجازه بده صفحه اصلی لود بشه
  if (isMobile) {
    return NextResponse.next();
  }

  // دسکتاپ → ریدایرکت به صفحه لندینگ دسکتاپ
  // گزینه ۱: ریدایرکت (ساده)
  // return NextResponse.redirect(new URL('/desktop-landing', request.url));

  // گزینه ۲: بازنویسی (rewrite) → URL عوض نمی‌شه، فقط محتوا عوض می‌شه (توصیه من)
  return NextResponse.rewrite(new URL('/desktop-landing', request.url));
}

export const config = {
  matcher: [
    /*
     * همه مسیرها به جز:
     * - api (برای API routes)
     * - _next/static (فایل‌های استاتیک)
     * - _next/image (ایمیج اپتیمایزر)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};