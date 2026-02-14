import { createContext, useContext } from "react";
import type { Task } from "../../domain/Task";

export interface TaskCardContextProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCardContext = createContext<TaskCardContextProps | undefined>(undefined);

export function useTaskCardContext() {
  const ctx = useContext(TaskCardContext);
  if (!ctx) throw new Error("TaskCard compound components must be used within <TaskCard>");
  return ctx;
}
