import React, {useRef, useState, useEffect, useCallback} from "react";
import {MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/Map.css";
import Legend from "./components/Legend";
import useTravelRecommenderStore from "../../store/travelRecommenderStore";
import LeafletTooltip from "../../components/LeafletPopup";

const position = [51.0967884, 5.9671304];

const Map = ({ setActiveResult }) => {
  const [map, setMap] = useState(null);
  const countries = useTravelRecommenderStore((state) => state.countries);
  const geoJsonLayer = useRef(null);

  useEffect(() => {
    if (geoJsonLayer.current) {
      geoJsonLayer.current.clearLayers().addData(countries);
    }
  });

  const addNumberToTheIndexedCountry = (layer, cIndex) => {
    layer.options.fillColor = getColor(100);
    layer.bindTooltip(`
        <div>
          <h4>${cIndex + 1}</h4>
        </div>`, {
      permanent: true,
      opacity: 1,
      direction: "center",
    });
  }

  const onEachCountry = useCallback((country, layer) => {
    const cIndex = countries.findIndex(
      (r) => r.properties.u_name === country.properties.u_name
    );
    const score = country.properties.result.scores.totalScore;
    layer.options.fillColor = getColor(score);

    if (cIndex < 10 && score > 0) {
     addNumberToTheIndexedCountry(layer, cIndex);
    }
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      dblclick: clickCountry,
      click: (event) => onOpenPopup(event, country)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries]);

  const countryStyle = {
    fillOpacity: 1,
    color: "#868686",
    weight: 1,
  };

  const highlightFeature = (e) => {
    const layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "white",
      fillOpacity: 0.7,
    });
  };

  const resetHighlight = (e) => {
    const layer = e.target;
    layer.setStyle({
      fillOpacity: 1,
      color: "#868686",
      weight: 1,
    });
  };

  const [tooltipPosition, setTooltipPosition] = useState([0,0]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedResult, setSelectedResult] = useState();

  /**
   *
   * @param {Object} event
   * @param {Object} country
   */
  const onOpenPopup = (event, country) => {
    if (!event.latlng) {
      return;
    }
    setOpenPopup(true);
    setTooltipPosition([event.latlng?.lat, event.latlng?.lng]);
    setSelectedResult(country.properties.result);
  }

  const onPopupReset = () => {
    setOpenPopup(false);
  }

  const clickCountry = (e) => {
    let ind = countries.findIndex(
      (r) => r.properties.u_name === e.target.feature.properties.u_name
    );
    if (ind < 10) {
      setActiveResult(ind);
    } else {
      setActiveResult(-1);
    }
  };

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

  return (
    <div>
      <div>
        <MapContainer
          style={{height: "100vh", width: "auto"}}
          zoom={4}
          id={'map'}
          center={position}
          ref={setMap}
          doubleClickZoom={false}
        >
          <GeoJSON
            ref={geoJsonLayer}
            style={countryStyle}
            data={countries}
            onEachFeature={onEachCountry}
          />
          <LeafletTooltip
            map={map}
            data={{
              position: tooltipPosition,
            }}
            isActive={openPopup}
            country={selectedResult}
            reset={onPopupReset}
          />
          <Legend map={map}/>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
