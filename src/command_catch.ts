import { State } from "./state.js";

export async function commandCatch(
  state: State,
  pokemonName?: string,
): Promise<void> {
  if (pokemonName === undefined) {
    console.log("catch command must be called with a valid pokemon's name");
    return;
  }

  const result = await state.pokeapi.fetchPokemon(pokemonName);

  if (!result) {
    console.log("There's no Pokemon with that name");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const random = Math.floor(Math.random() * result.base_experience);

  if (random < 40) {
    console.log(`${pokemonName} was caught!`);
    console.log("You may now inspect it with the inspect command.");
    state.pokedex[pokemonName] = result;
    state.catchAttempts.delete(pokemonName);
    return;
  }

  const attempts = state.catchAttempts.get(pokemonName) ?? 0;

  state.catchAttempts.set(pokemonName, attempts + 1);

  if (attempts === 10) {
    console.log(`${pokemonName} was caught!`);
    state.pokedex[pokemonName] = result;
    state.catchAttempts.delete(pokemonName);
    return;
  }
}
