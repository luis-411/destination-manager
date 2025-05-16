import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/App.css";
import { Row, Col } from "react-bootstrap";
import Map from "../MapView/Map";
import Preferences from "../PreferencesView/Preferences";
import { RightSidebar } from "../ResultsView/RightSidebar";
import { Tooltip } from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import PersonalInformation from "../Personalnformation/PersonalInformation";
import AppModal from "../../components/AppModal";
import {useAuthContext} from "../../context/AuthContext";
import ThemePopup from "../ThemeView/ThemePopup";
import { useParams } from "react-router-dom";
import useRightColumnOpen from "./services/useRightColumnOpen";
import TopBar from "../../components/TopBar";
import { FeaturesProvider } from "../../api/useFeatures";
import RegionDataView from "../MapView/components/RegionDataView";

const TravelRecommender = () => {
  const [activeResult, setActiveResult] = useState(0);
  const [leftColumnOpen, setLeftColumnOpen] = useState(true);
  const { rightColumnOpen, setRightColumnOpen } = useRightColumnOpen();
  //const [rightColumnOpen, setRightColumnOpen] = useState(false);
  const { user } = useAuthContext();
  const { link } = useParams();

  /**
   *
   * @type {{xl: number, xs: number, lg: number}}
   */
  const leftColumnSizes = {
    xs: 12,
    lg: 4,
    xl: 3,
  };

  /**
   *
   * @type {{xl: number, xs: number, lg: number}}
   */
  const rightColumnSizes = {
    xs: 12,
    lg: 4,
    xl: 3,
  };

  const calculateMiddleSize = (size) =>
    (12 - leftColumnSizes[size] - rightColumnSizes[size]) +
    (leftColumnOpen ? 0 : leftColumnSizes[size]) +
    (rightColumnOpen ? 0 : rightColumnSizes[size]);

  /**
   *
   * @type {{xl: number, xs: number, lg: number}}
   */
  const middleColumnSizes = {
    xs: calculateMiddleSize('xs'),
    lg: calculateMiddleSize('lg'),
    xl: calculateMiddleSize('xl'),
  };

  return (
    <FeaturesProvider>
    <div className="App">
      <TopBar
        leftColumnOpen={leftColumnOpen}
        rightColumnOpen={rightColumnOpen}
        leftColumnSizes={leftColumnSizes}
        rightColumnSizes={rightColumnSizes}
      />
      <Row style={{ height: "100%" }}> {/* Adjust height to account for TopBar */}
        {leftColumnOpen && (
          <Col
            style={{ height: "100%" }}
            {...leftColumnSizes}
          >
            <Preferences link={link} />
          </Col>
        )}
        <Col
          style={{ height: "100%", padding: 0 }}
          {...middleColumnSizes}
        >
          <div style={{ display: "grid", gridTemplateColumns: "10px 1fr 10px", height: "100%" }}>
            <div className="expand-bar" onClick={() => setLeftColumnOpen(oldState => !oldState)}>
              <FontAwesomeIcon icon={leftColumnOpen ? faAngleLeft : faAngleRight} />
            </div>
            <Map key={`map-${leftColumnOpen}-${rightColumnOpen}`} setActiveResult={setActiveResult} />
            <div className="expand-bar" onClick={() => setRightColumnOpen(!rightColumnOpen)}>
              <FontAwesomeIcon icon={rightColumnOpen ? faAngleRight : faAngleLeft} />
            </div>
          </div>
        </Col>
        {rightColumnOpen && (
          <Col
            className='right-column'
            {...rightColumnSizes}
          >
            <RightSidebar activeResult={activeResult} />
          </Col>
        )}
      </Row>
      <Tooltip id="prio-switch-tooltip" style={{ width: "300px", zIndex: 99999 }} />
      <Tooltip id="additional-info-tooltip" style={{ width: "300px", zIndex: 99999 }} place="bottom" />
      <Tooltip id="barchart-tooltip" style={{ width: "300px", zIndex: 99999 }} place="bottom" />
      {/* {user?.id && <PersonalInformation/>} */}
      <ThemePopup/>
      <AppModal />
    </div>
      </FeaturesProvider>
  );
};

export default TravelRecommender;
