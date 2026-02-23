import { NextRequest, NextResponse } from 'next/server';

const MOBILE_BREAKPOINT = 768; 


const PUBLIC_DESKTOP_PATHS = ['/admin', '/login', '/about'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_DESKTOP_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }


  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);


  if (isMobile) {
    return NextResponse.next();
  }


  return NextResponse.rewrite(new URL('/desktop-landing', request.url));
}

export const config = {
  matcher: [

    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};