const API_URL = "/api/todos";

async function getTodos() {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

async function displayTodos() {
  const todos = await getTodos();
  const container = document.getElementById("todos-container");

  if (todos.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        No tasks yet. Add one above!
      </div>
    `;
    return;
  }

  container.innerHTML = todos
    .map(
      (todo) => `
    <div class="bg-white rounded-lg shadow-md p-4 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 flex-1">
        <input 
          type="checkbox" 
          ${todo.isCompleted ? "checked" : ""} 
          onchange="toggleTodo(${todo.id})"
          class="w-5 h-5 cursor-pointer"
        />
        <span class="${
          todo.isCompleted ? "line-through text-gray-500" : ""
        } text-lg">
          ${todo.title}
        </span>
      </div>
      <button 
        onclick="deleteTodo(${todo.id})"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
  `
    )
    .join("");
}

async function addTodo(title) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    const newTodo = await response.json();
    displayTodos();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

async function toggleTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    displayTodos();
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
}

async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    displayTodos();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

document.getElementById("add-todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("todo-input");
  const title = input.value.trim();
  if (title) {
    addTodo(title);
    input.value = "";
  }
});

displayTodos();
