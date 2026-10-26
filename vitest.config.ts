import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["tests/**/*.test.ts", "legacy/**/*.test.js"],
    coverage: {
      include: ["src/**/*.ts"],
      exclude: ["src/server.ts"],
      thresholds: { lines: 80 },
    },
  },
});
