import React from 'react'
interface TaskActionsProps {
  clearCompletedTasks: () => void;
  clearAllTasks: () => void;
}
export default function TaskActions(clearCompletedTasks, clearAllTasks) {
  return (
    <div className="task-actions">
      <button onClick={clearCompletedTasks}>Xóa công việc hoàn thành</button>
      <button onClick={clearAllTasks}>Xóa tất cả công việc</button>
    </div>
  )
}
