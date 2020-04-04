import React, { useState } from "react";
import MapGL from "react-map-gl";

import styled from "./style";

const Map = ({ className }) => {
  const [viewport, setViewport] = useState({
    latitude: 42.82985,
    longitude: 0.32715,
    zoom: 2,
    bearing: 0,
    pitch: 0,
  });
  return (
    <div className={className}>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/totorototo/ck8j8jlie0yft1iqvbddr5swm"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      />
    </div>
  );
};

export default styled(Map);
