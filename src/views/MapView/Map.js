import {useRef, useState, useEffect, useCallback} from "react";
import {MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/Map.css";
import Legend from "./components/Legend";
import useTravelRecommenderStore from "../../store/travelRecommenderStore";
import LeafletTooltip from "../../components/LeafletPopup";
import {create} from "zustand";
import useLoadHistory from "../../api/history/useLoadHistory";
import useLoadMeWithGroups from "../../api/useLoadMeWithGroups";
import useSelectedList from "../../api/useSelectedList";
import { useAuthContextSupabase } from "../../context/AuthContextSupabase";
import useFeatures from "../../api/useFeatures";
import useCountries from "../../api/useCountries";
import useVisitsStore from "../../api/useVisitStore";

const position = [51.0967884, 5.9671304];

export const useReferencedCountry = create((set) => ({
  countryId: null,
  setCountry: (countryId) => {
    set({ countryId })
  },
  resetCountry: () => {
    set({ countryId: null })
  }
}));

const Map = ({ setActiveResult }) => {
  const { user } = useAuthContextSupabase();
  const { features } = useFeatures();
  const visits = useVisitsStore((state) => state.visits);
  const fetchVisits = useVisitsStore((state) => state.fetchVisits);
  const { data: historyData, loading } = useLoadHistory({
    userId: user?.id,
  });
  const isLoading = !historyData;
  const [map, setMap] = useState(null);
  const {countries, fetchCountries} = useCountries();
  const geoJsonLayer = useRef(null);
  const mapLayers = useRef([]);
  const {
    countryId: referencedCountryId,
    resetCountry: resetReferencedCountry
  } = useReferencedCountry();
  const months = useTravelRecommenderStore((state) => state.userData.Months);
  const { selectedList } = useSelectedList();
  const listEmoji = selectedList.emoji;
  const listRegions = selectedList.regions;
  const [geoJsonKey, setGeoJsonKey] = useState(0); // Key to force GeoJSON re-render


  useEffect(() => {
    if (referencedCountryId) {
      onCountryPopupOpen(referencedCountryId);
      resetReferencedCountry();
    }
  }, [referencedCountryId]);

  useEffect(() => {
    if (geoJsonLayer.current) {
      geoJsonLayer.current.clearLayers().addData(countries);
    }
  });

  const countryStyle = {
    fillOpacity: 1,
    color: "#868685",
    weight: 1,
  };

  useEffect(() =>{
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);


    const calculateScore = useCallback((travelMonths) => {
    const selectedMonths = months
      .map((value, index) => (value === 100 ? index : null))
      .filter((index) => index !== null);

    const totalScore = selectedMonths.reduce((acc, monthIndex) => {
      return acc + travelMonths[monthIndex];
    }, 0);
    return Math.round(totalScore / selectedMonths.length); // Average score based on selected months
  }, [months]);

  /**
   *
   * @type {(function($ObjMap, *): void)|*}
   */
  const onEachCountry = useCallback((country, layer) => {


    var score = 80;
    if (!months.every((month) => month === 0)) {
      score = calculateScore(country.properties.result.travelMonths)
    }
    layer.options.fillColor = getColor(score);

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      dblclick: clickCountry,
      click: (event) => onOpenPopup(event, country),
    });

    // add references to the leaflet ids to for the programmatic event handling
    if (country.properties.result.id) {
      setTimeout(() => {
        layer.id = country.properties.result.id;
        mapLayers.current[country.properties.result.id] = layer._leaflet_id;
      })
    }
    // handle visit logic
        if (user && geoJsonLayer.current && visits.length > 0) {

        const countryId = layer.feature.properties.result.id;    
        const visited = visits.some((visit) => parseInt(visit.region_id) === countryId);
        if (visited) {
          switch (features.displayVisit) {
            case "border":
              layer.setStyle({
                weight: 5,
                color: "#1a1a1a",
                fillOpacity: 0.9,
              });
              break;
            case "pin":
              layer.bindTooltip(`
                <div>
                  <h4>📌</h4>
                </div>`, {
              permanent: true,
              opacity: 1,
              direction: "center",
              });
            break;
            case "color":
              layer.setStyle({
                fillColor: "#3399ff",
                fillOpacity: 1,
              });
              break;
            default:
              break;
        }
    }
  }
  //handle list logic
    if(listRegions && listRegions.map((regions) => regions.value.id).includes(country.properties.result.id)){
      if (features.displaySelectedList === "color" || features.displaySelectedList === "colorAndEmoji") {
        layer.options.fillColor = "#35628E";
      }
      if(features.displaySelectedList === "emoji" || features.displaySelectedList === "colorAndEmoji"){
        layer.bindTooltip(`
          <div>
            <h4>${listEmoji}</h4>
          </div>`, {
        permanent: true,
        opacity: 1,
        direction: "center",
        });
      }
      if(features.displaySelectedList === "border") {
        layer.setStyle({
          weight: 5,
          color: "#35628E",
          fillOpacity: 0.9,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [months, countries, listRegions, visits, features, user]);

  const onCountryPopupOpen = (countryId) => {
    const layer = geoJsonLayer.current.getLayer(mapLayers.current[countryId]);
    const { lat, lng } = layer.getCenter();
    map.flyTo([lat,lng]);
    map.once('moveend', () => {
      layer.fireEvent('click', {
        latlng: { lat, lng }
      });
    });
  };



  const highlightFeature = (e) => {
    const layer = e.target;
    const visited = layer.options.weight === 5;
    const colored = layer.options.color === "#1a1a1a";
    layer.setStyle({
      weight: 5,
      color: colored ? "#ffe" : "white",
      fillOpacity: visited ? 0.8 : 0.9,
    });
  };

  const resetHighlight = (e) => {
    const layer = e.target;
    const visited = layer.options.fillOpacity === 0.8;
    const colored = layer.options.color === "#ffe";
    layer.setStyle({
      fillOpacity: visited ? 0.9 : 1,
      color: colored ? "#1a1a1a" : "#868686",
      weight: visited ? 5 : 1,
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

  //update the map on changes
  useEffect(() => {
    setGeoJsonKey((prevKey) => prevKey + 1);
  }, [months, listRegions, features, user, visits]);

  if (loading || isLoading) {
    return <div>Loading user data...</div>;
  }
  return (
    <div>
      <div>
        <MapContainer
          style={{ height: "100vh", width: "auto" }}
          zoom={4}
          id={'map'}
          center={position}
          ref={setMap}
          doubleClickZoom={false}
          className="custom-map-container"
        >
          <GeoJSON
            key={geoJsonKey}
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
