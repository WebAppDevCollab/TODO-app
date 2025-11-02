const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

const todos = [
  { id: 1, title: "Do homework", isCompleted: false },
  { id: 2, title: "Learn English", isCompleted: false },
  { id: 3, title: "Do chores", isCompleted: false },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Welcome", message: "Welcome to TODO App" });
});

app.get("/todos", (req, res) => {
  res.render("todos", { title: "My TODO List" });
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  const maxId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) : 0;
  const new_todo = {
    id: maxId + 1,
    title: title,
    isCompleted: false,
  };

  todos.push(new_todo);
  res.json(new_todo);
});

app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.isCompleted = !todo.isCompleted;
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deletedTodo = todos.splice(index, 1)[0];
  res.json(deletedTodo);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
