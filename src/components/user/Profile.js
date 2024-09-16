import React from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <>
      <div className="container">
        <UserHeader active="UserProfile" />
        <div className="mt-3 p-4">
          <div className="row">
            <div className="col-md-4 col-lg-4">
              <h5 className="text-primary">User Profile</h5>
            </div>
            <div className="col-md-4 col-lg-4"></div>
            <div className="col-md-4 col-lg-4"></div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-md-4 col-lg-4">
              <img
                src="/img/profile.png"
                class="img-thumbnail"
                alt="ProfileImage"
              />
              <div className="text-center mt-2">
                <h5>Ganesh Bondla</h5>
              </div>
            </div>
            <div className="col-md-8 col-lg-8 my-auto">
              <div className="text-center">
                <b>Profile Info</b>
              </div>
              <table className="table table-striped mt-2">
                <tbody>
                  <tr>
                    <th>Email Address</th>
                    <td>test@gmail.com</td>
                  </tr>
                  <tr>
                    <th>Mobile Number</th>
                    <td>1234567891</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr></hr>
          <div className="mt-3 text-center">
            <b>
              You want to Out From Session? Then <Link to={""}>LOGOUT NOW</Link>
            </b>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
