import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { debounce } from "lodash";
import "../../../App.css";
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";
import styles from "./SlideRange.module.css";

const Budget = () => {
  const { userData, setUserData } = useTravelRecommenderStore();
  const [value, setValue] = useState(userData.Budget);

  const onChange = (value) => {
    setUserData({ ...userData, Budget: value });
  };

  const onChangeDebounced = debounce(onChange, 500);

  useEffect(() => {
    onChangeDebounced(value);
  }, [value, onChangeDebounced]);

  return (
    <Form>
      <p style={{ textAlign: "left" }}>Budget</p>
      <Row>
        <Col>
          <p style={{ opacity: "0.7", fontSize: "0.8em" }}>Low</p>
        </Col>
        <Col>
          <p style={{ opacity: "0.7", fontSize: "0.8em" }}>Medium</p>
        </Col>
        <Col>
          <p style={{ opacity: "0.7", fontSize: "0.8em" }}>High</p>
        </Col>
      </Row>
      <Row>
        <input
          style={{
            padding: "0 15px",
            '--slider-color': '255, 255, 255',
            '--slider-progress': `${value}%`,
          }}
          min={10}
          max={100}
          step={10}
          type="range"
          value={value}
          className={styles.slideRange}
          onChange={(e) => setValue(e.target.valueAsNumber)}
        />
      </Row>
    </Form>
  );
};

export default Budget;
