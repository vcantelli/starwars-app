"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModalBase from "@/components/common/ModalBase";
import { Character } from "@/types/character";
import { Planet } from "@/types/planets";
import { DatabankCharacterResponse } from "@/utils/interfaces";
import { getHomeworld } from "@/services/swapi";
import { getCharacterFromDatabank } from "@/services/databank";
import { ImageContainer, Spinner } from "@/components/common/ImageContainer";
import { Content, Details, HomeworldContainer, Title } from "./CharacterModal.styles";

/**
 * Props for the CharacterModal component.
 *
 * @property {Character} character - The character object.
 * @property {() => void} onClose - Callback function to close the modal.
 */
interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

/**
 * CharacterModal component.
 *
 * Fetches the character's image from the Databank API using getCharacterFromDatabank,
 * and also fetches homeworld data using getHomeworld. While the image is loading,
 * a spinner is shown. If the Databank API returns an error or no data, a fallback image is displayed.
 *
 * @param character - The character object.
 * @param onClose - Callback function to close the modal.
 * @returns The rendered modal with character details.
 */
export default function CharacterModal({ character, onClose }: CharacterModalProps) {
  // State to hold the Databank response for the character image.
  const [databankCharacter, setDatabankCharacter] = useState<DatabankCharacterResponse | null>(null);
  const [databankError, setDatabankError] = useState<string | null>(null);

  // State to indicate if the image has loaded.
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // State for the homeworld data using the Planet interface.
  const [homeworld, setHomeworld] = useState<Planet | null>(null);
  const [homeworldError, setHomeworldError] = useState<string | null>(null);

  // Fetch Databank data using getCharacterFromDatabank.
  useEffect(() => {
    async function fetchDatabankData() {
      try {
        setIsImageLoaded(false);
        const data = await getCharacterFromDatabank(character.name);
        if (data) {
          setDatabankCharacter(data);
        } else {
          setDatabankError("No Databank data found");
        }
      } catch (error: unknown) {
        console.error("Error fetching Databank data:", error);
        setDatabankError("Error fetching Databank data");
      } finally {
        setIsImageLoaded(true);
      }
    }
    fetchDatabankData();
  }, [character.name]);

  // Fetch homeworld data using getHomeworld.
  useEffect(() => {
    async function fetchHomeworldData() {
      try {
        const hw = await getHomeworld(character.homeworld);
        setHomeworld(hw);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setHomeworldError(error.message);
        } else {
          setHomeworldError("Unknown error while fetching homeworld");
        }
      }
    }
    fetchHomeworldData();
  }, [character.homeworld]);

  return (
    <ModalBase onClose={onClose}>
      <Content>
        <Title>{character.name}</Title>
        <ImageContainer>
          {(!isImageLoaded) ? <Spinner data-testid="spinner" /> :
            <Image
              src={databankCharacter ? databankCharacter.image : "/placeholder.webp"}
              sizes={'100%'}
              alt={character.name}
              fill
              style={{ objectFit: "cover", visibility: isImageLoaded ? "visible" : "hidden" }}
              onLoad={() => setIsImageLoaded(true)}
            />}
        </ImageContainer>
        {databankError && <p>Error fetching Image: {databankError}</p>}
        <hr />
        <Details>
          <p>Height: {character.height} cm</p>
          <p>Mass: {character.mass} kg</p>
          <p>Gender: {character.gender}</p>
          <p>Birth Year: {character.birth_year}</p>
          <p>Number of Films: {character.films.length}</p>
        </Details>
        {homeworldError && <p>Error fetching homeworld info: {homeworldError}</p>}
        {homeworld ? (
          <HomeworldContainer>
            <h3>Homeworld: {homeworld.name}</h3>
            <p>Terrain: {homeworld.terrain}</p>
            <p>Climate: {homeworld.climate}</p>
            <p>Population: {homeworld.population}</p>
          </HomeworldContainer>
        ) : (
          <div style={{ margin: "auto", width: "fit-content" }}>
            <Spinner />
          </div>
        )}
      </Content>
    </ModalBase>
  );
}
