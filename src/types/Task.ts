export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
}

export enum TaskStatus {
    done = 'done',
    pending = 'pending',
    inProgress = 'inProgress'
}

export enum TaskPriority {
    low = 'low',
    medium = 'medium',
    high = 'high'
}