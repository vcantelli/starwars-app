import { NextResponse } from 'next/server';

/**
 * POST /api/auth/logout
 *
 * Logs out the user by deleting the authentication cookies.
 *
 * This endpoint responds with a success message and removes both the accessToken
 * and refreshToken cookies. Since the cookies were set with a default path of "/",
 * no additional options are needed for deletion.
 *
 * @param _request - The incoming request (unused).
 * @returns A JSON response indicating successful logout.
 */
export async function POST(_request: Request) {
  const response = NextResponse.json({ message: 'Logout successful' });

  // Delete authentication cookies.
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');

  return response;
}
