import React from "react";
import { Form } from "react-bootstrap";
import "../../../styles/App.css";
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";
import {get, set} from "lodash";

const AdditionalInfo = ({ checkKey, tooltipText, checkLabel }) => {
  const { userData, setUserData } = useTravelRecommenderStore();
  return (
    <div
      data-tooltip-id="additional-info-tooltip"
      data-tooltip-content={tooltipText}
    >
      <Form className="filter">
        <Form.Check
          className="filter d-flex gap-2"
          type="checkbox"
          id="custom-switch"
          value={get(userData, checkKey)}
          label={checkLabel}
          style={{ fontSize: '0.8rem' }}
          onChange={(e) => {
            const newUserData = set(userData, checkKey, e.target.checked);
            setUserData({...newUserData});
          }}
        ></Form.Check>
      </Form>
    </div>
  );
};

export default AdditionalInfo;
