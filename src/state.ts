import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  commands: Record<string, CLICommand>;
  rl: Interface;
  pokeapi: PokeAPI;

  nextLocationsURL: string | null;
  previousLocationsURL: string | null;
  catchAttempts: Map<string, number>;
  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands = getCommands();
  const pokeapi = new PokeAPI();
  const nextLocationsURL = null;
  const previousLocationsURL = null;
  const catchAttempts = new Map<string, number>();
  const pokedex: Record<string, Pokemon> = {};
  return {
    commands,
    rl,
    pokeapi,
    nextLocationsURL,
    previousLocationsURL,
    catchAttempts,
    pokedex,
  };
}
