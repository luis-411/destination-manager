import React, { createContext, useContext, useState } from "react";

const FeaturesContext = createContext();

export const FeaturesProvider = ({ children }) => {
  const [features, setFeatures] = useState({
    rating: "star",
    addVisit: "popup",
    displayVisit: "border",
    displaySelectedList: "colorAndEmoji",
  });

  const updateFeature = (feature, value) => {
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: value,
    }));
    console.log(`Feature updated: ${feature} = ${value}`);
  };

  return (
    <FeaturesContext.Provider value={{ features, updateFeature }}>
      {children}
    </FeaturesContext.Provider>
  );
};

const useFeatures = () => {
  return useContext(FeaturesContext);
};

export default useFeatures;
