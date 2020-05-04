import React, { useState, useEffect } from "react";
import { LinearGradient } from "@vx/gradient";

import styled from "./style";
import { getArea, createXScale, createYScale } from "../../helpers/d3";

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
}) => {
  const [profile, setProfile] = useState();
  const [progression, setProgression] = useState();
  const [scales, setScales] = useState({});

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

    // Create our y-scale.
    const y = createYScale(
      { min: domain.y.min, max: domain.y.max },
      { min: 0, max: height }
    );

    setScales({ x, y });
  }, [width, height, locations, domain]);

  return locations.length > 0 && profile ? (
    <div className={className} style={{ width, height }}>
      <svg height={height} width={width}>
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
            fill={color ? color : "url(#gradient)"}
          />
        )}
      </svg>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default styled(Graph);
