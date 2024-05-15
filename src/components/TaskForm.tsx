import { useContext, useState } from 'react';
import { ToDoContext } from '@/contexts/ToDoContext';
import { Task, TaskPriority, TaskStatus } from '@/types/Task';
import DateTime from '@/types/DateTime';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TaskFormProps {
  closeModal: () => void;
  task?: Task;
}

export default function TaskForm({ closeModal, task }: TaskFormProps) {
  const { addTask, updateTask } = useContext(ToDoContext);

  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [priority, setPriority] = useState<TaskPriority>(task ? task.priority : TaskPriority.low);
  const [date, setDate] = useState<string>(
    task && task.dueDate
      ? `${task.dueDate.year}-${String(task.dueDate.month).padStart(2, '0')}-${String(task.dueDate.day).padStart(2, '0')}`
      : ''
  );
  const [hour, setHour] = useState<number>(task && task.dueDate ? task.dueDate.hour : 0);
  const [minute, setMinute] = useState<number>(task && task.dueDate ? task.dueDate.minute : 0);
  const [status, setStatus] = useState<TaskStatus>(task ? task.status : TaskStatus.pending);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const [year, month, day] = date.split('-').map(Number);
    const dueDate: DateTime = {
      day: day || new Date().getDate(),
      month: month || new Date().getMonth() + 1,
      year: year || new Date().getFullYear(),
      hour: hour || 0,
      minute: minute || 0,
    };

    const newTask = {
      id: task ? task.id : new Date().getTime(),
      title,
      description,
      priority,
      dueDate,
      status,
      isNew: true,
    };

    if (task) {
      updateTask(newTask);
      toast.success('Task updated successfully!');
    } else {
      addTask(newTask);
      setTitle('');
      setDescription('');
      setPriority(TaskPriority.low);
      setDate('');
      setHour(0);
      setMinute(0);
      setStatus(TaskStatus.pending);
      toast.success('Task added successfully!');
    }

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
        <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700">
          Due Time
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Hour"
            value={hour}
            onChange={(e) => setHour(parseInt(e.target.value, 10) || 0)}
            className="w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <input
            type="number"
            placeholder="Minute"
            value={minute}
            onChange={(e) => setMinute(parseInt(e.target.value, 10) || 0)}
            className="w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
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
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-200">
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
