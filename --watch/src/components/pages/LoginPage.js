import React, { useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { authContext } from "../../context/Provider";
import AuthOptions from "../auth/AuthOptions";
import Emailpass from "../auth/Emailpass";
import Loader from "../partials/Loader";
//
export default function PageLogin() {
  const { user, loading, error } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(
      "useeffect  --- pagelogin   " +
        JSON.stringify(user) +
        "                - -          " +
        loading
    );
    loading == true ? navigate("/profile") : navigate("/login");
  }, []);

  //
  if (loading == true) {
    return <Loader />;
  }
  if (user.loggedIn == true && loading == false) {
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  }

  if (user.loggedIn == false && loading == false) {
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
          {/* <div className=" col-md-1 col-sm-2 mt-5 text-wrap">{error}</div> */}
          <AuthOptions />
        </div>
      </>
    );
  }
}
