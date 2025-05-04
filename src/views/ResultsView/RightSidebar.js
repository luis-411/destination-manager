import React, { useState, useEffect, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import "../../styles/App.css";
import useTravelRecommenderStore from "../../store/travelRecommenderStore";
import ResultItem from "./ResultItem";
import {capitalize} from "lodash";
import LogButton from "../GeneralView/LogButton";
import { useAuthContextSupabase } from "../../context/AuthContextSupabase";
import useSelectedList from "../../api/useSelectedList";
import { CountryPopup } from "../MapView/components/CountryPopup";
import RegionItem from "./RegionItem";
import RegionCard from "./RegionCard";

export const RightSidebar = ({ activeResult}) => {
  const {user} = useAuthContextSupabase();
  const results = useTravelRecommenderStore((state) => state.results);
  const [activeIndex, setActiveIndex] = useState(-1);
  const accordElem = useRef(null);
  const { selectedList } = useSelectedList();
  const listRegions = selectedList.regions;

  // useEffect(() => {
  //   if (results.length > 0) {
  //     if (activeResult === activeIndex) {
  //       setActiveIndex(-1);
  //     } else {
  //       setActiveIndex(activeResult);
  //       accordElem.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //         inline: "start",
  //       });
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activeResult]);
  return (
    <div className='py-2 pe-2 h-100 overflow-y-scroll overflow-x-hidden'>
      <LogButton/>
      {/* <p className={'m-0'} style={{ textAlign: "left" }}>
        Best destinations for {capitalize(user?.username ?? "you")}
      </p> */}
      <div className="d-flex flex-row align-items-center justify-content-center gap-2" style={{ marginTop: 20 }}>
        <h1 style={{fontSize: "2.5rem", fontWeight: "700", }}>{selectedList.emoji}</h1>
        <h1 style={{ fontWeight: "700", fontSize: "2rem",  }}>{selectedList.title}</h1>
      </div>
      {listRegions?.length > 0 ? (
        // <div ref={accordElem}>
        //   <Accordion activeKey={activeIndex}>
        //     {results?.map((item, index) => (
        //       <ResultItem
        //         key={index}
        //         item={item}
        //         accordElem={accordElem}
        //         index={index}
        //         activeIndex={activeIndex}
        //         setActiveIndex={setActiveIndex}
        //       />
        //     ))}
        //   </Accordion>
        // </div>
        <div>
          {listRegions?.map((region, index) => (
            <RegionCard key={index} region={region} />
          ))}
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ fontWeight: "bold", color: "red" }}>No results found!</p>
        </div>
      )}
    </div>
  );
};
