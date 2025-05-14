import React, { useMemo, useCallback } from "react";
import { ToggleButton, Button } from "react-bootstrap";
import "../../../styles/App.css";
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";
import styles from "../Preferences.module.css";
import RangedPreference from "../../../components/RangedPreference";

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

  const monthButtons = useMemo(() => {
    return months.map((month, index) => (
      <ToggleButton
        key={index}
        id={`radio-${index}`}
        type="checkbox"
        className={styles.toggle}
        variant="outline-primary"
        checked={userData.Months[index] === 100}
        onChange={() => handleMonthChange(index)}
        value={month}
      >
        <span>{month}</span>
      </ToggleButton>
    ));
  }, [userData.Months, handleMonthChange]);

  return (
    <div>
      {/* <p style={{ textAlign: "left", justifyContent: "center", margin: 0 }}>
        Preferred Travel Months
      </p> */}
      {/* <div className='d-flex justify-content-between mb-3'>
        <RangedPreference
          checkKey='isPeakSeasonImportant'
          checkLabel='Allow peak season impact'
          checkTooltipText='If selected, peak season months will negatively impacted by
           the final total score for the region'
          step={50}
        />
        <Button variant="secondary" size="sm" style={{ fontSize: '0.625rem' }} onClick={() => {
          setUserData({
            ...userData,
            Months: userData.Months[0] ? Array(12).fill(0) : Array(12).fill(100),
          });
        }}>
          Select/Unselect All
        </Button>
      </div> */}
      <div className="gap-2" style={{ overflowX: "auto", maxWidth: "100%", display: "flex", flexDirection: "row", paddingLeft: 10, paddingRight: 10, }}>
        {monthButtons}
      </div>
    </div>
  );
};

export default TravelMonths;
