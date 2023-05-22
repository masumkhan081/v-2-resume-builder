import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Provider from "./context/Provider";
import ErrorPage from "./components/pages/ErrorPage";
import Header from "./components/partials/Header";
import Page1 from "./components/pages/Page1";
import Page2 from "./components/pages/Page2";
import Page3 from "./components/pages/Page3";
import PageProfile from "./components/pages/ProfilePage";
import PageLogin from "./components/pages/LoginPage";
import PageLanding from "./components/pages/LandingPage";
import ResumeDetail from "./components/pages/ResumeDetail";
import PDF from "./components/pages/PDF";
//
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        //element: <PageControl reqPage={1} />, //<PageProfile />,
        element: <PageLanding />,
      },
      {
        path: "login",
        // element: <PageControl reqPage={0} />,
        element: <PageLogin />,
      },
      ,
      {
        path: "profile",
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            path: "",
            // element: <PageControl reqPage={1} />,
            element: <PageProfile />,
          },
          {
            path: "page1",
            // element: <PageControl reqPage={101} />,
            element: <Page1 />,
          },
          {
            path: "page2",
            //element: <PageControl reqPage={102} />,
            element: <Page2 />,
          },
          {
            path: "page3",
            // element: <PageControl reqPage={103} />,
            element: <Page3 />,
          },
          {
            path: "myresume",
            // element: <PageControl reqPage={103} />,
            element: <ResumeDetail />,
          },
          {
            path: "myresume-pdf",
            // element: <PageControl reqPage={103} />,
            element: <PDF />,
          },
        ],
      },
      ,
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <RouterProvider router={router} />
  </Provider>
  /*
  
git add .
git commit -m "pokath"
git push

  */
);
