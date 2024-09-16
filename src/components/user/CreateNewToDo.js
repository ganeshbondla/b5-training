import React from "react";
import UserHeader from "./UserHeader";

const CreateNewToDo = () => {
  return (
    <>
      <div className="container">
        <UserHeader active="CreateNewToDo" />
        <div className="mt-3 p-4">
          <div className="row">
            <div className="col-4">
              <h5 className="text-primary">Create new Todo</h5>
            </div>
            <div className="col-4"></div>
            <div className="col-4"></div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-md-3 col-lg-3"></div>
            <div className="col-md-6 col-lg-6 text-center">
              <h5>Add New Todo</h5>
              <form className="mt-3">
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
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="col-md-3 col-lg-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewToDo;
