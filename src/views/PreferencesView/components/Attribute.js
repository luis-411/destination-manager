import React from "react";
import {Col, Row} from "react-bootstrap";
import "../../../styles/App.css";
import SlideRange from "./SlideRange";
import PrioritySwitch from "./PrioritySwitch";

const Attribute = ({ attrName, sliderColor }) => {
  return (
    <Row>
      <Col>
        <PrioritySwitch attrName={attrName} />
      </Col>
      <Col xs={4} className='d-flex align-items-center'>
        <h6 className='fw-normal m-0' style={{ fontSize: '0.875rem' }}>{attrName}</h6>
      </Col>
      <Col xs={7} className='d-flex align-items-center'>
        <SlideRange sliderColor={sliderColor} attrName={attrName} />
      </Col>
    </Row>
  );
};

export default Attribute;
