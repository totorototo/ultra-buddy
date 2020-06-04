import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect } from "react";
import MapGL, { Source, Layer, FlyToInterpolator } from "react-map-gl";
import DeckGL, { IconLayer } from "deck.gl";
import { Location } from "@styled-icons/octicons";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { easeCubic } from "d3-ease";

import styled from "./style";
import mapStyle from "./style.json";
import trace from "../../helpers/trace";
import placeIcon from "../../assets/icon-atlas.png";
import {
  sectionsState,
  currentSectionIndexState,
  currentLocationState,
  checkpointsState,
  routeState,
  locationsState,
  currentLocationIndexState,
  runnerAnalyticsState,
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
  const locations = useRecoilValue(locationsState);
  const sections = useRecoilValue(sectionsState);
  const checkpoints = useRecoilValue(checkpointsState);
  const setRunnerAnalytics = useSetRecoilState(runnerAnalyticsState);

  const [helper, setHelper] = useState();
  const [viewport, setViewport] = useState({
    latitude: 42.82985,
    longitude: 0.32715,
    zoom: 8,
    bearing: 0,
    pitch: 0,
  });
  const [checkpointsLocations, setCheckpointsLocations] = useState([]);

  // get trailer runnerAnalytics
  useEffect(() => {
    if (currentLocationIndex === -1 || !helper) return;
    const runnerAnalytics = helper.getProgression(currentLocationIndex);
    setRunnerAnalytics(runnerAnalytics);
  }, [currentLocationIndex, helper, setRunnerAnalytics]);

  // set current location and sections indices
  useEffect(() => {
    if (!helper || !currentLocation.length === 0) return;

    const index = helper.getLocationIndex(currentLocation);
    setCurrentLocationIndex(index);

    if (sections.length === 0) return;

    const sectionIndex = sections.findIndex((section) => {
      return index >= section.indices[0] && index <= section.indices[1];
    });

    setCurrentSectionIndex(sectionIndex);
    if (sectionIndex < 0) return;
    setViewport((viewport) => ({
      ...viewport,
      latitude:
        (sections[sectionIndex].region.minLatitude +
          sections[sectionIndex].region.maxLatitude) /
        2,
      longitude:
        (sections[sectionIndex].region.minLongitude +
          sections[sectionIndex].region.maxLongitude) /
        2,
      zoom: 8,
      bearing: 0,
      pitch: 0,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    }));
  }, [
    currentLocation,
    helper,
    sections,
    setCurrentLocationIndex,
    setCurrentSectionIndex,
  ]);

  // set route helper
  useEffect(() => {
    if (locations.length === 0) return;
    const helper = trace(...locations);
    setHelper(helper);
  }, [locations]);

  useEffect(() => {
    if (Object.keys(route).length === 0) return;
    const helper = trace(...route.features[0].geometry.coordinates);
    const region = helper.computeRegion();
    const latitude = (region.minLatitude + region.maxLatitude) / 2;
    const longitude = (region.minLongitude + region.maxLongitude) / 2;
    setViewport((viewport) => ({
      ...viewport,
      latitude: latitude,
      longitude: longitude,
    }));
  }, [route]);

  useEffect(() => {
    if (checkpoints.length === 0 || Object.keys(route).length === 0) {
      setCheckpointsLocations([]);
      return;
    }
    const helper = trace(...route.features[0].geometry.coordinates);
    const distances = checkpoints.map((checkpoint) => checkpoint.distance);
    const locations = helper.getLocationAt(...distances);

    setCheckpointsLocations(locations);
  }, [checkpoints, route]);

  const getCurrentLocation = () => {
    if (Object.keys(route).length === 0) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const helper = trace(...route.features[0].geometry.coordinates);
        const closestLocation = helper.findClosestLocation([
          position.coords.longitude,
          position.coords.latitude,
        ]);

        setCurrentLocation(closestLocation);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

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
                {sections[currentSectionIndex].depatureLocation}
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
