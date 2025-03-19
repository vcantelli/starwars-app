/**
 * Retrieves the value of a cookie by its name.
 *
 * @param name - The name of the cookie to retrieve.
 * @returns The cookie value as a string, or null if not found.
 */
export function getCookie(name: string): string | null {
  // Check if running in a browser environment.
  if (typeof document === 'undefined') return null;
  // Prepend "; " to ensure consistent splitting when the cookie is the first one.
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

/**
 * Sets a cookie with the specified name, value, and expiration (in days).
 *
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param days - The number of days until the cookie expires.
 */
export function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  // Set the cookie with path=/ and SameSite=Lax for basic security.
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax;`;
}

/**
 * Deletes the cookie with the specified name.
 *
 * @param name - The name of the cookie to delete.
 */
export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  // Setting the expiration date to a past date deletes the cookie.
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;`;
}
