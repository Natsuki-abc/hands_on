import React, { useState, useEffect } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import "./App.css";
import type { Task } from "./domain/Task";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: title.trim(),
        completed: false,
        priority,
      };
      setTasks([...tasks, newTask]);
      setTitle("");
      setPriority("medium");
    }
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>タスク管理アプリ</h1>
      </header>

      <div className="tasks-container">
        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="新しいタスクを追加"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task["priority"])}
          >
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
          </select>
          <button type="submit">追加</button>
        </form>

        {tasks.length === 0 ? (
          <p className="empty-message">
            タスクがありません。新しいタスクを追加してください。
          </p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? "completed" : ""}`}
              >
                <div>
                  <span className={`task-priority priority-${task.priority}`}>
                    {task.priority}
                  </span>
                  <span className="task-title">{task.title}</span>
                </div>
                <div className="task-actions">
                  <button
                    className="toggle-btn"
                    onClick={() => handleToggleTask(task.id)}
                    aria-label={
                      task.completed
                        ? "タスクを未完了にする"
                        : "タスクを完了する"
                    }
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(task.id)}
                    aria-label="タスクを削除"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
