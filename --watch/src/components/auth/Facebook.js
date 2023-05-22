import React, { useContext } from "react";
import { FaFacebook } from "react-icons/fa";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import app, { auth } from "../utils/firb";
import { authContext } from "../../context/Provider";

//
export default function Facebook() {
  //
  const fbProvider = new FacebookAuthProvider();
  fbProvider.addScope("user_birthday");
  //
  const { setTheUser, setTheError } = useContext(authContext);
  //
  const login = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        console.log(JSON.stringify(result.user));
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
        navigate("/profile");
      })
      .catch((theError) => {
        if (theError.code == "auth/account-exists-with-different-credential") {
          setTheError(theError.customData._tokenResponse.verifiedProvider[0]);
        }
      });
  };

  return (
    <button
      onClick={login}
      className="w-75 bg-info shadow bg-opacity-10 btn btn-sm"
    >
      <FaFacebook className="mb-1 me-1 text-primary" size={16} />
      Facebook
    </button>
  );
}
