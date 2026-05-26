import FormDemo from "./components/FormDemo";
import StateDemo from "./components/StateDemo";
import FormSubmission from "./components/FormSubmission";
import TaskManager from "./components/TaskManager";
function App()
{
  return(
    <div>
      <h1 className="text-center text-4xl text-blue-600">React Application</h1>
      {/* <StateDemo/> */}
      {/* <FormDemo/> */}
      {/* <FormSubmission/> */}
      <TaskManager/>
    </div>
  )
}
export default App;