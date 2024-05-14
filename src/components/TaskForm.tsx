import { useContext, useState } from 'react';
import { ToDoContext } from '@/contexts/ToDoContext';
import { Task, TaskPriority, TaskStatus } from '@/types/Task';
import DateTime from '@/types/DateTime';

interface TaskFormProps {
  closeModal: () => void;
  task?: Task; // task is optional, if provided, it's an update form
}

export default function TaskForm({ closeModal, task }: TaskFormProps) {
  const { tasks, addTask, updateTask } = useContext(ToDoContext);

  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [priority, setPriority] = useState<TaskPriority>(task ? task.priority : TaskPriority.low);
  const [date, setDate] = useState<string>(
    task
      ? `${task.dueDate.year}-${String(task.dueDate.month).padStart(2, '0')}-${String(task.dueDate.day).padStart(2, '0')}`
      : ''
  );
  const [hour, setHour] = useState<number>(task ? task.dueDate.hour : 0);
  const [minute, setMinute] = useState<number>(task ? task.dueDate.minute : 0);
  const [status, setStatus] = useState<TaskStatus>(task ? task.status : TaskStatus.pending);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const [year, month, day] = date.split('-').map(Number);
    const dueDate: DateTime = {
      day,
      month,
      year,
      hour,
      minute,
    };

    const newTask = {
      id: task ? task.id : tasks.length + 1,
      title,
      description,
      priority,
      dueDate,
      status,
    };

    if (task) {
      updateTask(newTask);
    } else {
      addTask(newTask);
      // Reset form fields after adding a new task
      setTitle('');
      setDescription('');
      setPriority(TaskPriority.low);
      setDate('');
      setHour(0);
      setMinute(0);
      setStatus(TaskStatus.pending);
    }

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value={TaskPriority.low}>Low</option>
          <option value={TaskPriority.medium}>Medium</option>
          <option value={TaskPriority.high}>High</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700">
          Due Time
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Hour"
            value={hour}
            onChange={(e) => setHour(parseInt(e.target.value, 10))}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Minute"
            value={minute}
            onChange={(e) => setMinute(parseInt(e.target.value, 10))}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value={TaskStatus.pending}>Pending</option>
          <option value={TaskStatus.inProgress}>In Progress</option>
          <option value={TaskStatus.done}>Done</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
