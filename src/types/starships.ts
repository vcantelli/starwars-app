/**
 * Represents a starship as returned by the SWAPI.
 *
 * @remarks
 * This interface defines the structure for a starship's data, including technical and operational details.
 *
 * @property {string} name - The name of the starship.
 * @property {string} model - The model or official name of the starship.
 * @property {string} starship_class - The class of the starship (e.g., Starfighter, Capital Ship).
 * @property {string} manufacturer - The manufacturer(s) of the starship.
 * @property {string} cost_in_credits - The cost of the starship in galactic credits.
 * @property {string} length - The length of the starship in meters.
 * @property {string} crew - The number of personnel needed to operate the starship.
 * @property {string} passengers - The number of non-essential people the starship can transport.
 * @property {string} max_atmosphering_speed - The maximum speed of the starship in an atmosphere.
 * @property {string} hyperdrive_rating - The hyperdrive rating of the starship.
 * @property {string} MGLT - The Maximum number of Megalights the starship can travel in a standard hour.
 * @property {string} cargo_capacity - The maximum cargo capacity of the starship.
 * @property {string} [consumables] - The maximum duration (as a string) the starship can provide consumables for its entire crew without resupply.
 * @property {string[]} films - An array of URLs for films in which the starship appears.
 * @property {string[]} pilots - An array of URLs for the pilots of the starship.
 * @property {string} url - The URL of the starship resource.
 * @property {string} created - The ISO timestamp when the starship resource was created.
 * @property {string} edited - The ISO timestamp when the starship resource was last edited.
 */
export interface Starship {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables?: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
}
