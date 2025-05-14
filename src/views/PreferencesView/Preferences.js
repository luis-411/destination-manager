import React, { useState, useEffect } from "react";
import "../../styles/App.css";
import { CustomizationContainer } from "./components/CustomizationContainer";
import { PresetTypesContainer } from "./components/PresetTypesContainer";
import { Tabs, Tab } from "react-bootstrap";
import TravelMonths from "./components/TravelMonths";
import useTravelRecommenderStore from "../../store/travelRecommenderStore";
import RangedPreference from "../../components/RangedPreference";
import Card from "react-bootstrap/Card";
import useLists from "../../api/useLists";
import RegionsSelect from "../../components/RegionsSelect";
import CustomEmojiPicker from "../../components/CustomEmojiPicker";
import { useAuthContextSupabase } from "../../context/AuthContextSupabase";
import Lists from "../Personalnformation/Lists";
import ListCard from "../Personalnformation/ListCard";
import AddListView from "./components/AddListView";
import AddVisitView from "./components/AddVisitView";

const Preferences = ({ link }) => {
  //const { userData, setUserData } = useTravelRecommenderStore();
  const { user } = useAuthContextSupabase();
  const { fetchLists } = useLists();
  const [key, setKey] = useState('advanced');
  const [showAddList, setShowAddList] = useState(false);
  const [showAddVisit, setShowAddVisit] = useState(false);
  const { addList } = useLists();
  const [listEmoji, setListEmoji] = useState("");
  const [listRegions, setListRegions] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");

  const handleTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setListDescription(e.target.value);
  };

  const addListSupabase = async () => {
    //TODO: Error handling
    const currentUserId = user?.id || "default_user_id";
    const newList = {
      title: listTitle,
      description: listDescription,
      emoji: listEmoji,
      regions: listRegions,
      user_id: currentUserId,
    };
    addList(newList)
    setListTitle("");
    setListDescription("");
    setListEmoji("");
    setListRegions([]);
    setShowAddList(false);
    updateLists();
  }

  const updateLists = async () => {
    try {
      await fetchLists(); // Assuming `getLists` fetches the updated lists
    } catch (error) {
      console.error("Failed to update lists:", error);
    }
  };

  useEffect(() => {
    if (user) {
      updateLists();
    }
  }, [user]);

  return (
    <div style={{ height: "100%", overflowY: "auto", overflowX: "hidden", padding: "1rem" }}>
      <div style={{textAlign: "left", paddingTop: "10px"}}>
      <div style={{ fontWeight: "700", fontSize: "1.1em" }}>DestiRec</div>
      <span style={{fontWeight:"300",fontSize:"0.8rem"}}>Travel Destination Management System</span>
      </div>
      {/* <div className='mb-4'>
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
      <div className='mb-4 mt-4'>
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
      </div>*/}
      {!user && (
        <div>
          <h4 className="mt-4" style={{ fontWeight: "700",  }}>Login to create lists and save your preferences</h4>
        </div>
      )}
      {link && (
        <div>
        <h4 className="mt-4" style={{ fontWeight: "700",  }}>Someone shared a list with you</h4>
        <ListCard link={link} />
        </div>
      )}
      {user && !link && (
        <div className="white-theme my-4 d-flex flex-row gap-2">
        <button className={'add-button'} onClick={() => {setShowAddVisit(!showAddVisit); setShowAddList(false)}}>
          {showAddVisit ? "Close" : "Add new Visit"}
        </button>
        <button className={'add-button'} onClick={() => {setShowAddList(!showAddList); setShowAddVisit(false)}}>
          {showAddList ? "Close" : "Add new List"}
        </button>
      </div>
      )}
      {user && showAddVisit && !link && (
        <AddVisitView
          listEmoji={listEmoji}
          setListEmoji={setListEmoji}
          listRegions={listRegions}
          setListRegions={setListRegions}
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          addListSupabase={addListSupabase}
        />
      )}
      {user && showAddList && !link && (
        <AddListView
          listEmoji={listEmoji}
          setListEmoji={setListEmoji}
          listRegions={listRegions}
          setListRegions={setListRegions}
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          addListSupabase={addListSupabase}
        />
      )}
      {user && !link && (<Lists />)}
      <p style={{ textAlign: "left", fontSize: "0.8em" }}>(c) Asal Nesar Noubari, Cem Nasit Sarica and Wolfgang Wörndl (Technical University of Munich)</p>
    </div>
  );
};

export default Preferences;
