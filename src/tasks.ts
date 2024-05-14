import { Task, TaskPriority, TaskStatus } from './types/Task';

const fakeData: Task[] = [
  {
    id: 1,
    title: 'Buy groceries',
    description: 'Buy groceries',
    priority: TaskPriority.medium,
    status: TaskStatus.inProgress,
    dueDate: { day: 15, month: 5, year: 2024, hour: 10, minute: 30 },
  },
  {
    id: 2,
    title: 'Walk the dog',
    description: 'Finish project report',
    priority: TaskPriority.high,
    status: TaskStatus.inProgress,
    dueDate: { day: 20, month: 5, year: 2024, hour: 16, minute: 0 },
  },
  {
    id: 3,
    title: 'Finish project report',
    description: 'Finish project report',
    priority: TaskPriority.low,
    status: TaskStatus.inProgress,
    dueDate: { day: 25, month: 5, year: 2024, hour: 14, minute: 30 },
  },
  {
    id: 4,
    title: 'Go to the gym',
    description: 'Go to the gym',
    priority: TaskPriority.medium,
    status: TaskStatus.inProgress,
    dueDate: { day: 30, month: 5, year: 2024, hour: 18, minute: 0 },
  },
  {
    id: 5,
    title: 'Call mom',
    description: 'Call mom',
    priority: TaskPriority.high,
    status: TaskStatus.inProgress,
    dueDate: { day: 5, month: 6, year: 2024, hour: 11, minute: 0 },
  },

];

export default fakeData;
