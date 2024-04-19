import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from '../context/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  let location = useLocation();
  let history = useNavigate();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

  const handlelogout = () => {
    localStorage.removeItem('token');
    // notes=[];
    history("/Login");
  }

  const { darkMode, toggleDarkMode } = useDarkMode();

  const toggleTheme = () => {
    // Toggle data-bs-theme attribute value
    const theme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/About' ? 'active' : ""}`} to="/About">
                  About
                </Link>
              </li>
            </ul>
          </div>
          {!localStorage.getItem('token') ?
            <ul className="navbar-nav">
              <li className="nav-item m-1">
                <Link className="btn btn-primary" to="/Login">
                  Login
                </Link>
              </li>
              <li className="nav-item m-1">
                <Link className="btn btn-primary" to="/Signup">
                  Signup
                </Link>
              </li>
            </ul> : <div>
              <button className="btn btn-primary" onClick={handlelogout}>
                Logout
              </button></div>
          }
          <FontAwesomeIcon icon={faCircleHalfStroke} onClick={() => { toggleDarkMode(); toggleTheme(); }} style={{cursor:'pointer'}} className="mx-2"/>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
