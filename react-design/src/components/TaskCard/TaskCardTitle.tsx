import React from "react";
import { useTaskCardContext } from "./TaskCardContext";

export const TaskCardTitle: React.FC = () => {
  const { task } = useTaskCardContext();
  return (
    <>
      <span className="task-title">{task.title}</span>
    </>
  );
};
