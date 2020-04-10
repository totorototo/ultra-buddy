import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import DeckGL, { IconLayer } from "deck.gl";

import styled from "./style";
import mapStyle from "./style.json";
import trace from "../../helpers/trace";
import placeIcon from "../../assets/icon-atlas.png";

const Map = ({ className, route }) => {
  const [viewport, setViewport] = useState({
    latitude: 42.82985,
    longitude: 0.32715,
    zoom: 4,
    bearing: 0,
    pitch: 0,
  });
  const [peaks, setPeaks] = useState([]);

  useEffect(() => {
    if (!route) return;
    const helper = trace(...route.features[0].geometry.coordinates);
    const region = helper.computeRegion();
    //const res = helper.getLocationAt(10, 20, 30, 40);
    const peaks = helper.getPeaksLocations();
    setPeaks(peaks.peaks);

    const latitude = (region.minLatitude + region.maxLatitude) / 2;
    const longitude = (region.minLongitude + region.maxLongitude) / 2;
    setViewport((viewport) => ({
      ...viewport,
      latitude: latitude,
      longitude: longitude,
    }));
  }, [route]);

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
        <DeckGL
          viewState={viewport}
          layers={[
            new IconLayer({
              id: "icon-layer",
              data: peaks,
              pickable: true,
              iconAtlas: placeIcon,
              iconMapping: {
                marker: {
                  x: 0,
                  y: 0,
                  width: 128,
                  height: 128,
                  anchorY: 128,
                  mask: true,
                },
              },
              sizeScale: 10,
              getPosition: (d) => [d.location[0], d.location[1]],
              getIcon: (d) => "marker",
              getSize: (d) => 3,
              getColor: (d) => [84, 84, 82],
            }),
          ]}
        />
      </MapGL>
    </div>
  );
};

export default styled(Map);
