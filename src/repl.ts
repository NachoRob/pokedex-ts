import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { initState, State, CLICommand } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(" ");
}

export async function startREPL(): Promise<void> {
  const state = initState();

  state.rl.prompt();

  state.rl.on("line", async (input) => {
    const cleanedInput = cleanInput(input);

    if (!cleanedInput) {
      state.rl.prompt();
      return;
    }

    const userCommand = cleanedInput[0];
    const arg = cleanedInput[1];

    if (!state.commands[userCommand]) {
      console.log("Unknown command");
    } else {
      try {
        await state.commands[userCommand].callback(state, arg);
      } catch (error) {
        console.log(error);
      }
    }

    state.rl.prompt();
  });
}
