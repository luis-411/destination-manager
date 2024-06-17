import React from "react";
import {Col, Row} from "react-bootstrap";
import "../../../styles/App.css";
import SlideRange from "./SlideRange";
import PrioritySwitch from "./PrioritySwitch";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const Attribute = ({ attrName, sliderColor }) => {
  const breakpoints = useBreakpoint();
  const isXl = !!breakpoints.xl && !breakpoints.xxl;

  return (
    <Row>
      <Col>
        <PrioritySwitch attrName={attrName} />
      </Col>
      <Col xs={3} md={4} xl={3} className='d-flex align-items-center'>
        <h6 className='fw-normal m-0' style={{ fontSize: isXl ? '0.6rem' : '0.7rem' }}>{attrName}</h6>
      </Col>
      <Col xs={8} md={7} xl={8} className={`d-flex align-items-center ${isXl ? 'ps-1' : ''}`}>
        <SlideRange sliderColor={sliderColor} attrName={attrName} />
      </Col>
    </Row>
  );
};

export default Attribute;
