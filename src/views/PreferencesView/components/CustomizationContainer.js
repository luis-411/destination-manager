import React from "react";
import Attribute from "./Attribute";
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";
import * as myConstant from "../../../data/constantData";
import {GREY_COLOR} from "../../../data/constantData";
export const CustomizationContainer = () => {
  const { userData } = useTravelRecommenderStore();
  return (
    <div>
      <p style={{ textAlign: "start", fontSize: "small" }}>
        Rate the topics according to their importance to you
      </p>
      <div className={'d-flex flex-column gap-3'}>
        {Object.keys(userData.Attributes).map((item, index) => {
          const sliderColor = userData.Attributes[item].weight === 0
            ? GREY_COLOR
            : myConstant.COLORS[index % myConstant.COLORS.length];
          return (
            <div
              style={{
                border:"1px solid var(--border-color)",
                borderRadius: "1rem",
                padding: '0.875rem 1rem'
              }}
              key={index}
            >
              <Attribute
                key={index}
                sliderColor={sliderColor}
                attrName={item}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};
