import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  for (const element of Object.values(state.commands)) {
    console.log(`${element.name}: ${element.description}`);
  }
}
