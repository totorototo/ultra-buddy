import React, { useEffect, useState } from "react";
import { LinearGradient } from "@vx/gradient";

import styled from "./style";
import { createXScale, createYScale, getArea } from "../../helpers/d3";

const MARKER_WIDTH = 30;

const Marker = ({ width, height, x, y }) => (
  <svg height={height} viewBox="0 0 512 512" width={width} x={x} y={y - height}>
    <g>
      <path
        fill="#A31621"
        d="M256,0C156.698,0,76,80.7,76,180c0,33.6,9.302,66.301,27.001,94.501l140.797,230.414
	c2.402,3.9,6.002,6.301,10.203,6.901c5.698,0.899,12.001-1.5,15.3-7.2l141.2-232.516C427.299,244.501,436,212.401,436,180
	C436,80.7,355.302,0,256,0z M256,270c-50.398,0-90-40.8-90-90c0-49.501,40.499-90,90-90s90,40.499,90,90
	C346,228.9,306.999,270,256,270z"
      />
      <path
        fill="#90141E"
        d="M256,0v90c49.501,0,90,40.499,90,90c0,48.9-39.001,90-90,90v241.991
	c5.119,0.119,10.383-2.335,13.3-7.375L410.5,272.1c16.799-27.599,25.5-59.699,25.5-92.1C436,80.7,355.302,0,256,0z"
      />
    </g>
  </svg>
);

const Gradient = ({
  from = "#FFFFFF30",
  to = "#FFFFFF00",
  toOffset = "50%",
  ...restProps
}) => {
  return (
    <LinearGradient from={from} to={to} toOffset={toOffset} {...restProps} />
  );
};

const Graph = ({
  className,
  width,
  height,
  locations = [],
  currentLocationIndex = -1,
  domain,
  color,
  markers = [],
  setCurrentLocation = () => {},
  offsetMin = 0,
  offsetMax = 0,
  displayPeaks = false,
  peaks = [],
}) => {
  const [profile, setProfile] = useState();
  const [progression, setProgression] = useState();
  const [scales, setScales] = useState({});

  const handleClick = (event) => {
    if (!scales.x) return;
    const index = Math.round(scales.x.invert(event.nativeEvent.offsetX));
    setCurrentLocation(locations[index]);
  };

  useEffect(() => {
    if (currentLocationIndex === -1 || !scales.x || !scales.y) return;
    const locationsVisited = locations.slice(0, currentLocationIndex);
    const progress = getArea(
      locationsVisited,
      scales.x,
      scales.y,
      domain.y.min - offsetMin
    );
    setProgression(progress);
  }, [currentLocationIndex, domain, locations, scales, offsetMin]);

  useEffect(() => {
    if (!scales.x || !scales.y) return;
    const area = getArea(
      locations,
      scales.x,
      scales.y,
      domain.y.min - offsetMin
    );

    setProfile(area);
  }, [scales, locations, domain, offsetMin]);

  useEffect(() => {
    const x = createXScale(
      {
        min: 0,
        max: locations.length - 1,
      },
      { min: 0, max: width }
    );

    const y = createYScale(
      { min: domain.y.min - offsetMin, max: domain.y.max + offsetMax },
      { min: 0, max: height }
    );

    setScales({ x, y });
  }, [width, height, locations, domain, offsetMin, offsetMax]);

  return locations.length > 0 && profile ? (
    <div className={className} style={{ width, height }}>
      <svg
        onClick={handleClick}
        height={height}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
      >
        <Gradient id="gradient" />
        <path
          d={profile.path}
          stroke={color ? color : "#ffffff94"}
          strokeWidth="1"
          fill={color ? color : "#ffffff94"}
        />
        {progression && (
          <path
            d={progression.path}
            // stroke={color ? color : "#ffffff94"}
            strokeWidth="0"
            fill={color ? "url(#gradient)" : "url(#gradient)"}
          />
        )}
        {displayPeaks &&
          peaks.length > 0 &&
          peaks.map((peak, index) => (
            <text
              x={scales.x(peak)}
              y={scales.y(locations[peak][2]) - 10}
              key={index}
            >
              {locations[peak][2].toFixed(0)}
            </text>
          ))}
        {markers &&
          scales &&
          markers.length > 0 &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              x={scales.x(marker.x) - MARKER_WIDTH / 2}
              y={scales.y(marker.y)}
              width={MARKER_WIDTH}
              height={MARKER_WIDTH}
            />
          ))}
      </svg>
    </div>
  ) : null;
};

export default styled(Graph);
