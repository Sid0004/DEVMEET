import { NextRequest, NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Allow access to home page and public routes
  if (url.pathname === '/' || url.pathname.startsWith('/_next') || url.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // If user is not signed in and trying to access protected routes
  if (!token && !url.pathname.startsWith('/sign-in') && !url.pathname.startsWith('/sign-up')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // If user is signed in and trying to access sign-in or sign-up pages
  if (token && (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}