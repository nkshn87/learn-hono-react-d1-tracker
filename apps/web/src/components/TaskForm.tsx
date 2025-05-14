import { useState } from "react";
import { useAddTask } from "../hooks/tasks";

export default function TaskForm() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const mutation = useAddTask();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutation.mutate(
			{
				title,
				description: description || null,
				status: "todo",
				project_id: null,
			},
			{
				onSuccess: () => {
					setTitle("");
					setDescription("");
				},
			},
		);
	};

	return (
		<form onSubmit={handleSubmit} className="mb-6 space-y-4">
			<div>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="タイトル"
					className="border rounded p-2 w-full"
					required
				/>
			</div>
			<div>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="説明（任意）"
					className="border rounded p-2 w-full"
				/>
			</div>
			{mutation.isError && (
				<div className="text-red-500">
					Error:{" "}
					{mutation.error instanceof Error
						? mutation.error.message
						: "Unknown error"}
				</div>
			)}
			<button
				type="submit"
				disabled={mutation.isLoading}
				className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
			>
				{mutation.isLoading ? "追加中..." : "タスク追加"}
			</button>
		</form>
	);
}
