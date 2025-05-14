import TaskList from "./components/TaskList";

export default function App() {
	return (
		<div className="p-12">
			<h1 className="text-4xl font-bold mb-6">Task Tracker</h1>
			<TaskList />
		</div>
	);
}
