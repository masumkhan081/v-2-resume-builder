import { Badge, Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiListPlus } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { GiOfficeChair } from "react-icons/gi";
import { MdDeveloperMode } from "react-icons/md";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { FaUniversity } from "react-icons/fa";
import angry from "../images/angry.jpg";
//

export function ToastMessage({ toast, setToast }) {
  return (
    <small className="mt-1 rounded-3 mb-1 d-block text-end">
      {toast}
      <Image src={angry} style={{ height: "25px", width: "28px" }}></Image>
      <GrClose
        className="mx-1"
        size={16}
        onClick={() => {
          setToast("");
        }}
      />
    </small>
  );
}

export function NextPrevious({
  busy,
  error,
  prev,
  next,
  nextText,
  saveAndNext,
  setTestData,
}) {
  const navigate = useNavigate();

  return (
    <div className="px-4 container-fluid mb-3 d-flex justify-content-between ">
      <div className="d-flex justify-content-between gap-4">
        {prev && (
          <Button
            disabled={busy}
            onClick={() => navigate(prev)}
            className="btn btn-sm border-0 py-0 px-1 bg-success bg-opacity-25 text-dark fw-bold rounded-3"
          >
            <BsArrowLeftCircle size={15} className="mb-1 me-1" />
            Prev
          </Button>
        )}
        <Dummy setData={() => setTestData("whatev")} btnText="Test Data" />
        <Dummy setData={() => setTestData("reset")} btnText="Reset" />
      </div>
      {error && <span className="fw-bold">{error}</span>}
      <div className="d-flex gap-3">
        {saveAndNext && (
          <Button
            disabled={busy}
            onClick={saveAndNext}
            className="btn btn-sm border-0 py-0 px-1 bg-success bg-opacity-25 text-dark fw-bold rounded-3"
          >
            {nextText}
          </Button>
        )}
        {next && (
          <Button
            disabled={busy}
            onClick={() => navigate(next)}
            className="btn btn-sm border-0 py-0 px-1 bg-success bg-opacity-25 text-dark fw-bold rounded-3"
          >
            Next <BsArrowRightCircle size={15} className="mb-1" />
          </Button>
        )}
      </div>
    </div>
  );
}

function Dummy({ setData, btnText }) {
  return (
    <Button
      style={{
        height: "25px",
        fontSize: "13px",
        // backgroundColor: "DarkSlateGray",
      }}
      className="border-0 py-0 my-0 btn rounded-3 bg-success bg-opacity-25  text-black-50"
      onClick={setData}
    >
      {btnText}
    </Button>
  );
}

export function PanelAbout({ title, about }) {
  return (
    <div>
      <Badge
        text="dark"
        className="text-center bg-success bg-opacity-10 d-block py-0 "
      >
        {about == "projects" && (
          <MdDeveloperMode size={18} className=" me-1 mb-1" />
        )}
        {about == "hobbies" && <BiListPlus size={21} className=" me-1 mb-0" />}
        {about == "education" && (
          <FaUniversity size={19} className=" mb-1 me-1" />
        )}
        {about == "experience" && (
          <GiOfficeChair size={18} className=" mb-1 me-1" />
        )}

        {title}
      </Badge>
    </div>
  );
}

export function EnhancedTitle({ title, msg, type }) {
  return (
    <Badge className="d-block rounded-3 py-0 ps-0 bg-success bg-opacity-10 text-dark text-start">
      {/* {type === "front" ? (
          <FcDataSheet size={18} className="me-1 rounded-3" />
        ) : type === "back" ? (
          <AiFillApi size={18} className="me-1 rounded-3" />
        ) : type === "database" ? (
          <AiFillDatabase size={15} className="me-1 rounded-3" />
        ) : null} */}

      {title}
      <Badge className="ms-1 bg-success bg-opacity-25 text-dark rounded-pill">
        {msg}
      </Badge>
    </Badge>
  );
}
export function TextInput({ inputRef, plcHolder }) {
  return (
    <Form.Group className="mt-1  ">
      <Form.Control
        style={{ height: "27px" }}
        type="text"
        className="text-center rounded-pill bg-light bg-opacity-50 border-0 border-bottom border-success text-lowercase w-50 "
        placeholder={plcHolder}
        ref={inputRef}
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Press enter to enlist"
      />
    </Form.Group>
  );
}
