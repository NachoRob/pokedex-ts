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

test("commandExit prints message", () => {
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  const exitSpy = vi
    .spyOn(process, "exit")
    .mockImplementation(() => undefined as never);

  commandExit(state);

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy.mock.calls[0][0]).toBe(`Closing the Pokedex... Goodbye!`);
});
