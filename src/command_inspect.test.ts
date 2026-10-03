import { describe, expect, test, vi, afterEach } from "vitest";
import { commandInspect } from "./command_inspect.js";
import { State } from "./state.js";
import { Pokemon } from "./pokeapi.js";

const pidgey: Pokemon = {
  name: "pidgey",
  base_experience: 50,
  height: 3,
  weight: 18,
  stats: [
    { base_stat: 40, stat: { name: "hp" } },
    { base_stat: 45, stat: { name: "attack" } },
    { base_stat: 40, stat: { name: "defense" } },
    { base_stat: 35, stat: { name: "special-attack" } },
    { base_stat: 35, stat: { name: "special-defense" } },
    { base_stat: 56, stat: { name: "speed" } },
  ],
  types: [{ type: { name: "normal" } }, { type: { name: "flying" } }],
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

describe("commandInspect", () => {
  test("prints a caught pokemon", async () => {
    const state = createState();
    state.pokedex["pidgey"] = pidgey;

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandInspect(state, "pidgey");

    expect(consoleSpy).toHaveBeenCalledWith("Name: pidgey");
    expect(consoleSpy).toHaveBeenCalledWith("Height: 3");
    expect(consoleSpy).toHaveBeenCalledWith("Weight: 18");
    expect(consoleSpy).toHaveBeenCalledWith("Stats:");
    expect(consoleSpy).toHaveBeenCalledWith("  -hp: 40");
    expect(consoleSpy).toHaveBeenCalledWith("Types:");
    expect(consoleSpy).toHaveBeenCalledWith("  - normal");
    expect(consoleSpy).toHaveBeenCalledWith("  - flying");
  });

  test("prints an error when pokemon has not been caught", async () => {
    const state = createState();

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandInspect(state, "mewtwo");

    expect(consoleSpy).toHaveBeenCalledWith("you have not caught that pokemon");
  });

  test("prints an error when pokemon name is missing", async () => {
    const state = createState();

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandInspect(state);

    expect(consoleSpy).toHaveBeenCalledWith(
      "You must type a valid pokemon name for command inspect",
    );
  });
});
