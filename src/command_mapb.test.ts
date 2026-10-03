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

describe.each([
  {
    input: " hello world ",
    expected: ["hello", "world"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

//commandMapb
test("commandMapb prints message when previousLocationsURL is null", async () => {
  const mockResponse = {
    count: 0,
    next: "http://somepage-1.cl",
    previous: "http://actualpage.cl",
    results: [],
  };

  const logSpy = vi.spyOn(console, "log");

  await commandMapb(state);

  expect(logSpy).toHaveBeenCalledWith("you're on the first page");
});

test("commandMapb updates the previous page from response", async () => {
  state.previousLocationsURL = "http://previouspage.cl";

  const mockResponse = {
    count: 1,
    next: "http://nextpage-2.cl",
    previous: "http://previouspage-2.cl",
    results: [],
  };

  const stateSpy = vi
    .spyOn(state.pokeapi, "fetchLocations")
    .mockResolvedValue(mockResponse);

  await commandMap(state);

  expect(state.previousLocationsURL).toBe("http://previouspage-2.cl");
});

test("commandMap updates nextLocationsURL from the response", async () => {
  state.previousLocationsURL = "http://previouspage.cl";

  const mockResponse = {
    count: 1,
    next: "http://page-3.cl",
    previous: "http://page-1.cl",
    results: [],
  };

  vi.spyOn(state.pokeapi, "fetchLocations").mockResolvedValue(mockResponse);

  await commandMapb(state);

  expect(state.previousLocationsURL).toBe("http://page-1.cl");
});
