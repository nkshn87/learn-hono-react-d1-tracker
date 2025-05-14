import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Task = {
	id: number;
	title: string;
	description: string | null;
	status: "todo" | "in_progress" | "done";
	project_id: number | null;
	created_at: string;
	updated_at: string;
};

// タスク一覧取得
export const useTasks = () => {
	return useQuery<Task[]>({
		queryKey: ["tasks"],
		queryFn: async () => {
			const res = await fetch("/api/tasks");
			if (!res.ok) throw new Error("Failed to fetch tasks");
			const json = await res.json();
			return json.tasks;
		},
	});
};

// タスク作成
export const useAddTask = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (
			data: Omit<Task, "id" | "created_at" | "updated_at">,
		) => {
			const res = await fetch("/api/tasks", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Failed to add task");
			const json = await res.json();
			return json.task as Task;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["tasks"]);
		},
	});
};

// タスク更新
export const useUpdateTask = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (
			data: Partial<Omit<Task, "created_at" | "updated_at">>,
		) => {
			const res = await fetch(`/api/tasks/${data.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Failed to update task");
			const json = await res.json();
			return json.task as Task;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["tasks"]);
		},
	});
};

// タスク削除
export const useDeleteTask = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
			if (!res.ok) throw new Error("Failed to delete task");
			return id;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["tasks"]);
		},
	});
};
