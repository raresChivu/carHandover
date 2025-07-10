import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setupTests.js"],
    include: [
      "src/testing/**/*.test.{ts,tsx}",
      "src/testing/**/*.jest.test.{ts,tsx}",
    ],
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
