import useSWR from "swr";
import { getStarships } from "@/services/swapi";
import { Starship } from "@/types/starships";

/**
 * Custom hook to fetch a list of starships from the SWAPI.
 *
 * This hook uses SWR for data fetching and caching, returning an array of Starship objects,
 * along with error and loading state.
 *
 * @returns An object containing:
 *   - starships: Array of Starship objects (or empty array if not loaded)
 *   - error: Error message if fetching fails, otherwise null
 *   - isLoading: Boolean indicating if the data is still loading
 */
export default function useStarships() {
  // Define a fetcher function that retrieves the starships data and returns the results array.
  const fetchStarships = async () => {
    const data = await getStarships();
    return data.results;
  };

  // Use SWR to fetch the starships data.
  const { data, error, isLoading } = useSWR<Starship[]>("starships", fetchStarships, {
    suspense: true,
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return { starships: data || [], error, isLoading };
}
