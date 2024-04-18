import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import AlertContext from '../context/AlertContext';

const Signup = () => {
  const host = process.env.REACT_APP_HOST;
  const [user, setUser] = useState({ name:"",email: "", password: "",cpassword:"" });
  let history = useNavigate();
  const{alert,alertCapitalize,showAlert} = useContext(AlertContext)

  const onchange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value});
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
        if (user.password !== user.cpassword) {
            showAlert("Passwords don't match", "danger");
            return;
        }

        const host = process.env.REACT_APP_HOST;
        const response = await fetch(`${host}/api/auth/CreateUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonbody = await response.json();

        if (jsonbody.success) {
            showAlert("Account Created Successfully", "success");
            localStorage.setItem('token', jsonbody.auth_token);
            history("/");
        } else {
            showAlert("Invalid credentials", "danger");
        }
    } catch (error) {
        // console.error('Error:', error.message);
        showAlert("An error occurred. Please try again later.", "danger");
    }
}


  return (
    <div className='container col-md-4 border rounded p-3'>
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
