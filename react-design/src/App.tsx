import React from "react";
import "./App.css";
import { useTaskList } from "./hooks/useTaskList";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskList();

  return (
    <div className="app">
      <header className="app-header">
        <h1>タスク管理アプリ</h1>
      </header>
      <div className="tasks-container">
        <TaskForm onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;
