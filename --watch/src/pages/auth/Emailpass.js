import React from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Signup from "./Signup";
import Signin from "./Signin";
//
export default function Emailpass() {
  const [size, setSize] = React.useState({ in: 22, up: 12 });
  const bs = "border-success";
  /*
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function updatePass(password) {
    return currentUser.updatePassword(password);
  }

  function reset(email) {
    sendPasswordResetEmail(auth, email)
      .then(function (result) {
        console.log(JSON.stringify(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
*/

  return (
    <div className=" col-md-4 rounded-3 pb-2 bg-success bg-opacity-10 px-0">
      <div
        className="nav nav-tabs d-flex justtify-content-center mb-2 border-0"
        id="nav-tab"
        role="tablist"
      >
        {/* " text-center d-block rounded-3 bg-light shadow-sm text-black-50 bg-opacity-50 fw-normal" */}
        <button
          onClick={() => {
            setSize({ ...size, up: 12, in: 22 });
          }}
          className="w-50 border-0 rounded-start nav-link active bg-light shadow-sm text-dark  bg-opacity-50 fw-normal py-0"
          id="nav-signin-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-signin"
        >
          <FaSignInAlt size={size.in} className="mb-1 me-1  text-success" />
          Sign in
        </button>
        <button
          onClick={() => {
            setSize({ ...size, up: 22, in: 12 });
          }}
          className="w-50 rounded-end nav-link border-0 bg-light shadow-sm text-dark bg-opacity-50 fw-normal py-0"
          id="nav-signup-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-signup"
        >
          <FaUserPlus size={size.up} className="mb-1 me-1 text-success" /> Sign
          up
        </button>
      </div>

      <div className="tab-content px-3 " id="nav-tabContent">
        <Signin />
        <Signup />
      </div>
    </div>
  );
}
