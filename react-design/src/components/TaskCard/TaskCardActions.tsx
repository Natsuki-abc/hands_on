import React from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { useTaskCardContext } from "./TaskCardContext";

export const TaskCardActions: React.FC = () => {
  const { task, onToggle, onDelete } = useTaskCardContext();
  return (
    <div className="task-actions">
      <button
        className="toggle-btn"
        onClick={() => onToggle(task.id)}
        aria-label={
          task.completed ? "タスクを未完了にする" : "タスクを完了する"
        }
      >
        <FaCheck />
      </button>
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label="タスクを削除"
      >
        <FaTrash />
      </button>
    </div>
  );
};
