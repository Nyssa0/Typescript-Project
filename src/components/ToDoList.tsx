import ToDoItem from "./ToDoItem";
import Modal from "./Modal";
import { useContext, useState } from "react";
import TaskCreateForm from "./tasks/TaskCreateForm";
import { ToDoContext } from "../contexts/ToDoContext";


export default function ToDoList () {
    const [showModal, setShowModal] = useState(false)
    const { tasks } = useContext(ToDoContext)
    
    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Tasks</h2>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <ToDoItem key={task.id} task={task} />
                ))}
            </ul>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-xl font-bold mb-4">Add Task</h2>
                <TaskCreateForm closeModal={() => setShowModal(false)} />
            </Modal>

            <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Add Task</button>
        </div>
    )
}