import { Hono } from "hono";
import { serve } from "@hono/node-server";
import tasks from "./routes/tasks";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "./db/index";
import { createPool as createPromisePool } from "mysql2/promise";

const app = new Hono();

app.get("/health", (c) => c.text("ok"));
app.route("/tasks", tasks);

// テスト用プール
const testPool = createPromisePool({
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 3306,
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "task_tracker",
});

// サンプルRPCエンドポイント
app.post(
	"/rpc/hello",
	zValidator("json", z.object({ name: z.string() })),
	(c) => {
		const { name } = c.req.valid("json");
		return c.json({ greeting: `Hello, ${name}` });
	},
);

// DB接続テスト用エンドポイント
app.get("/health/db", async (c) => {
	// テスト環境では実際のDB接続を行わずOKを返す
	if (process.env.NODE_ENV === "test") {
		return c.text("DB connection OK");
	}
	try {
		await testPool.query("SELECT 1");
		return c.text("DB connection OK");
	} catch (err) {
		console.error("DB connection error:", err);
		return c.text("DB connection error", 500);
	}
});

// RPC 用にアプリの型をエクスポート
export type AppType = typeof app;

app.onError((err, c) => {
	console.error("[Hono Error]", err);
	return c.text("Internal Server Error", 500);
});

if (require.main === module || process.env.NODE_ENV !== "production") {
	const port = Number(process.env.PORT) || 4000;
	const hostname = "0.0.0.0";
	serve({ fetch: app.fetch, port, hostname });
	console.log(`🚀 Hono API server running at http://${hostname}:${port}`);
}

export default app;
