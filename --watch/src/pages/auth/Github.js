import React, { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
//
import { useNavigate } from "react-router-dom";
import  { auth } from "../utils/firb";
import { authContext } from "../../context/Provider";

//
export default function Github() {
  //
  //const navigate = useNavigate();
  const { setTheUser, setTheError } = useContext(authContext);
  const githubProvider = new GithubAuthProvider();
  githubProvider.addScope("repo");
  //
  const login = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        console.log(" i got this: " + JSON.stringify(result.user));

        setTheUser({
          uid: result.user.uid,
          loggedIn: true,
          signInEmail: result.user.email,
          profileName: result.user.displayName,
          emailVerified: result.user.emailVerified,
          photoURL: result.user.photoURL,
          providerId: result.user.providerData[0].providerId,
          phoneNumber: result.user.providerData[0].phoneNumber,
        });
        //navigate("/profile");
      })
      .catch((theError) => {
        if (theError.code == "auth/account-exists-with-different-credential") {
          setTheError(theError.customData._tokenResponse.verifiedProvider[0]);
        }
      });
  };
  //

  return (
    <button
      onClick={login}
      className="w-75 bg-secondary bg-opacity-10 shadow btn btn-sm"
    >
      <FaGithub size={17} className="mb-1 me-1" /> Github
    </button>
  );
}
