import React from "react";
import { ProgressBar } from "react-bootstrap";
import useTravelRecommenderStore from "../store/travelRecommenderStore";

const scoreToColor = (score) => {
  if (score < 15) return "red";
  if (score < 40) return "orange";
  if (score < 65) return "yellow";
  if (score < 90) return "lightgreen";
  return "green";
}

const indexToMonth = (index) => {
  switch (index) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return "Jan";
  }
}

export const TravelMonthScore = ({ travelMonths, showMatches, visitorIndexes }) => {
  const { userData } = useTravelRecommenderStore();

  const isSelectedMonth = (index) => showMatches && userData?.Months && userData.Months[index] === 100;

  const progressNode = (index) => {
    const indicateMonth = isSelectedMonth(index);
    return (
      <div className={indicateMonth ? 'fw-bold' : 'fw-normal'}>
        <p className='m-0' style={{fontSize: "10px"}}>
          {indicateMonth && "+"} {indexToMonth(index)}
        </p>
        {visitorIndexes && visitorIndexes[index] &&
          <p className='m-0' style={{fontSize: "8px"}}>Visits: {visitorIndexes[index]}</p>}
      </div>
    );
  };

  return (
    <>
      <ProgressBar>
        {travelMonths.map((entry, index) => (
          <ProgressBar
            style={{
              borderColor: scoreToColor(entry),
              borderWidth: isSelectedMonth(index) ? '2px' : '1px'
            }}
            now={22}
            key={index}
            label={progressNode(index)}
          />
        ))}
      </ProgressBar>
    </>
  );
};
