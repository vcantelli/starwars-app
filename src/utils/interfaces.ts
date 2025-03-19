/**
 * Represents a generic paginated response from the SWAPI.
 *
 * @template T - The type of the items contained in the results.
 */
export interface SWAPIListResponse<T> {
  /** Total number of items available. */
  count: number;
  /** URL for the next page of results (or null if there is no next page). */
  next: string | null;
  /** URL for the previous page of results (or null if there is no previous page). */
  previous: string | null;
  /** Array of items of type T. */
  results: T[];
}

/**
 * Represents a character response from the Star Wars Databank API.
 */
export interface DatabankCharacterResponse {
  /** Unique identifier for the character. */
  _id: string;
  /** Name of the character. */
  name: string;
  /** Description of the character. */
  description: string;
  /** URL of the character's image. */
  image: string;
  /** Version key, typically used in MongoDB/Mongoose (if applicable). */
  __v: number;
}
