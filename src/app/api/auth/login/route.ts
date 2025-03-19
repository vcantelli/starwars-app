import { NextResponse } from 'next/server';

/**
 * POST /api/auth/login
 *
 * Authenticates the user using the provided credentials.
 *
 * For this mock implementation, if the username is "admin" and password is "password123",
 * it returns a mocked accessToken and refreshToken from environment variables.
 * The accessToken is returned in the response body for the client to update its state,
 * and both tokens are set as cookies.
 *
 * Note:
 * - In production, the cookies are marked as HTTP-only and secure.
 * - This mock endpoint should be replaced with a real authentication mechanism.
 *
 * @param request - The incoming request containing JSON with username and password.
 * @returns A JSON response with a success message and the accessToken,
 *          or a 401 response if credentials are invalid.
 */
export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === 'admin' && password === 'password123') {
    const accessToken = process.env.NEXT_PUBLIC_MOCKED_ACCESS_TOKEN;
    const refreshToken = process.env.NEXT_PUBLIC_MOCKED_REFRESH_TOKEN;

    if (!accessToken || !refreshToken) {
      throw new Error('Tokens not configured');
    }

    // Create a JSON response containing the accessToken for client-side use.
    const response = NextResponse.json({
      message: 'Login successful',
      accessToken, // Returns the token to the client.
    });

    // Set the accessToken cookie with appropriate options.
    response.cookies.set('accessToken', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production', // Only HTTP-only in production.
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 15, // 15 minutes.
      path: '/',
    });

    // Set the refreshToken cookie similarly.
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week.
      path: '/',
    });

    return response;
  }

  // Return a 401 response if the credentials are invalid.
  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
