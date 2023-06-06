import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FcReading } from "react-icons/fc";
import { FcList } from "react-icons/fc";
import UsedTools from "./partials/UsedTools";

export default function PageAbout() {
  return (
    <>
      <UsedTools />
      <div className="row px-5 pt-5">
        {/* --start col-1 */}
        <div className="col-md-4 ">
          <span className="text-success h5 d-block text-center mb-3">
            Routes <FcList size={20} className="mb-1 mx-1" /> (last commit:
            03.05.23)
          </span>

          <QuickLinks />

          {/* --end of col-1 */}
        </div>
        {/* --start col-2   */}
        <div className="col-md-8 ">
          <span className="text-success h5 d-block text-center mb-3">
            Read Me
            <FcReading size={22} className="mb-1 ms-1" />
          </span>
          <ul className=" rounded d-flex text-start ps-3 flex-column gap-2 list-unstyled ">
            <li className=" ">
              <strong className="bg-light rounded px-1">Objective: </strong>
            </li>
            <li className="rounded ">
              <ul>
                <li>
                  Create resume online putting neccessary info, export as pdf
                  picking a theme
                </li>
              </ul>
            </li>
            <li className=" ">
              <strong className="bg-light rounded px-1">Features: </strong>
            </li>
            <li className="rounded ">
              <ul>
                <li>Easy sign in options to start</li>
                <li>
                  Data saved in cloud - means an unfinished attempt wouldn't be
                  lost regarding the data u have put
                </li>
                <li>
                  Well, you can edit ur info any time navigating page to page
                </li>
                <li>
                  Pick a theme for the pdf output to follow ( Not Yet
                  Implemented )
                </li>
              </ul>
            </li>
            <li className=" ">
              <strong className="bg-light rounded px-1">Limitations: </strong>
            </li>
            <li className="rounded ">
              <ul>
                <li>Some of the features not yet Implemented</li>
                <li>Several routing issues in hand</li>
              </ul>
            </li>
          </ul>
          {/* --end col-2 */}
        </div>
        {/* --end row */}
      </div>
    </>
  );
}
function QuickLinks() {
  const navigate = useNavigate();
  const clsNames =
    "border-0 text-start text-primary rounded bg-success bg-opacity-10";
  return (
    <div className="d-flex flex-column gap-2">
      <button
        onClick={() => {
          navigate("/login");
        }}
        className={clsNames}
      >
        Log in
      </button>
      <button
        onClick={() => {
          navigate("/about");
        }}
        className={clsNames}
      >
        About Page
      </button>
      <button
        onClick={() => {
          navigate("/resume-page-1");
        }}
        className={clsNames}
      >
        Page1
      </button>
      <button
        onClick={() => {
          navigate("/resume-page-2");
        }}
        className={clsNames}
      >
        Page2
      </button>
      <button
        onClick={() => {
          navigate("/resume-page-3");
        }}
        className={clsNames}
      >
        Page3
      </button>
      <button
        
        onClick={() => {
          navigate("/resume");
        }}
        className={clsNames}
      >
        View Resume
      </button>
      <button
        disabled={true}
        onClick={() => {
          navigate("/profile/myresume-pdf");
        }}
        className={clsNames}
      >
        PDF
      </button>
    </div>
  );
}
