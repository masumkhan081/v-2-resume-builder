import React, { useContext, useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authContext } from "../../context/Provider";
import { auth, db } from "../utils/firb";
//
export default function Signup() {
  const { user, setTheUser } = useContext(authContext);
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  //
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //
  async function handleSignup(e) {
    e.preventDefault();
     
    if (passRef.current.value !== confirmPassRef.current.value) {
      setError("Passwords don't match");
      return;
    }
    if (passRef.current.value.length < 6) {
      setError("Password too short");
      return;
    }
    try {
      setError("");
      setLoading(true);

      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passRef.current.value
      )
        .then((userCredential) => {
          const userData = userCredential.user;
          console.log(JSON.stringify(userData));
          setTheUser({ account_email: userData.email });
        })
        .catch((err) => {
          let errorToSet =
            err.code === "auth/email-already-in-use"
              ? "Email already exists, Sign in instead"
              : err.code;
          setError(errorToSet);
        });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError("Failed to create account ");
      console.log("err sup:  " + JSON.stringify(error));
    }
    setLoading(false);
  }

  const inpClasses =
    "w-100 py-1 rounded-3 text-center bg-light bg-opacity-75 text-dark border-0 fw-bold";

  return (
    <div className="tab-pane fade show px-3" id="nav-signup">
      <span className="text-end d-block text-danger">{error}</span>
      <form onSubmit={handleSignup} method="POST" className="mt-5 pt-2">
        <div className="   text-start mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required={true}
            ref={emailRef}
            className={inpClasses}
            placeholder="Enter Email"
          />
        </div>
        <div className=" text-start mb-3">
          <label htmlFor="password ">Password</label>
          <input
            type="password"
            required={true}
            ref={passRef}
            className={inpClasses}
            placeholder="Password ?"
          />
        </div>
        <div className=" text-start mb-3">
          <label htmlFor="confirmpassword ">Confirm Password</label>
          <input
            type="password"
            required={true}
            ref={confirmPassRef}
            className={inpClasses}
            placeholder="Password again ... "
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="btn btn-sm bg-success bg-opacity-75 shadow-sm bg-gradient fw-bolder mt-3 rounded w-50 float-end"
        >
          Register
        </button>
      </form>
      <button
       onClick={()=>{emailRef.current.value="masum498673@gmail.com";
       passRef.current.value = "123456";confirmPassRef.current.value = "123456";}}
        className="btn btn-sm bg-success bg-opacity-25 shadow-sm bg-gradient rounded w-25 mt-3"
      >
        test data
      </button>
    </div>
  );
}
