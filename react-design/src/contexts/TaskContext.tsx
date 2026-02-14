import { createContext, useContext } from "react";
import type { Task } from "../domain/Task";

export interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, priority: Task["priority"]) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const defaultTaskContext: TaskContextType = {
  tasks: [],
  addTask: () => {},
  toggleTask: () => {},
  deleteTask: () => {},
};

export const TaskContext = createContext<TaskContextType>(defaultTaskContext);

export function useTaskContext() {
  return useContext(TaskContext);
}
