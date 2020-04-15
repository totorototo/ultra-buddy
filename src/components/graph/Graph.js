import React, { useState, useEffect } from "react";
import { LinearGradient } from "@vx/gradient";

import styled from "./style";
import { getArea, createXScale, createYScale } from "../../helpers/d3";

const Gradient = ({ from = "#398AB8", to = "#FFFFFF00", ...restProps }) => {
  return <LinearGradient from={from} to={to} {...restProps} />;
};

const Graph = ({ className, width, height, data = [], domain, color }) => {
  const [shape, setShape] = useState();

  useEffect(() => {
    const x = createXScale(
      {
        min: 0,
        max: data.length,
      },
      { min: 0, max: width }
    );

    // Create our y-scale.
    const y = createYScale(
      { min: domain.y.min, max: domain.y.max },
      { min: 0, max: height }
    );

    const area = getArea(data, x, y, domain.y.min);
    setShape(area);
  }, [width, height, data, domain]); // TODO: fix dependency issue

  return data.length > 0 && shape ? (
    <div className={className} style={{ width, height }}>
      <svg height={height} width={width}>
        <Gradient id="gradient" />
        <path
          d={shape.path}
          stroke={color ? color : "#ffffff94"}
          strokeWidth="0"
          fill={color ? color : "#ffffff94"}
        />
      </svg>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default styled(Graph);
