import React from "react";
import { Link } from "react-router-dom";
import { logoutHandler } from "../utils/utils";

const UserHeader = ({ active, session_email }) => {
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
                <Link
                  className={`nav-link ${
                    active === "ListOfToDos" ? "text-primary" : ""
                  }`}
                  to={"/user/list-todos"}
                >
                  <b>My DoTos</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    active === "CreateNewToDo" ? "text-primary" : ""
                  }`}
                  to={"/user/create-todo"}
                >
                  <b>New Todo</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    active === "UserProfile" ? "text-primary" : ""
                  }`}
                  to={"/user/profile"}
                >
                  <b>Profile</b>
                </Link>
              </li>
            </ul>
            <small>Hello, {session_email}</small>
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link" onClick={logoutHandler}>
                  <b>Logout</b>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserHeader;
