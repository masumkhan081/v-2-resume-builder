import React, { useRef } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../utils/firb";
import { useContext } from "react";
import { authContext } from "../../context/Provider";
//
const auth = getAuth(app);
auth.languageCode = "it";
const phoneNumber = "+8801833347848";
var testVerificationCode = "123456";
let av;

export default function Phone() {
  const { user, setUser, auth } = useContext(authContext);
  //
  const phoneRef = useRef();
  const appVerifier = window.recaptchaVerifier;
  //
  function generateRecaptcha() {
    console.log("reachd !!");

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("response:   " + JSON.stringify(response));
        },
        "expired-callback": () => {
          console.log("expires portion");
        },
      },
      auth
    );
  }

  function sendOTP() {
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(phoneRef.current.value);
    generateRecaptcha();
    sendOTP();
  }

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="w-75 mt-0 d-flex flex-column gap-2 rounded-3 fw-bold text-center text-black-50 "
    >
      <label>Or Use Phone Number</label>
      <input
        disabled={true}
        ref={phoneRef}
        className="bg-light bg-opacity-50 border-0"
        placeholder="Phone Number"
      ></input>
      <button
        disabled={true}
        id="sign-in-button"
        type="submit"
        className="w-100 btn btn-sm bg-secondary bg-opacity-50"
      >
        Signin
      </button>
    </form>
  );
}
