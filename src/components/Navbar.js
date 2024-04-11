import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let history = useNavigate();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handlelogout = () => {
    localStorage.removeItem('token');
    // notes=[];
    history("/");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="light">
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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
