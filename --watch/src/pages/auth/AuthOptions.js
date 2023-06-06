import React, { useContext } from "react";
import Googgle from "./Google";
import Github from "./Github";
import Yahoo from "./Yahoo";
import Linkedin from "./Linkedin";
import Facebook from "./Facebook";
import Phone from "./Phone"; 
//
export default function AuthOptions() {
  return (
    <div className=" col-md-4 pb-4 col-sm-6 rounded-3 bg-success bg-opacity-10">
      <span className=" text-center d-block rounded-3 bg-light shadow-sm text-black-50 bg-opacity-50 fw-normal">
        Or, Quick Signup With:
      </span>
      <div className="py-4 d-flex flex-column justify-content-around align-items-center gap-3 h-100">
        <Googgle />
        <Facebook />
        <Github />
        {/*       YET TO BE IMPLEMENTED */}

        <span className="mt-1">Not Implemented Yet</span>
        <Linkedin />
        <Yahoo />
        <Phone />
      </div>
    </div>
  );
}
