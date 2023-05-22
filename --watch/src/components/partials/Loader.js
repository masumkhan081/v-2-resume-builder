import React from "react";

export default function Loader() {
  return (
    <span className="mt-5 py-2 px-2 mx-auto d-block text-center fw-bolder ">
      <span
        className=" spinner-border spinner-border-sm pt-2 me-2 py-3 bg-success rounded-circle border-success bg-opacity-25"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </span>
  );
}
