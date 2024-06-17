import React from 'react'
import Task from '../bai2/Task';
interface TaskListProps {
    tasks: Array<{ id: number; name: string; completed: boolean; }>;
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
}
export default function TaskList(tasks, toggleTask, deleteTask) {
  return (
    <div className="task-list">
      {tasks.slice(0, 5).map(task => (
        <Task
          key={task.id} 
          {...task} 
          toggleTask={toggleTask} 
          deleteTask={deleteTask} 
        />
      ))}
    </div>
  )
}
