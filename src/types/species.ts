/**
 * Represents a species as returned by the SWAPI.
 *
 * @remarks
 * This interface defines the structure of species data, including classification and physical attributes.
 *
 * @property {string} name - The name of the species.
 * @property {string} classification - The classification (e.g., mammal, reptile) of the species.
 * @property {string} designation - The designation (e.g., sentient) of the species.
 * @property {string} average_height - The average height (in centimeters) of the species.
 * @property {string} average_lifespan - The average lifespan (in years) of the species.
 * @property {string} eye_colors - A comma-separated list of common eye colors for the species.
 * @property {string} hair_colors - A comma-separated list of common hair colors for the species.
 * @property {string} skin_colors - A comma-separated list of common skin colors for the species.
 * @property {string} language - The language commonly spoken by the species.
 * @property {string} homeworld - The URL of the homeworld of the species (if available).
 * @property {string[]} people - An array of URLs for characters belonging to the species.
 * @property {string[]} films - An array of URLs for films in which the species appears.
 * @property {string} url - The URL of the species resource.
 * @property {string} created - The ISO timestamp when the species resource was created.
 * @property {string} edited - The ISO timestamp when the species resource was last edited.
 */
export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  people: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}
