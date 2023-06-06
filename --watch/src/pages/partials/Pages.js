import Carousel from "react-bootstrap/Carousel";
import img1 from "../images/i (1).png";
import img2 from "../images/i (2).png";
import img3 from "../images/i (3).png";
import img4 from "../images/i (4).png";
import img5 from "../images/i (5).png";
import { useState } from "react";

export default function Pages() {
  const [intrvl, setIntrvl] = useState(1200);
  return (
    <Carousel>
      {/*
      <Item imgsrc={img2} title="Page2" brief="......... detail ........." />
      <Item imgsrc={img3} title="Page3" brief="......... detail ........." />
      <Item imgsrc={img4} title="Page4" brief="......... detail ........." />
      <Item imgsrc={img5} title="Page5" brief="......... detail ........." /> */}
      <Carousel.Item
        interval={intrvl}
        onMouseEnter={() => {
          setIntrvl(2500);
        }}
      >
        <img
          className="d-block w-100 rounded-3 shadow-md shadow-success"
          src={img1}
          alt="a project screenshot supoposed to be here"
        />
        <Carousel.Caption>
          <h3 className="text-dark bg-light">Second slide label</h3>
          <p className="text-dark bg-light">{intrvl}.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/*  */}
      <Carousel.Item
        interval={intrvl}
        onMouseEnter={() => {
          setIntrvl(1000);
        }}
      >
        <img className="d-block w-100" src={img2} alt="Second slide" />
        <Carousel.Caption>
          <h3 className="text-dark bg-light">Second slide label</h3>
          <p className="text-dark bg-light">{intrvl}.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/*  */}
      <Carousel.Item interval={intrvl}>
        <img className="d-block w-100" src={img3} alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/*  */}
      {/*  */}
      <Carousel.Item interval={intrvl}>
        <img className="d-block w-100" src={img4} alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/*  */}
      {/*  */}
      <Carousel.Item interval={intrvl}>
        <img className="d-block w-100" src={img5} alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/*  */}
    </Carousel>
  );
}
