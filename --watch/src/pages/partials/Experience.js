import React, { useState, useRef, useContext } from "react";
import { PanelAbout, ToastMessage } from "./Common";
// icons ...
import { GrAdd } from "react-icons/gr";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { authContext } from "../../context/Provider";
//
export default function Experience() {
  //
  const { user, setTheUser, loading } = React.useContext(authContext);
  //
  const [toast, setToast] = useState("");
  const [act, setAct] = useState({ type: "add", actOn: null });
  const [currWorking, setCurrWorking] = useState(false);

  const [startMonth, setStartMonth] = useState("Month");
  const [endMonth, setEndMonth] = useState("Month");

  //
  const options = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  //
  const jobTitleRef = useRef();
  const employerRef = useRef();
  const startYearRef = useRef();
  const endYearRef = useRef();
  const startMRef = useRef("Month");
  const endMRef = useRef();
  //
  function setForEdit(i) {
    jobTitleRef.current.value = user.experiences[i].jobTitle;
    employerRef.current.value = user.experiences[i].employer;
    //
    let start = user.experiences[i].duration.split("to")[0];
    startMRef.current.value = start.split("-")[0];
    startYearRef.current.value = start.split("-")[1];
    //
    let end = user.experiences[i].duration.split("to")[1];
    if (end == "Present") {
      setCurrWorking(true);
    } else {
      endMRef.current.value = end.split("-")[0];
      endYearRef.current.value = end.split("-")[1];
    }

    //
    setAct({ ...act, type: "edit", actOn: i });
  }
  function deleteItem(ind) {
    setTheUser({
      experiences: user.experiences.filter((item, itemInd) => {
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
  function onStartMonthChange(e) {
    console.log(e.target.value);
    setStartMonth(e.target.value);
  }
  function onEndMonthChange(e) {
    console.log(e.target.value);
    setEndMonth(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    //
    const startM = startMRef.current.value;
    const endM = endMRef.current.value;
    const jobTitle = jobTitleRef.current.value;
    const employer = employerRef.current.value;
    const startYear = startYearRef.current.value;
    const endYear = endYearRef.current.value;
    const currentYear = new Date().getFullYear();

    let duration;

    if (jobTitle.length <= 1 && employer.length <= 1) {
      showToast("Too short input !");
    } else if (startYear.length < 4 || startYear < 1980) {
      showToast("check - starting year ");
    } else if (endYear > currentYear) {
      showToast("endyear !");
    } else if (startM == "Month") {
      showToast("Seelct starting month ");
    } else if (
      currWorking === false &&
      (endYear < startYear || endM == "Month" || endYear.length < 4)
    ) {
      console.log("len:  " + endYear.length);
      showToast("Check - end time");
    } else {
      duration = currWorking
        ? startM + "-" + startYear + "toPresent"
        : startM + "-" + startYear + "to" + endM + "-" + endYear;

      if (act.type == "add") {
        setTheUser({
          experiences: [...user.experiences, { jobTitle, employer, duration }],
        });
      }
      if (act.type == "edit") {
        setTheUser({
          experiences: user.experiences.map((item, ind) => {
            if (act.actOn == ind) {
              return {
                jobTitle,
                employer,
                duration,
              };
            } else {
              return item;
            }
          }),
        });
        setAct({ ...act, type: "add" });
      }
      jobTitleRef.current.value = "";
      employerRef.current.value = "";
      startYearRef.current.value = "";
      endYearRef.current.value = "";
      startMRef.current.value = "";
      endMRef.current.value = "";
      setCurrWorking(false);
    }
  }
  const btnClasses =
    "rounded-circle btn bg-success bg-opacity-10 pt-0 px-0 ms-2";
  const height = {
    height: "27px",
  };
  const dateClasses =
    "text-center rounded-3 bg-light bg-opacity-75 border-0 border-top border-success  ";
  const classes =
    "text-center rounded-3 bg-light bg-opacity-75 border-0 border-bottom border-success  ";
  return (
    <div className="col-md-7  " style={{ height: "80vh" }}>
      {/* panel header */}
      <PanelAbout title="Work Experiences 2000" about="experience" />
      <div className="px-3">
        <form className="d-flex flex-column gap-2 mt-4 ">
          <input
            ref={jobTitleRef}
            style={height}
            type="text"
            className={classes}
            placeholder="Job Title/ Designation"
          ></input>
          <input
            ref={employerRef}
            style={height}
            type="text"
            className={classes}
            placeholder="Employer"
          ></input>

          <div
            className="d-flex justify-content-between"
            style={{ height: "27px" }}
          >
            <div className="d-flex gap-1">
              <strong>From:</strong>
              <select
                ref={startMRef}
                // value={startMonth}
                // onChange={onStartMonthChange}
                className="text-center rounded-3 bg-light bg-opacity-75 border-0 border-top border-success"
                style={{ width: "90px" }}
              >
                <option disabled={!true}>Month</option>
                {options.map((option, index) => {
                  return <option key={index}>{option}</option>;
                })}
              </select>
              <input
                ref={startYearRef}
                style={{ height: "27px", width: "90px" }}
                type="text"
                className={dateClasses}
                placeholder="Year"
              ></input>
            </div>

            <div className="d-flex gap-1">
              <strong className="me-1">To:</strong>
              <select
                ref={endMRef}
                disabled={currWorking}
                // value={endMonth}
                // onChange={onEndMonthChange}
                className={dateClasses}
                style={{ width: "90px" }}
              >
                <option disabled={!true}>Month</option>
                {options.map((option, index) => {
                  return <option key={index}>{option}</option>;
                })}
              </select>

              <input
                disabled={currWorking}
                ref={endYearRef}
                style={{ height: "27px", width: "90px" }}
                type="text"
                className={dateClasses}
                placeholder="Year"
              ></input>
            </div>
            <strong>Or:</strong>
            <div className="form-check  shadow-sm rounded-3 bg-light bg-opacity-75">
              <input
                className="form-check-input"
                type="checkbox"
                checked={currWorking}
                onChange={() => {
                  setCurrWorking(!currWorking);
                }}
                id="flexCheckDefault"
              />
              <label
                className="form-check-label pe-1"
                htmlFor="flexCheckDefault"
              >
                Working
              </label>
            </div>
          </div>

          {act.type == "add" && (
            <button
              onClick={handleSubmit}
              style={height}
              className="float-end btn btn-sm bg-danger bg-opacity-25 rounded-3 border-0 text-dark"
            >
              <GrAdd size={20} className=" mb-2 me-1" />
            </button>
          )}
          {act.type == "edit" && (
            <button
              onClick={handleSubmit}
              style={height}
              className="float-end btn btn-sm bg-danger bg-opacity-25 rounded-3 border-0 text-dark"
            >
              Update
            </button>
          )}
        </form>
        {/* warning message or vice versa */}
        {toast && <ToastMessage toast={toast} setToast={setToast} />}
      </div>
      <div className="d-flex flex-column gap-3 pt-5">
        {user.experiences &&
          user.experiences.map((job, i) => (
            <div key={i}>
              <span className="text-start shadow-sm " key={i}>
                <strong className="me-2">{i + 1 + ". " + job.jobTitle}</strong>
                {job.employer +
                  ", " +
                  job.duration.split("to")[0] +
                  " To " +
                  job.duration.split("to")[1]}
              </span>
              <button
                onClick={() => setForEdit(i)}
                className={btnClasses}
                style={{ height: "25px" }}
              >
                <AiFillEdit size={21}></AiFillEdit>
              </button>
              <button
                onClick={() => deleteItem(i)}
                className={btnClasses}
                style={{ height: "23px" }}
              >
                <AiFillDelete size={21}></AiFillDelete>
              </button>
            </div>
          ))}
      </div>
      <span>{JSON.stringify(user.experiences)}</span>
    </div>
  );
}
