import React from "react";
import { TbLayoutList } from "react-icons/tb";
import { Badge, Stack } from "react-bootstrap";
//
export default function UsedTools() {
  const toolClasses =
    "py-0 badge  bg-success bg-opacity-25 rounded-pill text-dark border-0 border-end border-warning";
  return (
    <Stack className="d-flex flex-row flex-wrap justify-content-start gap-1 ">
      <Badge className="py-0 badge bg-dark bg-opacity-100  rounded-3 text-warning fw-bold">
        Tools Used:
        <TbLayoutList size={12} className="ms-1 text-light" />
      </Badge>
      <Badge className={toolClasses}>Firebase auth & FireStore cloud</Badge>
      <Badge className={toolClasses}>React Router</Badge>
      <Badge className={toolClasses}>React-pdf</Badge>
      <Badge className={toolClasses}>React-bootstrap</Badge>
      <Badge className={toolClasses}>React-icons</Badge>
      <Badge className={toolClasses}>
        Context, Hooks, Component composition
      </Badge>
    </Stack>
  );
}
