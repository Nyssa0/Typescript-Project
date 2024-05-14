import { useContext, useState } from "react";
import { ToDoContext } from "../../contexts/ToDoContext";
import { TaskPriority, TaskStatus } from "../../types/Task";
import { Task } from '../../types/Task';


interface TaskUpdateFormProps {
    closeModal: () => void;
    task: Task;
}

export default function TaskUpdateForm({ closeModal, task }: TaskUpdateFormProps) {
    const { updateTask } = useContext(ToDoContext)

    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [priority, setPriority] = useState<TaskPriority>(task.priority)
    const [dueDate, setDueDate] = useState<Date | null>(task.dueDate)
    const [status, setStatus] = useState<TaskStatus>(task.status)

    const handleUpdateTask = ({ title, description, priority, dueDate, status }: { title: string, description: string, priority: TaskPriority, dueDate: Date | null, status: TaskStatus }) => {
        updateTask({
            id: task.id,
            title,
            description,
            priority,
            dueDate: dueDate || new Date(),
            status,
        })

    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleUpdateTask({ title, description, priority, dueDate, status })
            closeModal()
        }}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)} className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option value={TaskPriority.low}>Low</option>
                    <option value={TaskPriority.medium}>Medium</option>
                    <option value={TaskPriority.high}>High</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                <input type="date" id="dueDate" value={dueDate?.toISOString().split('T')[0]} onChange={(e) => setDueDate(new Date(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border" />
                <p className="text-sm text-gray-500">Leave empty for today</p>
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)} className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option value={TaskStatus.pending}>Pending</option>
                    <option value={TaskStatus.inProgress}>In Progress</option>
                    <option value={TaskStatus.done}>Done</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update Task</button>
        </form>
    )
}