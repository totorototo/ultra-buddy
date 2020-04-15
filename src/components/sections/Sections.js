import React, { useEffect, useState, useCallback } from "react";
import * as d3Array from "d3-array";

import styled from "./style";
import Section from "../sections/section/Section";
import useResizeObserver from "../../hooks/useResizeObserver";
import Graph from "../graph/Graph";

const Sections = ({ className, sections, data }) => {
  const [domain, setDomain] = useState({
    x: { min: 0, max: 0 },
    y: { min: 0, max: 0 },
  });

  useEffect(() => {
    const altitudes = data.map((location) => location[2]);
    const extentY = d3Array.extent(altitudes);
    const lowerFullHundred = Math.floor(extentY[0] / 100) * 100;
    setDomain((domain) => ({
      ...domain,
      x: { min: 0, max: data.length },
      y: { min: lowerFullHundred, max: extentY[1] },
    }));
  }, [data]);

  const [ref, { contentRect }] = useResizeObserver();

  const getContentRect = useCallback(
    (key) => {
      return contentRect && Math.round(contentRect[key]);
    },
    [contentRect]
  );

  return (
    <div ref={ref} className={className}>
      <div className="analytics">
        {/* <div className="row">current section analytics</div>
        <div className="row">to be displayed</div> */}
      </div>
      <div className="profile">
        <Graph
          width={getContentRect("width")}
          height={120}
          data={data}
          domain={domain}
        />
        <div className="bottom" />
      </div>

      <div className="section">
        {sections.map((section, index) => (
          <Section
            key={index}
            data={section.coordinates}
            width={getContentRect("width")}
            height={200}
            domain={domain}
            color="#D5A021"
          />
        ))}
      </div>
    </div>
  );
};

export default styled(Sections);
