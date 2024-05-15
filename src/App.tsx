import { useContext } from 'react';
import { ToDoContext } from './contexts/ToDoContext';
import ToDoList from './components/ToDoList';

function App() {
  const { tasks } = useContext(ToDoContext);
  return (
    <div className="flex flex-col items-center justify-start p-6 gap-6 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-3xl text-gray-800">ToDo App</h1>
      <div className="w-full">
        <ToDoList tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
