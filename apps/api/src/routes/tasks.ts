import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Task } from "types";
import { db } from "../db/index";

const tasks = new Hono();

// GET /tasks - タスク一覧取得
tasks.get("/", async (c) => {
	const tasksList = await db.selectFrom("tasks").selectAll().execute();
	return c.json({ ok: true, tasks: tasksList });
});

// GET /tasks/:id - タスク詳細取得
tasks.get("/:id", async (c) => {
	const id = Number(c.req.param("id"));
	const task = await db
		.selectFrom("tasks")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();
	if (!task) {
		return c.json({ ok: false, error: "Task not found" }, 404);
	}
	return c.json({ ok: true, task });
});

// POST /tasks - 新規タスク作成
tasks.post(
	"/",
	zValidator(
		"json",
		z.object({
			title: z.string(),
			description: z.string().nullable().optional(),
			status: z.enum(["todo", "in_progress", "done"]).optional(),
			project_id: z.number().nullable().optional(),
		}),
	),
	async (c) => {
		const data = c.req.valid("json");
		const now = new Date();
		const [insertResult] = await db
			.insertInto("tasks")
			.values({
				title: data.title,
				description: data.description ?? null,
				status: data.status ?? "todo",
				project_id: data.project_id ?? null,
				created_at: now,
				updated_at: now,
			})
			.execute();
		const inserted = await db
			.selectFrom("tasks")
			.selectAll()
			.where("id", "=", Number(insertResult.insertId))
			.executeTakeFirst();
		return c.json({ ok: true, task: inserted }, 201);
	},
);

// PUT /tasks/:id - タスク更新
tasks.put(
	"/:id",
	zValidator(
		"json",
		z.object({
			title: z.string().optional(),
			description: z.string().nullable().optional(),
			status: z.enum(["todo", "in_progress", "done"]).optional(),
			project_id: z.number().nullable().optional(),
		}),
	),
	async (c) => {
		const id = Number(c.req.param("id"));
		const data = c.req.valid("json");
		// 存在確認
		const existing = await db
			.selectFrom("tasks")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (!existing) {
			return c.json({ ok: false, error: "Task not found" }, 404);
		}
		const updateData: Partial<Task> = {};
		if (data.title !== undefined) updateData.title = data.title;
		if (data.description !== undefined)
			updateData.description = data.description;
		if (data.status !== undefined) updateData.status = data.status;
		if (data.project_id !== undefined) updateData.project_id = data.project_id;
		updateData.updated_at = new Date();
		await db
			.updateTable("tasks")
			.set(updateData)
			.where("id", "=", id)
			.execute();
		const updated = await db
			.selectFrom("tasks")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		return c.json({ ok: true, task: updated });
	},
);

// DELETE /tasks/:id - タスク削除
tasks.delete("/:id", async (c) => {
	const id = Number(c.req.param("id"));
	// 存在確認
	const existing = await db
		.selectFrom("tasks")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();
	if (!existing) {
		return c.json({ ok: false, error: "Task not found" }, 404);
	}
	await db.deleteFrom("tasks").where("id", "=", id).execute();
	return c.json({ ok: true, id });
});

export default tasks;
