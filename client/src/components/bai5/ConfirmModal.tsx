import React from 'react'
import "./ConfirmModal.css"
interface ConfirmModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}
export default function ConfirmModal( isOpen, onConfirm, onCancel ) {
    if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Xác nhận xóa công việc</h3>
        <p>Bạn có chắc chắn muốn xóa công việc này không?</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="cancel-button">Hủy</button>
          <button onClick={onConfirm} className="confirm-button">Xóa</button>
        </div>
      </div>
    </div>
  )
}
