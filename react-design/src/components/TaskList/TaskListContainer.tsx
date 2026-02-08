import React, { useState, useEffect } from "react";
import TaskListPresenter from "./TaskListPresenter";
import type { Task } from "../../domain/Task";
import TaskFormPresenter from "../TaskForm/TaskFormPresenter";

const TaskListContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleToggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleAddTask = (title: string, priority: Task["priority"]) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="tasks-container">
      <TaskFormPresenter onAddTask={handleAddTask} />
      <TaskListPresenter
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskListContainer;
