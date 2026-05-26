import { useForm } from "react-hook-form";

function FormDemo()
{

   const {register,handleSubmit,formState:{errors}}=useForm(); //here the errors are in the formState so we arw destructuring the error {}
  console.log(errors);

   //form submission
   const formSubmission=(obj)=>{
    console.log(obj);
   }
   return(
   <div >
    <h1 >Form</h1>
      <form onSubmit={handleSubmit(formSubmission)} >
         <div className="mb-3">
             <input type="text" {...register("username" ,{required:true ,minLength:3}) } placeholder="username"></input>
             {
                errors.username?.type==="required" && <p className="text-red-600">Username required</p>
             }
             {
                errors.username?.type==="minLength" && <p className="text-red-600">minLength is 3</p>
             }
         </div>
         <div className="mb-3">
             <input type="email" {...register("email") } placeholder="email"></input>
         </div>
         <div>
             <button type="submit" placeholder="submit" className="bg-blue-400">Login</button>
         </div>
        </form>
   </div>
   )
}
export default FormDemo;