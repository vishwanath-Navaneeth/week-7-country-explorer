//rfce
// Before the v16 mandatory :import React from 'react'

function TasksCount({tasks}) {
  return (
    <div className="flex flex-col gap-1">
     <h3 className="text-amber-300 text-3xl"> TasksCount</h3>
      <p className="text-center">{tasks.length}</p>
    </div>
  );
}

export default TasksCount
