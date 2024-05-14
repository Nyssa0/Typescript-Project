import { ToDoContext } from '@/contexts/ToDoContext';
import DateTime from '@/types/DateTime';
import { TaskPriority, TaskStatus } from '@/types/Task';
import { useContext, useState } from 'react';

interface TaskCreateFormProps {
  closeModal: () => void;
}

export default function TaskCreateForm({ closeModal }: TaskCreateFormProps) {
  const { tasks, addTask } = useContext(ToDoContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.low);
  const [date, setDate] = useState<string>('');
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.pending);

  const handleAddTask = ({
    title,
    description,
    priority,
    date,
    hour,
    minute,
    status,
  }: {
    title: string;
    description: string;
    priority: TaskPriority;
    date: string;
    hour: number;
    minute: number;
    status: TaskStatus;
  }) => {
    const [year, month, day] = date.split('-').map(Number);
    const dueDate: DateTime = {
      day,
      month,
      year,
      hour,
      minute,
    };

    addTask({
      id: tasks.length + 1,
      title,
      description,
      priority,
      dueDate,
      status,
    });

    setTitle('');
    setDescription('');
    setPriority(TaskPriority.low);
    setDate('');
    setHour(0);
    setMinute(0);
    setStatus(TaskStatus.pending);

  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask({ title, description, priority, date, hour, minute, status });
        closeModal();
      }}
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="dueTime"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
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
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Task
      </button>
    </form>
  );
}
