import React, { useContext } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firb";
import { authContext } from "../../context/Provider";

export default function Googgle() {
  //
  const navigate = useNavigate();
  //
  const { setTheUser, setTheError } = useContext(authContext);
  //
  const googleProvider = new GoogleAuthProvider();
  //
  const login = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        let extracted = {
          uid: result.user.uid,
          loggedIn: true,
          signInEmail: result.user.email,
          profileName: result.user.displayName,
          emailVerified: result.user.emailVerified,
          photoURL: result.user.photoURL,
          providerId: result.user.providerData[0].providerId,
          phoneNumber: result.user.providerData[0].phoneNumber,
        };
        // addProfile(obtained);
        //  setTheUser(extracted);
        // console.log("just nav ?? <>-");

        //  navigate("/profile");
      })
      .catch((theError) => {
        console.log("err:   " + theError);
        () => navigate("/profile");
        if (theError.code == "auth/account-exists-with-different-credential") {
          setTheError(theError.customData._tokenResponse.verifiedProvider[0]);
        }
      });
  };

  return (
    <>
      <button
        onClick={login}
        className="w-75 bg-success bg-opacity-10 shadow rounded-3 btn btn btn-sm"
      >
        <FcGoogle size={16} className="mb-1 me-1" /> Google
      </button>
    </>
  );
}
