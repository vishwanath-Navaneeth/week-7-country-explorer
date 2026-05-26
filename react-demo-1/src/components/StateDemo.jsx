import { useState } from "react";

function StateDemo()
{
    //primitives
    let [counter,setCounter]=useState(10);
    //arrays
    let [marks,setMarks]=useState([30,40]);
    //objects
     let [user,setUser]=useState({email:"jyosnabogari@09"});
    const Increment=()=>{
        setCounter(prev=>prev+1);
        setCounter(prev=>prev+1);
        setCounter(prev=>prev+1);
    };
    //Decrement
    const Decrement=()=>{
        setCounter(counter-1);
    }
    //Reset
    const reset=()=>{
        setCounter(0);
    }
    
    //arrays
    //for arrays; we use (for of loop is used but it will not return ) 
    const addMarks=()=>{
        //marks.push(90);
        //setMarks(marks); if we do like this the object reference is same so the react will think that it is initial object values so it not re-render
        setMarks([...marks,90]);
        
    }
     //update marks state by inserting ele at beginning and ending and in between with index
    const updateMarks=(ele,index)=>{
      setMarks([...marks.slice(0,index) ,ele ,marks.slice(index)]);
    }


    
    //delete marks from end of an array
    const deleteMarks=(index)=>{
        // setMarks(marks.slice(0,-1))
           let result= marks.filter((_,i)=>i!=index) 
           setMarks(result);
    }
    //objects
    //for objects; we use (for in loop is used) 

    const updateUser=()=>{
        setUser({...user,name:"Jyosna"});
    }
    return(
  <div className="counter text-center">
    <p>Counter:{counter}</p>
    <button onClick={Increment}>+</button>
    <button onClick={Decrement}>-</button>
    <button onClick={reset}>Reset</button>
    <button onClick={addMarks}  className="bg-blue-400 m-1 p-1 gap-1">AddMarks</button>
    <p>{marks.join(",")}</p>
    <p>{user.name}</p>
    <button onClick={()=>updateMarks(10,2)} className="bg-amber-200">updateMarks</button>
    <button onClick={()=>deleteMarks(2)} className="bg-amber-200">deleteMarks</button>
    {
        Object.values(user).map((u,index)=><p>{u}</p>)
    }
    <button onClick={updateUser} className="bg-amber-200">updateUser</button>
  </div>
    )
}
export default StateDemo;