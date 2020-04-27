import React, { useState, useEffect } from "react";
import xmldom from "xmldom";
import { gpx } from "@mapbox/togeojson";
import { UploadCloud, Check } from "@styled-icons/feather";
import { csvParse } from "d3-dsv";
import { formatDistanceToNow } from "date-fns";

import styled from "./style";
import FileUpload from "../fileUpload/FileUpload";
import { fileType } from "../fileReader/FileReader";

const Home = ({
  className,
  setRoute,
  setCheckpoints,
  setSections,
  route,
  checkpoints,
}) => {
  const [step, setStep] = useState(0);

  const CONFIGURATIONS = [
    {
      extension: "gpx",
      type: fileType.text,
      handleFileRead: (_, data) => {
        const xml = new xmldom.DOMParser().parseFromString(data);
        const geoJSON = gpx(xml);
        setCheckpoints(null);
        setSections(null);
        setRoute(geoJSON);
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
    <div className={className}>
      <div className="steps">
        <div className={`item ${step > 0 ? "done" : ""}`}>
          <div className="index">{step > 0 ? <Check size="40" /> : "1"}</div>
          <div className="label">trace</div>
        </div>
        <div className={`connecting-line ${step > 0 ? "done" : ""}`} />
        <div className={`item ${step > 1 ? "done" : ""}`}>
          <div className="index">{step > 1 ? <Check size="40" /> : "2"}</div>
          <div className="label">roadbook</div>
        </div>
        <div className={`connecting-line ${step > 1 ? "done" : ""}`} />
        <div className={`item ${step > 2 ? "done" : ""}`}>
          <div className="index">{step >= 2 ? <Check size="40" /> : "3"}</div>
          <div className="label">summary</div>
        </div>
      </div>
      {step < 2 ? (
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
      ) : (
        <div className="summary">
          {checkpoints && checkpoints.length > 0 && (
            <div>
              {formatDistanceToNow(new Date(checkpoints[0].timeBarrier), {
                addSuffix: true,
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default styled(Home);
