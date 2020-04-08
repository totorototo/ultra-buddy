import React from "react";
import xmldom from "xmldom";
import { gpx } from "@mapbox/togeojson";

import styled from "./style";
import FileUpload from "../fileUpload/FileUpload";
import { fileType } from "../fileReader/FileReader";

const Home = ({ className, setRoute }) => {
  const CONFIGURATION = {
    extension: "gpx",
    type: fileType.text,
    handleFileRead: (_, data) => {
      const xml = new xmldom.DOMParser().parseFromString(data);
      const geoJSON = gpx(xml);
      debugger;
      setRoute(geoJSON);
    },
    parameters: ["utf8"],
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
          name="valid_id"
          text="Load Data"
          configuration={CONFIGURATION}
        >
          <h1>Load Trace</h1>
        </FileUpload>

        <h1>Get Roadbook</h1>
      </div>
    </div>
  );
};

export default styled(Home);
