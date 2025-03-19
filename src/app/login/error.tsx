"use client";
import { useEffect } from 'react';

/**
 * LoginError component.
 *
 * Displays a fallback UI when an error occurs on the login page.
 * Logs the error to the console and provides a button to retry the operation.
 *
 * @param error - The error object.
 * @param reset - Function to reset the error state.
 * @returns The error fallback UI for the login page.
 */
export default function LoginError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error or send it to a monitoring service if needed.
    console.error('Error in login route:', error);
  }, [error]);

  return (
    <div>
      <h2>An error occurred during login.</h2>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
