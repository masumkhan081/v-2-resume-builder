import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcReading, FcList, FcPlus, fcpdf } from "react-icons/fc";
import { MdPictureAsPdf } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { BsCheckLg, BsFilePdf } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { Row, Col, Button, Container, Stack } from "react-bootstrap";
import Pages from "./partials/Pages";
//
export default function LandingPage() {
  //
  const navigate = useNavigate();
  const btnClasses =
    "bg-success bg-opacity-25 bg-gradient border-1 rounded-pill fst-italic ms-sm-3 mx-auto w-50 border-3 border-end-0 border-top-0 border-bottom-0 border-start border-success shadow-sm btn btn-sm text-dark fw-bold";
  //
  return (
    <Container>
      <Row className="py-4">
        <Col xs={12} lg="5">
          <Stack gap={3}>
            <div className="fs-1">
              <span style={{ fontFamily: "Roboto", color: "teal" }}>
                ░B░u░i░l░d░ ░R░e░s░u░m░e░
              </span>
              <br />
              <span
                style={{ backgroundColor: "#008080" }}
                className=" text-light h2 rounded-3 me-1 px-3 mx-sm-0 mx-auto"
              >
                <span
                  style={{ backgroundColor: "#008080" }}
                  className="rounded-3 me-1 text-warning display-3"
                >
                  +
                </span>
                GET IT IN PDF
              </span>
            </div>
            <Stack className="mt-md-4 mt-2   gap-md-4 gap-2">
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                className={btnClasses}
              >
                <BiDetail size={22} className="mb-1 mx-1 text-success" /> Create
                One
              </Button>
              <Button
                onClick={() => {
                  navigate("resume");
                }}
                className={btnClasses}
              >
                <IoIosCreate size={22} className="mb-1 mx-1 text-success" />
                View/Edit Resume
              </Button>
              <Button
                onClick={() => {
                  navigate("resume");
                }}
                className={btnClasses}
              >
                <MdPictureAsPdf size={22} className="mb-1 mx-1 text-success" />
                Export PDF
              </Button>
            </Stack>
          </Stack>
        </Col>
        <Col
          xs={12}
          lg={7}
          md={8}
          className="mt-md-5 mt-4 pt-md-5 pt-sm-2 mx-auto px-3 rounded-3"
        >
          <Pages />
        </Col>
      </Row>
    </Container>
  );
}
