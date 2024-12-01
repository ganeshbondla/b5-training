import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { baseURL } from "./utils/utils";
import { toast } from "react-toastify";

const Register = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputMobile, setInputMobile] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const registerObject = {
      name: inputName,
      email: inputEmail,
      mobile: inputMobile,
      password: inputPassword,
    };
    const endpoint = `${baseURL}/user/create`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerObject),
    };
    fetch(endpoint, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  };
  return (
    <>
      <div className="container">
        <Header active={"Register"} />
        <div className="row mt-5">
          <div className="col-md-6 col-lg-6 p-2 d-none d-sm-none d-md-block">
            <img
              src="/img/register.png"
              className="img-fluid"
              alt="Register Images"
            />
          </div>
          <div className="col-md-6 col-lg-6 p-2 my-auto">
            <div className="p-4 border rounded shadow">
              <h3 className="text-center">Register</h3>
              <form className="mt-4" onSubmit={handleRegister}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Your Full Name"
                    onChange={(e) => setInputName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    placeholder="Email Address"
                    onChange={(e) => setInputEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="inputNumber"
                    placeholder="Mobile Number"
                    onChange={(e) => setInputMobile(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Create Password"
                    onChange={(e) => setInputPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
              </form>
              <div className="row mt-4">
                <div className="col text-start">
                  <small>
                    Already Have Account? <Link to="/">Login here</Link>
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

export default Register;
