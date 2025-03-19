import { NextResponse, NextRequest } from 'next/server';

/**
 * POST /api/auth/refresh
 *
 * Refreshes the access token using the refresh token.
 *
 * This mock endpoint checks if the refreshToken cookie matches the mocked token from the environment.
 * If the refresh token is valid, it returns a new access token (mocked) and sets it as a cookie.
 *
 * Note:
 * - In production, the refresh token should be securely verified and the new token generated accordingly.
 *
 * @param request - The NextRequest object containing the refreshToken cookie.
 * @returns A JSON response with a success message and the new access token,
 *          or a 401 response if the refresh token is invalid.
 */
export async function POST(request: NextRequest) {
  // Retrieve the mocked refresh token from environment variables.
  const mockedRefreshToken = process.env.NEXT_PUBLIC_MOCKED_REFRESH_TOKEN;
  // Retrieve the refreshToken from the cookies.
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // Validate the refresh token.
  if (!refreshToken || refreshToken !== mockedRefreshToken) {
    return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
  }

  // Retrieve a new mocked access token from environment variables.
  const newAccessToken = process.env.NEXT_PUBLIC_MOCKED_NEW_ACCESS_TOKEN;
  if (!newAccessToken) {
    throw new Error('NEXT_PUBLIC_MOCKED_NEW_ACCESS_TOKEN not configured');
  }

  // Create a response containing the new access token.
  const response = NextResponse.json({ message: 'Token refreshed', newAccessToken });

  // Set the new access token as a cookie.
  response.cookies.set('accessToken', newAccessToken, {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 15, // 15 minutes.
    path: '/',
  });

  return response;
}
