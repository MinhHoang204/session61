import React from 'react'
import { useState, useEffect } from 'react';
import TaskInput from '../bai2/TaskInput';
import TaskFilter from '../bai2/TaskFilter';
import TaskList from '../bai3/TaskList';
import TaskActions from '../bai2/TaskActions';
import Loading from './Loading';

interface Task {
    id: number;
    name: string;
    completed: boolean;
}
export default function Bai4() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const addTask = (taskName: string) => {
    setLoading(true);
    const newTask: Task = { id: Date.now(), name: taskName, completed: false };
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(data => {
      setTasks([...tasks, data]);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  };

  const toggleTask = (id: number) => {
    setLoading(true);
    const updatedTask = tasks.find(task => task.id === id);
    if (updatedTask) {
      updatedTask.completed = !updatedTask.completed;
      fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      })
      .then(response => response.json())
      .then(data => {
        setTasks(tasks.map(task => task.id === id ? data : task));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
    }
  };

  const deleteTask = (id: number) => {
    setLoading(true);
    fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const clearCompletedTasks = () => {
    setLoading(true);
    const completedTasks = tasks.filter(task => task.completed);
    Promise.all(completedTasks.map(task => fetch(`http://localhost:3001/tasks/${task.id}`, { method: 'DELETE' })))
      .then(() => {
        setTasks(tasks.filter(task => !task.completed));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const clearAllTasks = () => {
    setLoading(true);
    Promise.all(tasks.map(task => fetch(`http://localhost:3001/tasks/${task.id}`, { method: 'DELETE' })))
      .then(() => {
        setTasks([]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
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
      {loading && <Loading />}
    </div>
  )
}
