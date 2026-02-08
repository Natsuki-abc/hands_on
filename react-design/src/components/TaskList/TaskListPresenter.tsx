import React from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import type { Task } from "../../domain/Task";

interface TaskListPresenterProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskListPresenter: React.FC<TaskListPresenterProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
}) => {
  if (tasks.length === 0) {
    return (
      <p className="empty-message">
        タスクがありません。新しいタスクを追加してください。
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          <div>
            <span className={`task-priority priority-${task.priority}`}>
              {task.priority}
            </span>
            <span className="task-title">{task.title}</span>
          </div>
          <div className="task-actions">
            <button
              className="toggle-btn"
              onClick={() => onToggleTask(task.id)}
              aria-label={
                task.completed ? "タスクを未完了にする" : "タスクを完了する"
              }
            >
              <FaCheck />
            </button>
            <button
              className="delete-btn"
              onClick={() => onDeleteTask(task.id)}
              aria-label="タスクを削除"
            >
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskListPresenter;
