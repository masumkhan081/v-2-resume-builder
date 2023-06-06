import React from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./utils/firb";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { NextPrevious } from "./partials/Common";
import InterestsHobbies from "./partials/InterestsHobbies";
import CodeAndProjects from "./partials/CodeAndProjects";
import { authContext } from "../context/Provider";
import Loader from "./partials/Loader";

//
export const page3Context = React.createContext();
//
export default function Page3() {
  const { user, setTheUser, loading } = React.useContext(authContext);

  const [page3Error, setPage3Error] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("pg-3 mounted");
    return () => {
      console.log("pag3 unmounted");
    };
  }, []);

  function showError(msg) {
    setPage3Error(msg);
    setTimeout(() => {
      setPage3Error("");
    }, 3000);
  }
  async function savePage3() {
    let emal = user.account_email;
    console.log(
      user.hobbies.length +
        "  " +
        user.interests.length +
        "  " +
        user.projects.length
    );
    if (user.hobbies.length < 1) {
      showError("Person with no hobby !?");
    } else if (user.interests.length < 1) {
      showError("At least pretend to have interests !!");
    } else if (user.projects.length < 1) {
      showError("Plz enlist ur work/projects !!");
    } else {
      let data = {
        hobbies: user.hobbies,
        interests: user.interests,
        projects: user.projects,
      };
      if (user.resume_status == false) {
        //  await setDoc(doc(db, "resumes", emal), data);
        const profileRef = doc(db, "profiles", emal);
        await updateDoc(profileRef, {
          resume_status: true,
        });
        setTheUser({ resume_status: true });
      }
      const resumeRef = doc(db, "resumes", emal);
      await updateDoc(resumeRef, data);

      navigate("/resume");
    }
  }
  function setTestData(action) {
    action == "reset"
      ? setTheUser({
          hobbies: [],
          interests: [],
          projects: [],
        })
      : setTheUser({
          hobbies: ["shitting"],
          interests: ["api first development"],
          projects: [{ title: "hmis", description: "desc", link: "/go/here" }],
        });
  }

  const clsNames =
    "mt-4 row mx-auto d-flex justify-content-center border-0 border-bottom";

  //   if (loading == true) {
  //     return <Loader />;
  //   }
  //    user.signInEmail &&
  if (loading == false) {
    return (
      <div className={clsNames}>
        <NextPrevious
          error={page3Error}
          prev={`/resume-page-2`}
          nextText={"Save & Next"}
          saveAndNext={savePage3}
          setTestData={setTestData}
        />
        <InterestsHobbies />
        <CodeAndProjects />
        <span>{JSON.stringify(user)}</span>
      </div>
    );
  }
  //   if (user.signInEmail == "" && loading == false) {

  //     navigate("/login");
  //   }
}
