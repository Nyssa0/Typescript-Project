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

  const getStatusEmoji = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.done:
        return '✅';
      case TaskStatus.pending:
        return '⏳';
      case TaskStatus.inProgress:
        return '🔄';
      default:
        return '';
    }
  };

  return (
    <li className={`p-4 rounded-lg shadow-md transition-all border-2 border-white duration-300 hover:shadow-2xl hover:border-2 hover:border-black cursor-pointer ${task.status === TaskStatus.done ? 'bg-gray-300' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleStatus}
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${task.status === TaskStatus.done ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}
          >
            {task.status === TaskStatus.done && <CheckIcon className="w-5 h-5 text-white" />}
          </button>
          <h3 className={`text-lg font-semibold ${task.status === TaskStatus.done ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          {task.isNew && <span className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">New</span>}
        </div>
        {task.status !== TaskStatus.done && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      <blockquote className={`p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 ${task.status === TaskStatus.done ? 'line-through opacity-50' : ''}`}>
        <p className="text-xl italic font-medium leading-relaxed text-gray-900">{task.description}</p>
      </blockquote>
      <div className="flex justify-between mt-4">
        <div className='flex gap-5'>
          <p
            className={`text-sm font-medium py-1 px-5 rounded-full border ${task.priority === TaskPriority.high
              ? 'bg-red-100 border-red-500 text-red-900'
              : task.priority === TaskPriority.medium
                ? 'bg-yellow-100 border-yellow-500 text-yellow-900'
                : 'bg-green-100 border-green-500 text-green-900'
              }`}
          >
            Priority: {task.priority} {task.priority === TaskPriority.high ? '🔴' : task.priority === TaskPriority.medium ? '🟡' : '🟢'}
          </p>
        </div>
        <div className='flex gap-5 items-center'>
          <p className="text-sm text-gray-500">
            Due Date: {formatDate(task.dueDate)} {String(task.dueDate.hour).padStart(2, '0')}:{String(task.dueDate.minute).padStart(2, '0')}
          </p>
          <p className={`text-sm font-medium py-1 px-3 rounded-full flex items-center text-lg border ${task.status === TaskStatus.done
            ? 'bg-blue-100 border-blue-500 text-blue-900'
            : task.status === TaskStatus.pending
              ? 'bg-orange-100 border-orange-500 text-orange-900'
              : 'bg-purple-100 border-purple-500 text-purple-900'
            }`}
          >
            Status: {task.status} {getStatusEmoji(task.status)}
          </p>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">Update Task</h2>
        <TaskForm task={task} closeModal={() => setShowModal(false)} />
      </Modal>
    </li>
  );
}
