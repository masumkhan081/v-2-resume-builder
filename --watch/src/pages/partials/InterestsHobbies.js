import React, { useContext, useState, useRef } from "react";
import {  Form } from "react-bootstrap";
import { EnhancedTitle, TextInput, PanelAbout } from "./Common";
import List from "./List";
import { authContext } from "../../context/Provider";
//
export default function InterestsHobbies() {
  //
  const { user, setTheUser /*, loading */ } = useContext(authContext);
  //
  const msgCommon5 = "at most 5";
  const [hobbyMsg, setHobbyMsg] = useState(msgCommon5);
  const [interestMsg, setInterestMsg] = useState(msgCommon5);
  //
  const hobbyRef = useRef();
  const interestRef = useRef();
  //
  function removeHobby(hobby) {
    setTheUser({
      hobbies: user.hobbies.filter((item) => {
        return item !== hobby;
      }),
    });
  }

  function removeInterest(interest) {
    setTheUser({
      interests: user.interests.filter((item) => {
        return item !== interest;
      }),
    });
  }

  return (
    <div className="col-md-5 rounded-3">
      {/* panel header */}
      <PanelAbout title="Enlist your hobbies & interests" about="hobbies" />
      {/* getting hobbies */}
      <div className="mt-4">
        <EnhancedTitle
          msg={interestMsg}
          title={"Interests:"}
          type={"interest"}
        />
        <Form onSubmit={enlist_interest}>
          <TextInput inputRef={interestRef} />
        </Form>
        <List items={user.interests} removeSkill={removeInterest} />
      </div>
      {/* getting interests */}
      <div className="mt-5">
        <EnhancedTitle msg={hobbyMsg} title={"Hobbies:"} type={"front"} />
        <Form onSubmit={enlist_hobby}>
          <TextInput inputRef={hobbyRef} />
        </Form>
        <List items={user.hobbies} removeSkill={removeHobby} />
      </div>
    </div>
  );
  //
  //
  function enlist_hobby(e) {
    e.preventDefault();
    let hobbyName = hobbyRef.current.value;
    console.log("hobbyName:  " + hobbyName);
    if (user.hobbies.length > 5) {
      setHobbyMsg("limit exceeded");
    } else if (user.hobbies.includes(hobbyName)) {
      setHobbyMsg("already listed");
    } else if (hobbyName.length < 2) {
      setHobbyMsg("a d**k of `{$hobbyName.length}` is too tiny");
    } else {
      hobbyRef.current.value = "";
      //addHobby(hobbyName);
      setTheUser({ hobbies: [...user.hobbies, hobbyName] });
    }
  }

  function enlist_interest(e) {
    e.preventDefault();
    let interestName = interestRef.current.value;

    if (user.interests.length > 5) {
      setInterestMsg("Exceeded the limit");
    } else if (user.interests.includes(interestName)) {
      setInterestMsg("already listed");
    } else if (interestName.length < 2) {
      setInterestMsg("ur  is surprisingly tiny");
    } else {
      interestRef.current.value = "";
      setTheUser({ interests: [...user.interests, interestName] });
    }
  }
}
