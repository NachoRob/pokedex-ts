# Pokédex CLI

A command-line Pokédex built with TypeScript and Node.js using the PokéAPI.

This project was built as part of the Boot.dev backend development curriculum. It implements an interactive REPL where users can explore Pokémon locations, catch Pokémon, inspect their stats, and keep track of their Pokédex.

## Features

- Interactive command-line REPL
- Explore Pokémon locations using the PokéAPI
- Paginated location navigation
- Response caching with automatic expiration
- Catch Pokémon with a probability based on their base experience
- Track catch attempts independently for each Pokémon
- Store caught Pokémon in an in-memory Pokédex
- Inspect caught Pokémon, including:
  - Name
  - Height
  - Weight
  - Base stats
  - Types
- List all caught Pokémon
- Error handling for invalid Pokémon and commands
- Unit tests with Vitest

## Commands

| Command | Description |
| --- | --- |
| `help` | Displays the available commands |
| `map` | Shows the next page of location areas |
| `mapb` | Shows the previous page of location areas |
| `explore <location>` | Lists Pokémon found in a location |
| `catch <pokemon>` | Attempts to catch a Pokémon |
| `inspect <pokemon>` | Displays information about a caught Pokémon |
| `pokedex` | Lists all caught Pokémon |
| `exit` | Exits the Pokédex |

## Example

```text
Pokedex > explore canalave-city-area
Exploring canalave-city-area...
Found Pokemon:
- tentacool
- tentacruel
- staryu
- magikarp

Pokedex > catch pidgey
Throwing a Pokeball at pidgey...
pidgey was caught!
You may now inspect it with the inspect command.

Pokedex > inspect pidgey
Name: pidgey
Height: 3
Weight: 18
Stats:
  -hp: 40
  -attack: 45
  -defense: 40
  -special-attack: 35
  -special-defense: 35
  -speed: 56
Types:
  - normal
  - flying

Pokedex > pokedex
Your Pokedex:
- pidgey
```

## Tech Stack

- TypeScript
- Node.js
- PokéAPI
- Vitest

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd pokedex
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

## Testing

Run the test suite:

```bash
npm test
```

The project includes tests for the REPL, cache, navigation, exploration, catching Pokémon, inspecting Pokémon, and Pokédex behavior.

## What I Learned

This project helped me practice several TypeScript and backend development concepts, including:

- Building an asynchronous REPL
- Working with external REST APIs
- Modeling API responses with TypeScript types
- Managing application state
- Using `Map` and `Record`
- Implementing an in-memory cache
- Handling asynchronous errors
- Writing deterministic tests for random behavior
- Separating API logic from application logic

## Possible Improvements

- Persist the Pokédex between sessions
- Add Pokémon battles
- Add Pokémon parties and leveling
- Implement evolution
- Add random encounters
- Add different Poké Ball types with different catch probabilities
- Expand test coverage

## Acknowledgements

Built as part of the [Boot.dev](https://www.boot.dev/) backend development curriculum.

Pokémon data is provided by [PokéAPI](https://pokeapi.co/).
