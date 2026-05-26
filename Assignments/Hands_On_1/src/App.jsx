import TaskManager from "./components/TaskManager";
import { formCard } from "./styles/common";
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
      <div className=".w-[900px] flex flex-col gap-2.5 m-10 bg-white shadow-lg rounded-xl p-10" >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Task Manager
        </h1>
        <TaskManager />
      </div>
    </div>
  );
}

export default App;