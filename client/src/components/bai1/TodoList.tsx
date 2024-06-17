import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./TodoList.css"
interface Task {
    id: number;
    name: string;
    completed: boolean;
}
export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTask = () => {
    const task = { id: Date.now(), name: newTask, completed: false };
    axios.post('http://localhost:3001/tasks', task)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error(error));
    setNewTask('');
  };

  const deleteTask = (id: number) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error(error));
  };

  const toggleTaskCompletion = (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      axios.put(`http://localhost:3001/tasks/${id}`, updatedTask)
        .then(response => setTasks(tasks.map(task => task.id === id ? response.data : task)))
        .catch(error => console.error(error));
    }
  };
  return (
    <div className="app">
      <h1>Quản lý công việc</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nhập tên công việc"
      />
      <button onClick={addTask}>Thêm công việc</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            {task.name}
            <button onClick={() => deleteTask(task.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
