import React, { createContext, useState, ReactNode } from 'react';
import { type Task } from '@/types/Task';
import fakeData from '../tasks';
import { log } from '@/decorators/LogDecorator';

interface ToDoContextType {
  tasks: Task[];
  addTask: <T extends Task>(task: T) => void;
  removeTask: <T extends Task>(task: T) => void;
  updateTask: <T extends Task>(task: T) => void;
}

const ToDoContext = createContext<ToDoContextType>({
  tasks: [],
  addTask: () => { throw new Error("addTask not implemented") },
  removeTask: () => { throw new Error("removeTask not implemented") },
  updateTask: () => { throw new Error("updateTask not implemented") },
});
class ToDoManager {
  private setTasks: React.Dispatch<React.SetStateAction<Task[]>>;

  constructor(setTasks: React.Dispatch<React.SetStateAction<Task[]>>) {
    this.setTasks = setTasks;
  }

  @log
  addTask<T extends Task>(task: T) {
    this.setTasks(prevTasks => [...prevTasks, task]);
  }

  @log
  removeTask<T extends Task>(task: T) {
    this.setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
  }

  updateTask = <T extends Task>(task: T) => {
    this.setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? task : t));
  }
}

const ToDoProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : fakeData;
  });

  const manager = new ToDoManager(setTasks);

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <ToDoContext.Provider value={{ tasks, addTask: manager.addTask.bind(manager), removeTask: manager.removeTask.bind(manager), updateTask: manager.updateTask.bind(manager) }}>
      {children}
    </ToDoContext.Provider>
  );
};

export { ToDoContext, ToDoProvider };
