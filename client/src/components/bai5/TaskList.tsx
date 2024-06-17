import React from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa';
interface Task {
    id: number;
    name: string;
    completed: boolean;
}
  
interface TaskListProps {
    tasks: Task[];
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
}
export default function TaskList(tasks, toggleTask, deleteTask) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
          <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
          <span>{task.name}</span>
          <FaEdit className="edit-icon" />
          <FaTrash className="delete-icon" onClick={() => deleteTask(task.id)} />
        </li>
      ))}
    </ul>
  )
}
