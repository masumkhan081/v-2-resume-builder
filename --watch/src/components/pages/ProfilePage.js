import React, { useState, useContext, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { GrDocumentPdf } from "react-icons/gr";
import { MdPictureAsPdf } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { FaUserEdit } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { BsCheckLg, BsFilePdf } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { authContext } from "../../context/Provider";
import { db } from "../utils/firb";
import { Badge, Button, Form, Image } from "react-bootstrap";

import Loader from "../partials/Loader";

//
export default function PageProfile() {
  const { user, setTheUser, loading } = useContext(authContext);
  const [notEditable, setNotEditable] = React.useState(true);
  const [error, setError] = useState("");
  //
  const navigate = useNavigate();
  const refPName = useRef();
  const refPhone = useRef();
  //

  React.useEffect(() => {
    console.log("useeffect   -- --  profile page");
  }, []);

  function handleSave(e) {
    e.preventDefault();
    if (user.profileName.length == 0) {
      showMsg("U don't have a name ?");
    } else if (user.profileName.length < 3) {
      showMsg("profile name too short");
    } else {
      console.log("....... >>");
      updateProfile();
    }
  }
  function showMsg(msg) {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 2000);
  }
  async function updateProfile() {
    const profileRef = doc(db, "profiles", user.signInEmail);
    await updateDoc(profileRef, {
      profileName: user.profileName,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
    });
    showMsg("Updated Succesfully");
  }
  function toggleEdit() {
    setNotEditable(!notEditable);
  }

  const btnClasses =
    "bg-success bg-opacity-25 bg-gradient border-3 border-start-0 border-top-0 border-bottom-0 border-end border-success shadow-sm btn btn-sm text-dark fw-bold";

  if (loading) {
    return <Loader />;
  }
  if (user.loggedIn == true && loading == false) {
    return (
      <div className=" mx-5 mt-4 rounded-3 shadow-sm">
        <button className="border-0  bg-success bg-opacity-25 rounded-3">
          <FaUserEdit size={22} className=" ms-1 " onClick={toggleEdit} />
        </button>
        <Form className="py-2 ps-3 gap-2">
          <Form.Group className="mb-2 d-flex flex-row justify-content-between">
            <div>
              <div className="mt-2 d-flex flex-row align-items-center">
                <label
                  disabled={notEditable}
                  htmlFor="img"
                  className=" d-flex flex-column flex-wrap bg-secondary bg-opacity-25 text-center rounded-circle"
                  style={{ height: "165px", width: "165px" }}
                >
                  <Image
                    disabled={notEditable}
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    title="Click to add/replace"
                    onMouseOver={() => {}}
                    rounded
                    // src="https://lh3.googleusercontent.com/a/AEdFTp5uZ1kD4TugJNubq-8qDPyzzWtAxnZpT0YMJg8b9g=s96-c"
                    src={user.photoURL}
                    className=" rounded-circle"
                    style={{ height: "165px", width: "165px" }}
                  />
                  <FcAddImage
                    disabled={notEditable}
                    className=""
                    size={30}
                    htmlFor="img"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Add/Replace image"
                  />
                </label>

                <input
                  id="img"
                  value={undefined}
                  disabled={notEditable}
                  //  className="hidden"
                  onChange={(e) => {
                    let files = e.target.files;
                    console.log(files);
                    let reader = new FileReader();
                    reader.onload = (r) => {
                      console.log(r.target.result);
                      setTheUser({ photoURL: r.target.result });
                    };
                    reader.readAsDataURL(files[0]);
                  }}
                  style={{ display: "none" }}
                  type="file"
                  name="img"
                  accept="image/*"
                ></input>
              </div>
            </div>
            <div>
              <div className="d-flex flex-column justify-content-center gap-3 h-100">
                <button
                  onClick={() => {
                    navigate("/profile/page1");
                  }}
                  className={btnClasses}
                >
                  Create/Edit Resume
                  <IoIosCreate size={22} className="mb-1 ms-2 text-success" />
                </button>
                <button
                  onClick={() => {
                    navigate("myresume");
                  }}
                  className={btnClasses}
                >
                  View Resume Detail
                  <BiDetail size={22} className="mb-1 ms-2 text-success" />
                </button>
                <button
                  onClick={() => {
                    navigate("myresume");
                  }}
                  className={btnClasses}
                >
                  Export PDF Resume
                  <MdPictureAsPdf
                    size={22}
                    className="mb-1 ms-2 text-success"
                  />
                </button>
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mt-1 mb-2 me-3 col-md-6">
            <Badge
              text="dark"
              className="d-block text-start rounded-3 bg-light bg-opacity-10 "
            >
              <Badge className="bg-secondary bg-opacity-10 text-dark me-3">
                Email address
              </Badge>
              {user.signInEmail} {" (" + user.providerId + ")"}
            </Badge>
          </Form.Group>
          <Form.Group className="mb-2 me-3 col-md-6">
            <span>Profile Name</span>
            <Form.Control
              disabled={notEditable}
              ref={refPName}
              type="text"
              className="bg-light "
              style={{ height: "30px" }}
              placeholder="Enter Profile Name"
              value={user.profileName}
              onChange={() => {
                setTheUser({ profileName: refPName.current.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-2 me-3 col-md-6">
            <span>Phone</span>
            <Form.Control
              disabled={notEditable}
              ref={refPhone}
              type="text"
              className="bg-light "
              style={{ height: "30px" }}
              placeholder="Enter Phone Number"
              value={user.phoneNumber == null ? "" : user.phoneNumber}
              onChange={() => {
                setTheUser({ phoneNumber: refPhone.current.value });
              }}
            />
          </Form.Group>

          <Button
            disabled={notEditable}
            onClick={handleSave}
            className="mt-2 btn bg-success bg-opacity-50 border-0 text-dark col-md-3"
          >
            Save Update
          </Button>
          <span className=" ms-2 w-50 text-dark fw-bold">{error}</span>
        </Form>
      </div>
    );
  }
  if (user.loggedIn == false && loading == false) {
    navigate("/login");
  }
}

function ConnectWith({ setReqPage }) {
  return (
    <div className="col-md-4 pb-4 col-sm-6 rounded-3 bg-light bg-opacity-10 h-100 d-flex flex-column justify-content-between">
      {/*
      <div className="py-4 d-flex flex-column justify-content-end gap-2 align-items-center ">
        <span className="text-center d-block rounded-3  bg-secondary bg-opacity-25">
          Connect other account
        </span>
        <Googgle />
        <Facebook />
        <Github />
      </div>
      */}
    </div>
  );
}
