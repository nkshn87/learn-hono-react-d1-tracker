// Kysely用DBスキーマ型定義

export interface Task {
	id?: number;
	title: string;
	description: string | null;
	status: "todo" | "in_progress" | "done";
	project_id: number | null;
	created_at?: Date;
	updated_at?: Date;
}

export interface Project {
	id: number;
	name: string;
	description: string | null;
	created_at: Date;
	updated_at: Date;
}

export interface DB {
	tasks: Task;
	projects: Project;
}
 