/**
 * Represents a Star Wars character.
 *
 * @remarks
 * This interface defines the structure for a Star Wars character used throughout the application.
 * It closely follows the data returned by the SWAPI.
 *
 * @property {string} name - The character's name.
 * @property {string} height - The character's height.
 * @property {string} mass - The character's mass.
 * @property {string} gender - The character's gender.
 * @property {string} birth_year - The character's birth year.
 * @property {string} homeworld - The URL to the character's homeworld.
 * @property {string[]} films - An array of URLs of films in which the character appears.
 * @property {string} url - The URL for the character's resource.
 * @property {string} eye_color - The character's eye color.
 * @property {string} hair_color - The character's hair color.
 * @property {string} skin_color - The character's skin color.
 * @property {string} created - The timestamp when the character was created.
 * @property {string} edited - The timestamp when the character was last edited.
 * @property {string[]} species - An array of URLs of the species to which the character belongs.
 * @property {string[]} starships - An array of URLs of the starships that the character has piloted.
 * @property {string[]} vehicles - An array of URLs of the vehicles that the character has piloted.
 */
export interface Character {
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
  homeworld: string;
  films: string[];
  url: string;
  eye_color: string;
  hair_color: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  vehicles: string[];
}
