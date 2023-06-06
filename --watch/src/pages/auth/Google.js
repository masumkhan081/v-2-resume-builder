import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
          account_email: result.user.email,
          account_name: result.user.displayName,
          account_pic: result.user.photoURL,
        };
        console.log("google:  " + JSON.stringify(extracted));
        setTheUser(extracted);
        navigate("/resume");
      })
      .catch((theError) => {
        console.log("err:   " + theError);
        //() => navigate("/login");
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
