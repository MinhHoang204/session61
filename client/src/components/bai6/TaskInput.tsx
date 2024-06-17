import React from 'react'
import { RefObject } from 'react';
import "./TaskInput.css"
interface TaskInputProps {
    addTask: (taskName: string) => void;
    taskName: string;
    setTaskName: (taskName: string) => void;
    error: string;
    inputRef: RefObject<HTMLInputElement>;
}
export default function TaskInput(addTask, taskName, setTaskName, error, inputRef) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTask(taskName);
    };
  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <input 
        ref={inputRef}
        type="text" 
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
        placeholder="Nhập tên công việc" 
        className={error ? 'input-error' : ''}
      />
      <button type="submit">Thêm công việc</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}
