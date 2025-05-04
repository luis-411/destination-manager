import { useState, useEffect, useRef } from "react";

const useThemeColor = () => {
  const [themeColor, setThemeColor] = useState("#fff");
  return [themeColor, setThemeColor];
};

const useGetColor = () => {
  const [themeColor] = useThemeColor();
  const getColorRef = useRef(() => "#fff"); // Default function

  useEffect(() => {
    // Update the getColor function whenever themeColor changes
    getColorRef.current = (d) => {
      switch (themeColor) {
        case "#fff":
          return d > 90
            ? "#109146"
            : d > 70
            ? "#7CBA43"
            : d > 60
            ? "#FFCC06"
            : d > 50
            ? "#F58E1D"
            : d >= 0
            ? "#BF1E24"
            : "#fff";
        case "#200000":
          return d > 90
            ? "#FFCC06"
            : d > 70
            ? "#F58E1D"
            : d > 60
            ? "#BF1E24"
            : d > 50
            ? "#109146"
            : d >= 0
            ? "#7CBA43"
            : "#fff";
        default:
          return d > 90
            ? "#000000"
            : d > 70
            ? "#7CBA43"
            : d > 60
            ? "#FFCC06"
            : d > 50
            ? "#F58E1D"
            : d >= 0
            ? "#BF1E24"
            : "#fff";
      }
    };
  }, [themeColor]);

  return getColorRef.current; // Return the current getColor function
};

export { useThemeColor, useGetColor };