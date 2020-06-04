import React, { useState, useEffect, useCallback } from "react";
import xmldom from "xmldom";
import { gpx } from "@mapbox/togeojson";
import { UploadCloud, Check } from "@styled-icons/feather";
import { csvParse } from "d3-dsv";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useSetRecoilState } from "recoil";
import { differenceInMilliseconds } from "date-fns";
import * as d3Array from "d3-array";

import styled from "./style";
import FileUpload from "../fileUpload/FileUpload";
import { fileType } from "../fileReader/FileReader";
import useResizeObserver from "../../hooks/useResizeObserver";
import Graph from "../graph/Graph";
import {
  checkpointsState,
  sectionsState,
  locationsState,
  nameState,
  routeState,
  domainState,
  routeAnalyticsState,
} from "../../model";
import trace from "../../helpers/trace";

const Home = ({ className }) => {
  const [route, setRoute] = useRecoilState(routeState);
  const [checkpoints, setCheckpoints] = useRecoilState(checkpointsState);
  const setName = useSetRecoilState(nameState);
  const [locations, setLocations] = useRecoilState(locationsState);
  const setSections = useSetRecoilState(sectionsState);
  const [domain, setDomain] = useRecoilState(domainState);
  const setRouteAnalytics = useSetRecoilState(routeAnalyticsState);

  const [step, setStep] = useState(0);
  const [helper, setHelper] = useState();
  const [ref, { contentRect }] = useResizeObserver();

  const getContentRect = useCallback(
    (key) => {
      return contentRect && Math.round(contentRect[key]);
    },
    [contentRect]
  );

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
        region: helper.computeRegion(),
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
  }, [checkpoints, locations, helper, setSections]);

  // get trace stats
  useEffect(() => {
    if (!helper) return;
    const distance = helper.computeDistance();
    const elevation = helper.computeElevation();
    setRouteAnalytics({ distance, elevation });
  }, [helper, setRouteAnalytics]);

  // set route helper
  useEffect(() => {
    if (locations.length === 0) return;
    const helper = trace(...locations);
    setHelper(helper);
  }, [locations]);

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
  }, [locations, setDomain]);

  // set route
  useEffect(() => {
    if (Object.keys(route).length === 0) return;
    setLocations(route.features[0].geometry.coordinates);
  }, [route, setLocations]);

  const CONFIGURATIONS = [
    {
      extension: "gpx",
      type: fileType.text,
      handleFileRead: (filename, data) => {
        const xml = new xmldom.DOMParser().parseFromString(data);
        const geoJSON = gpx(xml);
        setCheckpoints([]);
        setSections([]);
        setRoute(geoJSON);
        const name = filename
          .substr(0, filename.lastIndexOf("."))
          .replace(/([-_.*+?^$|(){}[\]])/gm, " ");
        setName(name);
      },
      parameters: ["utf8"],
    },
    {
      extension: "csv",
      type: fileType.text,
      handleFileRead: (_, data) => {
        const csv = csvParse(data);
        const { columns, ...rest } = csv;
        const checkpoints = Object.values(rest).filter(
          (location) =>
            location.cutOffTime || !/^\s*$/.test(location.cutOffTime)
          // ||
          // location.refueling ||
          // !/^\s*$/.test(location.refueling)
        );
        setCheckpoints(checkpoints);
      },
      parameters: [],
    },
  ];

  useEffect(() => {
    if (Object.keys(route).length === 0 && checkpoints.length === 0) setStep(0);
    if (Object.keys(route).length > 0 && checkpoints.length === 0) setStep(1);
    if (Object.keys(route).length > 0 && checkpoints.length > 0) setStep(2);
  }, [checkpoints, route, setStep]);

  return (
    <div ref={ref} className={className}>
      {step < 2 ? (
        <div className="wrapper">
          <div className="steps">
            <div className={`item ${step > 0 ? "done" : ""}`}>
              <div className="index">
                {step > 0 ? <Check size="40" /> : "1"}
              </div>
              <div className="label">trace</div>
            </div>
            <div className={`connecting-line ${step > 0 ? "done" : ""}`} />
            <div className={`item ${step > 1 ? "done" : ""}`}>
              <div className="index">
                {step > 1 ? <Check size="40" /> : "2"}
              </div>
              <div className="label">timetable</div>
            </div>
            <div className={`connecting-line ${step > 1 ? "done" : ""}`} />
            <div className={`item ${step > 2 ? "done" : ""}`}>
              <div className="index">
                {step >= 2 ? <Check size="40" /> : "3"}
              </div>
              <div className="label">summary</div>
            </div>
          </div>

          <div className="content">
            <div className="commands">
              <UploadCloud size="48" />
              <p>
                {`drag and drop ${CONFIGURATIONS[step].extension} file here`}{" "}
                <br />
                or
              </p>
              <FileUpload
                name={CONFIGURATIONS[step].extension}
                text="Load Data"
                configuration={CONFIGURATIONS[step]}
              >
                <div className="file-upload">browse files</div>
              </FileUpload>
            </div>
          </div>
        </div>
      ) : (
        <div className="summary">
          {checkpoints &&
            checkpoints.length > 0 &&
            locations &&
            locations.length > 0 && (
              <>
                <p>
                  {formatDistanceToNow(new Date(checkpoints[0].cutOffTime), {
                    addSuffix: true,
                  })}
                </p>

                <Graph
                  width={getContentRect("width") || 200}
                  height={200}
                  locations={locations}
                  domain={domain}
                  offsetMin={3000}
                  opacity={0.1}
                />
              </>
            )}
        </div>
      )}
    </div>
  );
};

export default styled(Home);
