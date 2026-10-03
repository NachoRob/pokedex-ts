import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 locations areas",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Explores a location area and lists the Pokémon found there",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempts to catch a Pokémon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Prints the pokemon stats if it is in players pokedex",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Prints the the actual pokedex pokemon name list",
      callback: commandPokedex,
    },
  };
}
