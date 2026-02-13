import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // Changed from 'next/request'

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Define routes that don't require login
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");

  // 1. If NOT logged in and trying to access ANY page except login/register
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. If logged in and trying to access login/register, send them to products
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // This matcher covers all routes except for static assets and images
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};