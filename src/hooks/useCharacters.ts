import { useMemo, useState } from "react";
import useSWR from "swr";
import { getCharacters } from "../services/swapi";
import { SWAPIListResponse } from "../utils/interfaces";
import { Character } from "@/types/character";

/**
 * Custom hook to fetch and filter Star Wars characters.
 *
 * It uses SWR for data fetching, caching, and revalidation based on page and search parameters.
 * In addition, it applies additional client-side filtering for homeworld, species, and starships.
 *
 * @param initialPage - The initial page number (default is 1).
 * @param initialSearch - The initial search query (default is an empty string).
 * @returns An object containing the filtered characters, pagination and search state,
 *          loading status, and any error message.
 */
export default function useCharacters(initialPage = 1, initialSearch = "") {
  // State for extra filters (values will be URLs)
  const [filterHomeworld, setFilterHomeworld] = useState<string>("");
  const [filterSpecies, setFilterSpecies] = useState<string>("");
  const [filterStarships, setFilterStarships] = useState<string>("");

  // State for pagination and search query
  const [page, setPage] = useState<number>(initialPage);
  const [search, setSearch] = useState<string>(initialSearch);

  // Create a SWR key based on page and search parameters
  const swrKey = `characters?page=${page}&search=${search}`;

  // Use SWR to fetch characters using the getCharacters function from the services layer.
  const { data, error } = useSWR<SWAPIListResponse<Character>>(
    swrKey,
    () => getCharacters(page, search),
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
    }
  );

  // Determine loading status: if no data is present and no error, assume loading.
  const loading = !data && !error;

  // Apply extra client-side filters to the fetched data.
  const filteredCharacters = useMemo(() => {
    if (!data) return [];
    return data.results.filter((character) => {
      if (filterHomeworld && character.homeworld !== filterHomeworld) return false;
      if (filterSpecies && !character.species.includes(filterSpecies)) return false;
      if (filterStarships && !character.starships.includes(filterStarships)) return false;
      return true;
    });
  }, [data, filterHomeworld, filterSpecies, filterStarships]);

  return {
    characters: filteredCharacters,
    page,
    setPage,
    search,
    setSearch,
    filterHomeworld,
    setFilterHomeworld,
    filterSpecies,
    setFilterSpecies,
    filterStarships,
    setFilterStarships,
    loading,
    error: error ? (error as Error).message : null,
  };
}
