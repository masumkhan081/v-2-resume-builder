import React, { useContext } from "react";
import { authContext } from "../../context/Provider";
import { Link, useNavigate } from "react-router-dom";
// import UsedTools from "./UsedTools";
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
// import { FaHome, FaClipboardList, FaList } from "react-icons/fa";
// import { TbLayoutList } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { IconContext } from "react-icons";
//

export default function Header() {
  const { logout, user, loading } = useContext(authContext);
  const navigate = useNavigate();
  //
  return (
    <IconContext.Provider value={{ className: "shared-class", size: 20 }}>
      <div className="d-flex container-fluid   bg-gradient flex-column pt-1">
        <Navbar collapseOnSelect expand="lg" sticky="top" fixed="top">
          <Container>
            {/* <NavbarBrand
              onClick={() => {
                navigate("/");
              }}
              className="text-success text-opacity-50 h3 m-0 py-0 "
            >
              Resume-Builder
            </NavbarBrand> */}
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="btn "
            />
            <Navbar.Collapse id="responsive-navbar-nav ">
              <Nav className=" flex w-100 justify-content-center gap-sm-3 gap-2 mt-sm-0  py-sm-0 py-2  ">
                <Nav.Link
                  onClick={() => {
                    navigate("/");
                  }}
                  className=" px-2  py-0 text-center rounded-3 text-success"
                >
                  <GoHome size={20} className="text-success mb-1 me-1 " />
                  Home
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/about");
                  }}
                  className="px-2 py-0 text-center rounded-3 text-success"
                >
                  About Project!
                </Nav.Link>

                {user.account_email ? (
                  <>
                    <Nav.Link
                      onClick={() => {
                        navigate("/resume");
                      }}
                      className="px-2 py-0 text-center rounded-3 text-success"
                    >
                      My Resume
                    </Nav.Link>
                    <Nav.Link
                      onClick={logout}
                      className="btn btn-sm px-2 py-0 text-center rounded-3 text-success"
                    >
                      Log Out
                    </Nav.Link>
                  </>
                ) : (
                  <Nav.Link
                    onClick={() => {
                      navigate("/login");
                    }}
                    className=" px-2  py-0 text-center rounded-3 text-success"
                  >
                    Log In
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {user.account_email && (
          <span>emal: {JSON.stringify(user.account_email)}</span>
        )}
        {user.resume_name && <span>{JSON.stringify(user.resume_name)}</span>}
      </div>
    </IconContext.Provider>
  );
}
