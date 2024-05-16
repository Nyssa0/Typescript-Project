import { useContext } from 'react';
import { ToDoContext } from './contexts/ToDoContext';
import ToDoList from './components/ToDoList';

function App() {
  const { tasks } = useContext(ToDoContext);
  return (
    <div className="flex flex-col items-center justify-start p-6 gap-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl mx-auto">
        <ToDoList tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
