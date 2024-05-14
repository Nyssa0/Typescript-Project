import ToDoManager from './components/ToDoManager';

function App() {
  return (
    <div className="flex flex-col items-center justify-start p-6 gap-6 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-3xl text-gray-800">ToDo App</h1>
      <ToDoManager />
    </div>
  );
}

export default App;
