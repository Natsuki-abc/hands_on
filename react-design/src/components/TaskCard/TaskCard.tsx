import React from "react";
import type { ReactNode } from "react";
import type { Task } from "../../domain/Task";
import { TaskCardContext } from "./TaskCardContext";
import { TaskCardTitle } from "./TaskCardTitle";
import { TaskCardActions } from "./TaskCardActions";
import { TaskCardPriority } from "./TaskCardPriority";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  children: ReactNode;
}

const TaskCardBase: React.FC<TaskCardProps> = ({ task, onToggle, onDelete, children }) => {
  return (
    <TaskCardContext.Provider value={{ task, onToggle, onDelete }}>
      <div className={`task-card${task.completed ? " completed" : ""}`}>
        {children}
      </div>
    </TaskCardContext.Provider>
  );
};

export const TaskCard = Object.assign(TaskCardBase, {
  Title: TaskCardTitle,
  Actions: TaskCardActions,
  Priority: TaskCardPriority,
});
