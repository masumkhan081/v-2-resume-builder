import React, { useContext, useState, useRef, useEffect } from "react";
import { Badge, Form, Button } from "react-bootstrap";
import { FaWindowClose } from "react-icons/fa";
import { FcDataSheet, FcDatabase, FcAcceptDatabase } from "react-icons/fc";
import { AiFillApi, AiFillDatabase } from "react-icons/ai";
import { GrAdd, GrClose } from "react-icons/gr";
import { BiListPlus } from "react-icons/bi";
import List from "./List";
import { EnhancedTitle, TextInput } from "./Common";
import { page1Context } from "../pages/Page1";
import { authContext } from "../../context/Provider";
//

export default function TechSkills() {
  const {
    updateState,
    removeBackndSkill,
    removeDataTierSkill,
    removeFrontndSkill,
    removePersonalSkill,
    state,
  } = useContext(page1Context);

  const msgCommon10 = "Total 10 skills";
  const msgCommon5 = "Total 5 skills";
  const [frontEndMsg, setFrontEndMsg] = useState(msgCommon10);
  const [dataTierMsg, setDataTierMsg] = useState(msgCommon10);
  const [backEndMsg, setBackEndMsg] = useState(msgCommon10);
  const [perSkillMsg, setPerSkillMsg] = useState(msgCommon5);
  //
  const frontEndSkillRef = useRef();
  const backEndSkillRef = useRef();
  const dataTierSkillRef = useRef();
  const perSkillRef = useRef();
  //

  function enlist_front_skill(e) {
    e.preventDefault();
    let skillName = frontEndSkillRef.current.value;

    if (state.frontEndSkills.length > 9) {
      setFrontEndMsg("Exceeded the limit");
    } else if (state.frontEndSkills.includes(skillName)) {
      setFrontEndMsg("already listed");
    } else if (skillName.length < 2) {
      setFrontEndMsg("ur is surprisingly tiny");
    } else {
      frontEndSkillRef.current.value = "";
      updateState({
        ...state,
        frontEndSkills: [...state.frontEndSkills, skillName],
      });

      // setFrontEndMsg(10 - state.frontEndSkills.length + " left");
    }
  }
  function enlist_back_skill(e) {
    e.preventDefault();
    let skillName = backEndSkillRef.current.value;
    if (state.backEndSkills.length > 9) {
      setBackEndMsg("limit exceeded");
    } else if (state.backEndSkills.includes(skillName)) {
      setBackEndMsg("already listed");
    } else if (skillName.length < 2) {
      setBackEndMsg("ur  is surprisingly tiny");
    } else {
      backEndSkillRef.current.value = "";
      updateState({
        backEndSkills: [...state.backEndSkills, skillName],
      });
    }
  }
  // perSkillMsg
  function enlist_data_skill(e) {
    e.preventDefault();
    let skillName = dataTierSkillRef.current.value;
    if (state.dataTierSkills.length > 9) {
      setDataTierMsg("limit exceeded");
    } else if (state.dataTierSkills.includes(skillName)) {
      setDataTierMsg("already listed");
    } else if (skillName.length < 2) {
      setDataTierMsg("ur  is surprisingly tiny");
    } else {
      dataTierSkillRef.current.value = "";
      updateState({
        dataTierSkills: [...state.dataTierSkills, skillName],
      });
    }
  }
  function enlist_pers_skill(e) {
    e.preventDefault();
    let skillName = perSkillRef.current.value;
    if (state.personalSkills.length > 9) {
      setPerSkillMsg("limit exceeded");
    } else if (state.personalSkills.includes(skillName)) {
      setPerSkillMsg("already listed");
    } else if (skillName.length < 2) {
      setPerSkillMsg("ur  is surprisingly tiny");
    } else {
      perSkillRef.current.value = "";
      updateState({
        ...state,
        personalSkills: [...state.personalSkills, skillName],
      });
    }
  }
  return (
    <div className="col-md-5 rounded-3 ms-3">
      <div>
        <Badge
          text="dark"
          className="text-center bg-success bg-opacity-50 d-block py-0 "
        >
          <BiListPlus size={20} className=" mx-2" />
          Enlist your skills
        </Badge>
      </div>
      {/* STARTING-FRONT-END-SKILL */}
      <div className="mt-4">
        <EnhancedTitle
          msg={frontEndMsg}
          title={"Front-end Skills:"}
          type={"front"}
        />
        <Form onSubmit={enlist_front_skill}>
          <TextInput inputRef={frontEndSkillRef} />
        </Form>
        <List items={state.frontEndSkills} removeSkill={removeFrontndSkill} />
      </div>
      {/* STARTING-BACK-END-SKILL */}
      <div className="mt-5">
        <EnhancedTitle
          msg={backEndMsg}
          title={"Back-end Skills:"}
          type={"back"}
        />
        <Form onSubmit={enlist_back_skill}>
          <TextInput inputRef={backEndSkillRef} />
        </Form>

        <List items={state.backEndSkills} removeSkill={removeBackndSkill} />
      </div>
      {/* STARTING-DATABASE-SKILL */}
      <div className="mt-5 mb-5">
        <Form onSubmit={enlist_data_skill}>
          <EnhancedTitle
            title={"Data-tier Skills:"}
            msg={dataTierMsg}
            type={"database"}
          />
          <TextInput inputRef={dataTierSkillRef} />
        </Form>
        <List items={state.dataTierSkills} removeSkill={removeDataTierSkill} />
      </div>
      {/* STARTING-DATABASE-SKILL */}
      <div className="mt-5 mb-5">
        <Form onSubmit={enlist_pers_skill}>
          <EnhancedTitle
            title={"Personal Skills:"}
            msg={perSkillMsg}
            type={"database"}
          />
          <TextInput inputRef={perSkillRef} plcHolder="Skill Name" />
        </Form>
        <List items={state.personalSkills} removeSkill={removePersonalSkill} />
      </div>
    </div>
  );
}
