import { describe, expect, test, vi, afterEach } from "vitest";
import { pokedex } from "./command_pokedex.js";
import { State } from "./state.js";
import { Pokemon } from "./pokeapi.js";

const pidgey: Pokemon = {
  name: "pidgey",
  base_experience: 50,
  height: 3,
  weight: 18,
  stats: [],
  types: [],
};

const pikachu: Pokemon = {
  name: "pikachu",
  base_experience: 112,
  height: 4,
  weight: 60,
  stats: [],
  types: [],
};

function createState(): State {
  return {
    commands: {},
    rl: {} as State["rl"],
    pokeapi: {} as State["pokeapi"],
    nextLocationsURL: null,
    previousLocationsURL: null,
    catchAttempts: new Map<string, number>(),
    pokedex: {},
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("pokedex", () => {
  test("prints all caught pokemon", async () => {
    const state = createState();

    state.pokedex["pidgey"] = pidgey;
    state.pokedex["pikachu"] = pikachu;

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await pokedex(state);

    expect(consoleSpy).toHaveBeenCalledWith("Your Pokedex:");
    expect(consoleSpy).toHaveBeenCalledWith("- pidgey");
    expect(consoleSpy).toHaveBeenCalledWith("- pikachu");
  });

  test("prints a message when pokedex is empty", async () => {
    const state = createState();

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await pokedex(state);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Your pokedex is empty. Try catching a Pokemon first",
    );
  });
});
