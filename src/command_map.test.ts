import { cleanInput } from "./repl.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { State } from "./state.js";
import { createInterface, type Interface } from "readline";
import { PokeAPI } from "./pokeapi.js";
import { describe, expect, test, vi, afterEach, beforeEach } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
});

let state: State;

beforeEach(() => {
  state = {
    commands: {
      help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
      },
      exit: {
        name: "exit",
        description: "Exit the Pokedex",
        callback: commandExit,
      },
    },
    rl: {
      close: vi.fn(),
    } as unknown as Interface,
    pokeapi: new PokeAPI(),
    nextLocationsURL: null,
    previousLocationsURL: null,
    catchAttempts: new Map<string, number>(),
    pokedex: {},
  };
});

test("commandMap fetches the first page when nextLocationURL is null", async () => {
  const mockResponse = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  const logSpy = vi
    .spyOn(state.pokeapi, "fetchLocations")
    .mockResolvedValue(mockResponse);

  await commandMap(state);

  expect(logSpy).toHaveBeenCalledWith(undefined);
});

test("commandMap fetches the second page when nextLocationURL is not null", async () => {
  state.nextLocationsURL = "http://nextpage.cl";

  const mockResponse = {
    count: 1,
    next: "http://nextpagenot.cl",
    previous: "http://previouspage.cl",
    results: [],
  };

  const logSpy = vi
    .spyOn(state.pokeapi, "fetchLocations")
    .mockResolvedValue(mockResponse);

  await commandMap(state);

  expect(logSpy).toHaveBeenCalledWith("http://nextpage.cl");
});

test("commandMap updates nextLocationsURL from the response", async () => {
  const mockResponse = {
    count: 1,
    next: "http://page-2.cl",
    previous: null,
    results: [],
  };

  vi.spyOn(state.pokeapi, "fetchLocations").mockResolvedValue(mockResponse);

  await commandMap(state);

  expect(state.nextLocationsURL).toBe("http://page-2.cl");
});
