import { useState, useContext } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types/Task';
import Modal from './Modal';
import TaskForm from './TaskForm';
import { CheckIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { ToDoContext } from '@/contexts/ToDoContext';

interface ToDoItemProps {
  task: Task;
}

export default function ToDoItem({ task }: ToDoItemProps) {
  const [showModal, setShowModal] = useState(false);
  const { updateTask } = useContext(ToDoContext);

  const formatDate = (dateTime: { year: number; month: number; day: number }) => {
    const { year, month, day } = dateTime;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const toggleStatus = () => {
    const updatedTask = {
      ...task,
      status: task.status === TaskStatus.done ? TaskStatus.pending : TaskStatus.done,
    };
    updateTask(updatedTask);
  };

  return (
    <li className={`p-4 rounded-lg shadow-md transition-all duration-200 hover:bg-gray-100 ${task.status === TaskStatus.done ? 'bg-gray-200' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleStatus}
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
              task.status === TaskStatus.done ? 'bg-green-500 border-green-500' : 'border-gray-300'
            }`}
          >
            {task.status === TaskStatus.done && <CheckIcon className="w-5 h-5 text-white" />}
          </button>
          <h3 className={`text-lg font-semibold ml-4 ${task.status === TaskStatus.done ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
      </div>
      <p className={`text-gray-600 mt-2 ${task.status === TaskStatus.done ? 'line-through' : ''}`}>{task.description}</p>
      <div className="flex justify-between mt-4">
        <div className='flex gap-5'>
        <p
          className={`text-sm ${
            task.priority === TaskPriority.high
              ? 'text-red-500'
              : task.priority === TaskPriority.medium
                ? 'text-yellow-500'
                : 'text-green-500'
          }`}
        >
          Priority: {task.priority}
        </p>
          <p className='text-sm text-gray-500'>
            Status: {task.status}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Due Date: {formatDate(task.dueDate)} {String(task.dueDate.hour).padStart(2, '0')}:{String(task.dueDate.minute).padStart(2, '0')}
        </p>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">Update Task</h2>
        <TaskForm task={task} closeModal={() => setShowModal(false)} />
      </Modal>
    </li>
  );
}
