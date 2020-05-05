import React, { useEffect, useState, useCallback, useRef } from "react";
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

const IntersectSection = ({
  root,
  setSection,
  current,
  id,
  section,
  currentLocationIndex,
  ...rest
}) => {
  const [ref, entry] = useIntersect({
    threshold: 0.5,
    root: root.current,
    rootMargin: "10px",
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (currentLocationIndex === -1) return;
    if (
      currentLocationIndex > section.indices[0] &&
      currentLocationIndex < section.indices[1]
    ) {
      const index = currentLocationIndex - section.indices[0];
      const currentLocation = section.coordinates[index];
      const marker = { x: index, y: currentLocation[2] };

      setMarkers([marker]);
    } else {
      setMarkers([]);
    }
  }, [currentLocationIndex, section]);

  useEffect(() => {
    if (entry.intersectionRatio > 0.5) setSection(id);
  }, [entry.intersectionRatio, setSection, id]);

  return (
    <Container ref={ref}>
      <Graph
        markers={markers}
        color={current ? "#D5A021" : "#D5A021"}
        {...rest}
      />
    </Container>
  );
};

const Sections = ({
  className,
  sections,
  currentSectionIndex,
  currentLocationIndex,
  setCurrentLocation,
  setCurrentLocationIndex,
  locations,
  domain,
}) => {
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
              <div>{`${sections[section].distance.toFixed(2)} km - ${sections[
                section
              ].fromKm.toFixed(2)} km - ${sections[section].toKm.toFixed(
                2
              )} km`}</div>
              <div>distance - from - to</div>
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
          setCurrentLocation={setCurrentLocation}
          setCurrentLocationIndex={setCurrentLocationIndex}
          width={getContentRect("width") || 200}
          height={120}
          locations={locations}
          currentLocationIndex={currentLocationIndex}
          domain={domain}
        />
        <div className="bottom" />
      </div>

      <div ref={root} className="section">
        {sections.map((section, index) => (
          <IntersectSection
            section={section}
            currentLocationIndex={currentLocationIndex}
            current={currentSectionIndex === index}
            setSection={setSection}
            id={index}
            root={root}
            key={index}
            locations={section.coordinates}
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
