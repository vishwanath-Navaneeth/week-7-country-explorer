import { useForm } from "react-hook-form"

function AddTask({ addNewTask }) {

  // register is used to connect an input field to the form so the library can track its value and validation.
  
  const { register, handleSubmit ,reset} = useForm();

  const onFormSubmit = (taskObj) => {
    //display the taskname on console
    console.log(taskObj)
    //here it calls the addNewTask function which is there in the TaskManager and append the taskname as parameter as taskObj
    addNewTask(taskObj); 
    reset()
  }
  return (
    <div className="flex flex-col">
      <h3 className="text-amber-300 text-3xl">AddTask</h3>
      <form onSubmit={handleSubmit(onFormSubmit)} className="m-2">
        <div>
          <input type="text"{...register("taskname")} placeholder="Enter new Task" className="border"></input>
        </div>
        <div className="py-2">
          <button type="submit" className="bg-blue-500 px-12 py-1">AddTask</button>
        </div>
      </form>
    </div>
  )
}

export default AddTask
