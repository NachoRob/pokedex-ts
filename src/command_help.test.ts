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

test("commandHelp prints help message", async () => {
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  await commandHelp(state);

  expect(logSpy).toHaveBeenCalledWith("Welcome to the Pokedex!");
  expect(logSpy).toHaveBeenCalledWith("Usage:");
  expect(logSpy).toHaveBeenCalledWith("help: Displays a help message");
  expect(logSpy).toHaveBeenCalledWith("exit: Exit the Pokedex");

  logSpy.mockRestore();
});
