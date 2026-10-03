import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  const pokemonList = Object.values(state.pokedex);

  if (pokemonList.length === 0) {
    console.log("Your pokedex is empty. Try catching a Pokemon first");
    return;
  }

  console.log("Your Pokedex: ");

  for (const pokemon of pokemonList) {
    console.log(`- ${pokemon.name}`);
  }
}
