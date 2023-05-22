import React from "react";
import { GrClose } from "react-icons/gr";

//
export default function List({ items, removeSkill }) {
  return (
    <div className="d-flex flex-wrap gap-1 mt-2">
      {items &&
        items.map((item) => {
          return (
            <span
              style={{ height: "19px", fontSize: "13px" }}
              key={item}
              className="pb-0 pt-0 bg-success bg-opacity-25 rounded px-1"
            >
              {item}
              <GrClose
                size={12}
                className="ms-1"
                onClick={() => {
                  console.log("remv itm:::: ");
                  removeSkill(item);
                }}
              />
            </span>
          );
        })}
    </div>
  );
}
