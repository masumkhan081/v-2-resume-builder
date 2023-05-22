import React, { useState, useContext } from "react";
import { Badge, Form, Button } from "react-bootstrap";
import { FaUserEdit, FaSave } from "react-icons/fa";
import { page1Context } from "../pages/Page1";

export default function BasicInfo() {
  const { state, updateState } = useContext(page1Context);
  //
  function handleSave(e) {
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
              value={state.email}
              onChange={(e) => {
                updateState({ ...state, email: e.target.value });
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
              value={state.phoneNumber}
              onChange={(e) => {
                updateState({ ...state, phoneNumber: e.target.value });
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
              value={state.address}
              onChange={(e) => {
                updateState({ ...state, address: e.target.value });
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
              value={state.linkedin}
              onChange={(e) => {
                updateState({ ...state, linkedin: e.target.value });
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
              value={state.github}
              onChange={(e) => {
                updateState({ ...state, github: e.target.value });
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
              value={state.portfolio}
              onChange={(e) => {
                updateState({ ...state, portfolio: e.target.value });
              }}
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
