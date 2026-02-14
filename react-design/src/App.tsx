import React, { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import {
  useTaskReducer,
  taskReducer,
  taskActionTypes,
} from "./hooks/useTaskReducer";
import type { TaskState, TaskAction } from "./hooks/useTaskReducer";
import type { Task } from "./domain/Task";

const App: React.FC = () => {
  const initialTasks: Task[] = (() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  })();

  const [completionCount, setCompletionCount] = useState(0);
  const tooManyCompletions = completionCount >= 4;

  const { tasks, addTask, toggleTask, deleteTask } = useTaskReducer({
    initialTasks,
    reducer(currentState: TaskState, action: TaskAction): TaskState {
      const changes = taskReducer(currentState, action);

      if (tooManyCompletions && action.type === taskActionTypes.TOGGLE) {
        return currentState;
      }

      return changes;
    },
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleToggle = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task && !task.completed && !tooManyCompletions) {
      setCompletionCount((count) => count + 1);
    }
    toggleTask(id);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>タスク管理アプリ</h1>
        {tooManyCompletions && (
          <div
            style={{
              color: "#e74c3c",
              marginTop: "0.5rem",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            完了操作は4回までです
            <button
              onClick={() => setCompletionCount(0)}
              style={{
                marginLeft: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              リセット
            </button>
          </div>
        )}
      </header>
      <div className="tasks-container">
        <TaskForm onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onToggleTask={handleToggle}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;
