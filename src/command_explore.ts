import { State } from "./state.js";

export async function commandExplore(
  state: State,
  location?: string,
): Promise<void> {
  if (location === undefined) {
    console.log("Explore command must be called with a valid location");
    return;
  }
  const result = await state.pokeapi.fetchLocation(location);

  for (const pokemon of result.pokemon_encounters) {
    console.log(pokemon.pokemon.name);
  }
}
