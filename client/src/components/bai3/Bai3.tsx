import React from 'react'
import "./Bai3.css"
import { useState, useEffect } from 'react';
import TaskInput from '../bai2/TaskInput';
import TaskFilter from '../bai2/TaskFilter';
import TaskList from './TaskList';
import TaskActions from '../bai2/TaskActions';
interface Task {
    id: number;
    name: string;
    completed: boolean;
}
export default function Bai3() {
    const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error(error));
  }, []);

  const addTask = (taskName: string) => {
    const newTask: Task = { id: Date.now(), name: taskName, completed: false };
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(data => setTasks([...tasks, data]))
    .catch(error => console.error(error));
  };

  const toggleTask = (id: number) => {
    const updatedTask = tasks.find(task => task.id === id);
    if (updatedTask) {
      updatedTask.completed = !updatedTask.completed;
      fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      })
      .then(response => response.json())
      .then(data => setTasks(tasks.map(task => task.id === id ? data : task)))
      .catch(error => console.error(error));
    }
  };

  const deleteTask = (id: number) => {
    fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error(error));
  };

  const clearCompletedTasks = () => {
    tasks.filter(task => task.completed).forEach(task => deleteTask(task.id));
  };

  const clearAllTasks = () => {
    tasks.forEach(task => deleteTask(task.id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });
  return (
    <div className="app">
      <h1>Quản lý công việc</h1>
      <TaskInput addTask={addTask} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
      <TaskActions clearCompletedTasks={clearCompletedTasks} clearAllTasks={clearAllTasks} />
    </div>
  )
}
