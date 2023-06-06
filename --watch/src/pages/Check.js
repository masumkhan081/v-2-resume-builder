import React from "react";

export default function Check({ page }) {
  React.useEffect(() => {});

  if (page === "ResumePage") {
    return <div>resume page</div>;
  }
  if (page === "Page1") {
    return <div>Page-1</div>;
  }
  if (page === "Page2") {
    return <div>Page-2</div>;
  }
  if (page === "LoginPage") {
    return <div>login page</div>;
  }
}
