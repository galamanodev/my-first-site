import { describe, expect, test } from "vitest";
import { checkGuess, MAX, MIN, randomSecret } from "./guess";

describe("checkGuess", () => {
  test("a guess below the secret is too low", () => {
    expect(checkGuess("30", 50)).toBe("low");
  });

  test("a guess above the secret is too high", () => {
    expect(checkGuess("70", 50)).toBe("high");
  });

  test("the exact secret is correct", () => {
    expect(checkGuess("50", 50)).toBe("correct");
  });

  test("spaces around the number are ignored", () => {
    expect(checkGuess("  50 ", 50)).toBe("correct");
  });

  test("the edges 1 and 100 are valid guesses", () => {
    expect(checkGuess("1", 50)).toBe("low");
    expect(checkGuess("100", 50)).toBe("high");
  });

  test.each(["", "abc", "0", "101", "150", "-5", "4.5", "12abc"])(
    'the input "%s" is invalid',
    (input) => {
      expect(checkGuess(input, 50)).toBe("invalid");
    },
  );
});

describe("randomSecret", () => {
  test("the lowest random value gives 1", () => {
    expect(randomSecret(() => 0)).toBe(MIN);
  });

  test("the highest random value gives 100", () => {
    expect(randomSecret(() => 0.9999)).toBe(MAX);
  });

  test("always returns a whole number between 1 and 100", () => {
    for (let i = 0; i < 1000; i++) {
      const secret = randomSecret();
      expect(Number.isInteger(secret)).toBe(true);
      expect(secret).toBeGreaterThanOrEqual(MIN);
      expect(secret).toBeLessThanOrEqual(MAX);
    }
  });
});
