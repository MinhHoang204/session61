interface TaskProps {
    id: number;
    name: string;
    completed: boolean;
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
}
export default function Task(id, name, completed, toggleTask, deleteTask) {
  return (
    <div className="task">
      <input 
        type="checkbox" 
        checked={completed} 
        onChange={() => toggleTask(id)} 
      />
      <span className={completed ? 'completed' : ''}>{name}</span>
      <button onClick={() => deleteTask(id)}>🖊️</button>
      <button onClick={() => deleteTask(id)}>🗑️</button>
    </div>
  )
}
