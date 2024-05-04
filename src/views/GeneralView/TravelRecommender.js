import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import { Row, Col } from "react-bootstrap";
import Map from "../MapView/Map";
import Preferences from "../PreferencesView/Preferences";
import { Results } from "../ResultsView/Results";
import { Tooltip } from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from "@auth0/auth0-react";
import LogButton from "./LogButton";
import MyProfile from "./MyProfile"
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const TravelRecommender = () => {
  const [activeResult, setActiveResult] = useState(0);
  const [leftColumnOpen, setLeftColumnOpen] = useState(true);
  const [rightColumnOpen, setRightColumnOpen] = useState(true);
  const {isLoading, user ,loginWithRedirect, isAuthenticated } = useAuth0();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { logout } = useAuth0();
  return (
    <div className="App">
      <Row style={{ height: "100%" }}>
        {leftColumnOpen && (
          <Col style={{ height: "100%", paddingRight: 0 }}>
            <Preferences />
          </Col>
        )}
        <Col xs={6 + (leftColumnOpen ? 0 : 3) + (rightColumnOpen ? 0 : 3)} style={{ height: "100%", padding: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "10px 1fr 10px", height: "100%" }}>
            <div className="expand-bar" onClick={() => setLeftColumnOpen(oldState => !oldState)}>
              <FontAwesomeIcon icon={leftColumnOpen ? faAngleLeft : faAngleRight} />
            </div>
            <Map key={`map-${leftColumnOpen}-${rightColumnOpen}`} setActiveResult={setActiveResult} />
            <div className="expand-bar" onClick={() => setRightColumnOpen(oldState => !oldState)}>
              <FontAwesomeIcon icon={rightColumnOpen ? faAngleRight : faAngleLeft} />
            </div>
          </div>
        </Col>
        {rightColumnOpen && (
          <Col style={{ height: "100%" }}>
            <div>
            <LogButton isLoading={isLoading}
             loginWithRedirect={loginWithRedirect}
             isAuthenticated={isAuthenticated}
             logout={logout}
             setIsPopupOpen={setIsPopupOpen}
             />
             <MyProfile isOpen={isPopupOpen}/>
            <Results user={user} isAuthenticated={isAuthenticated} activeResult={activeResult} />
            </div>
          </Col>
        )}
      </Row>
      <Tooltip id="prio-switch-tooltip" style={{ width: "300px", zIndex: 99999 }} />
      <Tooltip id="additional-info-tooltip" style={{ width: "300px", zIndex: 99999 }} place="bottom" />
      <Tooltip id="barchart-tooltip" style={{ width: "300px", zIndex: 99999 }} place="bottom" />

    </div>
  );
};

export default TravelRecommender;
