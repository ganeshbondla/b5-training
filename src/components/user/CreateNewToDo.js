import React, { useState, useContext, useEffect } from "react";
import UserHeader from "./UserHeader";
import { userContext } from "../helpers/PrivateRoute";
import { authTokenKey, baseURL } from "../utils/utils";
import { toast } from "react-toastify";
import LoadingShow from "../helpers/LoadingShow";

const CreateNewToDo = () => {
  const { user_email } = useContext(userContext);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputStatus, setInputStatus] = useState(0);
  const [inputUser, setInputUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState([]);

  const handleNewTodo = (e) => {
    e.preventDefault();
    const newTodoObject = {
      title: inputTitle,
      desc: inputDesc,
      status: inputStatus,
      user: inputUser,
    };
    const endpoint = `${baseURL}/todo/create`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem(authTokenKey) || "",
      },
      body: JSON.stringify(newTodoObject),
    };
    fetch(endpoint, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          clearInputs();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  };

  const getActiveUsers = async () => {
    setIsLoading(true);
    const endpoint = `${baseURL}/user/list`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem(authTokenKey) || "",
      },
    };
    await fetch(endpoint, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setActiveUsers(data.users);
        } else {
          toast.error(data.message);
        }
      });
    setIsLoading(false);
  };

  const clearInputs = () => {
    setInputTitle("");
    setInputDesc("");
    setInputStatus("");
    setInputUser("");
  };

  useEffect(() => {
    getActiveUsers();
  }, []);

  const usersDropDownShow = activeUsers.map((user, index) => {
    let showEmail;
    if (user_email === user.email) {
      showEmail = `ME (${user.email})`;
    } else {
      showEmail = user.email;
    }
    return (
      <option key={index} value={user.email}>
        {showEmail}
      </option>
    );
  });

  return (
    <>
      <div className="container">
        <UserHeader active="CreateNewToDo" session_email={user_email} />
        <div className="mt-3 p-4">
          <div className="row">
            <div className="col-4">
              <h5 className="text-primary">Create new Todo</h5>
            </div>
            <div className="col-4"></div>
            <div className="col-4"></div>
          </div>
          <hr></hr>
          {isLoading ? (
            <>
              <LoadingShow />
            </>
          ) : (
            <>
              <div className="row">
                <div className="col-md-3 col-lg-3"></div>
                <div className="col-md-6 col-lg-6 text-center">
                  <h5>Add New Todo</h5>
                  <form className="mt-3" onSubmit={handleNewTodo}>
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="inputTitle"
                        placeholder="Enter Title"
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <textarea
                        class="form-control"
                        id="inputDesc"
                        placeholder="Enter Work Description"
                        value={inputDesc}
                        onChange={(e) => setInputDesc(e.target.value)}
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <select
                        id="inputStatus"
                        onChange={(e) => setInputStatus(e.target.value)}
                        class="form-select"
                        required
                        value={inputStatus}
                      >
                        <option value="">-- Select Status --</option>
                        <option value="1">To-Do</option>
                        <option value="2">Progressing</option>
                        <option value="3">Completed</option>
                        <option value="4">Cancelled</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <select
                        id="inputStatus"
                        onChange={(e) => setInputUser(e.target.value)}
                        class="form-select"
                        required
                        value={inputUser}
                      >
                        <option value={""}>--Select Users --</option>
                        {usersDropDownShow}
                      </select>
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
                <div className="col-md-3 col-lg-3"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateNewToDo;
