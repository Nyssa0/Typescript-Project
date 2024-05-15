import ToDoItem from './ToDoItem';
import Modal from './Modal';
import {useState, useEffect, ChangeEvent} from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types/Task';
import TaskForm from './TaskForm';
import { PlusIcon } from '@heroicons/react/20/solid';

interface ToDoListProps {
  tasks: Task[];
}

export default function ToDoList({ tasks }: ToDoListProps) {
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectOption, setSelectOption] = useState("");

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value.toLowerCase());
  };

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectOption(e.target.value.toLowerCase());
  };

  const filteredTasks = tasks.filter((task) => {
    if (inputText === "") {
      return task;
    } else if (task.description.toLowerCase().includes(inputText) && selectOption === "" || task.priority.toLowerCase().includes(inputText) && selectOption === "") {
      return task;
    } else if (selectOption === "description" && task.description.toLowerCase().includes(inputText)) {
      return task;
    } else if (selectOption === "priority" && task.priority.toLowerCase().includes(inputText)) {
      return task;
    }
    return false;
  });

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

  const sortedTasks = filteredTasks.sort((a, b) => {
    const statusDiff = statusOrder(b.status) - statusOrder(a.status);
    if (statusDiff !== 0) return statusDiff;
    return priorityOrder(b.priority) - priorityOrder(a.priority);
  });

  useEffect(() => {
    const timer = setTimeout(() => {}, 5 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [tasks]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          <img
            src="/todo.svg"
            alt="Page Icon"
            className="inline-block h-10 w-10 mr-2"
          />
          Task List
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200 relative"
        >
          <PlusIcon className="h-6 w-6" />
          <span className="absolute top-0 left-0 bg-blue-500 text-white p-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity duration-200">
            New Task
          </span>
        </button>
      </div>

      <div className="max-w-lg mx-auto mb-4">
        <div className="flex">
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <select id="dropdown" name="search" onChange={selectHandler} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200">
            <option value="">-- Search category --</option>
            <option value="description">Description</option>
            <option value="priority">Priority</option>
          </select>

          <div className="relative w-full">
            <input type="search" id="search-dropdown" onChange={inputHandler} value={inputText}
                   className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300"
                   placeholder="Search description or priority."/>
          </div>
        </div>
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
