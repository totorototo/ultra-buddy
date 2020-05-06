import React, { useState, useEffect } from "react";
import { LinearGradient } from "@vx/gradient";

import styled from "./style";
import { getArea, createXScale, createYScale } from "../../helpers/d3";

const MARKER_WIDTH = 30;

const Marker = ({ width, height, x, y }) => (
  <svg height={height} viewBox="0 0 512 512" width={width} x={x} y={y - height}>
    <g>
      <path
        fill="#FD003A"
        d="M256,0C156.698,0,76,80.7,76,180c0,33.6,9.302,66.301,27.001,94.501l140.797,230.414
	c2.402,3.9,6.002,6.301,10.203,6.901c5.698,0.899,12.001-1.5,15.3-7.2l141.2-232.516C427.299,244.501,436,212.401,436,180
	C436,80.7,355.302,0,256,0z M256,270c-50.398,0-90-40.8-90-90c0-49.501,40.499-90,90-90s90,40.499,90,90
	C346,228.9,306.999,270,256,270z"
      />
      <path
        fill="#E50027"
        d="M256,0v90c49.501,0,90,40.499,90,90c0,48.9-39.001,90-90,90v241.991
	c5.119,0.119,10.383-2.335,13.3-7.375L410.5,272.1c16.799-27.599,25.5-59.699,25.5-92.1C436,80.7,355.302,0,256,0z"
      />
    </g>
  </svg>
);

const Gradient = ({ from = "#FFFFFF94", to = "#FFFFFF00", ...restProps }) => {
  return <LinearGradient from={from} to={to} {...restProps} />;
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
  setCurrentLocationIndex = () => {},
}) => {
  const [profile, setProfile] = useState();
  const [progression, setProgression] = useState();
  const [scales, setScales] = useState({});

  const handleClick = (event) => {
    if (!scales.x) return;
    const index = Math.round(scales.x.invert(event.nativeEvent.offsetX));
    setCurrentLocationIndex(index);
    setCurrentLocation(locations[index]);
  };

  useEffect(() => {
    if (currentLocationIndex === -1 || !scales.x || !scales.y) return;
    const locationsVisited = locations.slice(0, currentLocationIndex);
    const progress = getArea(
      locationsVisited,
      scales.x,
      scales.y,
      domain.y.min
    );
    setProgression(progress);
  }, [currentLocationIndex, domain, locations, scales]);

  useEffect(() => {
    if (!scales.x || !scales.y) return;
    const area = getArea(locations, scales.x, scales.y, domain.y.min);
    setProfile(area);
  }, [scales, locations, domain]);

  useEffect(() => {
    const x = createXScale(
      {
        min: 0,
        max: locations.length,
      },
      { min: 0, max: width }
    );

    const y = createYScale(
      { min: domain.y.min, max: domain.y.max * 1.2 },
      { min: 0, max: height }
    );

    setScales({ x, y });
  }, [width, height, locations, domain]);

  return locations.length > 0 && profile ? (
    <div className={className} style={{ width, height }}>
      <svg onClick={handleClick} height={height} width={width}>
        <Gradient id="gradient" />
        <path
          d={profile.path}
          // stroke={color ? color : "#ffffff94"}
          strokeWidth="0"
          fill={color ? color : "#ffffff94"}
        />
        {progression && (
          <path
            d={progression.path}
            // stroke={color ? color : "#ffffff94"}
            strokeWidth="0"
            fill={color ? "color" : "url(#gradient)"}
          />
        )}
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
  ) : (
    <div>loading</div>
  );
};

export default styled(Graph);
