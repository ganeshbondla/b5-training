import React from "react";
import { Link } from "react-router-dom";

const Header = ({ active }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <b>To Do Application</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  Home
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    active === "Login" ? "text-primary" : ""
                  }`}
                  to={"/"}
                >
                  <b>Login</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    active === "Register" ? "text-primary" : ""
                  }`}
                  to="/register"
                >
                  <b>Register</b>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
