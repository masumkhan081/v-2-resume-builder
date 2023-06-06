import React, { useContext, useState, useRef } from "react";
import { Badge, Form } from "react-bootstrap";
// import { FaWindowClose } from "react-icons/fa";
// import { FcDataSheet, FcDatabase, FcAcceptDatabase } from "react-icons/fc";
// import { AiFillApi, AiFillDatabase } from "react-icons/ai";
// import { GrAdd, GrClose } from "react-icons/gr";
import { BiListPlus } from "react-icons/bi";
import List from "./List";
import { EnhancedTitle, TextInput } from "./Common";
import { authContext } from "../../context/Provider";
//

export default function TechSkills() {
  //
  const { user, setTheUser } = useContext(authContext);
  //
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

    console.log("enlist_front_skill " + skillName);
    if (user.front_end_skills.length > 9) {
      setFrontEndMsg("Exceeded the limit");
    } else if (user.front_end_skills.includes(skillName)) {
      setFrontEndMsg("already listed");
    } else if (skillName.length < 2) {
      setFrontEndMsg("ur is surprisingly tiny");
    } else {
      frontEndSkillRef.current.value = "";
      setTheUser({
        front_end_skills: [...user.front_end_skills, skillName],
      });

      // setFrontEndMsg(10 - user.front_end_skills.length + " left");
    }
  }
  function enlist_back_skill(e) {
    e.preventDefault();
    let skillName = backEndSkillRef.current.value;
    console.log("enlist-back-skill " + skillName);

    if (user.back_end_skills.length > 9) {
      setBackEndMsg("limit exceeded");
    } else if (user.back_end_skills.includes(skillName)) {
      setBackEndMsg("already listed");
    } else if (skillName.length < 2) {
      setBackEndMsg("ur  is surprisingly tiny");
    } else {
      backEndSkillRef.current.value = "";
      setTheUser({
        back_end_skills: [...user.back_end_skills, skillName],
      });
    }
  }
  // perSkillMsg
  function enlist_data_skill(e) {
    e.preventDefault();
    let skillName = dataTierSkillRef.current.value;
    console.log("enlist_data_skill " + skillName);

    if (user.data_tier_skills.length > 9) {
      setDataTierMsg("limit exceeded");
    } else if (user.data_tier_skills.includes(skillName)) {
      setDataTierMsg("already listed");
    } else if (skillName.length < 2) {
      setDataTierMsg("ur  is surprisingly tiny");
    } else {
      dataTierSkillRef.current.value = "";
      setTheUser({
        data_tier_skills: [...user.data_tier_skills, skillName],
      });
    }
  }
  function enlist_pers_skill(e) {
    e.preventDefault();
    let skillName = perSkillRef.current.value;

    console.log("enlist_pers_skill " + skillName);

    if (user.personal_skills.length > 4) {
      setPerSkillMsg("limit exceeded");
    } else if (user.personal_skills.includes(skillName)) {
      setPerSkillMsg("already listed");
    } else if (skillName.length < 2) {
      setPerSkillMsg("ur  is surprisingly tiny");
    } else {
      perSkillRef.current.value = "";
      setTheUser({
        personal_skills: [...user.personal_skills, skillName],
      });
    }
  }

  function removeFrontndSkill(skillName) {
    console.log("inside removeFrontndSkill:  " + skillName);

    setTheUser({
      front_end_skills: user.front_end_skills.filter((item) => {
        return item !== skillName;
      }),
    });
  }
  function removeBackndSkill(skillName) {
    console.log("inside removeBackndSkill :  " + skillName);
    setTheUser({
      back_end_skills: user.back_end_skills.filter((item) => {
        return item !== skillName;
      }),
    });
  }
  function removeDataTierSkill(skillName) {
    console.log("inside removeDataTierSkill :  " + skillName);
    setTheUser({
      data_tier_skills: user.data_tier_skills.filter((item) => {
        return item !== skillName;
      }),
    });
  }
  function removePersonalSkill(skillName) {
    console.log("inside removePersonalSkill:  " + skillName);

    setTheUser({
      personal_skills: user.personal_skills.filter((item) => {
        return item !== skillName;
      }),
    });
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
        <List items={user.front_end_skills} removeSkill={removeFrontndSkill} />
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

        <List items={user.back_end_skills} removeSkill={removeBackndSkill} />
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
        <List items={user.data_tier_skills} removeSkill={removeDataTierSkill} />
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
        <List items={user.personal_skills} removeSkill={removePersonalSkill} />
      </div>
    </div>
  );
}
