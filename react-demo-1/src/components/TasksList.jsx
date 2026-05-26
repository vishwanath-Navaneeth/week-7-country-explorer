
function TasksList({tasks}) {
    if(tasks.length===0)
        return <p className="text-red-500 text-center font-semibold bg-red-50 p-2 rounded">Empty</p>
        
  return (
    <div>
      <h3 className="text-amber-300 text-3xl " >List of Tasks</h3>
      {/* if tasks list empty then "empty" else iterate the list */}

    
     {tasks.map((taskObj,index)=><p key={index} className="text-center">{taskObj.taskname}</p> )}
    </div>
  );
}

export default TasksList

//