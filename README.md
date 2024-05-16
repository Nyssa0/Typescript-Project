# ToDo App using React, Vite, and TypeScript

## Project Overview
This project is a simple ToDo application built with React, Vite, and TypeScript. It enables users to manage tasks, add new tasks, update task status, and set task priorities and due dates.

## Technologies Used
- React: A popular JavaScript library for building user interfaces.
- Vite: A fast build tool that provides instant server start for React projects.
- TypeScript: A statically typed superset of JavaScript that enhances code quality.

## Installation
1. Clone the repository.
2. Install dependencies with `npm install`.

## Project Structure
- `src/`: Contains all the source code files.
  - `components/`: Includes components like `ToDoItem`, `ToDoList`, `TaskForm`, and `Modal`.
  - `contexts/`: Contains the `ToDoContext` and `ToDoProvider` for managing tasks.
  - `decorators/`: Includes a `LogDecorator` for logging method calls.
  - `types/`: Defines interfaces for `Task` and `DateTime`.
- `package.json`: Manages project dependencies and scripts.
- `vite.config.ts`: Configuration file for Vite.

## Essential Commands
- `npm run dev`: Start the development server with Vite.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to lint TypeScript files.
- `npm run preview`: Preview the production build.
- `npm run format`: Format code using Prettier.
- `npm run format:check`: Check code formatting.

## Getting Started
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.

## Task Status and Priority
- **Status Order**: Tasks are displayed based on status order: In Progress, Pending, Done.
- **Priority Order**: Tasks are displayed based on priority order: High, Medium, Low.

## Logic on Display
- Tasks are sorted based on status and priority to provide a clear view of task importance.

## Application Link
Explore the ToDo App [here](https://typescript-project-neon.vercel.app).
