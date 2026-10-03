import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor() {
    this.#cache = new Cache(5000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;

    const cachedUrl = this.#cache.get<ShallowLocations>(url);

    if (cachedUrl) {
      return cachedUrl;
    }

    const response = await fetch(url);

    const parsedResponse = await response.json();

    this.#cache.add(url, parsedResponse);

    return parsedResponse;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}/`;

    const cachedUrl = this.#cache.get<Location>(url);

    if (cachedUrl) {
      return cachedUrl;
    }

    const response = await fetch(url);

    const parsedResponse = await response.json();

    this.#cache.add(url, parsedResponse);

    return parsedResponse;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon | void> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}/`;

    const cachedUrl = this.#cache.get<Pokemon>(url);

    if (cachedUrl) {
      return cachedUrl;
    }

    const response = await fetch(url);

    if (response.status === 404) {
      return;
    }
    const parsedResponse = await response.json();

    this.#cache.add(url, parsedResponse);

    return parsedResponse;
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
};
