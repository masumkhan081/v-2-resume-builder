import React, { useContext } from "react";
import { authContext } from "../../context/Provider";
import { Badge, Button, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { FaHome, FaClipboardList, FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TbLayoutList } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { IconContext } from "react-icons";
//

export default function Header() {
  const { logout, user } = useContext(authContext);
  const navigate = useNavigate();
  const toolClasses =
    "py-0 badge  bg-success bg-opacity-25 rounded-pill text-dark border-0 border-end border-warning";
  return (
    <IconContext.Provider value={{ className: "shared-class", size: 20 }}>
      <div className="d-flex container-fluid  bg-dark bg-opacity-10 bg-gradient flex-column pt-1 shadow">
        <Nav className="h6">
          <Nav.Link href="/" className="px-sm-3 text-success fw-bolder">
            <GoHome size={23} className="text-dark mb-1 me-1 " />
            Online-Resume-Builder
          </Nav.Link>

          {user.loggedIn == true ? (
            <div className="ms-auto d-flex">
              <Dropdown className="  border-0 btn-sm text-sm rounded-pill">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{ backgroundColor: "rgb(198, 228, 208)" }}
                  className="mt-auto py-0 rounded-3 border-0 border-end border-success text-danger"
                >
                  <span className="mx-3 text-success">Profile</span>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className="shadow-lg rounded-3 border-0 border-top  border-success px-4 py-5"
                  style={{ backgroundColor: "rgb(198, 228, 208)" }}
                >
                  <Dropdown.Item
                    className="text-success shadow-sm rounded-3 my-3 text-center"
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    {user.profileName}
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger shadow-sm rounded-3 mb-3 text-center"
                    onClick={logout}
                  >
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              style={{ height: "25px" }}
              className="my-auto px-4 ms-auto bg-success bg-opacity-25  rounded-pill border-0 border-end  border-light text-dark shadow-sm fw-normal"
            >
              Log in
            </button>
          )}
        </Nav>
        <div className="d-flex flex-wrap justify-content-start gap-1 ">
          <Badge className="py-0 badge bg-dark bg-opacity-100  rounded-3 text-warning fw-bold">
            Tools:
            <TbLayoutList size={12} className="ms-1 text-light" />
          </Badge>
          <Badge className={toolClasses}>Firebase auth & FireStore cloud</Badge>
          <Badge className={toolClasses}>React Router</Badge>
          <Badge className={toolClasses}>React-pdf</Badge>
          <Badge className={toolClasses}>React-bootstrap</Badge>
          <Badge className={toolClasses}>React-icons</Badge>
          <Badge className={toolClasses}>
            Context, Hooks, Component composition
          </Badge>
        </div>
      </div>
    </IconContext.Provider>
  );
}
