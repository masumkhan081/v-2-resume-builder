import React from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../components/utils/firb";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { NextPrevious } from "../partials/Common";
import InterestsHobbies from "../partials/InterestsHobbies";
import CodeAndProjects from "../partials/CodeAndProjects";
import { authContext } from "../../context/Provider";
import Loader from "../partials/Loader";

//
export const page3Context = React.createContext();
//
export default function Page3() {
  const { user, setTheUser, loading } = React.useContext(authContext);
  const [state, setState] = React.useState({
    hobbies: [],
    interests: [],
    projects: [],
  });
  const [page3Error, setPage3Error] = React.useState("");
  const navigate = useNavigate();
  //
  React.useEffect(() => {
    getPage3();
    console.log("pg-3 mounted");
    return () => {
      console.log("pag3 unmounted");
    };
  }, []);

  async function getPage3() {
    try {
      let emal = user.signInEmail;
      const resumeRef = doc(db, "resumes", emal);
      const resumeSnap = await getDoc(resumeRef);
      if (resumeSnap.exists()) {
        let obtained = {
          hobbies: resumeSnap.data().hobbies,
          interests: resumeSnap.data().interests,
          projects: resumeSnap.data().projects,
        };
        console.log("obtained-pg-3: " + JSON.stringify(obtained));
        updateState(obtained);
      } else {
        console.log("pg-3: No document -> " + user.signInEmail);
      }
    } catch (e) {
      console.error("pg-3: Error finding: ", e);
    }
  }
  function showError(msg) {
    setPage3Error(msg);
    setTimeout(() => {
      setPage3Error("");
    }, 3000);
  }
  async function savePage3() {
    let emal = user.signInEmail;
    console.log(
      state.hobbies.length +
        "  " +
        state.interests.length +
        "  " +
        state.projects.length
    );
    if (state.hobbies.length < 1) {
      showError("Person with no hobby !?");
    } else if (state.interests.length < 1) {
      showError("At least pretend to have interests !!");
    } else if (state.projects.length < 1) {
      showError("Plz enlist ur work/projects !!");
    } else {
      let data = {
        hobbies: state.hobbies,
        interests: state.interests,
        projects: state.projects,
      };
      if (user.resumeStatus == false) {
        await setDoc(doc(db, "resumes", emal), data);
        const profileRef = doc(db, "profiles", emal);
        await updateDoc(profileRef, {
          resumeStatus: true,
        });
        setTheUser({ resumeStatus: true });
      } else {
        const resumeRef = doc(db, "resumes", emal);
        await updateDoc(resumeRef, data);
      }
      navigate("/profile/myresume");
    }
  }

  function updateState(nextState) {
    setState({ ...state, ...nextState });
  }

  function setTestData(action) {
    action == "reset"
      ? setState({
          ...state,
          ...{
            hobbies: [],
            interests: [],
            projects: [],
          },
        })
      : setState({
          ...state,
          ...{
            hobbies: ["shitting"],
            interests: ["api first development"],
            projects: [
              { title: "hmis", description: "desc", link: "/go/here" },
            ],
          },
        });
  }

  function removeProject(project) {
    setState({
      ...state,
      projects: state.projects.filter((item) => {
        return item !== project;
      }),
    });
  }

  function removeHobby(hobby) {
    setState({
      ...state,
      hobbies: state.hobbies.filter((item) => {
        return item !== hobby;
      }),
    });
  }

  function removeInterest(interest) {
    setState({
      ...state,
      interests: state.interests.filter((item) => {
        return item !== interest;
      }),
    });
  }

  const clsNames =
    "mt-4  row mx-auto d-flex justify-content-center border-0 border-bottom";

  if (loading == true) {
    return <Loader />;
  }
  if (user.loggedIn == true && loading == false) {
    return (
      <page3Context.Provider
        value={{
          state: state,
          removeHobby: removeHobby,
          removeInterest: removeInterest,
          removeProject: removeProject,
          updateState: updateState,
        }}
      >
        <div className={clsNames}>
          <NextPrevious
            error={page3Error}
            prev={`/profile/page2`}
            nextText={"Save & Next"}
            saveAndNext={savePage3}
            setTestData={setTestData}
          />
          <InterestsHobbies />
          <CodeAndProjects />
          <span>{JSON.stringify(state)}</span>
        </div>
      </page3Context.Provider>
    );
  }
  if (user.loggedIn == false && loading == false) {
    //return <Navigate to="/login" replace={true} />;
    navigate("/login");
  }
}
