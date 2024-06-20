import React from "react";
import { AttributeScore } from "./AttributeScore";
import { TravelMonthScore } from "../../../components/TravelMonthScore";
import styles from "./DetailsScore.module.css";
import VisitorIndexScore from "./VisitorIndexScore";

export const DetailScores = ({ scores, travelMonths, visitorIndexes, peakSeasons }) => {
  return (
    <>
      <div className='text-white'>
        <div className='my-3'>
          <h6 style={{fontSize: '10px'}}>Months Ratings</h6>
          <TravelMonthScore
            className={styles.monthsScroll}
            travelMonths={travelMonths}
            showMatches={false}
          />
        </div>
        {visitorIndexes && (
          <div className='my-3'>
            <h6 style={{fontSize: '10px'}}>Visitors per month</h6>
            <VisitorIndexScore
              className={styles.visitorScroll}
              visitorIndexes={visitorIndexes}
              peakSeasons={peakSeasons}
            />
          </div>
        )}
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
