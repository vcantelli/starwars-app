import Link from 'next/link';

/**
 * HomePage component.
 *
 * This is the landing page for the Star Wars Character App.
 * It provides a brief introduction and a link to navigate to the characters page.
 *
 * @returns The homepage UI.
 */
export default function HomePage() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to the Star Wars Character App</h1>
      <p>Explore the characters of the Star Wars saga with detailed information.</p>
      <Link
        href="/characters"
        style={{
          padding: '1rem',
          backgroundColor: '#C8102E',
          color: '#fff',
          borderRadius: '4px',
          textDecoration: 'none',
          display: 'inline-block',
          marginTop: '1rem'
        }}
      >
        View Characters
      </Link>
    </main>
  );
}
