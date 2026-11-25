import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import Home from "./page";

afterEach(cleanup);

test("shows the name heading", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { name: "Gal Amano" })).toBeDefined();
});

test("no longer shows Hello World", () => {
  render(<Home />);
  expect(screen.queryByText("Hello World")).toBeNull();
});

test("shows the guess the number game", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { name: "Guess the number" }),
  ).toBeDefined();
});
