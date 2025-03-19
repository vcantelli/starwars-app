import { ReactNode } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import GlobalStyle from '../styles/global';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import NavBar from '@/components/common/NavBar';

const scriptSrc = process.env.NODE_ENV === "development"
  ? "'self' 'unsafe-inline' 'unsafe-eval'"
  : "'self' 'unsafe-inline'";

/**
 * RootLayout component.
 *
 * This component defines the overall HTML structure of the application,
 * including the <html> and <body> tags, global styles, error boundary,
 * authentication context, and the navigation bar.
 *
 * @param children - The child components (pages) to render.
 * @returns The complete layout for the application.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Star Wars Character App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          httpEquiv="Content-Security-Policy"
          content={`
            default-src 'self';
            connect-src 'self' https://swapi.dev https://starwars-databank-server.vercel.app;
            script-src ${scriptSrc};
            style-src 'self' 'unsafe-inline';
            img-src 'self' https://lumiere-a.akamaihd.net https://swapi.dev;
          `}
        />
      </head>
      <body>
        <GlobalStyle />
        <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
          <AuthProvider>
            <NavBar />
            {children}
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
