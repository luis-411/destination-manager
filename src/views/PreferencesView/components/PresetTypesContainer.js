import React from "react";
import * as myConstant from "../../../data/constantData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger, faTree, faLandmark, faPersonHiking, faPersonSkiing, faUmbrellaBeach, faToriiGate, faFilm, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";

const icons = [faTree, faLandmark, faPersonHiking, faPersonSkiing, faUmbrellaBeach, faToriiGate, faBurger, faFilm, faBagShopping]

export const PresetTypesContainer = () => {
    const { userData, setUserData } = useTravelRecommenderStore();
    const indexes = Array.from({ length: 9 }).fill(0).map((_, idx) => idx);

    const applyPreset = (idx) => {
      const index = userData.PresetType.indexOf(Object.keys(userData.Attributes)[idx]);
      if (index !== -1) {
        setUserData({
          ...userData,
          PresetType: userData.PresetType.slice(0, index).concat(userData.PresetType.slice(index + 1)),
        });
      } else {
        setUserData({
          ...userData,
          PresetType: userData.PresetType.concat([Object.keys(userData.Attributes)[idx]]),
        });
      }
    };

    return (
        <div>
            <p style={{ textAlign: "start", fontSize: "small" }}>
                Choose the topics that interest you the most:
            </p>
            <div >
              <div style={{ display: "grid", columnGap: "0.5rem", gridTemplateColumns: "1fr 1fr 1fr" }}>
                { indexes.map(idx => (
                    <div
                        className="preset-badge"
                        id={`preset-${idx}`}
                        key={idx}
                        onClick={() => applyPreset(idx)}
                    >
                        <div
                            className='d-flex align-items-center justify-content-center'
                        >
                            <FontAwesomeIcon
                                style={{
                                    padding: "3px",
                                    marginRight: "0.1rem",
                                    color: userData.PresetType.includes(Object.keys(userData.Attributes)[idx]) ? myConstant.COLORS[idx] : undefined
                                }}
                                icon={icons[idx]}
                            />
                            <span
                                style={{
                                    padding: "3px",
                                    fontSize: "10px",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap"
                                }}>
                                {Object.keys(userData.Attributes)[idx]}
                            </span>
                        </div>
                    </div>
                )) }
              </div>
            </div>
        </div>
    );
};
