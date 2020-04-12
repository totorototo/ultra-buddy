import React, { useState, useEffect } from "react";
import * as d3Array from "d3-array";
import { LinearGradient } from "@vx/gradient";

import styled from "./style";
import { getArea, createXScale, createYScale } from "../../helpers/d3";

const Gradient = ({ from = "#398AB8", to = "#FFFFFF00", ...restProps }) => {
  return <LinearGradient from={from} to={to} {...restProps} />;
};

const Graph = ({ className, width, height, data = [] }) => {
  const [scales, setScales] = useState({});
  const [shape, setShape] = useState();

  useEffect(() => {
    const x = createXScale(
      {
        min: 0,
        max: data.length,
      },
      { min: 0, max: width }
    );
    // Collect all y values.
    const altitudes = data.map((location) => location[2]);

    // Get the min and max y value.
    const extentY = d3Array.extent(altitudes);
    const lowerFullHundred = Math.floor(extentY[0] / 100) * 100;

    // Create our y-scale.
    const y = createYScale(
      { min: lowerFullHundred, max: extentY[1] + extentY[1] * 0.1 },
      { min: 0, max: height }
    );
    setScales({ x, y });
    const area = getArea(data, x, y, lowerFullHundred);
    setShape(area);
  }, [width, height, data.length]); // TODO: fix dependency issue

  return data.length > 0 && shape ? (
    <svg height={height} width={width} className={className}>
      <Gradient id="gradient" />
      <path
        d={shape.path}
        stroke="#AA2211"
        strokeWidth="1"
        fill="white"
        fillOpacity="1"
      />
    </svg>
  ) : (
    <div>loading</div>
  );
};

export default styled(Graph);
