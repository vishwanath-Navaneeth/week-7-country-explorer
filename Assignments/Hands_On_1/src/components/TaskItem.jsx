function TaskItem({ task, deleteTask, toggleComplete }) {

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow p-4 rounded-lg">

      <div className="text-center md:text-left">

        <h3
          className={`text-lg font-semibold ${
            task.completed ? "line-through text-green-600" : ""
          }`}
        >
          {task.title}
        </h3>

        <p className="text-sm text-gray-600">
          Priority: {task.priority || "Not set"}
        </p>

        <p className="text-sm">
          Status:
          {task.completed ? (
            <span className="text-green-600 font-semibold"> Completed ✅</span>
          ) : (
            <span className="text-red-500"> Pending ❌</span>
          )}
        </p>

      </div>

      <div className="flex gap-2 mt-3 md:mt-0">

        <button
          onClick={() => toggleComplete(task.id)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Toggle
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskItem;