import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Vitest doesn't expose globals by default, so React Testing Library can't
// register its own auto-cleanup. Unmount rendered components after each test.
afterEach(() => {
  cleanup();
});
