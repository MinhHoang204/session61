import React from 'react'
interface TaskFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}
export default function TaskFilter(filter, setFilter) {
  return (
    <div className="task-filter">
      <button 
        className={filter === 'all' ? 'active' : ''} 
        onClick={() => setFilter('all')}
      >
        Tất cả
      </button>
      <button 
        className={filter === 'completed' ? 'active' : ''} 
        onClick={() => setFilter('completed')}
      >
        Hoàn thành
      </button>
      <button 
        className={filter === 'active' ? 'active' : ''} 
        onClick={() => setFilter('active')}
      >
        Đang thực hiện
      </button>
    </div>
  )
}
