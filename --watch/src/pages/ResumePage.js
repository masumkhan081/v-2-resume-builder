import React, { useEffect, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { authContext } from "../context/Provider";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiTwotoneEdit,
} from "react-icons/ai";
import { FaSignInAlt, FaUserPlus, FaFileDownload } from "react-icons/fa";
import { FcViewDetails, FcDownload } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { Stack, Badge } from "react-bootstrap";
import { db } from "./utils/firb";
import Loader from "./partials/Loader";
import Angry from "./images/angry.jpg";
import PDFPage from "./PDFPage";
//
export default function ResumePage() {
  //
  const { user, loading } = useContext(authContext);
  const [size, setSize] = React.useState({ in: 12, up: 22 });
  const bs = "border-success";
  const navigate = useNavigate();
  //
  useEffect(() => {
    getResumeDetails();
  }, []);

  async function getResumeDetails() {
    try {
      let emal = user.account_email;
      const resumeRef = doc(db, "resumes", emal);
      const resumeSnap = await getDoc(resumeRef);
      if (resumeSnap.exists()) {
        let obtained = {
          resume_name: resumeSnap.data().resume_name,
          resume_status: resumeSnap.data().resume_status,
          resume_email: resumeSnap.data().resume_email,
          resume_pic: resumeSnap.data().resume_pic,
          dob: resumeSnap.data().dob,
          address: resumeSnap.data().address,
          phone_number: resumeSnap.data().phone_number,
          github: resumeSnap.data().github,
          linkedin: resumeSnap.data().linkedin,
          portfolio: resumeSnap.data().portfolio,
          title: resumeSnap.data().title,
          front_end_skills: resumeSnap.data().front_end_skills,
          back_end_skills: resumeSnap.data().back_end_skills,
          data_tier_skills: resumeSnap.data().data_tier_skills,
          personal_skills: resumeSnap.data().personal_skills,
          hobbies: resumeSnap.data().hobbies,
          interests: resumeSnap.data().interests,
          projects: resumeSnap.data().projects,
          educations: resumeSnap.data().educations,
          experiences: resumeSnap.data().experiences,
        };
        console.log(JSON.stringify(obtained));
      } else {
        console.log("pg-resume: No document -> " + user.aacount_email);
      }
    } catch (e) {
      console.error("pg-resume: Error finding: ", e);
    }
  }
  if (user.account_email) {
    return (
      <>
        <div
          className="container nav nav-tabs d-flex justtify-content-center mb-3 border-0"
          id="nav-tab"
          role="tablist"
        >
          <button
            onClick={() => {
              setSize({ ...size, up: 22, in: 12 });
            }}
            className="w-50 rounded-pill nav-link border-0 border-3 border-start border-primary bg-light shadow-sm text-dark bg-opacity-10 fw-normal py-0"
            id="nav-resume-detail-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-resume-detail"
          >
            <FcViewDetails size={size.up} className="mb-1 me-1 text-primary" />{" "}
            View/Edit Detail
          </button>
          <button
            onClick={() => {
              setSize({ ...size, up: 12, in: 22 });
            }}
            className="w-50 rounded-pill border-0 border-3 border-start border-primary nav-link active bg-light shadow-sm text-dark bg-opacity-10 fw-normal py-0"
            id="nav-resume-pdf-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-resume-pdf"
          >
            <FaFileDownload size={size.in} className="mb-1 me-1 text-primary" />
            Download PDF
          </button>
        </div>

        <div className="tab-content px-3 container" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-resume-detail">
            <Stack className="  mt-sm-3 mt-1 bg-success bg-opacity-10  flex-col gap-5 justify-content-between shadow-sm  rounded-3">
              <Stack>
                <TitlePortion title="Basic Info" link="/resume-page-1" />
                <InfoItem title="Name" text={user.resume_name} />
                <InfoItem title="Address" text={user.address} />
                <InfoItem title="Email" text={user.resume_email} />
                <InfoItem title="Mobile" text={user.phone_number} />
                <InfoItem title="Website/ Portfolio" text={user.portfolio} />
                <InfoItem title="Linkedin Profile" text={user.linkedin} />
                <InfoItem title="Github profile" text={user.github} />
              </Stack>
              <Stack>
                <TitlePortion title="Education" link="/resume-page-2" />
                <EduList items={user.educations} />
              </Stack>
              <Stack>
                <TitlePortion title="Experiences" link="/resume-page-2" />
                <ExpList items={user.experiences} />
              </Stack>
              <Stack>
                <TitlePortion title="Projects" link="/resume-page-3" />
                <ProjectList items={user.projects} />
              </Stack>
              <Stack>
                <TitlePortion
                  title="Development Skills"
                  link="/resume-page-1"
                />
                <InlineLists
                  items={user.front_end_skills}
                  list_title="Front End Skills"
                />

                <InlineLists
                  items={user.back_end_skills}
                  list_title="Back End Skills"
                />

                <InlineLists
                  items={user.data_tier_skills}
                  list_title="Data Tier Skills"
                />

                <InlineLists
                  items={user.personal_skills}
                  list_title="Personal Skills"
                />
              </Stack>

              <Stack>
                <TitlePortion title="Others" link="/resume-page-3" />
                <InlineLists items={user.interests} list_title="Interests" />
                <InlineLists items={user.hobbies} list_title="Hobbies" />
              </Stack>
            </Stack>
          </div>
          <PDFPage />
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" replace={false} />;
  }
}

function InfoItem({ title, text }) {
  return (
    <span className=" ">
      <strong className="text-decoration-underline me-3">{title}</strong>
      <span>{text}</span>
    </span>
  );
}
function TitlePortion({ title, link }) {
  return (
    <Stack
      className="d-flex w-100 justify-content-end gap-3 bg-success bg-opacity-10 border-0  border-primary rounded-3"
      direction="horizontal"
    >
      <Badge className="ms-1 bg-info bg-opacity-10 text-dark rounded-pill">
        {title}
      </Badge>
      <Link to={link} className="text-decoration-none">
        <FiEdit size={20} className="me-2 mb-1" />
      </Link>
    </Stack>
  );
}
function EduList({ items }) {
  return (
    <Stack className="d-flex flex-column flex-wrap gap-2">
      {items.map((item, i) => {
        return (
          <span className="d-block w-100 text-wrap" key={i}>
            <Badge className="py-0 me-1">{i + 1}</Badge>
            {item.degreeName}, {item.institution}, {item.passYear}{" "}
          </span>
        );
      })}
    </Stack>
  );
}

function ExpList({ items }) {
  return (
    <Stack className="d-flex flex-column flex-wrap gap-2">
      {items.map((item, i) => {
        return (
          <span className="d-block w-100 text-wrap" key={i}>
            <Badge className="py-0 me-1">{i + 1}</Badge>
            {item.jobTitle}, {item.duration.replace("to", "-")}, {item.employer}
          </span>
        );
      })}
    </Stack>
  );
}

function ProjectList({ items }) {
  return (
    <Stack className="d-flex flex-column flex-wrap gap-3">
      {items.map((item, i) => {
        return (
          <span className="d-block w-100 text-wrap " key={i}>
            <Badge className="py-0 me-1">{i + 1}</Badge>
            {item.title}, {item.description}
            <br />
            <Badge className="py-0 me-1 bg-light bg-opacity-10 text-primary">
              Link:{item.link}{" "}
            </Badge>
          </span>
        );
      })}
    </Stack>
  );
}

function InlineLists({ items, list_title }) {
  return (
    <>
      <strong className="text-decoration-underline me-3">{list_title}</strong>
      <Stack className="d-flex flex-row flex-wrap gap-2">
        {items.map((item, i) => {
          return (
            <span className="text-wrap">
              <Badge className="py-0 me-1">{i + 1}</Badge>
              {item}
            </span>
          );
        })}
      </Stack>
    </>
  );
}
