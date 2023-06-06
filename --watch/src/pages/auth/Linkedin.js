import React, { useContext } from "react";
import { FaLinkedin } from "react-icons/fa";
import { signInWithPopup, signOut } from "firebase/auth";
import {} from "../utils/firb";
import { authContext } from "../../context/Provider";
//
export default function Linkedin() {
  //
  const { user, setUser, auth } = useContext(authContext);
  //
  const login = () => {
    setUser("Incomplete");
  };
  //

  return (
    <button
      disabled={true}
      onClick={login}
      className="w-75 btn btn-sm bg-secondary bg-opacity-50"
    >
      <FaLinkedin className="mb-1 text-dark" size={15} />
      Linkedin
    </button>
  );
}
