import React, { useState } from "react";
import MapGL, { Source, Layer } from "react-map-gl";

import styled from "./style";
import mapStyle from "./style.json";

const Map = ({ className, route }) => {
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
        mapStyle={mapStyle}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      >
        {route && (
          <Source id="my-data" type="geojson" data={route}>
            <Layer
              id="route"
              type="line"
              source="route"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#ebb11a",
                "line-width": 2,
              }}
            />
          </Source>
        )}
      </MapGL>
    </div>
  );
};

export default styled(Map);
