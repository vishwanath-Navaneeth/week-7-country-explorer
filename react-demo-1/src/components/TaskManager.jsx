
import TasksList from './TasksList'
import AddTask from './AddTask'
import TasksCount from './TasksCount'
import { useState } from 'react'

function TaskManager() {
    //tasks array
    const [tasks,setTasks]=useState([]);
     
    const addNewTask=(taskObj)=>{
     setTasks([...tasks,taskObj])
    } 
    
    return (
        <div>
            <h1 className='text-center flex flex-col gap-1 p-2 text-3xl'>TaskManager</h1>
            <div className='flex justify-around'>
                  <AddTask addNewTask={addNewTask}/>
                <TasksList tasks={tasks}/>
                <TasksCount  tasks={tasks}/>
            </div>
        </div>
    )
}

export default TaskManager
