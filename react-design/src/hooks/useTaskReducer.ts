import { useReducer } from "react";
import type { Task } from "../domain/Task";

export const taskActionTypes = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
} as const;

export type TaskAction =
  | {
      type: typeof taskActionTypes.ADD;
      payload: { title: string; priority: Task["priority"] };
    }
  | { type: typeof taskActionTypes.TOGGLE; payload: { id: string } }
  | { type: typeof taskActionTypes.DELETE; payload: { id: string } };

export interface TaskState {
  tasks: Task[];
}

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case taskActionTypes.ADD: {
      const newTask: Task = {
        id: Date.now().toString(),
        title: action.payload.title,
        completed: false,
        priority: action.payload.priority,
      };
      return { tasks: [...state.tasks, newTask] };
    }
    case taskActionTypes.TOGGLE: {
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    }
    case taskActionTypes.DELETE: {
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

interface UseTaskReducerOptions {
  reducer?: (state: TaskState, action: TaskAction) => TaskState;
  initialTasks?: Task[];
}

export function useTaskReducer({
  reducer = taskReducer,
  initialTasks = [],
}: UseTaskReducerOptions = {}) {
  const [state, dispatch] = useReducer(reducer, { tasks: initialTasks });

  const addTask = (title: string, priority: Task["priority"]) => {
    dispatch({ type: taskActionTypes.ADD, payload: { title, priority } });
  };

  const toggleTask = (id: string) => {
    dispatch({ type: taskActionTypes.TOGGLE, payload: { id } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: taskActionTypes.DELETE, payload: { id } });
  };

  return {
    tasks: state.tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}
