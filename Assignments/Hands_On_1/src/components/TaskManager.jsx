import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

function TaskManager() {

  const [tasks, setTasks] = useState([]);

  // Add task
  function addTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  // delete task
  function deleteTask(id) {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
  }

  // toggle complete
  function toggleComplete(id) {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  }

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div>

      <AddTaskForm addTask={addTask} />

     

      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
       
       <div className="flex flex-col m-5 text-center p-2 text-2xl">
       <h3 >Total Tasks: {tasks.length}</h3>
      <h3 >Completed: {completedCount}</h3>
     </div>
    </div>
  );
}

export default TaskManager;