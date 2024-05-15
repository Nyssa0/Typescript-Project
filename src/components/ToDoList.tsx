import ToDoItem from './ToDoItem';
import Modal from './Modal';
import { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types/Task';
import TaskForm from './TaskForm';
import { PlusIcon } from '@heroicons/react/20/solid';

interface ToDoListProps {
  tasks: Task[];
}

export default function ToDoList({ tasks }: ToDoListProps) {
  const [showModal, setShowModal] = useState(false);

  const statusOrder = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.done:
        return 1;
      case TaskStatus.pending:
        return 2;
      case TaskStatus.inProgress:
        return 3;
      default:
        return 0;
    }
  };

  const priorityOrder = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.high:
        return 3;
      case TaskPriority.medium:
        return 2;
      case TaskPriority.low:
        return 1;
      default:
        return 0;
    }
  };

  const sortedTasks = tasks.sort((a, b) => {
    const statusDiff = statusOrder(b.status) - statusOrder(a.status);
    if (statusDiff !== 0) return statusDiff;
    return priorityOrder(b.priority) - priorityOrder(a.priority);
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-bold">
          <img src="/todo.svg" alt="Page Icon" className="inline-block h-10 w-10 mr-2" />
          Task List
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <ul className="space-y-4">
        {sortedTasks.map((task) => (
          <ToDoItem key={task.id} task={task} />
        ))}
      </ul>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <TaskForm closeModal={() => setShowModal(false)} />
      </Modal>
    </div>
  );
}