import { Task } from "../types/Task";

interface ToDoItemProps {
  task: Task;
}

export default function ToDoItem({ task }: ToDoItemProps) {
  return (
    <li
      className="p-4 bg-white rounded-md shadow-sm hover:bg-gray-50"
    >
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500">Status: {task.status}</p>
      <p
        className={`text-sm ${
          task.priority === "high"
            ? "text-red-500"
            : task.priority === "medium"
            ? "text-yellow-500"
            : "text-green-500"
        }`}
      >
        Priority: {task.priority}
      </p>
        <p className="text-sm text-gray-500">
            Due Date: {new Date(task.dueDate).toLocaleDateString()}
            </p>
    </li>
  );
}
