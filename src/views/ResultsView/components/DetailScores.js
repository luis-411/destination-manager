import React from "react";
import { AttributeScore } from "./AttributeScore";
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";

export const DetailScores = ({ scores }) => {
  const { userData } = useTravelRecommenderStore();
  const getUserData = (attrName) => {
    const key = attrName.charAt(0).toUpperCase() + attrName.slice(1);
    return userData.Attributes[key];
  };
  return (
    <div className='d-flex flex-column gap-2'>
      {scores.filter((entry) => getUserData(entry.name).weight !== 0).map((entry, index) => (
        <AttributeScore
          score={entry}
          index={index}
          key={index}
          userPref={getUserData(entry.name).score}
        />
      ))}
    </div>
  );
};
