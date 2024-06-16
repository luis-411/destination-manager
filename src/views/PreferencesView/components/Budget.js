import React, {useState, useEffect} from "react";
import { Form, Row, Col } from "react-bootstrap";
import { debounce } from "lodash";
import "../../../styles/App.css";
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";
import styles from "./SlideRange.module.css";

const Budget = () => {
  const { userData, setUserData } = useTravelRecommenderStore();
  const [value, setValue] = useState(userData.Budget);

  useEffect(() => {
    debounce(() => setUserData({ ...userData, Budget: value }), 100);
  }, [value]);

  return (
    <Form>
      <p style={{ textAlign: "left" }}>Budget</p>
      <Row>
        <Col>
          <p style={{ opacity: "0.7", fontSize: "0.625rem", textAlign: 'start' }}>Low</p>
        </Col>
        <Col>
          <p style={{ opacity: "0.7", fontSize: "0.625rem" }}>Medium</p>
        </Col>
        <Col>
          <p style={{ opacity: "0.7", fontSize: "0.625rem", textAlign: 'end' }}>High</p>
        </Col>
      </Row>
      <Row>
        <input
          style={{
            padding: "0px",
            margin: "0px",
            '--slider-color': '255, 255, 255',
            '--slider-progress': `${value}%`,
          }}
          min={0}
          max={100}
          step={1}
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
