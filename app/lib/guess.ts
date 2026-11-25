export const MIN = 1;
export const MAX = 100;

export type GuessResult = "low" | "high" | "correct" | "invalid";

/** Compares the player's raw input with the secret number. */
export function checkGuess(input: string, secret: number): GuessResult {
  const trimmed = input.trim();
  if (!/^\d+$/.test(trimmed)) return "invalid";

  const guess = Number(trimmed);
  if (guess < MIN || guess > MAX) return "invalid";

  if (guess < secret) return "low";
  if (guess > secret) return "high";
  return "correct";
}

/** Picks a whole number between MIN and MAX. `random` returns a value in [0, 1). */
export function randomSecret(random: () => number = Math.random): number {
  return MIN + Math.floor(random() * (MAX - MIN + 1));
}
