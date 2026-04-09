import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';
import { NextResponse, type NextRequest } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  
  const isAdminPath = nextUrl.pathname.startsWith('/admin');
  const isProtectedPath = ['/profile', '/checkout', '/order-success'].some(path => 
    nextUrl.pathname.startsWith(path)
  );

  // 1. Handle Admin Security
  if (isAdminPath && !nextUrl.pathname.startsWith('/admin/login')) {
    const isAdmin = isLoggedIn && (req.auth as any)?.user?.role === 'admin';
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', nextUrl));
    }
  }

  // 2. Handle User Security
  if (isProtectedPath && !isLoggedIn) {
    const loginUrl = new URL('/login', nextUrl);
    loginUrl.searchParams.set('redirectTo', nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
