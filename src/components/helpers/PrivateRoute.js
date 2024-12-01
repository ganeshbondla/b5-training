import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL, authTokenKey } from "../utils/utils";
import { toast } from "react-toastify";
import LoadingShow from "./LoadingShow";

export const userContext = createContext();

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValidated, setIsValidated] = useState(false);
  const [loginUserInfo, setLoginUserInfo] = useState([]);
  const navigate = useNavigate();
  const checkAuth = async () => {
    const endpoint = `${baseURL}/user/auth`;
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
          setLoginUserInfo(data);
          setIsValidated(true);
        } else {
          toast.error(data.message);
          setIsValidated(false);
        }
      });
    setIsLoading(false);
  };
  useEffect(() => {
    checkAuth();
  }, []);
  if (isLoading) {
    return <LoadingShow />;
  } else {
    if (isValidated) {
      return (
        <userContext.Provider value={loginUserInfo}>
          {children}
        </userContext.Provider>
      );
    } else {
      return navigate("/");
    }
  }
};

export default PrivateRoute;
