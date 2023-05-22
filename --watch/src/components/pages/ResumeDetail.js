import React, { useEffect, useContext } from "react";
import { authContext } from "../../context/Provider";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../components/utils/firb";
//
export default function ResumeDetail() {
  const { user, setTheUser, loading } = useContext(authContext);
  const [busy, setBusy] = React.useState(false);
  //
  useEffect(() => {
    getResumeDetails();
    return () => {};
  }, []);

  async function getResumeDetails() {
    try {
      setBusy(true);
      let emal = user.signInEmail;

      const resumeRef = doc(db, "resumes", emal);
      const resumeSnap = await getDoc(resumeRef);
      if (resumeSnap.exists()) {
        console.log("Document data:", resumeSnap.data());
        let resumeDetails = {
          email: resumeSnap.data().email,
          displayName: resumeSnap.data().displayName,
          address: resumeSnap.data().address,
          github: resumeSnap.data().github,
          linkedin: resumeSnap.data().linkedin,
          portfolio: resumeSnap.data().portfolio,
          photoSource: resumeSnap.data().photoSource,
          phoneNumber: resumeSnap.data().phoneNumber,
          title: resumeSnap.data().title,
          frontEndSkills: resumeSnap.data().frontEndSkills,
          backEndSkills: resumeSnap.data().backEndSkills,
          dataTierSkills: resumeSnap.data().dataTierSkills,
          personalSkills: resumeSnap.data().personalSkills,
        };
        console.log("obtained-pg-1:     .. " + JSON.stringify(resumeDetails));
      } else {
        console.log("pg-1: No document data-> " + user.signInEmail);
      }
      console.log("reached  getPage1-> end  ..");
      setBusy(false);
    } catch (e) {
      setBusy(false);
      console.error("pg-1: Error finding: ", e);
    }
  }

  return (
    <div>
      <span className="text-center d-block mt-5  h4">Resume Details ..</span>
      <span></span>
    </div>
  );
}
