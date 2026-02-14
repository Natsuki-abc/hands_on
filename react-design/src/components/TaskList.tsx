import React from "react";
import type { Task } from "../domain/Task";
import { TaskCard } from "./TaskCard/TaskCard";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
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
          className={`task-item${task.completed ? " completed" : ""}`}
        >
          <TaskCard task={task} onToggle={onToggleTask} onDelete={onDeleteTask}>
            <TaskCard.Priority />
            <TaskCard.Title />
            <TaskCard.Actions />
          </TaskCard>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
