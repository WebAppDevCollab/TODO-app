const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

const todos = [
  { id: 1, title: "Do homework", isCompleted: false },
  { id: 2, title: "Learn English", isCompleted: false },
  { id: 3, title: "Do chores", isCompleted: false },
];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  const new_todo = {
    id: todos.length + 1,
    title: title,
    isCompleted: false,
  };
  todos.push(new_todo);
  res.json(new_todo);
});

app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === parseInt(id));
  todo.isCompleted = !todo.isCompleted;
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const deletedTodo = todos.filter((todo) => todo.id !== id);
  res.json(deletedTodo);
});

app.get("/todos", (req, res) => {
  res.render("todos", { title: "TODO list" });
});

app.get("/", (req, res) => {
  res.render("index", { title: "TODO", message: "Welcome to the TODO app!" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
