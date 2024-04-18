import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/AlertContext';

const Login = () => {
    const [user, Setuser] = useState({ email: "", password: "" });
    let history = useNavigate();
    const { alert, alertCapitalize, showAlert } = useContext(AlertContext);

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        try {
            const host = process.env.REACT_APP_HOST;
            const response = await fetch(`${host}/api/auth/LoginUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: user.email, password: user.password }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const jsonbody = await response.json();
            
            if (jsonbody.success) {
                showAlert("Logged in Successfully", "success");
                localStorage.setItem('token', jsonbody.auth_token);
                history("/");
            } else {
                showAlert("Invalid credentials", "danger");
            }
        } catch (error) {
            // Handle network errors, server errors, or any other exceptions
            // console.error('Error:', error.message);
            showAlert("An error occurred. Please try again later.", "danger");
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
        <div className='container col-md-4 sm-3 border rounded p-3 mx-auto'>
            <h3 className='my-3'>Login to use iNotebook</h3>
            <hr />
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" value={user.email} onChange={onChangeuser} aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
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
