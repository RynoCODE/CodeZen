import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //root path
  if (pathname === '/') {
    return NextResponse.next();
  }


  const token = request.cookies.get('authToken'); 


  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    return NextResponse.redirect(signInUrl);
  }


  return NextResponse.next();
}


export const config = {
  matcher: ['/:path*'],
};
