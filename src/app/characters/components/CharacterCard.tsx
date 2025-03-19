"use client";
import React from "react";
import { Character } from "@/types/character";
import { Card, CardTitle } from "./CharacterCard.styles";

/**
 * Props for the CharacterCard component.
 *
 * @property {Character} character - The character data to display.
 * @property {() => void} [onClick] - Optional click handler when the card is clicked.
 */
interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

/**
 * CharacterCard component.
 *
 * Displays a simple card containing the character's name.
 *
 * @param character - The character object.
 * @param onClick - Optional click handler.
 * @returns The rendered character card.
 */
export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <Card onClick={onClick}>
      <CardTitle>{character.name}</CardTitle>
    </Card>
  );
}
