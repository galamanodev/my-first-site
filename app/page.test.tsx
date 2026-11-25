import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the name as the main heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Gal Amano" }),
    ).toBeDefined();
  });

  it("renders the Hello World tagline", () => {
    render(<Home />);
    expect(screen.getByText("Hello World")).toBeDefined();
  });
});
