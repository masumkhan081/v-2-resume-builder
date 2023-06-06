import React, { useState, useContext } from "react";
import { Badge, Form, Button } from "react-bootstrap";
import { FaUserEdit, FaSave } from "react-icons/fa";
//
import { authContext } from "../../context/Provider";
//
export default function BasicInfo() {
  //
  const { user, setTheUser } = useContext(authContext);
  //
  function handleSave(e) {
    console.log("on handleSave ..");
    e.preventDefault();
  }
  //
  return (
    <div className="col-md-4 col-sm-6 rounded-3 ms-3">
      <div>
        <Badge
          text="dark"
          className="text-center bg-success bg-opacity-50 d-block py-0 mb-4 shadow-top "
        >
          <FaUserEdit className="mb-1 mx-1" size={15} /> Add/Edit Contacts
        </Badge>
      </div>

      <div className=" px-2 mt-3">
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-2">
            <span>Email</span>
            <Form.Control
              type="text"
              className="bg-light bg-opacity-50 border-0  text-center"
              style={{ height: "30px" }}
              placeholder="Email on resume"
              value={user.resume_email}
              onChange={(e) => {
                setTheUser({ resume_email: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <span>Phone</span>
            <Form.Control
              type="text"
              className="bg-light bg-opacity-50 border-0  text-center"
              style={{ height: "30px" }}
              placeholder="Mobile number"
              value={user.phone_number}
              onChange={(e) => {
                setTheUser({ phone_number: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <span>Address</span>
            <Form.Control
              type="text"
              className="bg-light bg-opacity-50 border-0  text-center"
              style={{ height: "30px" }}
              placeholder="Rd-6, Panidhar, Bogura"
              value={user.address}
              onChange={(e) => {
                setTheUser({ address: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <span>Linkedin Profile</span>
            <Form.Control
              type="text"
              className="bg-light bg-opacity-50 border-0  text-center"
              style={{ height: "30px" }}
              placeholder="linkedin.com/in/"
              value={user.linkedin}
              onChange={(e) => {
                setTheUser({ linkedin: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <span>Github Profile</span>
            <Form.Control
              type="text"
              className="bg-light bg-opacity-50 border-0 text-center"
              style={{ height: "30px" }}
              placeholder="github.com/"
              value={user.github}
              onChange={(e) => {
                setTheUser({ github: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <span>Portfolio</span>
            <Form.Control
              type="text"
              className="bg-light bg-opacity-50 border-0  text-center"
              style={{ height: "30px" }}
              placeholder="project showcase link"
              value={user.portfolio}
              onChange={(e) => {
                setTheUser({ portfolio: e.target.value });
              }}
            />
          </Form.Group>
        </Form>
        
      </div>
    </div>
  );
}
