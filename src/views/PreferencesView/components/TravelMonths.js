import React, { useMemo, useCallback } from "react";
import { ButtonGroup, ToggleButton, Button } from "react-bootstrap";
import "../../../styles/App.css";
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";
import styles from "../Preferences.module.css";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
  "November", "December"];

const TravelMonths = () => {
  const { userData, setUserData } = useTravelRecommenderStore();

  const handleMonthChange = useCallback((index) => {
    let newMonths = [...userData.Months];
    newMonths[index] = newMonths[index] === 100 ? 0 : 100;
    setUserData({
      ...userData,
      Months: newMonths,
    });
  }, [userData, setUserData]);

  const buttonGroups = useMemo(() => {
    let buttonGroups = [];
    for (let i = 0; i < 3; i++) {
      let buttons = [];
      for (let j = 0; j < 4; j++) {
        buttons.push(
          <ToggleButton
            key={`${i * 4 + j} - ${userData.Months[i * 4 + j]}`}
            id={`radio-${i * 4 + j}`}
            type="checkbox"
            className={styles.toggle}
            variant="outline-primary"
            checked={userData.Months[i * 4 + j] === 100}
            onChange={(e) => handleMonthChange(i * 4 + j)}
            value={months[i * 4 + j]}
          >
            <span>{months[i * 4 + j]}</span>
          </ToggleButton>
        );
      }
      buttonGroups.push(
        <ButtonGroup size="sm" className='w-100 gap-2 mb-2' key={`${i * 4}`}>
          {buttons}
        </ButtonGroup>
      );
    }
    return buttonGroups;
  }, [userData.Months, handleMonthChange]);


  return (
    <div>
      <p style={{ textAlign: "left", justifyContent: "center", margin: 0 }}>
        Preferred Travel Months
      </p>
      <div className='d-flex justify-content-end mb-3'>
        <Button variant="secondary" size="sm" style={{ fontSize: '0.625rem' }} onClick={() => {
          setUserData({
            ...userData,
            Months: userData.Months[0] ? Array(12).fill(0) : Array(12).fill(100),
          });
        }}>
          Select/Unselect All
        </Button>
      </div>
      {buttonGroups}
    </div>
  );
};

export default TravelMonths;
