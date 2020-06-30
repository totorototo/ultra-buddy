import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import DeckGL, { IconLayer } from "deck.gl";
import { Location } from "@styled-icons/octicons";
import { createPathHelper, calculateDistance } from "positic";

import styled from "./style";
import mapStyle from "./style.json";
import placeIcon from "../../assets/icon-atlas.png";

const Map = ({
  className,
  route,
  checkpoints,
  currentSectionIndex,
  sections,
  enableGPS,
  currentLocation,
  setCurrentLocation,
  setRunnerLocations,
  runnerLocations,
}) => {
  const [viewport, setViewport] = useState({
    latitude: 42.82985,
    longitude: 0.32715,
    zoom: 4,
    bearing: 0,
    pitch: 0,
  });

  const getCurrentLocation = () => {
    if (!route) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const helper = createPathHelper(route.features[0].geometry.coordinates);
        const closestLocation = helper.findClosestPosition([
          position.coords.longitude,
          position.coords.latitude,
        ]);

        setCurrentLocation(closestLocation);

        setRunnerLocations([
          ...runnerLocations,
          {
            location: closestLocation,
            timestamp: position.timestamp,
            distance:
              helper.getProgressionStatistics(
                helper.getPositionIndex(closestLocation)
              )[0] || 0,
            delta: calculateDistance(closestLocation, [
              position.coords.longitude,
              position.coords.latitude,
            ]),
          },
        ]);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const [checkpointsLocations, setCheckpointsLocations] = useState([]);

  useEffect(() => {
    if (!route) return;
    const helper = createPathHelper(route.features[0].geometry.coordinates);
    const region = helper.calculatePathBoundingBox();
    const latitude = (region.minLatitude + region.maxLatitude) / 2;
    const longitude = (region.minLongitude + region.maxLongitude) / 2;
    setViewport((viewport) => ({
      ...viewport,
      latitude: latitude,
      longitude: longitude,
    }));
  }, [route]);

  useEffect(() => {
    if (!checkpoints || !route) {
      setCheckpointsLocations([]);
      return;
    }

    const helper = createPathHelper(route.features[0].geometry.coordinates);
    const distances = checkpoints.map(
      (checkpoint) => checkpoint.distance * 1000
    );
    const locations = helper.getPositionsAlongPath(...distances);

    setCheckpointsLocations(locations);
  }, [checkpoints, route]);

  return (
    <div className={className}>
      <div className="wrapper">
        <div className="current-section">
          {currentSectionIndex >= 0 && (
            <>
              <div className="arrival">
                {sections[currentSectionIndex].arrivalLocation}
              </div>
              <div className="divider" />
              <div className="departure">
                {sections[currentSectionIndex].departureLocation}
              </div>
            </>
          )}
        </div>
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle={mapStyle}
          onViewportChange={setViewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        >
          <Location
            onClick={() => {
              getCurrentLocation();
            }}
            className={`fab ${enableGPS ? "show" : "hide"}`}
            size="16"
            color="#007EA7"
          />
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
                id: "route-layer",
                data: checkpointsLocations,
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
                sizeScale: 8,
                getPosition: (d) => [d[0], d[1]],
                getIcon: (d) => "marker",
                getSize: (d) => 3,
                getColor: (d) => [187, 52, 57],
              }),
              new IconLayer({
                id: "location-layer",
                data: currentLocation && [currentLocation],
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
                sizeScale: 8,
                getPosition: (d) => [d[0], d[1]],
                getIcon: (d) => "marker",
                getSize: (d) => 3,
                getColor: (d) => [53, 117, 151],
              }),
            ]}
          />
        </MapGL>
      </div>
    </div>
  );
};

export default styled(Map);
