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
    <li className={`p-3 rounded-md shadow-sm transition-all border border-gray-200 hover:shadow-md hover:border-gray-400 cursor-pointer ${task.status === TaskStatus.done ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleStatus}
            className={`w-7 h-7 flex items-center justify-center rounded-full border ${task.status === TaskStatus.done ? 'bg-green-500 border-green-500' : 'border-gray-300'} transition-colors duration-200`}
          >
            {task.status === TaskStatus.done && <CheckIcon className="w-4 h-4 text-white" />}
          </button>
          <h3 className={`text-base font-medium ${task.status === TaskStatus.done ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          {task.isNew && task.status !== TaskStatus.done && <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs">New</span>}
        </div>
        {task.status !== TaskStatus.done && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white p-1.5 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            <PencilSquareIcon className="h-4 w-4" />
          </button>
        )}
      </div>
      <blockquote className={`p-3 my-3 border-l-4 border-gray-200 bg-gray-50 ${task.status === TaskStatus.done ? 'line-through opacity-50' : ''}`}>
        <p className="text-sm italic leading-relaxed text-gray-800">{task.description}</p>
      </blockquote>
      <div className="flex justify-between mt-3">
        <div className='flex gap-3'>
          <p
            className={`text-xs font-medium py-1 px-3 rounded-full border ${task.priority === TaskPriority.high
              ? 'bg-red-100 border-red-400 text-red-700'
              : task.priority === TaskPriority.medium
                ? 'bg-yellow-100 border-yellow-400 text-yellow-700'
                : 'bg-green-100 border-green-400 text-green-700'
              } ${task.status === TaskStatus.done ? 'opacity-50' : ''}`}
          >
            Priority: {task.priority} {task.priority === TaskPriority.high ? '🔴' : task.priority === TaskPriority.medium ? '🟡' : '🟢'}
          </p>
        </div>
        <div className='flex gap-3 items-center'>
          <p className="text-xs text-gray-500">
            Due Date: {formatDate(task.dueDate)} {String(task.dueDate.hour).padStart(2, '0')}:{String(task.dueDate.minute).padStart(2, '0')}
          </p>
          <p className={`text-xs font-medium py-1 px-2 rounded-full flex items-center border ${task.status === TaskStatus.done
            ? 'bg-blue-100 border-blue-400 text-blue-700'
            : task.status === TaskStatus.pending
              ? 'bg-orange-100 border-orange-400 text-orange-700'
              : 'bg-purple-100 border-purple-400 text-purple-700'
            } ${task.status === TaskStatus.done ? 'opacity-50' : ''}`}
          >
            Status: {task.status} {getStatusEmoji(task.status)}
          </p>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-lg font-semibold mb-4">Update Task</h2>
        <TaskForm task={task} closeModal={() => setShowModal(false)} />
      </Modal>
    </li>
  );
}
