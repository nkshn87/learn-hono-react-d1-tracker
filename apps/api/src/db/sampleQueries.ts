import { createDb } from "./index";
import type { Task } from "./schema";

const db = createDb();

// タスク一覧取得（select）
export async function getAllTasks() {
	return await db.selectFrom("tasks").selectAll().execute();
}

// タスク追加（insert）
export async function addTask(task: {
	title: string;
	status: Task["status"];
	description?: string | null;
	project_id?: number | null;
}) {
	return await db.insertInto("tasks").values(task).execute();
}

// タスク更新（update）
export async function updateTask(id: number, data: Partial<Omit<Task, "id">>) {
	return await db.updateTable("tasks").set(data).where("id", "=", id).execute();
}

// プロジェクトごとのタスク一覧（leftJoin, hasMany）
export async function getProjectsWithTasks() {
	return await db
		.selectFrom("projects")
		.leftJoin("tasks", "projects.id", "tasks.project_id")
		.select([
			"projects.id as projectId",
			"projects.name as projectName",
			"tasks.id as taskId",
			"tasks.title as taskTitle",
		])
		.execute();
}
