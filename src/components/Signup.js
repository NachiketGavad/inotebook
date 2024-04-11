import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import AlertContext from '../context/AlertContext';

const Signup = () => {
  const [user, setUser] = useState({ name:"",email: "", password: "",cpassword:"" });
  let history = useNavigate();
  const{alert,alertCapitalize,showAlert} = useContext(AlertContext)

  const onchange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value});
  }

  const handlesubmit = async (e) => {
      e.preventDefault();
      if(user.password!==user.cpassword){
        // alert("Please Enter Same Passwords");
        showAlert("Enter Passwords don't match","danger");
        return;
      }
      console.log(user)
      const response = await fetch(`http://localhost:5000/api/auth/CreateUser`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
              "Content-Type": "application/json",
          }, body: JSON.stringify({name:user.name, email:user.email, password:user.password }), // body data type must match "Content-Type" header
      });
      const jsonbody = await response.json();
      console.log(jsonbody)
      if(jsonbody.success){
          showAlert("Account Created Successfully","success");
          // save token and send to home
          localStorage.setItem('token',jsonbody.auth_token);
          history("/");
      }
      else{
          // alert("invalid credentials");
            showAlert("Invalid credentials","danger");
      }
  }

  return (
    <div className='container col-md-4 border rounded p-3 my-3'>
      <h3 className='my-3'>Register to use iNotebook</h3>
      <hr/>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" name="name" value={user.name} className="form-control"  onChange={onchange} id="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name="email" value={user.email} className="form-control"  onChange={onchange} id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={user.password} onChange={onchange} id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" value={user.cpassword} onChange={onchange} id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Signup
