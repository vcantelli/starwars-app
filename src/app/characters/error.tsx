"use client";
import { useEffect } from 'react';

/**
 * CharactersError component.
 *
 * Displays a fallback UI when an error occurs on the characters route.
 * Logs the error for debugging or monitoring purposes.
 *
 * @param error - The error that was thrown.
 * @param reset - Function to reset the error state.
 * @returns The error fallback UI.
 */
export default function CharactersError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error; optionally, integrate with an error monitoring service.
    console.error('Error in characters route:', error);
  }, [error]);

  return (
    <div>
      <h2>An error occurred while loading characters.</h2>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
