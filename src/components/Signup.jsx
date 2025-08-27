import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/Alert/AlertContext';

export default function Signup() {
  const {showAlert}= useAlert();
  const [credentails,setCred]=useState({name:"",email:"", password:"", cpassword:""})
  const navigate=useNavigate();
    const handleSubmit=async (e)=>{
      e.preventDefault();
      const response=await fetch('http://localhost:5000/api/auth/createuser',{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({name:credentails.name, email:credentails.email, password:credentails.password})
      });
      const json =await response.json();
      console.log(json);
      if(json.success){
        showAlert("Account Created Successfully!", "success", 1500)
        navigate("/");
      }
      else{
        showAlert("Invalid Details!", "danger", 1500)
      }
  
    }
  
    const handleChange=(e)=>{
      setCred({...credentails,[e.target.name]: e.target.value})
    }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="name" className="form-control" id="name" name='name' onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={handleChange}/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name='password' onChange={handleChange} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={handleChange} minLength={5} required />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}
