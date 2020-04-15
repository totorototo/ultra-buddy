import React, { useEffect, useState, useCallback, useRef } from "react";
import * as d3Array from "d3-array";

import styled from "./style";
import Section from "../sections/section/Section";
import useResizeObserver from "../../hooks/useResizeObserver";
import useIntersect from "../../hooks/useIntersect";
import Graph from "../graph/Graph";

import customStyled from "styled-components";

const Container = customStyled.div`
  align-self: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  position: relative;
  scroll-snap-align: center;
  flex: none;
`;

const IntersectBox = ({ root, setCurrentSection, name, ...rest }) => {
  const [ref, entry] = useIntersect({
    threshold: 0.5,
    root: root.current,
    rootMargin: "10px",
  });

  useEffect(() => {
    if (entry.intersectionRatio > 0.5) setCurrentSection(name);
  }, [entry.intersectionRatio, setCurrentSection, name]);

  return (
    <Container
      ratio={entry.intersectionRatio}
      ref={ref}
      className={entry.intersectionRatio > 0.6 && "active"}
    >
      <Graph {...rest} />
    </Container>
  );
};

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

  const root = useRef(null);

  const [currentSection, setCurrentSection] = useState(0);

  return (
    <div ref={ref} className={className}>
      <div className="analytics">
        {/* <div className="row">current section analytics</div>
        <div className="row">to be displayed</div> */}
        {currentSection}
      </div>
      <div className="profile">
        <Graph
          width={getContentRect("width") || 200}
          height={120}
          data={data}
          domain={domain}
        />
        <div className="bottom" />
      </div>

      <div ref={root} className="section">
        {sections.map((section, index) => (
          <IntersectBox
            setCurrentSection={setCurrentSection}
            name={index}
            root={root}
            key={index}
            data={section.coordinates}
            width={getContentRect("width") || 200}
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
