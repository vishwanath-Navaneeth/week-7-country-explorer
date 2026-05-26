import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleComplete }) {

  if (tasks.length === 0)
    return (
      <p className="text-center text-red-500 text-xl mt-5">
        No Tasks Yet
      </p>
    );

  return (
    <div className="flex flex-col gap-4 p-5 bg-blue-50 m-5 rounded-lg">

      <h1 className="text-2xl font-semibold text-center">
        List Of Tasks
      </h1>

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;