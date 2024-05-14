import React, { createContext, useState, ReactNode } from 'react';
import { Task } from '@/types/Task';
import fakeData from '../tasks';

interface ToDoContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (task: Task) => void;
}

const ToDoContext = createContext<ToDoContextType>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  updateTask: () => {},
});

const ToDoProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : fakeData;
  });

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <ToDoContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </ToDoContext.Provider>
  );
};

export { ToDoContext, ToDoProvider };
