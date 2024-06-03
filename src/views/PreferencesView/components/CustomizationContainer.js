import React from "react";
import Attribute from "./Attribute";
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";
import * as myConstant from "../../../data/constantData";
export const CustomizationContainer = () => {
  const { userData } = useTravelRecommenderStore();
  return (
    <div>
      <p style={{ textAlign: "start", fontSize: "small" }}>
        Rate the topics according to their importance to you:
      </p>
      {Object.keys(userData.Attributes).map((item, index) => (
        <div
          style={{
            border:"1px solid grey",
            borderRadius: "0.8rem",
            marginTop:"10px",
            padding:"5px"
          }}
          key={index}
        >
          <Attribute
          sliderColor={userData.Attributes[item].weight === 0 ? "gray" : myConstant.COLORS[index % myConstant.COLORS.length]} 
          attrName={item} />
        </div>
      ))}
    </div>
  );
};
