import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { db } from "../../components/utils/firb";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import ImageTitle from "../partials/ImageTitle";
import BasicInfo from "../partials/BasicInfo";
import TechSkills from "../partials/TechSkills";
import { NextPrevious } from "../partials/Common";
import { authContext } from "../../context/Provider";
import Loader from "../partials/Loader";
//
export const page1Context = React.createContext();
//
export default function Page1() {
  const { user, setTheUser, loading } = React.useContext(authContext);
  const navigate = useNavigate();
  const [page1Error, setPage1Error] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [state, setState] = React.useState({
    email: "", //user.signInEmail,
    displayName: user.profileName,
    dob: "",
    fullName: "",
    address: "",
    github: "github.com/",
    linkedin: "linkedin.com/in/",
    portfolio: "",
    emailVerified: false,
    photoSource: "", //user.photoURL,
    phoneNumber: "",
    title: "",
    frontEndSkills: [],
    backEndSkills: [],
    dataTierSkills: [],
    personalSkills: [],
  });
  //
  React.useEffect(() => {
    getPage1();
    return () => {
      console.log("pag1 unmounted");
    };
  }, []);

  async function getPage1() {
    try {
      setBusy(true);
      let emal = user.signInEmail;

      // all this can be conditional to user.resumeStatus == true or false
      const resumeRef = doc(db, "resumes", emal);
      const resumeSnap = await getDoc(resumeRef);
      if (resumeSnap.exists()) {
        console.log("Document data:", resumeSnap.data());
        let obtained = {
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
        console.log("obtained-pg-1:     .. " + JSON.stringify(obtained));
        updateState(obtained);
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

  async function saveAndNext() {
    setBusy(true);
    if (state.displayName == "") {
      showError("Resume without name ? ");
    } else if (state.title == "") {
      showError("Resume without title ?");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)
    ) {
      showError("Invalid Email");
    } else if (state.phoneNumber.length < 11) {
      showError("Phone number must be 11 digit");
    } else if (state.address.length < 10) {
      showError("Plz provide a real address");
    } else if (state.github == "" && state.portfolio == "") {
      showError("Github & portfolio both can't be empty");
    } else {
      let data = {
        email: state.email,
        displayName: state.displayName,
        address: state.address,
        github: state.github,
        linkedin: state.linkedin,
        portfolio: state.portfolio,
        photoSource: state.photoSource,
        phoneNumber: state.phoneNumber,
        title: state.title,
        frontEndSkills: state.frontEndSkills,
        backEndSkills: state.backEndSkills,
        dataTierSkills: state.dataTierSkills,
        personalSkills: state.personalSkills,
      };
      if (user.resumeStatus == false) {
        await setDoc(doc(db, "resumes", user.signInEmail), data);
        const profileRef = doc(db, "profiles", user.signInEmail);
        await updateDoc(profileRef, {
          resumeStatus: true,
        });
        setTheUser({ resumeStatus: true });
      } else {
        const resumeRef = doc(db, "resumes", user.signInEmail);
        await updateDoc(resumeRef, data);
      }
      navigate("/profile/page2");
    }
    setBusy(false);
  }

  function showError(msg) {
    setPage1Error(msg);
    setTimeout(() => {
      setPage1Error("");
    }, 3000);
  }

  function updateState(nextState) {
    //  console.log(JSON.stringify(nextState) + "  = in update state ?-yes");
    setState({ ...state, ...nextState });
  }
  function setTestData(action) {
    action == "reset"
      ? setState({
          email: "", //user.signInEmail,
          displayName: user.profileName,
          dob: "",
          fullName: "",
          address: "",
          github: "github.com/",
          linkedin: "linkedin.com/in/",
          portfolio: "",
          emailVerified: false,
          photoSource: "", //user.photoURL,
          phoneNumber: "",
          title: "",
          frontEndSkills: [],
          backEndSkills: [],
          dataTierSkills: [],
          personalSkills: [],
        })
      : setState({
          title: "full stack-developer",
          email: "masumkhan081@gmail.com",
          emailVerified: false,
          displayName: "Masum Khan",
          dob: "",
          fullName: "Abdullah-Al Masum Khan",
          address: "Rd-6, Khadim",
          github: "github.com/masumkhan081",
          linkedin: "linkedin.in/masumkhan081",
          portfolio: "github.com/masumkhan081",
          photoSource:
            "https://media.licdn.com/dms/image/C5603AQGVhTn0cvkcRw/profile-displayphoto-shrink_800_800/0/1661930138028?e=2147483647&v=beta&t=eOwHOZQG1XdsGw2u5S0BP_xb438QudkAgTj33ttcShQ",
          phoneNumber: "01833-347848",
          title: "Full stack developer",
          frontEndSkills: [
            "react",
            "bootstrap",
            "react-bootstrap",
            "material-ui",
            "react-icons",
            "recharts",
            "tailwindCSS",
          ],
          backEndSkills: ["Express"],
          dataTierSkills: ["MongoDB"],
          personalSkills: ["Problem Solving"],
        });
  }

  function removeFrontndSkill(skillName) {
    setState({
      ...state,
      frontEndSkills: state.frontEndSkills.filter((item) => {
        return item !== skillName;
      }),
    });
  }
  function removeBackndSkill(skillName) {
    setState({
      ...state,
      backEndSkills: state.backEndSkills.filter((item) => {
        return item !== skillName;
      }),
    });
  }
  function removeDataTierSkill(skillName) {
    setState({
      ...state,
      dataTierSkills: state.dataTierSkills.filter((item) => {
        return item !== skillName;
      }),
    });
  }
  function removePersonalSkill(skillName) {
    setState({
      ...state,
      personalSkills: state.personalSkills.filter((item) => {
        return item !== skillName;
      }),
    });
  }
  const clsNames =
    "mt-4 row mx-auto d-flex justify-content-center border-0 border-bottom";
  if (loading == true) {
    return <Loader />;
  }
  if (user.loggedIn == true && loading == false) {
    return (
      <page1Context.Provider
        value={{
          updateState,
          removeBackndSkill,
          removeDataTierSkill,
          removeFrontndSkill,
          removePersonalSkill,
          state,
        }}
      >
        <div className={clsNames}>
          <NextPrevious
            busy={busy}
            error={page1Error}
            next={"/profile/page2"}
            nextText={"Save & Next"}
            saveAndNext={saveAndNext}
            setTestData={setTestData}
          />
          <ImageTitle />
          <BasicInfo />
          <TechSkills />

          {/* <span>{JSON.stringify(state)}</span> */}
        </div>
      </page1Context.Provider>
    );
  }
  if (user.loggedIn == false && loading == false) {
    //return <Navigate to="/login" replace={true} />;
     navigate("/login");
  }
}
