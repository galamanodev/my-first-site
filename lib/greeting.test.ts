import { describe, expect, it } from "vitest";
import { greeting } from "./greeting";

describe("greeting", () => {
  it("greets in the morning", () => {
    expect(greeting("Gal", 9)).toBe("Good morning, Gal!");
  });

  it("greets in the afternoon", () => {
    expect(greeting("Gal", 14)).toBe("Good afternoon, Gal!");
  });

  it("greets in the evening", () => {
    expect(greeting("Gal", 21)).toBe("Good evening, Gal!");
  });

  it("rejects an invalid hour", () => {
    expect(() => greeting("Gal", 25)).toThrow(RangeError);
  });
});
