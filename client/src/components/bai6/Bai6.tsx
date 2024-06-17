import { useState, useEffect, useRef } from 'react';
import TaskInput from './TaskInput';
import TaskFilter from '../bai2/TaskFilter';
import TaskList from '../bai2/TaskList';
import TaskActions from '../bai2/TaskActions';
import Loading from './Loading';
import ConfirmModal from '../bai5/ConfirmModal';
interface Task {
  id: number;
  name: string;
  completed: boolean;
}
export default function Bai6() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [taskName, setTaskName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

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

  const validateTaskName = (name: string): string => {
    if (!name.trim()) {
      return 'Tên công việc không được để trống.';
    }
    if (tasks.some(task => task.name === name.trim())) {
      return 'Tên công việc không được trùng.';
    }
    return '';
  };

  const addTask = (taskName: string) => {
    const validationError = validateTaskName(taskName);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const newTask: Task = { id: Date.now(), name: taskName.trim(), completed: false };
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(data => {
      setTasks([...tasks, data]);
      setLoading(false);
      setTaskName('');
      setError('');
      inputRef.current?.focus();
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

  const handleDeleteClick = (id: number) => {
    setTaskToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      setLoading(true);
      fetch(`http://localhost:3001/tasks/${taskToDelete}`, { method: 'DELETE' })
        .then(() => {
          setTasks(tasks.filter(task => task.id !== taskToDelete));
          setLoading(false);
          setIsModalOpen(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
          setIsModalOpen(false);
        });
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
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
    <TaskInput 
      addTask={addTask} 
      taskName={taskName} 
      setTaskName={setTaskName} 
      error={error} 
      inputRef={inputRef}
    />
    <TaskFilter filter={filter} setFilter={setFilter} />
    <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={handleDeleteClick} />
    <TaskActions clearCompletedTasks={clearCompletedTasks} clearAllTasks={clearAllTasks} />
    {loading && <Loading />}
    <ConfirmModal
      isOpen={isModalOpen}
      onConfirm={confirmDelete}
      onCancel={cancelDelete}
    />
  </div>
  )
}
