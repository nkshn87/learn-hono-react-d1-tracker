import { describe, it, expect } from "vitest";
import app from "./index";

// Node Fetch が必要ならグローバル fetch を設定

describe("API Endpoints", () => {
	it("/health returns ok", async () => {
		const res = await app.fetch(new Request("http://localhost/health"));
		expect(res.status).toBe(200);
		expect(await res.text()).toBe("ok");
	});

	it("/health/db returns DB connection OK", async () => {
		const res = await app.fetch(new Request("http://localhost/health/db"));
		expect(res.status).toBe(200);
		expect(await res.text()).toBe("DB connection OK");
	});
});
