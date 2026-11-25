import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import GuessNumberGame from "./GuessNumberGame";

afterEach(cleanup);

function guess(value: string) {
  fireEvent.change(screen.getByLabelText("Your guess"), {
    target: { value },
  });
  fireEvent.click(screen.getByRole("button", { name: "Guess" }));
}

describe("GuessNumberGame", () => {
  test("starts with 0 attempts and no message", () => {
    render(<GuessNumberGame secret={50} />);
    expect(screen.getByText("Attempts: 0")).toBeDefined();
    expect(screen.getByRole("status").textContent).toBe("");
  });

  test("says too low for a guess below the number", () => {
    render(<GuessNumberGame secret={50} />);
    guess("30");
    expect(screen.getByRole("status").textContent).toBe("Too low!");
  });

  test("says too high for a guess above the number", () => {
    render(<GuessNumberGame secret={50} />);
    guess("70");
    expect(screen.getByRole("status").textContent).toBe("Too high!");
  });

  test("says got it for the right number", () => {
    render(<GuessNumberGame secret={50} />);
    guess("50");
    expect(screen.getByRole("status").textContent).toBe(
      "Got it! The number was 50.",
    );
  });

  test("each valid guess adds one attempt", () => {
    render(<GuessNumberGame secret={50} />);
    guess("30");
    guess("70");
    guess("50");
    expect(screen.getByText("Attempts: 3")).toBeDefined();
  });

  test("an invalid guess shows an error and does not count", () => {
    render(<GuessNumberGame secret={50} />);
    guess("abc");
    expect(screen.getByRole("status").textContent).toBe(
      "Enter a whole number between 1 and 100.",
    );
    guess("150");
    expect(screen.getByText("Attempts: 0")).toBeDefined();
  });

  test("the input is cleared after each guess", () => {
    render(<GuessNumberGame secret={50} />);
    guess("30");
    const input = screen.getByLabelText("Your guess") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  test("after winning, guessing is locked until Play again", () => {
    render(<GuessNumberGame secret={50} />);
    guess("50");
    const input = screen.getByLabelText("Your guess") as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(screen.queryByRole("button", { name: "Guess" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Play again" }));
    expect(input.disabled).toBe(false);
    expect(screen.getByText("Attempts: 0")).toBeDefined();
    expect(screen.getByRole("status").textContent).toBe("");
  });
});
