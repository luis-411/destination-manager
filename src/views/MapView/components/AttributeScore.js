import React from "react";
import { Row, Col } from "react-bootstrap";
import * as myConstant from "../../../data/constantData";
import { BarChart } from "../../../components/BarChart";
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";
import {capitalize} from "lodash";

export const AttributeScore = ({ score, index }) => {
  const userData = useTravelRecommenderStore((state) => state.userData);
  const getUserData = (attrName) => {
    const key = attrName.charAt(0).toUpperCase() + attrName.slice(1);
    return userData.Attributes[key];
  };
  return (
    <Row>
      <Col xs={4}>
        <h6  className='px-2' style={{ fontSize: '10px' }}>{capitalize(score.name)}</h6>
      </Col>
      <Col xs={8} className='d-flex align-items-center'>
        <BarChart
          score={score}
          benchmark={getUserData(score.name).score}
          showBenchmark={userData.PresetType.length === 0}
          color={myConstant.COLORS[index % myConstant.COLORS.length]}
        />
      </Col>
    </Row>
  );
};
