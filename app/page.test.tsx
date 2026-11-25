import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import Home from "./page";

afterEach(cleanup);

test("shows the Hello World heading", () => {
  render(<Home />);
  expect(screen.getByText("Gal Amano")).toBeDefined();
  expect(screen.getByText("Hello World")).toBeDefined();
});

test("shows the guess the number game", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { name: "Guess the number" }),
  ).toBeDefined();
});
