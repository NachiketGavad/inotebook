import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/AlertContext';

const Login = () => {
    const [user, Setuser] = useState({ email: "", password: "" });
    let history = useNavigate();
    const { alert, alertCapitalize, showAlert } = useContext(AlertContext);

    const handlesubmit = async (e) => {
        e.preventDefault();
        // console.log(user)
        const response = await fetch(`http://localhost:5000/api/auth/LoginUser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ email: user.email, password: user.password }), // body data type must match "Content-Type" header
        });
        const jsonbody = await response.json();
        // console.log(jsonbody.success)
        if (jsonbody.success) {
            showAlert("Logged in Successfully", "success");
            // save token and send to home
            localStorage.setItem('token', jsonbody.auth_token);

            history("/");
        }
        else {
            showAlert("Invalid credentials", "danger");
            // alert("invalid credentials");
        }
    }

    // const handleChangeEmail = (event) =>{
    //     Setuser({email : event.target.value})
    // }

    // const handleChangePassword = (event) =>{
    //     Setuser({password : event.target.value})
    // }


    const onChangeuser = (e) => {
        Setuser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className='container col-md-4 border rounded p-3'>
            <h3 className='my-3'>Login to use iNotebook</h3>
            <hr />
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" value={user.email} onChange={onChangeuser} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={user.password} onChange={onChangeuser} id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Login
