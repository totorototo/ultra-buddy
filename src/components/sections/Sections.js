import React, { useEffect, useState, useCallback, useRef } from "react";
import { formatDistance, format } from "date-fns";
import { useRecoilValue, useSetRecoilState } from "recoil";

import styled from "./style";
import useResizeObserver from "../../hooks/useResizeObserver";
import useIntersect from "../../hooks/useIntersect";
import Graph from "../graph/Graph";
import customStyled from "styled-components";
import {
  sectionsState,
  currentSectionIndexState,
  currentLocationIndexState,
  currentLocationState,
  locationsState,
  domainState,
} from "../../model";

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
  peaks,
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
      currentLocationIndex >= section.indices[0] &&
      currentLocationIndex < section.indices[1]
    ) {
      const index = currentLocationIndex - section.indices[0];
      const currentLocation = section.coordinates[index];
      const marker = { x: index, y: currentLocation[2] };

      setSelectedSectionIndex(id);

      setMarkers([marker]);
    } else {
      setMarkers([]);
    }
  }, [currentLocationIndex, section, setSelectedSectionIndex, id]);

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
        displayPeaks
        peaks={peaks}
        markers={markers}
        color={selectedSectionIndex === id ? "#CB932A" : "#D59D34"}
        {...rest}
        offsetMax={500}
      />
    </Container>
  );
};

const Sections = ({ className }) => {
  const locations = useRecoilValue(locationsState);
  const sections = useRecoilValue(sectionsState);
  const currentSectionIndex = useRecoilValue(currentSectionIndexState);
  const domain = useRecoilValue(domainState);
  const currentLocationIndex = useRecoilValue(currentLocationIndexState);
  const setCurrentLocation = useSetRecoilState(currentLocationState);

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
              {`${sections[selectedSectionIndex].departureLocation} - ${sections[selectedSectionIndex].arrivalLocation}`}
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
            peaks={section.peaks}
            width={
              Math.trunc(
                (getContentRect("width") * section.distance) / 1000 / 40
              ) || 200
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
