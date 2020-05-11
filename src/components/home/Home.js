import React, { useState, useEffect, useCallback } from "react";
import xmldom from "xmldom";
import { gpx } from "@mapbox/togeojson";
import { UploadCloud, Check } from "@styled-icons/feather";
import { csvParse } from "d3-dsv";
import { formatDistanceToNow } from "date-fns";

import styled from "./style";
import FileUpload from "../fileUpload/FileUpload";
import { fileType } from "../fileReader/FileReader";
import useResizeObserver from "../../hooks/useResizeObserver";
import Graph from "../graph/Graph";

const Home = ({
  className,
  setRoute,
  setCheckpoints,
  setSections,
  route,
  checkpoints,
  domain,
  locations,
  setName,
  name,
}) => {
  const [step, setStep] = useState(0);
  const [ref, { contentRect }] = useResizeObserver();

  const getContentRect = useCallback(
    (key) => {
      return contentRect && Math.round(contentRect[key]);
    },
    [contentRect]
  );

  const CONFIGURATIONS = [
    {
      extension: "gpx",
      type: fileType.text,
      handleFileRead: (filename, data) => {
        const xml = new xmldom.DOMParser().parseFromString(data);
        const geoJSON = gpx(xml);
        setCheckpoints(null);
        setSections(null);
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
            location.timeBarrier || !/^\s*$/.test(location.timeBarrier)
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
    if (!route && !checkpoints) setStep(0);
    if (route && !checkpoints) setStep(1);
    if (route && checkpoints) setStep(2);
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
              <div className="label">roadbook</div>
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
                  {formatDistanceToNow(new Date(checkpoints[0].timeBarrier), {
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
