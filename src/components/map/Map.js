import React, { useState } from "react";
import MapGL from "react-map-gl";

import styled from "./style";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic21peWFrYXdhIiwiYSI6ImNqbDVncmNjYjBoMjQzbG50bnVxNWk2YW8ifQ.uy0MalaDN4I5MxPYT99hMA";

const Map = ({ className }) => {
  const [viewport, setViewport] = useState({
    latitude: 42.82985,
    longitude: 0.32715,
    zoom: 2,
    bearing: 0,
    pitch: 0
  });
  return (
    <div className={className}>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    </div>
  );
};

export default styled(Map);
