import { useState } from 'react';
import { Task } from '@/types/Task';
import Modal from './Modal';
import TaskForm from './TaskForm';

interface ToDoItemProps {
  task: Task;
}

export default function ToDoItem({ task }: ToDoItemProps) {
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateTime: { year: number; month: number; day: number }) => {
    const { year, month, day } = dateTime;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <li className="p-4 bg-white rounded-md shadow-sm hover:bg-gray-50">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500">Status: {task.status}</p>
      <p
        className={`text-sm ${
          task.priority === 'high'
            ? 'text-red-500'
            : task.priority === 'medium'
              ? 'text-yellow-500'
              : 'text-green-500'
        }`}
      >
        Priority: {task.priority}
      </p>
      <p className="text-sm text-gray-500">
        Due Date: {formatDate(task.dueDate)} {String(task.dueDate.hour).padStart(2, '0')}:{String(task.dueDate.minute).padStart(2, '0')}
      </p>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">Update Task</h2>
        <TaskForm task={task} closeModal={() => setShowModal(false)} />
      </Modal>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Update Task
      </button>
    </li>
  );
}
