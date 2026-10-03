import { describe, expect, test, vi, afterEach } from "vitest";
import { commandCatch } from "./command_catch.js";
import { State } from "./state.js";
import { Pokemon } from "./pokeapi.js";

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
    pokeapi: {
      fetchPokemon: vi.fn().mockResolvedValue(pikachu),
    } as unknown as State["pokeapi"],
    nextLocationsURL: null,
    previousLocationsURL: null,
    catchAttempts: new Map<string, number>(),
    pokedex: {},
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("commandCatch", () => {
  test("catches a pokemon when random roll succeeds", async () => {
    const state = createState();

    vi.spyOn(Math, "random").mockReturnValue(0);

    await commandCatch(state, "pikachu");

    expect(state.pokedex["pikachu"]).toEqual(pikachu);
  });

  test("does not add pokemon to pokedex when catch fails", async () => {
    const state = createState();

    vi.spyOn(Math, "random").mockReturnValue(0.99);

    await commandCatch(state, "pikachu");

    expect(state.pokedex["pikachu"]).toBeUndefined();
  });

  test("increments catch attempts when catch fails", async () => {
    const state = createState();

    vi.spyOn(Math, "random").mockReturnValue(0.99);

    await commandCatch(state, "pikachu");

    expect(state.catchAttempts.get("pikachu")).toBe(1);
  });

  test("tracks attempts separately for each pokemon", async () => {
    const state = createState();

    vi.spyOn(Math, "random").mockReturnValue(0.99);

    await commandCatch(state, "pikachu");
    await commandCatch(state, "bulbasaur");

    expect(state.catchAttempts.get("pikachu")).toBe(1);
    expect(state.catchAttempts.get("bulbasaur")).toBe(1);
  });

  test("removes catch attempts after successful catch", async () => {
    const state = createState();

    state.catchAttempts.set("pikachu", 5);

    vi.spyOn(Math, "random").mockReturnValue(0);

    await commandCatch(state, "pikachu");

    expect(state.catchAttempts.has("pikachu")).toBe(false);
    expect(state.pokedex["pikachu"]).toEqual(pikachu);
  });

  test("does not add an invalid pokemon to pokedex", async () => {
    const state = createState();

    vi.mocked(state.pokeapi.fetchPokemon).mockResolvedValue(undefined);

    await commandCatch(state, "not-a-pokemon");

    expect(state.pokedex["not-a-pokemon"]).toBeUndefined();
  });
});
