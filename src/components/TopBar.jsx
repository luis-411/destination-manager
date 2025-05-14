//import React from "react";
//import PropTypes from "prop-types";
import "./TopBar.css";
import TravelMonths from "../views/PreferencesView/components/TravelMonths";

const TopBar = ({ leftColumnOpen, rightColumnOpen, leftColumnSizes, rightColumnSizes }) => {
  const leftWidth = leftColumnOpen ? `${leftColumnSizes.xl / 12 * 100}%` : "0";
  const rightWidth = rightColumnOpen ? `${rightColumnSizes.xl / 12 * 100}%` : "0";

  return (
    <div
      className="top-bar"
      style={{
        position: "absolute",
        left: leftWidth,
        right: rightWidth,
        height: "50px", // Fixed height for the TopBar
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
        <TravelMonths />
      </div>
    </div>
  );
};

// TopBar.propTypes = {
//   leftColumnOpen: PropTypes.bool.isRequired,
//   rightColumnOpen: PropTypes.bool.isRequired,
//   leftColumnSizes: PropTypes.object.isRequired,
//   rightColumnSizes: PropTypes.object.isRequired,
// };

export default TopBar;