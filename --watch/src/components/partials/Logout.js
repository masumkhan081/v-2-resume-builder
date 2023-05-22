import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../context/Provider";
import PageLogin from "../pages/PageLogin";
//
export default function Logout() {
  const { user } = useContext(authContext);
  return <PageLogin />;
}
