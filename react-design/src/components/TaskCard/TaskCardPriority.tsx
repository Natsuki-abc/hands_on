import React from "react";
import { useTaskCardContext } from "./TaskCardContext";

export const TaskCardPriority: React.FC = () => {
  const { task } = useTaskCardContext();
  return (
    <span className={`task-priority priority-${task.priority}`}>{task.priority}</span>
  );
};
