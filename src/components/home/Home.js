import React from "react";
import xmldom from "xmldom";
import { gpx } from "@mapbox/togeojson";
import { csvParse } from "d3-dsv";

import styled from "./style";
import FileUpload from "../fileUpload/FileUpload";
import { fileType } from "../fileReader/FileReader";

const Home = ({ className, setRoute, setCheckpoints }) => {
  const GPX_CONFIGURATION = {
    extension: "gpx",
    type: fileType.text,
    handleFileRead: (_, data) => {
      const xml = new xmldom.DOMParser().parseFromString(data);
      const geoJSON = gpx(xml);
      setRoute(geoJSON);
    },
    parameters: ["utf8"],
  };

  const CVS_CONFIGURATION = {
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
  };

  return (
    <div className={className}>
      <div className="carousel x-mandatory x-scroll">
        <div className="wrapper">
          <div className="element">1</div>
          <div className="element">2</div>
          <div className="element">3</div>
          <div className="element">4</div>
        </div>
      </div>
      <div className="commands">
        <FileUpload
          name="gpx"
          text="Load Data"
          configuration={GPX_CONFIGURATION}
        >
          <h1>Load Trace</h1>
        </FileUpload>

        <FileUpload
          name="cvs"
          text="Load Data"
          configuration={CVS_CONFIGURATION}
        >
          <h1>Get Roadbook</h1>
        </FileUpload>
      </div>
    </div>
  );
};

export default styled(Home);
