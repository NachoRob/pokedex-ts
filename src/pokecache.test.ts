import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  test("stores and retrieves a value", () => {
    const cache = new Cache(5000);

    const result = {
      name: "pikachu",
      level: 25,
      type: "electric",
    };

    cache.add("pikachu", result);

    const checkResult = cache.get("pikachu");

    expect(checkResult).toBe(result);

    cache.stopReapLoop();
  });
});
