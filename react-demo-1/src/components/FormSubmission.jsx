import { useForm } from "react-hook-form";
import { useState } from "react";

function FormSubmission() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // console.log(errors);
   const [users,setUser]=useState([]);



   //the date is not after 2020
   setError("dob",{
      type:"manual",
      message:"the date is not after 2020"
   }
   )
    const formSubmit = (obj) => {
        let date=new Date();
        let userDate=new Date(obj.udate)
        if(userDate<date)
        {
            //update users state
        setUser([...users,obj])
        }
    }
    return (
        <div className="text-center p-10">
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-2">
                <h2 className="text-2xl">User Regsistration Form</h2>
                <div >
                    <input type="text" {...register("firstname", { required: true, minLength: 4,maxLength:6 })} placeholder="Enter First Name" className="border-2 bg-green-300 p-2"></input>

                    {errors.firstname?.type === "required" && <p className="text-red-600">firstname required</p>}
                    {errors.firstname?.type === "minLength" && <p className="text-red-600">minLength is 4</p>}
                    {errors.firstname?.type === "maxLength" && <p className="text-red-600">maxLength is 6</p>}

                </div>
                <div>
                    <input type="text" {...register("lastname",{ required: true,minLength: 4,maxLength:6 })} placeholder="Enter Last Name" className="border-2 bg-green-300 p-2"></input>
                     {errors.lastname?.type === "required" && <p className="text-red-600">lastname required</p>}
                    {errors.lastname?.type === "minLength" && <p className="text-red-600">minLength is 4</p>}
                    {errors.lastname?.type === "maxLength" && <p className="text-red-600">maxLength is 6</p>}


                </div>
                <div>
                    <input type="email" {...register("email", { required: true })} placeholder="Enter email" className="border-2 bg-green-300 p-2"></input>
                    {errors.email?.type === "required" && <p className="text-red-600">email required</p>}
                </div>
                <div>
                    <input type="date" {...register("dob",{ required: true })} placeholder="enter date of birth" className="border-2 bg-green-300 p-2" ></input>
                   {errors.dob?.type === "required" && <p className="text-red-600">Date of Birth is required</p>}

                </div>
                <div>
                    <button type="submit" className="bg-blue-400 p-2">Login</button>
                </div>
            </form>


            {/* table */}
            <h1>List of users</h1>
            <table className="text-center">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((userObj)=>(
                            <tr>
                            <td className="border">{userObj.firstname}</td>
                            <td className="border">{userObj.lastname}</td>
                            <td className="border">{userObj.email}</td>
                            <td className="border">{userObj.dob}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default FormSubmission;