import { Task, TaskPriority, TaskStatus } from './types/Task';

const fakeData: Task[] = [
    {
        "id": 1,
        "title": "Task 1",
        "description": "Description 1",
        "status": TaskStatus.pending,
        "priority": TaskPriority.low,
        "dueDate": new Date("2021-12-31")
    },
    {
        "id": 2,
        "title": "Task 2",
        "description": "Description 2",
        "status": TaskStatus.inProgress,
        "priority": TaskPriority.medium,
        "dueDate": new Date("2021-12-31")
    },
    {
        "id": 3,
        "title": "Task 3",
        "description": "Description 3",
        "status": TaskStatus.done,
        "priority": TaskPriority.high,
        "dueDate": new Date("2021-12-31")
    },
    {
        "id": 4,
        "title": "Task 4",
        "description": "Description 4",
        "status": TaskStatus.pending,
        "priority": TaskPriority.low,
        "dueDate": new Date("2021-12-31")
    },
    {
        "id": 5,
        "title": "Task 5",
        "description": "Description 5",
        "status": TaskStatus.inProgress,
        "priority": TaskPriority.medium,
        "dueDate": new Date("2021-12-31")
    },
    {
        "id": 6,
        "title": "Task 6",
        "description": "Description 6",
        "status": TaskStatus.done,
        "priority": TaskPriority.high,
        "dueDate": new Date("2021-12-31")
    }
]

export default fakeData;