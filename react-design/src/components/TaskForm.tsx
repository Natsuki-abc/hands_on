import React, { useState } from "react";
import type { Task } from "../domain/Task";

interface TaskFormProps {
  onAddTask: (title: string, priority: Task["priority"]) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title, priority);
      setTitle("");
      setPriority("medium");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
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
  );
};

export default TaskForm;
