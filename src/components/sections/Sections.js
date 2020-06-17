import React, { useEffect, useState, useCallback, useRef } from "react";
import { formatDistance, format } from "date-fns";

import styled from "./style";
import useResizeObserver from "../../hooks/useResizeObserver";
import useIntersect from "../../hooks/useIntersect";
import Graph from "../graph/Graph";

import customStyled from "styled-components";

const Container = customStyled.div`  
  height: 100%;
  position: relative;
  scroll-snap-align: center;   

`;

const IntersectSection = ({
  root,
  setSelectedSectionIndex,
  selectedSectionIndex,
  current,
  id,
  section,
  currentLocationIndex,
  ...rest
}) => {
  const [ref, entry] = useIntersect({
    threshold: 0.8,
    root: root.current,
    rootMargin: "0px 50px 0px 50px",
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
    // console.log(id, entry.intersectionRatio);
    // if (entry.intersectionRatio > 0.8) setSection(id);
  }, [entry.intersectionRatio, setSelectedSectionIndex, id]);

  return (
    <Container
      onClick={() => {
        setSelectedSectionIndex(id);
      }}
      ref={ref}
    >
      <Graph
        markers={markers}
        color={selectedSectionIndex === id ? "#BB8725" : "#D59D34"}
        {...rest}
        offsetMax={500}
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

  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  return (
    <div ref={ref} className={className}>
      <div className="analytics">
        <div className="data">
          <div className="index">{selectedSectionIndex + 1}</div>
          <div className="stats">
            <div className="title">
              {`${sections[selectedSectionIndex].depatureLocation} - ${sections[selectedSectionIndex].arrivalLocation}`}
            </div>
            <div className="item">
              <div>{`${(sections[selectedSectionIndex].distance / 1000).toFixed(
                2
              )} km - ${(sections[selectedSectionIndex].fromKm / 1000).toFixed(
                2
              )} km - ${(sections[selectedSectionIndex].toKm / 1000).toFixed(
                2
              )} km`}</div>
              <div>distance - from - to</div>
            </div>
            <div className="item">
              <div>
                {`${sections[selectedSectionIndex].elevation.positive.toFixed(
                  0
                )} m - ${sections[
                  selectedSectionIndex
                ].elevation.negative.toFixed(0)} m`}
              </div>
              <div>elevation D+/D-</div>
            </div>
            <div className="item">
              <div>
                {formatDistance(0, sections[selectedSectionIndex].duration, {
                  includeSeconds: true,
                })}
              </div>
              <div>duration</div>
            </div>
            <div className="item">
              <div>
                {format(
                  new Date(sections[selectedSectionIndex].cutOffTime),
                  "dd-MM HH:mm"
                )}
              </div>
              <div>time barrier</div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile">
        <Graph
          setCurrentLocation={setCurrentLocation}
          width={getContentRect("width") || 200}
          height={300}
          locations={locations}
          color="#357597"
          currentLocationIndex={currentLocationIndex}
          domain={domain}
          offsetMin={5000}
        />
      </div>

      <div ref={root} className="section">
        {sections.map((section, index) => (
          <IntersectSection
            section={section}
            currentLocationIndex={currentLocationIndex}
            current={currentSectionIndex === index}
            setSelectedSectionIndex={setSelectedSectionIndex}
            selectedSectionIndex={selectedSectionIndex}
            id={index}
            root={root}
            key={index}
            locations={section.coordinates}
            width={
              (getContentRect("width") * section.distance) / 1000 / 38 || 200
            }
            height={200}
            domain={domain}
          />
        ))}
      </div>
    </div>
  );
};

export default styled(Sections);
