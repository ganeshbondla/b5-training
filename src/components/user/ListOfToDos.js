import React, { useState, useEffect, useContext } from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
import LoadingShow from "../helpers/LoadingShow";
import { userContext } from "../helpers/PrivateRoute";
import { baseURL, authTokenKey } from "../utils/utils";
import { toast } from "react-toastify";

const ListOfToDos = () => {
  const { user_email } = useContext(userContext);
  const [listOfTodos, setListOdToDos] = useState([]);
  const [listOfTodosFiltered, setListOdToDosFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");
  const [modalStatus, setModalStatus] = useState("");
  const [modalUser, setModalUser] = useState("");
  const [actionId, setActionId] = useState(0);
  const [disableInput, setDisableInput] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getListOfTodos = async () => {
    setIsLoading(true);
    const endpoint = `${baseURL}/todo/list`;
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
          setListOdToDos(data.results);
          setListOdToDosFiltered(data.results);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
    setIsLoading(false);
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

  useEffect(() => {
    getListOfTodos();
    getActiveUsers();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleEdit = (id) => {
    const getTodoById = listOfTodosFiltered.filter((todo) => todo.id === id);
    setActionId(id);
    setModalTitle(getTodoById[0].title);
    setModalDesc(getTodoById[0].todoDesc);
    setModalStatus(getTodoById[0].status);
    setModalUser(getTodoById[0].assignedTo);
    if (getTodoById[0].assignedTo === user_email) {
      if (getTodoById[0].createdBy !== user_email) setDisableInput(true);
    }
    openModal();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateTodoObject = {
      title: modalTitle,
      todoDesc: modalDesc,
      status: modalStatus,
      assignedTo: modalUser,
    };
    const endpoint = `${baseURL}/todo/update/${actionId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem(authTokenKey) || "",
      },
      body: JSON.stringify(updateTodoObject),
    };
    fetch(endpoint, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          clearModalState();
          const modalOpened = new window.bootstrap.Modal(
            document.getElementById("editModal")
          );
          modalOpened.hide();
          closeModal();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  };

  const handleDelete = (id) => {
    const getTodoById = listOfTodosFiltered.filter(
      (todo) => todo.todo_id === id
    );
    setModalTitle(getTodoById[0].todo_title);
    setModalDesc(getTodoById[0].todo_desc);
    setModalStatus(getTodoById[0].todo_status);
    setModalUser(getTodoById[0].assigned_to);
  };

  const clearModalState = () => {
    setModalTitle("");
    setModalDesc("");
    setModalStatus("");
    setModalUser("");
    setDisableInput(false);
  };

  const handleFilter = (filterOn) => {
    if (filterOn === "AssignedToMe") {
      const filteredData = listOfTodos.filter(
        (todo) => todo.assignedTo === user_email
      );
      setListOdToDosFiltered(filteredData);
    } else if (filterOn === "CreatedByMe") {
      const filteredData = listOfTodos.filter(
        (todo) => todo.createdBy === user_email
      );
      setListOdToDosFiltered(filteredData);
    } else {
      setListOdToDosFiltered(listOfTodos);
    }
  };

  const filterWithText = (inputText) => {
    if (inputText === null || inputText === undefined || inputText === "") {
      console.log("EMPTY");
      setListOdToDosFiltered(listOfTodos);
    } else {
      console.log(inputText);
      const inputTextLower = inputText.toLowerCase();
      const filteredData = listOfTodos.filter((todo) =>
        todo.title.toLowerCase().includes(inputTextLower)
      );
      setListOdToDosFiltered(filteredData);
    }
  };

  const listViewOfTodos = listOfTodosFiltered.map((todo, index) => {
    const status = todo.status;
    let showStatus;
    if (status === 1) {
      showStatus = "To-Do";
    } else if (status === 2) {
      showStatus = "Processing";
    } else if (status === 3) {
      showStatus = "Completed";
    } else {
      showStatus = "Cancelled";
    }
    let assignedTo;
    if (user_email === todo.assignedTo) {
      assignedTo = `MySelf`;
    } else {
      assignedTo = todo.assignedTo;
    }
    return (
      <tr key={index}>
        <th scope="row">{todo.id}</th>
        <td>{todo.title}</td>
        <td>{todo.todoDesc}</td>
        <td>{showStatus}</td>
        <td>{assignedTo}</td>
        <td>
          <Link
            className="mr-3"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
            to=""
            onClick={() => handleEdit(todo.id)}
            title="Edit Task"
          >
            <i className="fa fa-pencil-square-o mr-2" aria-hidden="true"></i>
          </Link>{" "}
          {user_email === todo.createdBy ? (
            <>
              |{" "}
              <Link
                className="text-danger"
                to=""
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                onClick={() => handleDelete(todo.id)}
                title="Delete Task"
              >
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </Link>
            </>
          ) : null}
        </td>
      </tr>
    );
  });

  const usersDropDownShow = activeUsers.map((user, index) => {
    let showEmail;
    if (user_email === user.email) {
      showEmail = `ME (${user.email})`;
    } else {
      showEmail = user.email;
    }
    let selected = false;
    if (modalUser) {
      if (user.email === modalUser) {
        selected = true;
      }
    }
    return (
      <option key={index} value={user.email} selected={selected}>
        {showEmail}
      </option>
    );
  });

  return (
    <>
      <div className="container">
        <UserHeader active="ListOfToDos" session_email={user_email} />
        <div className="mt-3 p-4">
          <div className="row">
            <div className="col-4">
              <h5 className="text-primary">List Of Todos</h5>
            </div>
            <div className="col-4">
              <div>
                <select
                  id="todoRelation"
                  onChange={(e) => {
                    handleFilter(e.target.value);
                  }}
                  className="form-select"
                >
                  <option value={"All"}>All</option>
                  <option value={"AssignedToMe"}>Assigned To Me</option>
                  <option value={"CreatedByMe"}>Created By Me</option>
                </select>
              </div>
            </div>
            <div className="col-4">
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="searchTodo"
                  placeholder="Search Item By Title Or Desc Or Id"
                  onChange={(e) => {
                    filterWithText(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <hr></hr>
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Assigned To</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {isLoading ? (
              <tr>
                <td className="text-center p-3" colSpan={5}>
                  <LoadingShow />
                </td>
              </tr>
            ) : (
              <>
                <tbody>{listViewOfTodos}</tbody>
              </>
            )}
          </table>
        </div>
        {/* Modal for Edit */}
        <div
          className={`modal fade ${modalVisible ? "show" : ""}`}
          style={{ display: modalVisible ? "block" : "none" }}
          id="editModal"
          tabIndex={"-1"}
          aria-labelledby="editModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleUpdate}>
                <div className="modal-header">
                  <h5 className="modal-title" id="editModal">
                    Edit Todo
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={clearModalState}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputTitle"
                      placeholder="Enter Title"
                      defaultValue={modalTitle}
                      disabled={disableInput}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      id="inputDesc"
                      placeholder="Enter Work Description"
                      defaultValue={modalDesc}
                      disabled={disableInput}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <select id="inputStatus" className="form-select" required>
                      <option value="">-- Select Status --</option>
                      <option
                        value="1"
                        selected={modalStatus === 1 ? true : false}
                      >
                        To-Do
                      </option>
                      <option
                        value="2"
                        selected={modalStatus === 2 ? true : false}
                      >
                        Progressing
                      </option>
                      <option
                        value="3"
                        selected={modalStatus === 3 ? true : false}
                      >
                        Completed
                      </option>
                      <option
                        value="4"
                        selected={modalStatus === 4 ? true : false}
                      >
                        Cancelled
                      </option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <select
                      id="inputStatus"
                      className="form-select"
                      disabled={disableInput}
                      required
                    >
                      <option value={""}>--Select Users --</option>
                      {usersDropDownShow}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={clearModalState}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Modal for Delete */}
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex={"-1"}
          aria-labelledby="deleteModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModal">
                  Delete Todo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={clearModalState}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputTitle"
                      placeholder="Enter Title"
                      value={modalTitle}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      id="inputDesc"
                      placeholder="Enter Work Description"
                      value={modalDesc}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      id="inputStatus"
                      value={modalStatus}
                      className="form-select"
                      disabled
                    >
                      <option value={"To-Do"}>To-Do</option>
                      <option value={"Progressing"}>Progressing</option>
                      <option value={"Completed"}>Completed</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <select
                      id="inputStatus"
                      value={modalUser}
                      className="form-select"
                      disabled
                    >
                      <option value={""}>--Select Users --</option>
                      <option value={"123465"}>ME</option>
                      <option value={"123465"}>Ganesh</option>
                      <option value={"46785"}>Sreeja</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={clearModalState}
                >
                  Close
                </button>
                <button type="button" className="btn btn-danger">
                  Delete Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListOfToDos;
