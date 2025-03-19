/**
 * Represents a planet as returned by the SWAPI.
 *
 * @remarks
 * This interface is used for planet data and is similar to the Homeworld interface.
 *
 * @property {string} name - The planet's name.
 * @property {string} diameter - The diameter of the planet.
 * @property {string} rotation_period - The rotation period of the planet.
 * @property {string} orbital_period - The orbital period of the planet.
 * @property {string} gravity - The gravity on the planet.
 * @property {string} population - The planet's population.
 * @property {string} climate - The climate description of the planet.
 * @property {string} terrain - The terrain type(s) of the planet.
 * @property {string} surface_water - The percentage of the planet's surface that is water.
 * @property {string[]} residents - An array of URLs for the residents.
 * @property {string[]} films - An array of URLs for films in which the planet appears.
 * @property {string} url - The URL of the planet resource.
 * @property {string} created - The ISO timestamp when the planet resource was created.
 * @property {string} edited - The ISO timestamp when the planet resource was last edited.
 */
export interface Planet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}
