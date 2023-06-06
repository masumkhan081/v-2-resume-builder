import React, { useState, useRef, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { PanelAbout, ToastMessage } from "./Common";
import { GrAdd } from "react-icons/gr";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { authContext } from "../../context/Provider";
//
export default function CodeAndProjects() {
  //
  const { user, setTheUser, loading } = React.useContext(authContext);
  //
  const [toast, setToast] = useState("");
  const [act, setAct] = useState({ type: "add", actOn: null });
  //
  const titleRef = useRef();
  const descrRef = useRef();
  const linkRef = useRef();

  function setForEdit(i) {
    titleRef.current.value = user.projects[i].title;
    descrRef.current.value = user.projects[i].description;
    linkRef.current.value = user.projects[i].srcLink;
    setAct({ ...act, type: "edit", actOn: i });
  }
  function deleteItem(ind) {
    setTheUser({
      projects: user.projects.filter((project, itemInd) => {
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

    const title = titleRef.current.value;
    const description = descrRef.current.value;
    const srcLink = linkRef.current.value;

    if (title.length < 3) {
      showToast("Project must have  name");
    } else if (description.length < 2) {
      showToast("Something about ur project");
    } else if (srcLink.length < 2) {
      showToast("src link plz");
    } else {
      if (act.type == "add") {
        setTheUser({
          projects: [...user.projects, { title, description, srcLink }],
        });
      }
      if (act.type == "edit") {
        setTheUser({
          projects: user.projects.map((item, ind) => {
            if (act.actOn == ind) {
              return { title, description, srcLink };
            } else {
              return item;
            }
          }),
        });
        setAct({ ...act, type: "add" });
      }
      titleRef.current.value = "";
      descrRef.current.value = "";
      linkRef.current.value = "";
    }
  }
  function removeProject(project) {
    setTheUser({
      projects: user.projects.filter((item) => {
        return item !== project;
      }),
    });
  }
  //
  const height = { height: "27px" };
  const cmnClasses =
    "text-center rounded-3 bg-light bg-opacity-75 border-0 border-bottom border-success  ";
  //
  return (
    <div className="col-md-6 rounded-3">
      {/* panel header */}
      <PanelAbout title="Projects & Development" about="projects" />
      {/* getting Projects */}
      <div className="mt-4 px-4">
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2 ">
          <Form.Control
            ref={titleRef}
            style={height}
            type="text"
            className={cmnClasses}
            placeholder="Project Title"
          ></Form.Control>
          <Form.Control
            ref={descrRef}
            style={height}
            type="text"
            className={cmnClasses}
            placeholder="Description/ Tools"
          ></Form.Control>
          <Form.Control
            ref={linkRef}
            style={height}
            type="text"
            className={cmnClasses}
            placeholder="Deployment/ src link"
          ></Form.Control>

          <Button
            type="submit"
            onClick={handleSubmit}
            style={{ height: "27px" }}
            className=" btn btn-sm bg-danger bg-opacity-25 rounded-3 text-dark border-0"
          >
            {act.type == "add" ? (
              <GrAdd size={20} className=" mb-2 me-1" />
            ) : (
              <span>Update</span>
            )}
          </Button>
        </Form>
        {/* warning message or vice versa */}
        {toast && <ToastMessage toast={toast} setToast={setToast} />}
      </div>
      <div className="d-flex flex-column gap-3 pt-4 px-4">
        {user.projects &&
          user.projects.map((project, i) => (
            <div key={i}>
              <span className="text-start shadow-sm ">
                <strong className="me-2">
                  {i + 1 + ". " + project.title},
                </strong>
                {project.description + ", " + project.srcLink}
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
    </div>
  );
}
