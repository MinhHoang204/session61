import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import TaskActions from './TaskActions';
interface Task {
  id: number;
  name: string;
  completed: boolean;
}
export default function Bai2() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTask = (taskName: string) => {
    const newTask: Task = { id: Date.now(), name: taskName, completed: false };
    axios.post('http://localhost:3001/tasks', newTask)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error(error));
  };

  const toggleTask = (id: number) => {
    const updatedTask = tasks.find(task => task.id === id);
    if (updatedTask) {
      updatedTask.completed = !updatedTask.completed;
      axios.put(`http://localhost:3001/tasks/${id}`, updatedTask)
        .then(response => setTasks(tasks.map(task => task.id === id ? response.data : task)))
        .catch(error => console.error(error));
    }
  };

  const deleteTask = (id: number) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
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
