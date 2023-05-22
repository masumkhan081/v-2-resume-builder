import React, { useContext, useRef, useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authContext } from "../../context/Provider";
//
export default function Signin() {
  const signinEmailRef = useRef();
  const signinPassRef = useRef();
  //
  const { user, setTheUser, auth,setTheError } = useContext(authContext);

  async function handleSignin(e) {
    e.preventDefault();
    setError(signinPassRef.current.value + "  " + signinEmailRef.current.value);
    signInWithEmailAndPassword(
      auth,
      signinEmailRef.current.value,
      signinPassRef.current.value
    )
      .then((userCredential) => {
        const userData = userCredential.user;
        console.log("userData:  " + JSON.stringify(userData));

        setTheUser({ ...user });
        console.log("\n\nstate.user:  " + JSON.stringify(user));
      })
      .catch((theError) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log("err: " + JSON.stringify(theError));
      });
  }

  const inpClasses =
    "w-100 py-1 rounded-3 text-center bg-success bg-opacity-25 fw-bold text-dark border-0 border-bottom border-success";

  return (
    <div className="tab-pane fade show active px-3" id="nav-signin">
      <form onSubmit={handleSignin} method="POST" className="mt-5 pt-4">
        <div className=" text-start mb-3">
          <label htmlFor="email">masum498673@gmail.com</label>
          <input
            type="email"
            required={true}
            ref={signinEmailRef}
            className={inpClasses}
            placeholder="Enter Email"
          />
        </div>
        <div className="text-start mb-3">
          <label htmlFor="password ">123456</label>
          <input
            type="password"
            required={true}
            ref={signinPassRef}
            className={inpClasses}
            placeholder="Password ?"
          />
        </div>

        <button

          type="submit"
          className="btn btn-sm bg-success bg-opacity-75 shadow-sm bg-gradient text-dark fw-bolder mt-3 rounded w-50 float-end"
        >
          Login
        </button>
      </form>
    </div>
  );
}
