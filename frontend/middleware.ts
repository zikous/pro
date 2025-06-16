import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public paths that don't require authentication
const publicPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is a public path
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  // If the path is not public and there's no token, redirect to login
  if (!isPublicPath && !token) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  // If the path is public and there's a token, redirect to home
  if (isPublicPath && token) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Define which paths this middleware should run on
export const config = {
  matcher: [
    // Apply to all paths except api routes, static files, and next.js internals
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
