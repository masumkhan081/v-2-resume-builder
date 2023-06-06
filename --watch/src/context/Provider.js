import React, { createContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../pages/utils/firb";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
//
export const authContext = createContext();
//
export default function Provider({ children }) {
  //
  const [user, setUser] = useState({
    account_pic: "",
    account_email: "",
    account_name: "",
    resume_name: "",
    resume_status: false,
    resume_email: "",
    dob: "",
    address: "",
    github: "github.com/",
    linkedin: "linkedin.com/in/",
    portfolio: "",
    resume_pic: "",
    phone_number: "",
    title: "",
    front_end_skills: [],
    back_end_skills: [],
    data_tier_skills: [],
    personal_skills: [],
    hobbies: [],
    interests: [],
    projects: [],
    educations: [],
    experiences: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //
  useEffect(() => {
    //
    onAuthStateChanged(auth, (theUser) => {
      if (theUser) {
        //
        // setUser({
        //   ...user,
        //   ...{
        //     account_email: theUser.email,
        //     account_pic: theUser.photoURL,
        //     account_name: theUser.displayName,
        //   },
        // });
        try {
          create_if_new(theUser);
        } catch (e) {
          console.error("Error finding: ", e);
        }
      } else {
        console.log("  onAuthStateChanged ....no  <> existing user :  ");
      }
    });
  }, []);

  async function create_if_new(theUser) {
    let USER_EXISTS_IN_DB = false;
    //
    try {
      const emal = theUser.email;

      const profileRef = doc(db, "profiles", emal);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        get_resume_data(emal);
      } else {
        let extracted = {
          resume_status: false,
          account_email: theUser.email,
          account_name: theUser.displayName,
          account_pic: theUser.photoURL,
        };
        setTheUser(extracted);
        const docRef = await setDoc(doc(db, "profiles", emal), extracted);
        const resumeRef = await setDoc(doc(db, "resumes", emal), {});
        console.log("USER created newly");
        //setLoading(false);
      }
    } catch (e) {
      console.error("Error finding: ", e);
    }
  }

  async function get_resume_data(emal) {
    const resumeRef = doc(db, "resumes", emal);
    const resumeSnap = await getDoc(resumeRef);
    const profileRef = doc(db, "profiles", emal);
    const profileSnap = await getDoc(profileRef);
    //
    if (resumeSnap.exists()) {
      console.log("Document data:", resumeSnap.data());
      let obtained = {
        account_email: profileSnap.data().account_email,
        account_name: profileSnap.data().account_name,
        account_pic: profileSnap.data().account_pic, 
        resume_email: resumeSnap.data().resume_email,
        resume_name: resumeSnap.data().resume_name,
        address: resumeSnap.data().address,
        github: resumeSnap.data().github,
        linkedin: resumeSnap.data().linkedin,
        portfolio: resumeSnap.data().portfolio,
        resume_pic: resumeSnap.data().resume_pic,
        phone_number: resumeSnap.data().phone_number,
        title: resumeSnap.data().title,
        front_end_skills: resumeSnap.data().front_end_skills,
        back_end_skills: resumeSnap.data().back_end_skills,
        data_tier_skills: resumeSnap.data().data_tier_skills,
        personal_kills: resumeSnap.data().personal_skills,
        educations: resumeSnap.data().educations,
        experiences: resumeSnap.data().experiences,
        projects: resumeSnap.data().projects,
        interests: resumeSnap.data().interests,
        hobbies: resumeSnap.data().hobbies,
      };
      setTheUser(obtained);
      console.log("obtained-pg-1:     .. " + JSON.stringify(obtained));
    }
  }

  function setTheUser(nextState) {
    setUser({ ...user, ...nextState });
  }

  function setTheError(usedProvider) {
    let errMsg =
      "The email been used for a " +
      JSON.stringify(usedProvider) +
      " sign-up-account. Click corresponding button";
    errMsg = errMsg.replace(/"|"|.com/gi, "");
    setError(errMsg);
    // setTimeout(() => {
    //   setToast("");
    // }, 2000);
  }

  function logout() {
    signOut(auth)
      .then(() => {
        setTheUser({ account_email: "" });
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
