import React, { useState, useEffect } from "react";
import { differenceInMilliseconds } from "date-fns";
import * as d3Array from "d3-array";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

import styled from "./style";
import Home from "../home/Home";
import Map from "../map/Map";
import Options from "../options/Options";
import Sections from "../sections/Sections";
import Analytics from "../analytics/Analytics";
import Live from "../live/Live";
import Message from "../message/Message";
import AutoSizer from "../autoSizer/AutoSizer";
import trace from "../../helpers/trace";
import { ReactComponent as Compass } from "../../assets/compass.svg";
import { ReactComponent as Direction } from "../../assets/direction.svg";
import {
  currentLocationState,
  routeState,
  nameState,
  checkpointsState,
  sectionsState,
  locationsState,
  currentSectionIndexState,
  currentLocationIndexState,
  routeAnalyticsState,
  runnerAnalyticsState,
} from "../../model";

const Main = ({ className }) => {
  const currentLocation = useRecoilValue(currentLocationState);
  const route = useRecoilValue(routeState);
  const name = useRecoilValue(nameState);
  const checkpoints = useRecoilValue(checkpointsState);
  const [sections, setSections] = useRecoilState(sectionsState);
  const [locations, setLocations] = useRecoilState(locationsState);
  const setCurrentSectionIndex = useSetRecoilState(currentSectionIndexState);
  const [currentLocationIndex, setCurrentLocationIndex] = useRecoilState(
    currentLocationIndexState
  );
  const [runnerAnalytics, setRunnerAnalytics] = useRecoilState(
    runnerAnalyticsState
  );
  const setRouteAnalytics = useSetRecoilState(routeAnalyticsState);

  const [helper, setHelper] = useState();
  const [toggle, setToggle] = useState(false);
  const [pageIndex, setPageIndex] = useState(5);
  const [domain, setDomain] = useState({
    x: { min: 0, max: 0 },
    y: { min: 0, max: 0 },
  });

  // get trace stats
  useEffect(() => {
    if (!helper) return;
    const distance = helper.computeDistance();
    const elevation = helper.computeElevation();
    setRouteAnalytics({ distance, elevation });
  }, [helper, setRouteAnalytics]);

  // get route
  useEffect(() => {
    if (Object.keys(route).length === 0) return;
    setLocations(route.features[0].geometry.coordinates);
  }, [route, setLocations]);

  // set domain
  useEffect(() => {
    if (locations.length === 0) return;
    const altitudes = locations.map((location) => location[2]);
    const extentY = d3Array.extent(altitudes);
    const lowerFullHundred = Math.floor(extentY[0] / 100) * 100;
    setDomain((domain) => ({
      ...domain,
      x: { min: 0, max: locations.length },
      y: { min: lowerFullHundred, max: extentY[1] },
    }));
  }, [locations]);

  // get trailer runnerAnalytics
  useEffect(() => {
    if (currentLocationIndex === -1 || !helper) return;
    const runnerAnalytics = helper.getProgression(currentLocationIndex);
    setRunnerAnalytics(runnerAnalytics);
  }, [currentLocationIndex, helper, setRunnerAnalytics]);

  // set route helper
  useEffect(() => {
    if (locations.length === 0) return;
    const helper = trace(...locations);
    setHelper(helper);
  }, [locations]);

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
  }, [
    currentLocation,
    helper,
    sections,
    setCurrentLocationIndex,
    setCurrentSectionIndex,
  ]);

  // set trail sections
  useEffect(() => {
    if (checkpoints.length === 0 || locations.length === 0 || !helper) return;

    const distances = checkpoints.map((checkpoint) => checkpoint.distance);
    const locationsIndices = helper.getLocationIndexAt(...distances);

    // compute section indices (start - stop)
    const sectionsIndices = locationsIndices.reduce(
      (accu, locationIndex, index, array) => {
        if (index > 0) {
          return [...accu, [array[index - 1], locationIndex - 1]];
        } else return accu;
      },
      []
    );

    // split trace into sections
    const sectionsLocations = sectionsIndices.reduce((accu, sectionIndices) => {
      const section = locations.slice(sectionIndices[0], sectionIndices[1]);
      return [...accu, section];
    }, []);

    // compute section stats
    const sectionsStats = sectionsLocations.map((section) => {
      const helper = trace(...section);
      return {
        distance: helper.computeDistance(),
        elevation: helper.computeElevation(),
        coordinates: section,
      };
    });

    // aggregate sections details
    const sectionsDetails = checkpoints.reduce(
      (accu, checkpoint, index, array) => {
        if (index > 0) {
          const endingDate = new Date(checkpoint.cutOffTime);
          const startingDate = new Date(array[index - 1].cutOffTime);
          const duration = differenceInMilliseconds(endingDate, startingDate);
          return [
            ...accu,
            {
              startingDate,
              endingDate,
              depatureLocation: array[index - 1].location,
              arrivalLocation: checkpoint.location,
              duration,
              cutOffTime: checkpoint.cutOffTime,
              ...sectionsStats[index - 1],
              fromKm: helper.getProgression(sectionsIndices[index - 1][0])[0],
              toKm: helper.getProgression(sectionsIndices[index - 1][1])[0],
              indices: sectionsIndices[index - 1],
            },
          ];
        }
        return accu;
      },
      []
    );

    setSections(sectionsDetails);
  }, [checkpoints, locations, helper, setSections, setCurrentSectionIndex]);

  return (
    <div className={className}>
      <div className={`sections-wrapper ${toggle ? "menu-open" : ""}`}>
        <h1>Menu</h1>
        <section className={`one ${pageIndex < 0 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(0);
                setToggle(!toggle);
              }}
            >
              Options
            </h1>
            <div className="section-content">
              <Options />
            </div>
          </div>
        </section>
        <section className={`two ${pageIndex < 1 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(1);
                setToggle(!toggle);
              }}
            >
              Analytics
            </h1>
            <div className="section-content">
              {runnerAnalytics.length > 0 && sections.length > 0 ? (
                <Analytics />
              ) : (
                <Message message="get current location ?">
                  <Compass width={100} />
                </Message>
              )}
            </div>
          </div>
        </section>
        <section className={`three ${pageIndex < 2 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(2);
                setToggle(!toggle);
              }}
            >
              Live
            </h1>
            <div className="section-content">
              {Object.keys(runnerAnalytics).length > 0 &&
              sections.length > 0 &&
              checkpoints.length > 0 ? (
                <AutoSizer>
                  {(width, height) => <Live width={width} height={height} />}
                </AutoSizer>
              ) : (
                <Message message="timetable not loaded yet!">
                  <Direction width={100} />
                </Message>
              )}
            </div>
          </div>
        </section>
        <section className={`four ${pageIndex < 3 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(3);
                setToggle(!toggle);
              }}
            >
              Sections
            </h1>
            <div className="section-content">
              {Object.keys(route).length > 0 && sections.length > 0 ? (
                <Sections domain={domain} />
              ) : (
                <Message message="timetable not loaded yet!">
                  <Direction width={100} />
                </Message>
              )}
            </div>
          </div>
        </section>
        <section className={`five ${pageIndex < 4 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(4);
                setToggle(!toggle);
              }}
            >
              Map
            </h1>
            <div className="section-content">
              <Map enableGPS={pageIndex === 4} />
            </div>
          </div>
        </section>
        <section className={`six ${pageIndex < 5 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(5);
                setToggle(!toggle);
              }}
            >
              {name !== "" ? name : "Home"}
            </h1>
            <div className="section-content">
              <Home domain={domain} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default styled(Main);
