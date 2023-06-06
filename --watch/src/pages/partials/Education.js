import React, { useState, useRef, useContext } from "react";
import { PanelAbout, ToastMessage } from "./Common";
import angry from "../images/angry.jpg";
// icons ...
import { GrAdd } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { authContext } from "../../context/Provider";
//
export default function Education() {
  //
  const { user, setTheUser, loading } = React.useContext(authContext);
  //
  const degRef = useRef();
  const instRef = useRef();
  const passYearRef = useRef();
  const [toast, setToast] = useState("");
  const [act, setAct] = useState({ type: "add", actOn: null });
  //
  function setForEdit(i) {
    degRef.current.value = user.educations[i].degreeName;
    instRef.current.value = user.educations[i].institution;
    passYearRef.current.value = user.educations[i].passYear;
    setAct({ ...act, type: "edit", actOn: i });
  }
  function deleteItem(ind) {
    setTheUser({
      educations: user.educations.filter((item, itemInd) => {
        return ind !== itemInd;
      }),
    });
  }
  function showToast(msg) {
    setToast(msg);
    setTimeout(() => {
      setToast("");
    }, 2000);
  }
  function handleSubmit(e) {
    e.preventDefault();

    const institut = instRef.current.value;
    const degreeN = degRef.current.value;
    const passY = passYearRef.current.value;

    if (institut.length < 3) {
      showToast("Too short input !");
    } else if (degreeN.length < 2) {
      showToast("Too short for a degree name !");
    } else if (isNaN(passY)) {
      showToast("A valid year plz");
    } else if (passY < 1980 || passY > new Date().getFullYear()) {
      showToast("A valid passing year plz");
    } else {
      if (act.type == "add") {
        setTheUser({
          educations: [
            ...user.educations,
            { institution: institut, degreeName: degreeN, passYear: passY },
          ],
        });
      }
      if (act.type == "edit") {
        // console.log(JSON.stringify(arr));
        setTheUser({
          educations: user.educations.map((item, ind) => {
            if (act.actOn == ind) {
              return {
                degreeName: degreeN,
                institution: institut,
                passYear: passY,
              };
            } else {
              return item;
            }
          }),
        });
        setAct({ ...act, type: "add" });
      }

      instRef.current.value = "";
      degRef.current.value = "";
      passYearRef.current.value = "";
    }
  }
  const classes =
    "form-control text-center rounded-3   bg-opacity-75 border-0 border-bottom border-success";
  const height = {
    height: "27px",
  };
  //
  return (
    <div className="col-md-5 " style={{ height: "80vh" }}>
      {/* panel header */}
      <PanelAbout title="Academic Background 2000" about="education" />
      {/* Education Background Form */}
      <div className="px-4">
        <form
          //onSubmit={handleSubmit}
          className="d-flex flex-column gap-2 mt-4 "
        >
          <input
            className={classes}
            id="exampleFormControlInput1"
            placeholder="Degree Name"
            ref={degRef}
            style={height}
          ></input>

          <input
            ref={instRef}
            style={height}
            type="text"
            className={classes}
            placeholder="Institution Name"
          ></input>
          <input
            ref={passYearRef}
            style={height}
            type="text"
            className={classes}
            placeholder="Passed Year"
          ></input>
          {act.type == "add" && (
            <button
              onClick={handleSubmit}
              style={height}
              className=" btn btn-sm bg-danger bg-opacity-25 rounded-3 text-dark border-0"
            >
              <GrAdd size={20} className=" mb-2 me-1" />
            </button>
          )}
          {act.type == "edit" && (
            <button
              onClick={handleSubmit}
              style={height}
              className=" btn btn-sm bg-danger bg-opacity-25 rounded-3 text-dark border-0"
            >
              Update
            </button>
          )}
        </form>
        {/* warning message or vice versa */}
        {toast && <ToastMessage toast={toast} setToast={setToast} />}
      </div>
      {/* display of education */}
      <div className="d-flex flex-column gap-3 pt-5">
        {user.educations &&
          user.educations.map((course, i) => (
            <div key={course.degreeName}>
              <span className="text-start shadow-sm ">
                <strong className="me-2">
                  {i + 1 + ". " + course.degreeName},
                </strong>
                {course.institution + ", " + course.passYear}
              </span>

              <button
                onClick={() => setForEdit(i)}
                className="rounded-circle btn bg-success bg-opacity-10 pt-0 px-0 ms-2"
                style={{ height: "25px" }}
              >
                <AiFillEdit size={21}></AiFillEdit>
              </button>
              <button
                onClick={() => deleteItem(i)}
                className="rounded-circle btn bg-success bg-opacity-10 pt-0 px-0 ms-2"
                style={{ height: "23px" }}
              >
                <AiFillDelete size={21}></AiFillDelete>
              </button>
            </div>
          ))}
      </div>
      <span>{JSON.stringify(user.educations)}</span>
    </div>
  );
}
