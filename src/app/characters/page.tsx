"use client";
import { useState, Suspense } from "react";
import SearchBar from "@/components/organisms/SearchBar";
import CharacterModal from "./components/CharacterModal";
import useCharacters from "@/hooks/useCharacters";
import usePlanets from "@/hooks/usePlanets";
import useSpecies from "@/hooks/useSpecies";
import useStarships from "@/hooks/useStarships";
import { Character } from "@/types/character";
import styled from "styled-components";
import CharacterCard from "./components/CharacterCard";
import { PageIndicator, PaginationButton, PaginationContainer } from "@/components/common/Pagination";
import { FilterGroup, FiltersContainer, SearchBarContainer, TopBar } from "@/components/organisms/SearchFiltersStyles";
import Loading from "../loading";
import { Spinner } from "@/components/common/ImageContainer";

/**
 * Container for the characters page.
 */
export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 1rem;
  background-color: #151515;
  display: grid;
  place-content: center;
`;

/**
 * Grid layout for character cards.
 */
export const CardsGrid = styled.div`
  padding: 0 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Dynamically adjust number of cards per row */
  gap: 0.75rem;
  pointer-events: none;

  &:hover > div:not(:hover) {
    opacity: 0.5;
  }
`;

/**
 * CharactersPage component.
 *
 * Displays a search bar, filter controls, and a grid of character cards.
 * Uses SWR hooks for fetching characters, planets, species, and starships.
 * Wraps the content in a Suspense component to display a fallback loader while data is loading.
 *
 * @returns The characters page UI.
 */
export default function CharactersPage() {
  const {
    characters,
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
    error,
  } = useCharacters();

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const { planets } = usePlanets();
  const { species } = useSpecies();
  const { starships } = useStarships();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <Suspense fallback={<Loading />}>
      <TopBar>
        <SearchBarContainer>
          <SearchBar value={search} onChange={handleSearchChange} />
        </SearchBarContainer>
        <FiltersContainer>
          <FilterGroup>
            <label>Planet:</label>
            <select value={filterHomeworld} onChange={(e) => setFilterHomeworld(e.target.value)}>
              <option value="">All</option>
              {planets.map((planet) => (
                <option key={planet.url} value={planet.url}>
                  {planet.name}
                </option>
              ))}
            </select>
          </FilterGroup>
          <FilterGroup>
            <label>Species:</label>
            <select value={filterSpecies} onChange={(e) => setFilterSpecies(e.target.value)}>
              <option value="">All</option>
              {species.map((spec) => (
                <option key={spec.url} value={spec.url}>
                  {spec.name}
                </option>
              ))}
            </select>
          </FilterGroup>
          <FilterGroup>
            <label>Starship:</label>
            <select value={filterStarships} onChange={(e) => setFilterStarships(e.target.value)}>
              <option value="">All</option>
              {starships.map((ship) => (
                <option key={ship.url} value={ship.url}>
                  {ship.name}
                </option>
              ))}
            </select>
          </FilterGroup>
        </FiltersContainer>
      </TopBar>
      {loading ? (
        <div style={{ margin: 'auto', width: 'fit-content' }}>
          <Spinner />
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <CardsGrid>
            {characters.map((character: Character) => (
              <CharacterCard
                key={character.name}
                character={character}
                onClick={() => setSelectedCharacter(character)}
              />
            ))}
          </CardsGrid>
          <PaginationContainer>
            <PaginationButton
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </PaginationButton>
            <PageIndicator>Page {page}</PageIndicator>
            <PaginationButton onClick={() => setPage((prev) => prev + 1)}>
              Next
            </PaginationButton>
          </PaginationContainer>
        </>
      )}

      {selectedCharacter && (
        <CharacterModal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
      )}
    </Suspense>
  );
}
