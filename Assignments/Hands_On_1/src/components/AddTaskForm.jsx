import { useState } from "react";
import { primaryBtn } from "../styles/common";

function AddTaskForm({ addTask }) {

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false
    };

    addTask(newTask);

    setTitle("");
    setPriority("");
    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 md:items-center justify-between p-4 bg-gray-50 rounded-lg"
    >

      <input
        type="text"
        placeholder="Task title"
        value={title}
        className="border border-blue-400 rounded px-4 py-2 w-full md:w-auto"
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={priority}
        className="border border-blue-400 rounded px-4 py-2"
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit" className={primaryBtn}>
        Add Task
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}

export default AddTaskForm;