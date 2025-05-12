import { Hono } from "hono";
import { serve } from "@hono/node-server";
import tasks from "./routes/tasks";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

app.get("/health", (c) => c.text("ok"));
app.route("/tasks", tasks);

// サンプルRPCエンドポイント
app.post(
	"/rpc/hello",
	zValidator("json", z.object({ name: z.string() })),
	(c) => {
		const { name } = c.req.valid("json");
		return c.json({ greeting: `Hello, ${name}` });
	},
);

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
