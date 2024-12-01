import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ListOfToDos from "./components/user/ListOfToDos";
import CreateNewToDo from "./components/user/CreateNewToDo";
import UserProfile from "./components/user/Profile";
import PrivateRoute from "./components/helpers/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user/list-todos"
            element={
              <PrivateRoute>
                <ListOfToDos />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/create-todo"
            element={
              <PrivateRoute>
                <CreateNewToDo />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
