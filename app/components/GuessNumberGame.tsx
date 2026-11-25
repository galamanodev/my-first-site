"use client";

import { useState, type FormEvent } from "react";
import { checkGuess, MAX, MIN, randomSecret } from "../lib/guess";

const MESSAGES = {
  low: "Too low!",
  high: "Too high!",
  invalid: `Enter a whole number between ${MIN} and ${MAX}.`,
} as const;

type Props = {
  /** Fixes the secret number (used by tests). Random when left out. */
  secret?: number;
};

export default function GuessNumberGame({ secret: fixedSecret }: Props) {
  // The secret is picked on the first guess, not while the page renders:
  // Next.js prerenders this page at build time and forbids Math.random() there.
  const [secret, setSecret] = useState<number | null>(fixedSecret ?? null);
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [won, setWon] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentSecret = secret ?? randomSecret();
    setSecret(currentSecret);
    const result = checkGuess(input, currentSecret);
    setInput("");

    if (result === "invalid") {
      setMessage(MESSAGES.invalid);
      return;
    }

    setAttempts(attempts + 1);
    if (result === "correct") {
      setWon(true);
      setMessage(`Got it! The number was ${currentSecret}.`);
    } else {
      setMessage(MESSAGES[result]);
    }
  }

  function playAgain() {
    setSecret(null);
    setAttempts(0);
    setMessage("");
    setWon(false);
  }

  return (
    <section className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-2xl font-semibold text-white">Guess the number</h2>
      <p className="text-sm text-zinc-400">
        I&apos;m thinking of a number between {MIN} and {MAX}.
      </p>

      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <label htmlFor="guess" className="sr-only">
          Your guess
        </label>
        <input
          id="guess"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={won}
          placeholder={`${MIN}-${MAX}`}
          className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-black px-3 py-2 text-white placeholder:text-zinc-600 focus:border-zinc-400 focus:outline-none disabled:opacity-50"
        />
        {!won && (
          <button
            type="submit"
            className="rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-zinc-300"
          >
            Guess
          </button>
        )}
      </form>

      <p role="status" className="min-h-6 text-lg text-zinc-200">
        {message}
      </p>
      <p className="text-sm text-zinc-500">Attempts: {attempts}</p>

      {won && (
        <button
          type="button"
          onClick={playAgain}
          className="rounded-lg border border-zinc-600 px-4 py-2 text-white transition hover:bg-zinc-900"
        >
          Play again
        </button>
      )}
    </section>
  );
}
