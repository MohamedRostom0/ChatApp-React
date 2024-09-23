import React from "react";
import { useLocation } from "react-router-dom";
import Login from "../components/auth-page/Login";
import Register from "../components/auth-page/Register";

export const AuthPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const paramValue: string | null = queryParams.get("fn");

  return (
    <>
      {paramValue === "login" && <Login />}
      {paramValue === "register" && <Register />}
    </>
  );
};
