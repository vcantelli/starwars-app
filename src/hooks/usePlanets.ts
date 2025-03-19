import useSWR from "swr";
import { getPlanets } from "@/services/swapi";
import { Planet } from "@/types/planets";

/**
 * Custom hook to fetch a list of planets from the SWAPI.
 *
 * This hook uses SWR for data fetching and caching. It returns an array of Planet objects,
 * along with error and loading status.
 *
 * @returns An object containing:
 *   - planets: Array of Planet objects (or empty array if not loaded)
 *   - error: Error message if fetching failed, otherwise null
 *   - isLoading: Boolean indicating if the data is still loading
 */
export default function usePlanets() {
  // Define a fetcher function that retrieves the planets data and returns the results array.
  const fetchPlanets = async () => {
    const data = await getPlanets();
    return data.results;
  };

  // Use SWR to fetch the planets data.
  const { data, error, isLoading } = useSWR<Planet[]>("planets", fetchPlanets, {
    suspense: true,
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return { planets: data || [], error, isLoading };
}
