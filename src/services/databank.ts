import axios from 'axios';
import { DatabankCharacterResponse } from '../utils/interfaces';

/**
 * Fetches character data from the Star Wars Databank API by name.
 *
 * @remarks
 * This function builds the request URL using encodeURIComponent to handle spaces
 * and special characters in the character name. It returns the first result if available,
 * or null if no data is found.
 *
 * @param name - The name of the character to search for.
 * @returns A Promise that resolves to a DatabankCharacterResponse object or null.
 */
export async function getCharacterFromDatabank(name: string): Promise<DatabankCharacterResponse | null> {
  try {
    // Construct the URL using encodeURIComponent for safe handling of special characters.
    const response = await axios.get<DatabankCharacterResponse[]>(
      `https://starwars-databank-server.vercel.app/api/v1/characters/name/${encodeURIComponent(name)}`
    );
    // If the response data array has at least one element, return the first element.
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching Databank data:", error);
    return null;
  }
}
