/**
 * A mock utility for validating a JWT.
 * This function decodes the token (without validating its signature)
 * and simulates a validation by checking if the payload contains an expected "sub"
 * value and if the token has not expired.
 *
 * NOTE: This mock does NOT validate the token's signature.
 * Real-world validation must be performed on the server side.
 */

import { jwtDecode } from "jwt-decode";

/**
 * Interface representing the structure of a JWT payload.
 */
export interface JwtPayload {
  /** The subject (typically the user identifier) */
  sub: string;
  /** Issued At timestamp (in seconds) */
  iat: number;
  /** Expiration timestamp (in seconds) */
  exp: number;
}

/**
 * Validates a JWT token in a mock manner.
 *
 * @param token - The JWT token string to validate.
 * @returns The decoded JwtPayload if valid.
 * @throws An error if the token is invalid or expired.
 */
export function validateJWTMock(token: string): JwtPayload {
  try {
    // Decode the token without verifying its signature.
    const decoded = jwtDecode<JwtPayload>(token);

    // Simulate a verification check: for example, verify if the token has an expected "sub".
    if (!decoded.sub || decoded.sub !== "admin") {
      throw new Error("Invalid token");
    }

    // Simulate expiration verification.
    const now = Date.now() / 1000; // Current time in seconds.
    if (decoded.exp < now) {
      throw new Error("Token expired");
    }

    return decoded;
  } catch (_error) {
    throw new Error("Invalid or expired token");
  }
}
