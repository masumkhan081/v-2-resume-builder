import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/Provider";
import AuthOptions from "./auth/AuthOptions";
import Emailpass from "./auth/Emailpass";
import Loader from "./partials/Loader";
//
export default function LoginPage() {
  //
  const { user, loading, error } = useContext(authContext);
  const navigate = useNavigate();
  //
  useEffect(() => {}, []);
  //
  if (user.account_email === "") {
    return (
      <>
        <div className=" text-center mt-3 ">
          {error ? (
            <span className="fw-light bg-danger bg-opacity-25 px-2 rounded ">
              {error}
            </span>
          ) : (
            <br />
          )}
        </div>
        <div
          className="mt-2 row d-flex justify-content-around"
          style={{ minHeight: "450px" }}
        >
          <Emailpass />
          <AuthOptions />
        </div>
      </>
    );
  } else {
    navigate("/resume");
  }
}
