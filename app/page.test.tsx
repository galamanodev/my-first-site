import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "./page";

test("shows the Hello World heading", () => {
  render(<Home />);
  expect(screen.getByText("Gal Amano")).toBeDefined();
  expect(screen.getByText("Hello World")).toBeDefined();
});
