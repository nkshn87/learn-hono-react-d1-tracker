export interface Database {
	tasks: {
		id: number;
		title: string;
		description: string | null;
		status: "todo" | "in_progress" | "done";
		project_id: number | null;
		created_at: Date;
		updated_at: Date;
	};
}
