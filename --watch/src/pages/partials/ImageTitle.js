import React, { useContext, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { Image,  Form } from "react-bootstrap";
//
import { authContext } from "../../context/Provider";
//
export default function ImageTitle() {
  const { user, setTheUser } = useContext(authContext);
  //
  const [checked, setChecked] = useState(true);

  function SET_PROFILE_PIC_ON_RESUME(e) {
    if (checked === true) {
      setTheUser({ resume_pic: user.account_pic });
      setChecked(!checked);
    } else {
      setTheUser({ resume_pic: "" });
      setChecked(!checked);
    }
  }

  return (
    <div className="align-items-center col-md-2 d-flex flex-column gap-4  justify-content-start pt-1 rounded-3 shadow-sm">
      <div className="">
        <input
          id="chk_resumepic"
          type="checkbox"
          checked={checked}
          onChange={SET_PROFILE_PIC_ON_RESUME}
        ></input>
        <label
          style={{
            fontSize: "12px",
          }}
          htmlFor="chk_resumepic"
          className="text-wrap fw-bold ms-1"
        >
          Use account pic
        </label>
      </div>
      <label
        htmlFor="img"
        className="bg-secondary bg-opacity-25 text-center rounded-circle"
        style={{ height: "170px", width: "165px" }}
      >
        <Image
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Click to add/replace"
          onMouseOver={() => {}}
          rounded
          src={user.resume_pic}
          className="text-center rounded-circle"
          style={{ height: "170px", width: "165px" }}
        />
        <FcAddImage
          size={30}
          htmlFor="img"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Add/Replace image"
        />
      </label>
      <input
        id="img"
        className="hidden"
        onChange={(e) => {
          let files = e.target.files;
          console.log(files);
          let reader = new FileReader();
          reader.onload = (r) => {
            console.log(r.target.result);
            setTheUser({ ...user, resume_pic: r.target.result });
          };
          reader.readAsDataURL(files[0]);
        }}
        style={{ display: "none" }}
        type="file"
        name="img"
        accept="image/*"
      ></input>
      <div className="mt-3">
        <Form.Group>
          <span>Name On Resume</span>
          <Form.Control
            //disabled={editable}
            type="text"
            className="bg-light bg-opacity-50 border-0  text-center"
            style={{ height: "30px" }}
            placeholder="Display Name"
            value={user.resume_name}
            onChange={(e) => {
              setTheUser({ ...user, resume_name: e.target.value });
            }}
          />
        </Form.Group>
      </div>
      <div className="mt-0">
        <label htmlFor="title">Preferred Title</label>
        <textarea
          id="title"
          value={user.title}
          placeholder={"E.g.  Full stack developer"}
          onChange={(e) => {
            setTheUser({ ...user, title: e.target.value });
          }}
          className="w-100 bg-light bg-opacity-50 border-0 text-center form-control-sm"
        ></textarea>{" "}
      </div>
    </div>
  );
}
