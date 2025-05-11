import { Hono } from "hono";
import { serve } from "@hono/node-server";
import tasks from "./routes/tasks";

const app = new Hono();

app.get("/health", (c) => c.text("ok"));
app.route("/tasks", tasks);

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
