import React from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";

const ListOfToDos = () => {
  return (
    <>
      <div className="container">
        <UserHeader active="ListOfToDos" />
        <div className="mt-3 p-4">
          <div className="row">
            <div className="col-4">
              <h5 className="text-primary">List Of Todos</h5>
            </div>
            <div className="col-4">
              <div>
                <select id="todoRelation" className="form-select">
                  <option>All</option>
                  <option>Assigned To Me</option>
                  <option>Assigned By Me</option>
                </select>
              </div>
            </div>
            <div className="col-4">
              <div>
                <input
                  type="text"
                  class="form-control"
                  id="searchTodo"
                  placeholder="Search Item"
                />
              </div>
            </div>
          </div>
          <hr></hr>
          <table class="table mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Completed Shopping</td>
                <td>Buy All Function Related Items</td>
                <td>To-Do</td>
                <td>
                  <Link
                    className="mr-3"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    to=""
                  >
                    <i
                      className="fa fa-pencil-square-o mr-2"
                      aria-hidden="true"
                    ></i>
                  </Link>{" "}
                  |{" "}
                  <Link
                    className="text-danger"
                    to=""
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Modal for Edit */}
        <div
          class="modal fade"
          id="editModal"
          tabindex="-1"
          aria-labelledby="editModal"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editModal">
                  Edit Todo
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="inputTitle"
                      placeholder="Enter Title"
                    />
                  </div>
                  <div class="mb-3">
                    <textarea
                      class="form-control"
                      id="inputDesc"
                      placeholder="Enter Work Description"
                    />
                  </div>
                  <div class="mb-3">
                    <select id="inputStatus" class="form-select">
                      <option value={"To-Do"}>To-Do</option>
                      <option value={"Progressing"}>Progressing</option>
                      <option value={"Completed"}>Completed</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <select id="inputStatus" class="form-select">
                      <option value={""}>--Select Users --</option>
                      <option value={"123465"}>ME</option>
                      <option value={"123465"}>Ganesh</option>
                      <option value={"46785"}>Sreeja</option>
                    </select>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal for Delete */}
        <div
          class="modal fade"
          id="deleteModal"
          tabindex="-1"
          aria-labelledby="deleteModal"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteModal">
                  Delete Todo
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="inputTitle"
                      placeholder="Enter Title"
                      disabled
                    />
                  </div>
                  <div class="mb-3">
                    <textarea
                      class="form-control"
                      id="inputDesc"
                      placeholder="Enter Work Description"
                      disabled
                    />
                  </div>
                  <div class="mb-3">
                    <select id="inputStatus" class="form-select" disabled>
                      <option value={"To-Do"}>To-Do</option>
                      <option value={"Progressing"}>Progressing</option>
                      <option value={"Completed"}>Completed</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <select id="inputStatus" class="form-select" disabled>
                      <option value={""}>--Select Users --</option>
                      <option value={"123465"}>ME</option>
                      <option value={"123465"}>Ganesh</option>
                      <option value={"46785"}>Sreeja</option>
                    </select>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-danger">
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
