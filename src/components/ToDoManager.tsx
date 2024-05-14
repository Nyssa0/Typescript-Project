import React, { Component } from 'react';
import { Task} from '@/types/Task';
import { ToDoContext } from '../contexts/ToDoContext';
import ToDoList from '@/components/ToDoList';

interface ToDoManagerProps {}

interface ToDoManagerState {
  tasks: Task[];
}

class ToDoManager extends Component<ToDoManagerProps, ToDoManagerState> {
  static contextType = ToDoContext;
  declare context: React.ContextType<typeof ToDoContext>;

  constructor(props: ToDoManagerProps) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  addTask(task: Task) {
    const { addTask } = this.context;
    addTask(task);
  }

  removeTask(id: number) {
    const { removeTask } = this.context;
    removeTask(id);
  }

  updateTask(task: Task) {
    const { updateTask } = this.context;
    updateTask(task);
  }

  render() {
    const tasks = this.context.tasks;
    return (
      <div className='w-full'>
        <ToDoList tasks={tasks} />
      </div>
    );
  }
}

export default ToDoManager;
