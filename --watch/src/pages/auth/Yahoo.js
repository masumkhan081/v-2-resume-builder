import React, { useContext } from "react";
import {FaYahoo} from 'react-icons/fa'
import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { authContext } from "../../context/Provider";
//
export default function Yahoo() {
  //
  const { user, setUser, auth } = useContext(authContext);
  const yahooProvider = new OAuthProvider("yahoo.com");
  //
  const login = () => {
    signInWithPopup(auth, yahooProvider)
      .then((result) => {
        console.log(JSON.stringify(result));
        setUser(result.user.displayName);
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
      })
      .catch((error) => {
        // Handle error.
      });
  };
  //
  return (
    <button
      disabled={true}
      onClick={login}
      className=" w-75 btn btn-sm text-primary bg-secondary bg-opacity-50"
    >
      <FaYahoo className="mb-1 text-primary" size={15} />
      Yahoo
    </button>
  );
}
