import React, { useMemo } from "react";
import * as myConstant from "../../../data/constantData";
import { Row, Col, } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger, faTree, faLandmark, faPersonHiking, faPersonSkiing, faUmbrellaBeach, faToriiGate, faFilm, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";

const icons = [faTree, faLandmark, faPersonHiking, faPersonSkiing, faUmbrellaBeach, faToriiGate, faBurger, faFilm, faBagShopping]

export const PresetTypesContainer = () => {
    const { userData, setUserData } = useTravelRecommenderStore();

    const presetTypesRows = useMemo(() => {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            let cols = [];
            for (let j = 0; j < 3; j++) {
                cols.push(
                    <div  key={`preset-col-${i * 3 + j}`}>
                        <div
                            className="preset-badge"
                            id={`preset-${i * 3 + j}`}
                            key={`${i * 3 + j} - ${userData.PresetType}`}
                            onClick={() => {
                                const index = userData.PresetType.indexOf(Object.keys(userData.Attributes)[i * 3 + j]);
                                if (index !== -1) {
                                    setUserData({
                                        ...userData,
                                        PresetType: userData.PresetType.slice(0, index).concat(userData.PresetType.slice(index + 1)),
                                    });
                                } else {
                                    setUserData({
                                        ...userData,
                                        PresetType: userData.PresetType.concat([Object.keys(userData.Attributes)[i * 3 + j]]),
                                    });
                                }
                            }}
                        >
                            <div
                                className='d-flex align-items-center justify-content-center'
                            >
                                <FontAwesomeIcon
                                    style={{
                                        padding: "3px",
                                        marginRight: "0.1rem",
                                        color: userData.PresetType.includes(Object.keys(userData.Attributes)[i * 3 + j]) ? myConstant.COLORS[i * 3 + j] : undefined
                                    }}
                                    icon={icons[i * 3 + j]}
                                />
                                <span
                                    style={{
                                        padding: "3px",
                                        fontSize: "10px",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap"
                                    }}>
                                    {Object.keys(userData.Attributes)[i * 3 + j]}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            }
            rows.push(
                <>
                    {cols}
                </>
            );
        }
        return <div style={{ display: "grid", gridAutoFlow: "column", columnGap: "0.5rem", gridTemplateColumns: "1fr 1fr 1fr" }}>{rows}</div>;//                    key={`preset-row-${i * 3}`}>

    }, [userData, setUserData]);


    return (
        <div>
            <p style={{ textAlign: "start", fontSize: "small" }}>
                Choose the topics that interest you the most:
            </p>
            <div >
                {presetTypesRows}
            </div>
        </div>
    );
};
