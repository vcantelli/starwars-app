import useSWR from "swr";
import { getSpecies } from "@/services/swapi";
import { Species } from "@/types/species";

/**
 * Custom hook to fetch a list of species from the SWAPI.
 *
 * This hook leverages SWR for data fetching and caching, returning an array of Species objects,
 * along with error and loading state.
 *
 * @returns An object containing:
 *   - species: Array of Species objects (or empty array if not loaded)
 *   - error: Error message if fetching fails, otherwise null
 *   - isLoading: Boolean indicating if data is still loading
 */
export default function useSpecies() {
  // Define a fetcher function that retrieves the species data and returns the results array.
  const fetchSpecies = async () => {
    const data = await getSpecies();
    return data.results;
  };

  // Use SWR to fetch species data.
  const { data, error, isLoading } = useSWR<Species[]>("species", fetchSpecies, {
    suspense: true,
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return { species: data || [], error, isLoading };
}
