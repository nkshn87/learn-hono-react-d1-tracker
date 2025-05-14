import { useTasks } from "../hooks/tasks";

export default function TaskList() {
	const { data: tasks, isLoading, isError, error } = useTasks();

	if (isLoading) {
		return <div>Loading tasks...</div>;
	}
	if (isError) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return <div>Error: {message}</div>;
	}

	return (
		<ul className="space-y-4">
			{tasks?.map((task) => (
				<li key={task.id} className="border rounded p-4">
					<h3 className="text-xl font-semibold">{task.title}</h3>
					{task.description && (
						<p className="text-gray-600">{task.description}</p>
					)}
				</li>
			))}
		</ul>
	);
}
