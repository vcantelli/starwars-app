"use client";

import React, { useEffect } from 'react';

/**
 * Props for GlobalError component.
 *
 * @property {Error} error - The error object that was thrown.
 * @property {() => void} reset - A function to reset the error state.
 */
interface ErrorProps {
  error: Error;
  reset: () => void;
}

/**
 * GlobalError component.
 *
 * This component is used as a fallback UI when an error is caught by an Error Boundary.
 * It logs the error (where you can also integrate with monitoring services) and displays
 * an error message with a button to retry the operation.
 *
 * Note: This component renders a complete HTML document. In Next.js's app directory,
 * you can also customize your fallback UI as needed.
 *
 * @param error - The error object.
 * @param reset - Function to reset error state.
 * @returns The error fallback UI.
 */
export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error for debugging or monitoring purposes.
    console.error('Global error captured:', error);
  }, [error]);

  return (
    <html>
      <head>
        <title>An Error Occurred</title>
      </head>
      <body>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
          <button onClick={() => reset()}>Try Again</button>
        </div>
      </body>
    </html>
  );
}
