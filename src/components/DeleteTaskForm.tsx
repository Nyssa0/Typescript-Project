import { useContext } from 'react';
import { ToDoContext } from '@/contexts/ToDoContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Task } from '@/types/Task';

interface DeleteTaskFormProps {
  closeModal: () => void;
  task: Task;
}

export default function DeleteTaskForm({
  closeModal,
  task,
}: DeleteTaskFormProps) {
  const { removeTask } = useContext(ToDoContext);

  const handleDelete = () => {
    removeTask(task);
    toast.success('Task deleted successfully!');
    closeModal();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base">
        Are you sure you want to delete this task?
      </h2>
      <div className="flex justify-end gap-4">
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => closeModal()}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
