import DateTime from './DateTime';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: DateTime;
  isNew?: boolean;
}

export enum TaskStatus {
  done = 'Done',
  pending = 'Pending',
  inProgress = 'In Progress',
}

export enum TaskPriority {
  low = 'Low',
  medium = 'Medium',
  high = 'High',
}
