import React from "react";
import { TravelMonthScore } from "../../../components/TravelMonthScore";
import styles from "./DetailsScore.module.css";

export const DetailScores = ({ scores, travelMonths, visitorIndexes, peakSeasons }) => {
  return (
    <>
      <div className='text-white'>
        <div className='my-3'>
        {travelMonths && (<><h6 style={{fontSize: '10px'}}>Months Ratings</h6>
          <TravelMonthScore
            className={styles.monthsScroll}
            travelMonths={travelMonths}
            showMatches={false}
          /></>)}
        </div>
      </div>
    </>
  );
};
