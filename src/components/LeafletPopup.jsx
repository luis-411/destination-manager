import {Icon} from "leaflet";
import React, {useEffect, useRef, useState} from "react";
import {Marker, Popup} from "react-leaflet";
import {CountryPopup} from "../views/MapView/components/CountryPopup";
import {useClickAnyWhere} from "usehooks-ts";


const invisibleIcon = new Icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/ixFpKsAAAAASUVORK5CYII=',
  iconSize: [0, 0],
  iconAnchor: [0, 0],
});

const LeafletTooltip = ({ isActive, data, map, country, reset }) => {
  const [refReady, setRefReady] = useState(false);
  let popupRef = useRef();
  const htmlRef = useRef(map?._container);

  useEffect(() => {
    if (refReady && isActive && data) {
      popupRef.openOn(map);
    } else if (!isActive) {
      popupRef.close();
    }
    htmlRef.current = map?._container;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, refReady, data]);

  useClickAnyWhere((event) => {
    if (htmlRef.current?.contains(event.target)) {
      reset();
    }
  });

  return (
    <Marker position={data.position} icon={invisibleIcon}>
      <Popup
        autoClose={false}
        closeOnClick={false}
        ref={(r) => {
          popupRef = r;
          setRefReady(true);
        }}
      >
        <CountryPopup country={country} />
      </Popup>
    </Marker>
  )
};


export default LeafletTooltip;