import RangedInput from "./RangedInput";
import AdditionalInfo from "../views/PreferencesView/components/AdditionalInfo";
import React from "react";


const RangedPreference = ({userDataKey, title, checkKey, checkTooltipText, checkLabel, step = 1, stepsText }) => {
  return (
    <>
      {userDataKey && <div style={{padding: "10px 0"}}>
        <RangedInput
          userDataKey={userDataKey}
          title={title}
          step={step}
          stepsText={stepsText}
        />
      </div>}
      {checkKey && <div>
        <AdditionalInfo
          checkKey={checkKey}
          checkLabel={checkLabel}
          tooltipText={checkTooltipText}
        />
      </div>}
    </>
  )
};

export default RangedPreference;