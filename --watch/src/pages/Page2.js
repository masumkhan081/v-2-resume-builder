import React from "react";
import Education from "./partials/Education";
import Experience from "./partials/Experience";
import { NextPrevious } from "./partials/Common";
import { useNavigate } from "react-router-dom";
import { db } from "./utils/firb";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { authContext } from "../context/Provider";
import Loader from "./partials/Loader";

//
export default function Page2() {
  //
  const { user, setTheUser, loading } = React.useContext(authContext);
  const [page2Error, setPage2Error] = React.useState("");
  const navigate = useNavigate();
  //
  React.useEffect(() => {
    return () => {
      console.log("pag2 unmounted");
    };
  }, []);

  function showError(msg) {
    setPage2Error(msg);
    setTimeout(() => {
      setPage2Error("");
    }, 3000);
  }
  async function saveAndNext() {
    const emal = user.account_email;
    if (user.educations.length < 1) {
      showError("Your academic background plz ?");
    } else {
      let data = {
        educations: user.educations,
        experiences: user.experiences,
      };
      //
      const resumeRef = doc(db, "resumes", emal);
      await updateDoc(resumeRef, data);
      //
      if (user.resume_status == false) {
        // await setDoc(doc(db, "resumes", emal), data);
        const profileRef = doc(db, "profiles", emal);
        await updateDoc(profileRef, {
          resume_status: true,
        });
        setTheUser({ resume_status: true });
      }

      navigate("/resume-page-3");
    }
  }

  function setTestData(action) {
    action == "reset"
      ? setTheUser({
          educations: [],
          experiences: [],
        })
      : setTheUser({
          educations: [
            { institution: "neub", degreeName: "bsc", passYear: "2018" },
          ],
          experiences: [
            {
              employer: "nevadia",
              duration: "jan-2018tojan-2019",
              jobTitle: "soft. developer",
            },
          ],
        });
  }
  //
  const clsNames = "mt-4 row mx-auto d-flex justify-content-around border-1";
  //   if (loading == true) {
  //     return <Loader />;
  //   }
  // user.signInEmail &&
  if (loading == false) {
    return (
      <div className={clsNames}>
        <NextPrevious
          error={page2Error}
          nextText={"Save & Next"}
          saveAndNext={saveAndNext}
          setTestData={setTestData}
          prev={`/resume-page-1`}
          next={"/resume-page-3"}
        />
        <Education />
        <Experience />
      </div>
    );
  }
  //   if (user.signInEmail == "" && loading == false) {
  //     //return <Navigate to="/login" replace={true} />;
  //     navigate("/login");
  //   }
}
