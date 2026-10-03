import { State } from "./state.js";

export async function commandInspect(
  state: State,
  pokemonName?: string,
): Promise<void> {
  if (pokemonName === undefined) {
    console.log("You must type a valid pokemon name for command inspect");
    return;
  }

  const inspectedPokemon = state.pokedex[pokemonName];

  if (!inspectedPokemon) {
    console.log("you have not caught that pokemon");
    return;
  }

  console.log(`Name: ${inspectedPokemon.name}`);
  console.log(`Height: ${inspectedPokemon.height}`);
  console.log(`Weight: ${inspectedPokemon.weight}`);
  console.log("Stats:");

  for (const stat of inspectedPokemon.stats) {
    console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
  }

  console.log("Types:");
  for (const type of inspectedPokemon.types) {
    console.log(`  - ${type.type.name}`);
  }
}
