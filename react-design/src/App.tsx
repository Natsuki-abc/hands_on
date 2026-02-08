import React from "react";
import "./App.css";
import { TaskProvider } from "./contexts/TaskProvider";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { useTaskContext } from "./contexts/TaskContext";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <MainContent />
    </TaskProvider>
  );
};

const MainContent: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskContext();
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
