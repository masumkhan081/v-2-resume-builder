import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../context/Provider";
import Header from "../partials/Header";
import { NextPrevious } from "../partials/Common";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import PageLogin from "./LoginPage";
import Page4 from "./PDF";
import PageProfile from "./ProfilePage";

//
export default function PageControl({ reqPage }) {
  const { user } = useContext(authContext);
  const [page, setReqPage] = useState(reqPage);
  //
  const clsNames =
    "mt-1 pt-1 row mx-auto d-flex justify-content-center border-0 border-bottom";
  //
  return (
    <>
      {user.loggedIn === false ? <PageLogin /> : null}
      {page === 1 ? <PageProfile page={page} setReqPage={setReqPage} /> : null}
      {page === 0 && user.loggedIn === true ? <PageLogin /> : null}
      {page === 101 ? (
        <>
          <NextPrevious
            page={page}
            setReqPage={setReqPage}
            prev={`/profile/page1`}
            next={`/profile/page2`}
          />
          <Page1 />
        </>
      ) : null}
      {page === 102 ? (
        <>
          <NextPrevious
            page={page}
            prev={`/profile/page1`}
            next={`/profile/page3`}
          />
          <Page2 />
        </>
      ) : null}
      {page === 103 ? (
        <>
          <NextPrevious
            page={page}
            prev={`/profile/page2`}
            next={`/profile/page3`}
          />
          <Page3 />
        </>
      ) : null}

      {/*
     if (user.loggedIn === false) return <PageLogin />; // if (reqPage
    === "page-profile") return <PageProfile />; // if (reqPage === "page-login")
    return <PageLogin />; // if (reqPage === "page-1") return <Page1 />; // if
    (reqPage === "page-2") return <Page2 />; // if (reqPage === "page-3") return
    <Page3 />; // if (reqPage === "page-4") return <Page4 />; /*
    {reqPage === "page-logout" && <PageLogin />} */}
    </>
  );
}
