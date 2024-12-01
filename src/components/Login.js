import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { baseURL } from "./utils/utils";
import { toast } from "react-toastify";
import { authTokenKey } from "./utils/utils";

const Login = () => {
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const loginObject = {
      username: inputUsername,
      password: inputPassword,
    };
    const endpoint = `${baseURL}/user/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObject),
    };
    fetch(endpoint, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem(authTokenKey, data.token);
          navigate("/user/list-todos");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <div className="container">
        <Header active={"Login"} />
        <div className="row mt-5">
          <div className="col-md-6 col-lg-6 p-2 d-none d-sm-none d-md-block">
            <img
              src="/img/login.png"
              className="img-fluid"
              alt="Login Images"
            />
          </div>
          <div className="col-md-6 col-lg-6 p-2 my-auto">
            <div className="p-4 border rounded shadow">
              <h3 className="text-center">Login</h3>
              <form className="mt-4" onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Username"
                    onChange={(e) => {
                      setInputUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(e) => {
                      setInputPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </form>
              <div className="row mt-4">
                <div className="col text-start">
                  <small>
                    No Account? <Link to="/register">Register here</Link>
                  </small>
                </div>
                <div className="col text-end">
                  <small>
                    <a href="http://google.com">Forgot Password?</a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
