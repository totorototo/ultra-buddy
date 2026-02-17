import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { Location } from "@styled-icons/octicons";
import { createPathHelper, calculateDistance } from "positic";

import styled from "./style";
import mapStyle from "./style.json";

// Set Mapbox access token globally
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

const MapComponent = ({
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
    longitude: 0.32715,
    latitude: 42.82985,
    zoom: 4,
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
        <Map
          {...viewport}
          style={{ width: '100%', height: '100%' }}
          mapStyle={mapStyle}
          onMove={(evt) => setViewport(evt.viewState)}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
          interactiveLayerIds={[]}
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
          {checkpointsLocations.map((checkpoint, index) => (
            <Marker
              key={`checkpoint-${index}`}
              longitude={checkpoint[0]}
              latitude={checkpoint[1]}
              anchor="bottom"
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50% 50% 50% 0',
                  background: '#bb3439',
                  transform: 'rotate(-45deg)',
                  border: '2px solid white',
                }}
              />
            </Marker>
          ))}
          {currentLocation && (
            <Marker
              longitude={currentLocation[0]}
              latitude={currentLocation[1]}
              anchor="bottom"
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50% 50% 50% 0',
                  background: '#357597',
                  transform: 'rotate(-45deg)',
                  border: '2px solid white',
                }}
              />
            </Marker>
          )}
        </Map>
      </div>
    </div>
  );
};

export default styled(MapComponent);
