import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  const result = await state.pokeapi.fetchLocations(
    state.nextLocationsURL ? state.nextLocationsURL : undefined,
  );

  state.nextLocationsURL = result.next;
  state.previousLocationsURL = result.previous;

  for (const element of result.results) {
    console.log(element.name);
  }
}
