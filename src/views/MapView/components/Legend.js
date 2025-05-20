import L from "leaflet";
import { useEffect, useRef, useCallback } from "react";
import "../styles/Map.css";
import { useThemeModal } from "../../ThemeView/ThemePopup";
import useTravelRecommenderStore from "../../../store/travelRecommenderStore";

function Legend({ map }) {
  const months = useTravelRecommenderStore((state) => state.userData.Months);
  const { setIsOpen: setIsThemeModalOpen, isOpen: isThemeModalOpen } = useThemeModal();
  const openThemeSelector = useCallback(() => {
    setIsThemeModalOpen(true);
  }, [setIsThemeModalOpen]);
  const getColor = (d) => {
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
  };

  const legendRef = useRef(null); // Ref to store the legend instance

  useEffect(() => {
    if (map) {
      if (legendRef.current) {
        legendRef.current.remove(); // Remove the existing legend if it exists
      }

      if (months.some((month) => month !== 0)) {
        const legend = L.control({ position: "bottomleft" });

        legend.onAdd = () => {
          const div = L.DomUtil.create("div", "info legend");
          const grades = [100, 90, 70, 60, 50];
          const texts = ["Excellent", "Good", "Fair", "Uncertain", "Poor"];
          let labels = [];

          for (let i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background:' + getColor(grades[i]) + '"></i> ' + texts[i]
            );
          }
          // labels.push(
          //   '<button id="theme-selector-btn" class="text-gray-900 bg-transparent border rounded border-gray-300 px-4 mt-1">Edit Theme</button>'
          // );

          div.innerHTML = labels.join("<br>");
          setTimeout(() => {
            const button = div.querySelector("#theme-selector-btn");
            if (button) {
              button.addEventListener("click", openThemeSelector);
            }
          }, 0);
          return div;
        };

        legend.addTo(map);
        legendRef.current = legend; // Store the legend instance in the ref
      } else {
        legendRef.current = null; // Clear the ref if no legend is added
      }
    }
  }, [map, months]);

  return null;
}

export default Legend;
