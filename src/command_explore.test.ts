import { cleanInput } from "./repl.js";
import { commandExplore } from "./command_explore.js";
import { State } from "./state.js";
import { createInterface, type Interface } from "readline";
import { PokeAPI } from "./pokeapi.js";
import { describe, expect, test, vi, afterEach, beforeEach } from "vitest";

test("commandExplore returns message when used without location", async () => {
  const state = {
    pokeapi: {
      fetchLocation: vi.fn(),
    },
  } as unknown as State;

  const logSpy = vi.spyOn(console, "log");

  await commandExplore(state);

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy.mock.calls[0][0]).toBe(
    "Explore command must be called with a valid location",
  );
});
/*
test("commandExplore return correct pokemon encounters pokemon", async () => {
  const mockResponse = {
    pokemon_encounters: [
    {
      pokemon: {
        name: "pikachu",
        url: "https://pokeapi.co/api/v2/pokemon/25/",
      },
    },
    {
      pokemon: {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
      },
    }
  ]
})*/

test("commandExplore calls fetchLocation with location", async () => {
  const mockResponse = {
    pokemon_encounters: [
      {
        pokemon: {
          name: "pikachu",
          url: "https://pokeapi.co/api/v2/pokemon/25/",
        },
      },
      {
        pokemon: {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
      },
    ],
  };

  const state: State = {
    pokeapi: {
      fetchLocation: vi.fn(),
    },
  } as unknown as State;

  const logSpy = vi
    .spyOn(state.pokeapi, "fetchLocation")
    .mockResolvedValue(mockResponse);

  await commandExplore(state, "canalave-city-area");

  expect(state.pokeapi.fetchLocation).toHaveBeenCalledWith(
    "canalave-city-area",
  );
});
