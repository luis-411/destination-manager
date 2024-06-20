import {ProgressBar} from "react-bootstrap";
import React from "react";
import {shortMonthToNumber} from "../../../helpers/months";
import {capitalize} from "lodash";


const VisitorIndexScore = ({visitorIndexes, className, peakSeasons }) => {
  const sortedVisitorKeys = Object.keys(visitorIndexes)
      .sort((v1, v2) =>
        shortMonthToNumber(v1) - shortMonthToNumber(v2));
  const sortedValues = sortedVisitorKeys.map((key) => visitorIndexes[key])

  return (
    <>
      <ProgressBar className={`justify-content-center ${className}`}>
        {sortedValues.map((entry, index) => {
          const indicateMonth = peakSeasons.includes(sortedVisitorKeys[index]);
          return (
            <div className='d-flex flex-column gap-1' key={index}>
              <p className='m-0 text-center' style={{fontSize: "10px"}}>
                {capitalize(sortedVisitorKeys[index])}
              </p>
              <ProgressBar
                className={'fw-normal'}
                style={{
                  '--bs-progress-border-radius': '0.5rem',
                  borderColor: indicateMonth ? 'red' : 'white',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
                key={index}
                label={
                  <p className='m-0' style={{fontSize: "10px"}}>
                    {entry}
                  </p>
                }
              />
            </div>
          )
        })}
      </ProgressBar>
    </>
  );
};

export default VisitorIndexScore;