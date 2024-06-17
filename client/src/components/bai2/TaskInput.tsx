import React from 'react'
import { useState } from 'react';
interface TaskInputProps {
    addTask: (taskName: string) => void;
}
export default function TaskInput() {
    
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      addTask(taskName);
      setTaskName('');
    }
  };
  return (
    <div className="task-input">
      <input 
        type="text" 
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
        placeholder="Nhập tên công việc" 
      />
      <button onClick={handleAddTask}>Thêm công việc</button>
    </div>
  )
}
