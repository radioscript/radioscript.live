import { hasTokens } from '@/hooks/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = await hasTokens();

  // Protect user routes - redirect to login if not authenticated
  if (pathname.startsWith('/user/')) {
    if (!isAuthenticated) {
      const redirectUrl = new URL('/auth/identity', request.url);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Prevent authenticated users from accessing auth routes
  if (pathname.startsWith('/auth/')) {
    if (isAuthenticated) {
      const redirectUrl = new URL('/', request.url);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/auth/:path*'],
};
