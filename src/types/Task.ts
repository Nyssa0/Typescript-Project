import DateTime from './DateTime';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: DateTime;
}

export enum TaskStatus {
  done = 'done',
  pending = 'pending',
  inProgress = 'inProgress',
}

export enum TaskPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
