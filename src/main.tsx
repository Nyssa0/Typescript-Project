import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/index.css';
import { ToDoProvider } from './contexts/ToDoContext.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToDoProvider>
      <App />
    </ToDoProvider>
    <ToastContainer />
  </React.StrictMode>
);
