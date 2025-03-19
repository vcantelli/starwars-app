"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { getCookie, deleteCookie } from '../utils/cookies';
// import { validateJWTMock } from "@/utils/jwtMock";  // Uncomment this line to enable JWT token decode and validation

/**
 * Defines the shape of the authentication context.
 *
 * @property {boolean} isAuthenticated - True if the user is authenticated.
 * @property {string | null} accessToken - The JWT access token.
 * @property {(username: string, password: string) => Promise<void>} login - Function to log in.
 * @property {() => Promise<void>} logout - Function to log out.
 */
interface AuthContextData {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the authentication context.
const AuthContext = createContext<AuthContextData | undefined>(undefined);

/**
 * AuthProvider component.
 *
 * Initializes the authentication state by reading the "accessToken" cookie.
 * Uses a mock validation function (validateJWTMock) for demonstration purposes.
 * Note: The token decoding part is commented out to work with the mock,
 * so it simply sets the token if present.
 *
 * @param children - The child components.
 * @returns The AuthContext provider wrapping the children.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize accessToken from cookie synchronously.
  const [accessToken, setAccessToken] = useState<string | null>(() => getCookie('accessToken'));
  // State to track whether the initial authentication check has completed.
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    const token = getCookie('accessToken');
    if (token) {
      try {
        // In a production scenario, you may decode and validate the token.
        // For example:
        // const decoded = validateJWTMock(token);
        // If the token is valid, update the state.
        // For this mock implementation, we bypass token decoding and directly set the token.
        setAccessToken(token);
      } catch (error) {
        console.error("Invalid token:", error);
        setAccessToken(null);
      }
    }
    setIsLoading(false);  // Mark that the initial check is complete.
  }, []);

  /**
   * Logs in the user by sending credentials to the login endpoint.
   *
   * @param username - The user's username.
   * @param password - The user's password.
   */
  async function login(username: string, password: string) {
    try {
      const res = await axios.post(
        '/api/auth/login',
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error(res.data.message || 'Error logging in');
      }
      // Update the accessToken state directly with the token returned from the API.
      setAccessToken(res.data.accessToken);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error logging in');
      } else {
        throw new Error('Unexpected error');
      }
    }
  }

  /**
   * Logs out the user by calling the logout endpoint, deleting authentication cookies,
   * and redirecting the user to the login page.
   */
  async function logout() {
    try {
      await axios.post(
        '/api/auth/logout',
        {},
        { withCredentials: true }
      );
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      setAccessToken(null);
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error during logout:', error.response?.data);
      } else {
        console.error('Unexpected error during logout');
      }
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {!isLoading && children} {/* Render children only after the initial auth check */}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the authentication context.
 *
 * @returns The authentication context data.
 * @throws Error if used outside of an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
