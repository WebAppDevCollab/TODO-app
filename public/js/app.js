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
      <div class="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        No tasks yet. Add one above!
      </div>
    `;
    return;
  }

  let todoHTML = "";
  todos.forEach((todo) => {
    todoHTML += `
      <div class="bg-white rounded-lg shadow p-4 flex items-center gap-3">
        <input
          type="checkbox"
          ${todo.isCompleted ? "checked" : ""}
          onchange="toggleTodo(${todo.id})"
          class="w-5 h-5 cursor-pointer"
        />
        <span class="${todo.isCompleted ? "line-through text-gray-500" : ""} flex-1">
          ${todo.title}
        </span>
        <button
          onclick="deleteTodo(${todo.id})"
          class="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition-colors"
        >
          Delete
        </button>
      </div>
    `;
  });

  container.innerHTML = todoHTML;
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

    if (response.ok) {
      await displayTodos();
    }
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

async function toggleTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
    });

    if (response.ok) {
      await displayTodos();
    }
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
}

async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await displayTodos();
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayTodos();

  const form = document.getElementById("add-todo-form");
  const input = document.getElementById("todo-input");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = input.value.trim();

    if (title) {
      await addTodo(title);
      input.value = "";
      input.focus();
    }
  });
});
