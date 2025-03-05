import React, { useState, useEffect } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900 text-white p-6 rounded-xl shadow-2xl w-full max-w-md border border-white/10">
        <h1 className="text-3xl font-bold text-center text-white mb-4">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new task"
            className="flex-grow px-4 py-2 text-white bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button
            onClick={addTodo}
            className="ml-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 bg-zinc-800 rounded-md border border-white/10"
            >
              <Checkbox.Root
                className="w-6 h-6 border border-white/10 rounded-md flex items-center justify-center"
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              >
                <Checkbox.Indicator>
                  <span className="text-green-400">✔</span>
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span
                className={`flex-grow ml-3 cursor-pointer ${todo.completed ? "line-through text-gray-500" : "text-white"}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
