import React, { useState } from "react";
import "../../styles/App.css";
import { CustomizationContainer } from "./components/CustomizationContainer";
import { PresetTypesContainer } from "./components/PresetTypesContainer";
import { Tabs, Tab } from "react-bootstrap";
import TravelMonths from "./components/TravelMonths";
import useTravelRecommenderStore from "../../store/travelRecommenderStore";
import RangedPreference from "../../components/RangedPreference";

const Preferences = () => {
  const { userData, setUserData } = useTravelRecommenderStore();
  const [key, setKey] = useState('advanced');

  return (
    <div style={{ height: "100%", overflowY: "auto", overflowX: "hidden", padding: "1rem" }}>
      <div style={{textAlign: "left", paddingTop: "10px"}}>
      <div style={{ fontWeight: "700", fontSize: "1.1em" }}>DestiRec</div>
      <span style={{fontWeight:"300",fontSize:"0.8rem"}}>Travel Destination Recommender System</span>
      </div>
      <div className='mb-4'>
        <RangedPreference
          userDataKey='Budget'
          checkKey='isPriceImportant'
          title='Budget'
          checkLabel='Filter out the destinations over the  budget'
          checkTooltipText='If you select the checkbox the over-budget destinations will be
          filtered out. if it is not selected, price would have an impact on the
          recommendations just like any other attribute'
          step={50}
        />
      </div>
      <div className='mb-4'>
        <RangedPreference
          userDataKey='VisitorIndex.score'
          title='Region Popularity'
          stepsText={['High', 'Medium', 'Low']}
        />
      </div>
      <div className='mb-4'>
        <TravelMonths />
      </div>
      <div className='mb-4'>
        <Tabs
          activeKey={key}
          id="mode"
          onSelect={(k) => { setKey(k); setUserData({ ...userData, PresetType: [] }); }}
          className="mb-3"
          style={{display:"grid",columnGap:"1rem",gridAutoFlow:"column"}}
        >
          <Tab eventKey="novice" title="Presets (Novice)">
            <PresetTypesContainer />
          </Tab>
          <Tab eventKey="advanced" title="Advanced Preferences">
            <CustomizationContainer />
          </Tab>
        </Tabs>
      </div>
      <p style={{ textAlign: "left", fontSize: "0.8em" }}>(c) Asal Nesar Noubari, Cem Nasit Sarica and Wolfgang Wörndl (Technical University of Munich)</p>
    </div>
  );
};

export default Preferences;
