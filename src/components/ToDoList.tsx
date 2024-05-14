import ToDoItem from './ToDoItem';
import Modal from './Modal';
import { useState } from 'react';
import { Task } from '@/types/Task';
import TaskForm from './TaskForm';
import { PlusIcon } from '@heroicons/react/20/solid';

interface ToDoListProps {
  tasks: Task[];
}

export default function ToDoList({ tasks }: ToDoListProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <ul className="space-y-4">
        {tasks.map((task) => (
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
