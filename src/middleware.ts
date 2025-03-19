import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { jwtDecode } from 'jwt-decode'; // Uncomment this line to enable JWT token decoding for token expiration checks

/**
 * Middleware to protect private routes.
 *
 * It allows public routes (login, API auth, and Next.js assets). For any other route,
 * it checks if an "accessToken" cookie exists.
 *
 * The commented-out block below (using jwtDecode) would decode the JWT token to check its expiration.
 * This is useful for ensuring that the token is still valid.
 *
 * However, for the purposes of this mock implementation (or if you want to bypass client-side JWT decoding),
 * i have commented out this part. In a production environment, you should enable token decoding
 * to verify the token's expiration and ensure it hasn't expired.
 *
 * @param req - The NextRequest object
 * @returns NextResponse - either NextResponse.next() or a redirect to /login
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and assets
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  // Retrieve the access token from cookies
  const token = req.cookies.get('accessToken')?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  /*
  // Uncomment the block below to decode the JWT and verify its expiration
  try {
    // Decode the JWT token. The jwtDecode function returns an object containing the token's payload.
    // We assume the payload includes an "exp" field (expiration time in seconds).
    const decoded: { exp: number } = jwtDecode(token);

    // Compare the expiration time with the current time (in seconds)
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Token has expired; redirect to login.
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  } catch (error) {
    // If token decoding fails, redirect to login.
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  */

  return NextResponse.next();
}

/**
 * Middleware configuration.
 * Exclude static assets, API auth, login, and favicon from being processed by this middleware.
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|api/auth|login|favicon.ico).*)',
  ],
};
