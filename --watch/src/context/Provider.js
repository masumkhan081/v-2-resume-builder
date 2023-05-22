import React, { createContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../components/utils/firb";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";
//

//
export const authContext = createContext();
const f = false;
const t = true;
//
export default function Provider({ children }) {
  //
  const [user, setUser] = useState({
    loggedIn: f,
    resumeStatus: f,
    uid: "",
    signInEmail: "",
    profileName: "",
    photoURL: "",
    emailVerified: false,
    providerId: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //
  useEffect(() => {
    //
    setLoading(true);
    console.log("useEffect...provider ..." + loading);
    //
    onAuthStateChanged(auth, (theUser) => {
      if (theUser) {
        console.log(
          " onAuthStateChanged ....yes  <> existing user :  " +
            JSON.stringify(user)
        );
        let emal = theUser.email;
        //
        console.log(
          "useEffect ... onAuthStateChanged ....existing user :  " + emal
        );
        //
        try {
          const userRef = collection(db, "profiles");
          const q = query(userRef, where("signInEmail", "==", emal));
          readData(q, theUser);
        } catch (e) {
          console.error("Error finding: ", e);
        }
      } else {
        console.log("  onAuthStateChanged ....no  <> existing user :  ");
        setLoading(false);
      }
    });
  }, []);

  async function readData(q, theUser) {
    //
    let USER_EXISTS_IN_DB = false;
    try {
      const querySnapshot = await getDocs(q);
      //
      querySnapshot.forEach((doc) => {
        USER_EXISTS_IN_DB = true;

        let obtained = {
          uid: doc.data().uid,
          loggedIn: true,
          resumeStatus: doc.data().resumeStatus,
          signInEmail: doc.data().signInEmail,
          profileName: doc.data().profileName,
          emailVerified: doc.data().emailVerified,
          photoURL: doc.data().photoURL,
          providerId: doc.data().providerId,
          phoneNumber: doc.data().phoneNumber,
        };
        console.log("USER_EXISTS_IN_DB <>   true");
        setLoading(false);
        setUser({ ...user, ...obtained });
      });
      if (USER_EXISTS_IN_DB == false) {
        //  create new user
        let extracted = {
          uid: theUser.uid,
          loggedIn: true,
          resumeStatus: false,
          signInEmail: theUser.email,
          profileName: theUser.displayName,
          emailVerified: theUser.emailVerified,
          photoURL: theUser.photoURL,
          providerId: theUser.providerData[0].providerId,
          phoneNumber: theUser.providerData[0].phoneNumber,
        };

        const docRef = await setDoc(
          doc(db, "profiles", theUser.email),
          extracted
        );
        console.log("USER_EXISTS_IN_DB <>   false");
        setLoading(false);
        setUser({ ...user, ...extracted });
      }
    } catch (e) {
      console.error("Error finding: ", e);
    }
  }

  function setTheUser(nextState) {
    console.log("setTheUser ....  ");
    setUser({ ...user, ...nextState });
  }

  function setTheError(usedProvider) {
    let errMsg =
      "The email been used for a " +
      JSON.stringify(usedProvider) +
      " sign-up-account. Click corresponding button";
    errMsg = errMsg.replace(/"|"|.com/gi, "");
    setError(errMsg);
    setTimeout(() => {
      setToast("");
    }, 2000);
  }

  function logout() {
    signOut(auth)
      .then(() => {
        setUser({ ...user, ...{ loggedIn: false } });
      })
      .catch((error) => {
        setError("error in loggingout");
      });
  }

  return (
    <authContext.Provider
      value={{
        logout,
        user,
        setTheUser,
        loading,
        setLoading,
        error,
        setTheError,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
