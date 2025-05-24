import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuth = request.cookies.has('auth_token')

  // Protected routes
  if (pathname.startsWith('/(protected)') || pathname.startsWith('/dashboard')) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Auth routes (login, register)
  if (pathname.startsWith('/(auth)') || pathname === '/login' || pathname === '/register') {
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 