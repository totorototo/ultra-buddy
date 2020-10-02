import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect } from "react";
import MapGL, { Source, Layer, FlyToInterpolator } from "react-map-gl";
import DeckGL, { IconLayer } from "deck.gl";
import { Location } from "@styled-icons/octicons";
import { createPathHelper, calculateDistance } from "positic";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { easeCubic } from "d3-ease";

import styled from "./style";
import mapStyle from "./style.json";
import placeIcon from "../../assets/icon-atlas.png";
import {
  sectionsState,
  currentSectionIndexState,
  currentLocationState,
  checkpointsState,
  routeState,
  // locationsState,
  currentLocationIndexState,
  runnerAnalyticsState,
  runnerLocationsState,
} from "../../model";

const Map = ({ className, enableGPS }) => {
  const route = useRecoilValue(routeState);
  const [currentLocation, setCurrentLocation] = useRecoilState(
    currentLocationState
  );
  const [currentLocationIndex, setCurrentLocationIndex] = useRecoilState(
    currentLocationIndexState
  );
  const [currentSectionIndex, setCurrentSectionIndex] = useRecoilState(
    currentSectionIndexState
  );

  const sections = useRecoilValue(sectionsState);
  const checkpoints = useRecoilValue(checkpointsState);
  const setRunnerAnalytics = useSetRecoilState(runnerAnalyticsState);
  // TODO: runner location to be added
  const [runnerLocations, setRunnerLocations] = useRecoilState(
    runnerLocationsState
  );

  const [helper, setHelper] = useState();
  const [viewport, setViewport] = useState({
    latitude: 42.82985,
    longitude: 0.32715,
    zoom: 8,
    bearing: 0,
    pitch: 0,
  });

  const getCurrentLocation = () => {
    if (Object.keys(route).length === 0) return;
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

  // get trailer runnerAnalytics
  useEffect(() => {
    if (currentLocationIndex === -1 || !helper) return;
    const runnerAnalytics = helper.getProgressionStatistics(
      currentLocationIndex
    );
    setRunnerAnalytics(runnerAnalytics);
  }, [currentLocationIndex, helper, setRunnerAnalytics]);

  // set current location index and sections indices
  useEffect(() => {
    if (!helper || currentLocation.length !== 3) return;

    const index = helper.getPositionIndex(currentLocation);
    setCurrentLocationIndex(index);

    if (sections.length === 0) return;

    const sectionIndex = sections.findIndex((section) => {
      return index >= section.indices[0] && index <= section.indices[1];
    });

    setCurrentSectionIndex(sectionIndex);
  }, [
    currentLocation,
    helper,
    sections,
    setCurrentLocationIndex,
    setCurrentSectionIndex,
  ]);

  // set viewport - runner centric
  useEffect(() => {
    if (!sections || currentSectionIndex < 0) return;

    const longitude =
      (sections[currentSectionIndex].region.minLongitude +
        sections[currentSectionIndex].region.maxLongitude) /
      2;
    const latitude =
      (sections[currentSectionIndex].region.minLatitude +
        sections[currentSectionIndex].region.maxLatitude) /
      2;

    setViewport((viewport) => ({
      ...viewport,
      longitude,
      latitude,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    }));
  }, [sections, currentSectionIndex]);

  useEffect(() => {
    if (Object.keys(route).length === 0) return;

    const helper = createPathHelper(route.features[0].geometry.coordinates);
    setHelper(helper);
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
    if (
      checkpoints.length === 0 ||
      Object.keys(route).length === 0 ||
      !helper
    ) {
      setCheckpointsLocations([]);
      return;
    }

    const distances = checkpoints.map(
      (checkpoint) => checkpoint.distance * 1000
    );
    const locations = helper.getPositionsAlongPath(...distances);

    setCheckpointsLocations(locations);
  }, [checkpoints, route, helper]);

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
          {Object.keys(route).length > 0 && (
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
                  "line-color": "#D49E21",
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
