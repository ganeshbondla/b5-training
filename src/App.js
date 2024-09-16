import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ListOfToDos from "./components/user/ListOfToDos";
import CreateNewToDo from "./components/user/CreateNewToDo";
import UserProfile from "./components/user/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/list-todos" element={<ListOfToDos />} />
          <Route path="/user/create-todo" element={<CreateNewToDo />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
