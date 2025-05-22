import React, { useState, useEffect } from "react";
import "../../styles/App.css";
import { useAuthContextSupabase } from "../../context/AuthContextSupabase";
import Lists from "../Personalnformation/Lists";
import ListCard from "../Personalnformation/ListCard";
import AddListView from "./components/AddListView";
import AddVisitView from "./components/AddVisitView";
import SelectFeatures from "./components/SelectFeatures";
import useFeatures from "../../api/useFeatures";
import Visits from "../Personalnformation/Visits";
import LogButton from "../GeneralView/LogButton";
import { message } from "antd";
import useListsStore from "../../api/useListsStore";

const Preferences = ({ link }) => {
  const { user } = useAuthContextSupabase();
  const { features } = useFeatures();

  const fetchLists = useListsStore((state) => state.fetchLists);
  const addList = useListsStore((state) => state.addList);
  

  const [showAddList, setShowAddList] = useState(false);
  const [showAddVisit, setShowAddVisit] = useState(false);
  const [listEmoji, setListEmoji] = useState("");
  const [listRegions, setListRegions] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [showLists, setShowLists] = useState(true);

  const handleTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setListDescription(e.target.value);
  };

  const addListSupabase = async () => {
    const currentUserId = user?.id || "default_user_id";
    const newList = {
      title: listTitle,
      description: listDescription,
      emoji: listEmoji,
      regions: listRegions,
      user_id: currentUserId,
    };
    if(newList.title) {
      addList(newList)
      setListTitle("");
      setListDescription("");
      setListEmoji("");
      setListRegions([]);
      setShowAddList(false);
      updateLists();
    }
    else {
      message.error("please add a title");
    }
  }

  const updateLists = async () => {
    try {
      await fetchLists();
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
      <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "0px", paddingRight: "0px", alignItems: "center", marginTop: "20px", gap: "10px" }}>
        <div style={{textAlign: "left", paddingTop: "10px"}}>
          <div style={{ fontWeight: "700", fontSize: "1.1em" }}>DestiRec</div>
          <span style={{fontWeight:"300",fontSize:"0.8rem"}}>Travel Destination Management System</span>
        </div>
        <LogButton/>
      </div>
      <SelectFeatures />
      
      {!user && (
        <div>
          <h4 className="mt-4" style={{ fontWeight: "700",  }}>Sign in to create lists and save your preferences</h4>
        </div>
      )}
      {link && (
        <div>
        <h4 className="mt-4" style={{ fontWeight: "700",  }}>Someone shared a list with you</h4>
        <ListCard link={link} />
        </div>
      )}
      {user && !link && features.addVisit === "leftPanel" && (
        <div className="white-theme my-4 d-flex flex-row gap-2">
        <button className={'add-button'} onClick={() => {setShowAddVisit(!showAddVisit); setShowAddList(false)}}>
          {showAddVisit ? "Close" : "Add new Visit"}
        </button>
        <button className={'add-button'} onClick={() => {setShowAddList(!showAddList); setShowAddVisit(false)}}>
          {showAddList ? "Close" : "Add new List"}
        </button>
      </div>
      )}
      {user && !link && features.addVisit === "popup" && (
        <button className={'btn btn-primary mb-4 mt-2'} onClick={() => {setShowAddList(!showAddList); setShowAddVisit(false)}}>
          {showAddList ? "Close" : "Add new List"}
        </button>
      )}
      {user && showAddVisit && !link && (
        <AddVisitView
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
      {user && !link && (
        <div onClick={() => {setShowLists(!showLists)}} style={{ cursor: "pointer" }}>
        <h4 style={{fontWeight: "600"}}>{showLists ?  "Your Lists ↕️" : "Your Visits ↕️"}</h4>
        </div>
      )}
      {user && !link && showLists && (<Lists />)}
      {user && !link && !showLists && (<Visits />)}
      <p style={{ textAlign: "left", fontSize: "0.8em" }}>(c) Asal Nesar Noubari, Cem Nasit Sarica and Wolfgang Wörndl (Technical University of Munich)</p>
    </div>
  );
};

export default Preferences;
