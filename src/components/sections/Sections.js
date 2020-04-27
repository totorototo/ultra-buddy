import React, { useEffect, useState, useCallback, useRef } from "react";
import * as d3Array from "d3-array";
import { formatDistance, format } from "date-fns";

import styled from "./style";
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

const IntersectSection = ({ root, setSection, current, id, ...rest }) => {
  const [ref, entry] = useIntersect({
    threshold: 0.5,
    root: root.current,
    rootMargin: "10px",
  });

  useEffect(() => {
    if (entry.intersectionRatio > 0.5) setSection(id);
  }, [entry.intersectionRatio, setSection, id]);

  return (
    <Container ref={ref}>
      <Graph color={current ? "#D5A021" : "#D5A021"} {...rest} />
    </Container>
  );
};

const Sections = ({ className, sections, currentSectionIndex, data }) => {
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

  const [section, setSection] = useState(0);

  return (
    <div ref={ref} className={className}>
      <div className="analytics">
        <div className="data">
          <div className="index">{section + 1}</div>
          <div className="stats">
            <div className="title">
              {`${sections[section].depatureLocation} - ${sections[section].arrivalLocation}`}
            </div>
            <div className="item">
              <div>{sections[section].distance.toFixed(2)} km</div>
              <div>distance</div>
            </div>
            <div className="item">
              <div>
                {`${sections[section].elevation.positive.toFixed(
                  0
                )} m - ${sections[section].elevation.negative.toFixed(0)} m`}
              </div>
              <div>elevation D+/D-</div>
            </div>
            <div className="item">
              <div>
                {formatDistance(0, sections[section].duration, {
                  includeSeconds: true,
                })}
              </div>
              <div>duration</div>
            </div>
            <div className="item">
              <div>
                {format(new Date(sections[section].timeBarrier), "dd-MM HH:mm")}
              </div>
              <div>time barrier</div>
            </div>
          </div>
        </div>
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
          <IntersectSection
            current={currentSectionIndex === index}
            setSection={setSection}
            id={index}
            root={root}
            key={index}
            data={section.coordinates}
            width={getContentRect("width") || 200}
            height={200}
            domain={domain}
          />
        ))}
      </div>
    </div>
  );
};

export default styled(Sections);
