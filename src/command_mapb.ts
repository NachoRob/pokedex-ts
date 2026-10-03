import { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
  if (state.previousLocationsURL === null) {
    console.log("you're on the first page");
    return;
  }
  const result = await state.pokeapi.fetchLocations(state.previousLocationsURL);
  state.previousLocationsURL = result.previous;
  state.nextLocationsURL = result.next;
  for (const element of result.results) {
    console.log(element.name);
  }
}
