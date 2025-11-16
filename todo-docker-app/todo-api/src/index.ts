import { serve } from "@hono/node-server";
import { Hono } from "hono";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [];

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// タスク一覧取得
app.get("/todos", (c) => {
  return c.json({ todos });
});

// タスクの追加
app.post("/todos", async (c) => {
  const { title } = await c.req.json();
  const todo: Todo = {
    id: todos.length + 1,
    title,
    completed: false,
  };
  todos.push(todo);
  return c.json({ todo });
});

// タスク 完了/未完了 の更新
app.put("/todos/:id", async (c) => {
  const { id } = c.req.param();
  const { completed } = await c.req.json();
  const todo = todos.find((todo) => todo.id === Number(id));
  if (!todo) {
    return c.notFound(); // 404返却
  }
  todo.completed = completed;
  return c.json({ todo });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
