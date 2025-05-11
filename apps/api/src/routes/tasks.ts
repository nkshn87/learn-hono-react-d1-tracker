import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Task } from "types";

const tasks = new Hono();

// メモリ上のタスク配列
const taskList: Task[] = [
	{
		id: 1,
		title: "サンプルタスク",
		description: "これはサンプルタスクです",
		status: "todo",
		project_id: null,
		created_at: new Date(),
		updated_at: new Date(),
	},
];
let nextId = 2;

// GET /tasks - タスク一覧取得
tasks.get("/", (c) => {
	return c.json({ ok: true, tasks: taskList });
});

// GET /tasks/:id - タスク詳細取得
tasks.get("/:id", (c) => {
	const id = Number(c.req.param("id"));
	const task = taskList.find((t) => t.id === id);
	if (!task) {
		return c.json({ ok: false, error: "Task not found" }, 404);
	}
	return c.json({ ok: true, task });
});

// POST /tasks - 新規タスク作成
tasks.post(
	"/",
	zValidator(
		"form",
		z.object({
			title: z.string(),
			description: z.string().nullable().optional(),
			status: z.enum(["todo", "in_progress", "done"]).optional(),
			project_id: z.number().nullable().optional(),
		}),
	),
	(c) => {
		const data = c.req.valid("form");
		const now = new Date();
		const task: Task = {
			id: nextId++,
			title: data.title,
			description: data.description ?? null,
			status: data.status ?? "todo",
			project_id: data.project_id ?? null,
			created_at: now,
			updated_at: now,
		};
		taskList.push(task);
		return c.json({ ok: true, task }, 201);
	},
);

// PUT /tasks/:id - タスク更新
tasks.put(
	"/:id",
	zValidator(
		"form",
		z.object({
			title: z.string().optional(),
			description: z.string().nullable().optional(),
			status: z.enum(["todo", "in_progress", "done"]).optional(),
			project_id: z.number().nullable().optional(),
		}),
	),
	(c) => {
		const id = Number(c.req.param("id"));
		const data = c.req.valid("form");
		const task = taskList.find((t) => t.id === id);
		if (!task) {
			return c.json({ ok: false, error: "Task not found" }, 404);
		}
		if (data.title !== undefined) task.title = data.title;
		if (data.description !== undefined) task.description = data.description;
		if (data.status !== undefined) task.status = data.status;
		if (data.project_id !== undefined) task.project_id = data.project_id;
		task.updated_at = new Date();
		return c.json({ ok: true, task });
	},
);

// DELETE /tasks/:id - タスク削除
tasks.delete("/:id", (c) => {
	const id = Number(c.req.param("id"));
	const idx = taskList.findIndex((t) => t.id === id);
	if (idx === -1) {
		return c.json({ ok: false, error: "Task not found" }, 404);
	}
	taskList.splice(idx, 1);
	return c.json({ ok: true, id });
});

export default tasks;
