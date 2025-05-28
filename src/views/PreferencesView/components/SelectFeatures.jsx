import React, { useState } from "react";
import useFeatures from "../../../api/useFeatures";
import "./SelectFeatures.css";

const SelectFeatures = () => {
  const { features, updateFeature } = useFeatures();
  const [isVisible, setIsVisible] = useState(true);

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    updateFeature(name, value);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {!isVisible && (
        <div style={{ display: "flex", justifyContent: "start", marginLeft: "-10px" }}>
            <button className="btn btn-secondary" onClick={toggleVisibility}>
          Select Features
        </button>   
        </div>
      )}
      {isVisible && (
        <div className="select-features-container mt-4">
          <h4 className="select-features-title">Customize Your Preferences</h4>
          <div className="select-features-group">
            <label className="select-features-label">
              Rating Style:
              <select
                className="select-features-dropdown mt-2"
                name="rating"
                value={features.rating}
                onChange={handleFeatureChange}
              >
                <option value="star">Star Rating</option>
                {/* <option value="emoji">Emoji Rating</option> */}
                <option value="slider">Slider Rating</option>
              </select>
            </label>
          </div>
          {/* <div className="select-features-group">
            <label className="select-features-label">
              Add Visit Style:
              <select
                className="select-features-dropdown mt-2"
                name="addVisit"
                value={features.addVisit}
                onChange={handleFeatureChange}
              >
                <option value="popup">In Country Popup</option>
                <option value="leftPanel">In left Panel</option>
              </select>
            </label>
          </div> */}
          <div className="select-features-group">
            <label className="select-features-label">
              Display Visited Countries:
              <select
                className="select-features-dropdown mt-2"
                name="displayVisit"
                value={features.displayVisit}
                onChange={handleFeatureChange}
              >
                <option value="border">Border around Countries</option>
                <option value="pin">Pin Icon on Countries</option>
                <option value="color">Different Color on Countries</option>
                <option value="none">Not displaying</option>
              </select>
            </label>
          </div>
          <div className="select-features-group">
            <label className="select-features-label">
              Display Selected List:
              <select
                className="select-features-dropdown mt-2"
                name="displaySelectedList"
                value={features.displaySelectedList}
                onChange={handleFeatureChange}
              >
                <option value="color">Color on selected Countries</option>
                <option value="emoji">List Emoji on selected Countries</option>
                <option value="colorAndEmoji">Color and List Emoji on selected Countries</option>
                <option value="border">Colored border on selected Countries</option>
              </select>
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button className="btn btn-secondary" onClick={toggleVisibility}>
            Hide
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectFeatures;
