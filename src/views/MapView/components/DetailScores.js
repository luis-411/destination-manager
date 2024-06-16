import React from "react";
import { AttributeScore } from "./AttributeScore";
import { TravelMonthScore } from "../../SharedComponents/TravelMonthScore";

export const DetailScores = ({ scores, travelMonths, visitorIndexes }) => {
  return (
    <>
      <div className='text-white'>
        <div className='my-3'>
          <h6 style={{ fontSize: '10px' }}>Months Ratings</h6>
          <TravelMonthScore
            travelMonths={travelMonths}
            showMatches={false}
            visitorIndexes={visitorIndexes}
          />
        </div>
        <div>
          <h6 style={{fontSize: '10px'}}>Attribute Scores</h6>
            {scores.map((entry, index) => (
              <AttributeScore score={entry} index={index} key={index}/>
            ))}
        </div>
      </div>
    </>
  );
};
