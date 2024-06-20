import React, { useState, useCallback } from "react";
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";
import { debounce } from "lodash";
import styles from "./SlideRange.module.css";
import { hexToRgbA } from "../../../helpers/hexToRgba";
const SlideRange = ({ attrName,sliderColor }) => {
  const { userData, setUserData } = useTravelRecommenderStore();
  const [sliderProgress,setSliderProgress] = useState (50);
  const [value, setValue] = useState(userData.Attributes[attrName].score);
 
  const onChange = (value) => {
    setUserData({
      ...userData,
      Attributes: {
        ...userData.Attributes,
        [attrName]: {
          ...userData.Attributes[attrName],
          score: value,
        },
      },
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeDebounced = useCallback(debounce(onChange, 500), [userData]);
  return (
    <form style={{ width: "100%", display: "flex" }}>
      <input
        id={`slider-${attrName}`}
        className={styles.slideRange}
        style={{
          '--slider-color': hexToRgbA(sliderColor),
          '--slider-progress':`${sliderProgress}%`
        }}
        type="range"
        step={25}
        value={value}
        onChange={(e) => {
          setSliderProgress(e.target.valueAsNumber);
          setValue(e.target.valueAsNumber);
          onChangeDebounced(e.target.valueAsNumber);
        }}
      ></input>
    </form>
  );
};

export default SlideRange;
