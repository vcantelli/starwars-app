import apiClient from './apiClient';
import { SWAPIListResponse } from '../utils/interfaces';
import { Planet } from '@/types/planets';
import { Species } from '@/types/species';
import { Starship } from '@/types/starships';
import { Character } from '@/types/character';

/**
 * Fetches a paginated list of Star Wars characters from the SWAPI.
 *
 * @param page - The page number to fetch.
 * @param search - The search query to filter characters.
 * @param config - Optional Axios request configuration.
 * @returns A Promise that resolves to an SWAPIListResponse containing Character items.
 */
export async function getCharacters(
  page = 1,
  search = '',
  config = {}
): Promise<SWAPIListResponse<Character>> {
  const response = await apiClient.get<SWAPIListResponse<Character>>(
    `https://swapi.dev/api/people/?page=${page}&search=${search}`,
    config
  );
  return response.data;
}

/**
 * Fetches a paginated list of planets from the SWAPI.
 *
 * @param config - Optional Axios request configuration.
 * @returns A Promise that resolves to an SWAPIListResponse containing Planet items.
 */
export async function getPlanets(config = {}): Promise<SWAPIListResponse<Planet>> {
  const response = await apiClient.get<SWAPIListResponse<Planet>>(
    "https://swapi.dev/api/planets/",
    config
  );
  return response.data;
}

/**
 * Fetches a paginated list of species from the SWAPI.
 *
 * @param config - Optional Axios request configuration.
 * @returns A Promise that resolves to an SWAPIListResponse containing Species items.
 */
export async function getSpecies(config = {}): Promise<SWAPIListResponse<Species>> {
  const response = await apiClient.get<SWAPIListResponse<Species>>(
    "https://swapi.dev/api/species/",
    config
  );
  return response.data;
}

/**
 * Fetches a paginated list of starships from the SWAPI.
 *
 * @param config - Optional Axios request configuration.
 * @returns A Promise that resolves to an SWAPIListResponse containing Starship items.
 */
export async function getStarships(config = {}): Promise<SWAPIListResponse<Starship>> {
  const response = await apiClient.get<SWAPIListResponse<Starship>>(
    "https://swapi.dev/api/starships/",
    config
  );
  return response.data;
}

/**
 * Fetches the details of a planet (homeworld) from a given URL.
 *
 * @param url - The URL of the planet resource.
 * @returns A Promise that resolves to a Planet object.
 */
export async function getHomeworld(url: string): Promise<Planet> {
  const response = await apiClient.get<Planet>(url);
  return response.data;
}
