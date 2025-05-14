// @ts-nocheck
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		include: ["apps/web/src/**/*.test.tsx", "apps/web/src/**/*.test.ts"],
		setupFiles: "apps/web/src/setupTests.ts",
	},
});
