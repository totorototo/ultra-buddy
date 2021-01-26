import React, { Fragment, useEffect, useState } from "react";

import styled from "./style";

const RADIUS_OFFSET = 100;

const RadialProgressBar = ({ className, width = 250, height = 250, data }) => {
  const [enhancedData, setEnhancedData] = useState();

  useEffect(() => {
    if (!data) return;
    const enhancedData = data.map((item, index) => {
      const radius = 900 / 2 - RADIUS_OFFSET * index;
      const strokeDasharray = 2 * Math.PI * radius;
      const strokeDashoffset =
        strokeDasharray * (1 - (item.percent * 0.75) / 100);
      return { ...item, strokeDasharray, strokeDashoffset, radius };
    });

    setEnhancedData(enhancedData);
  }, [data]);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 1000 1000"
    >
      {enhancedData &&
        enhancedData.map((item, index) => (
          <Fragment key={index}>
            <text
              x={500 + 50}
              y={100 * index + 50}
              style={{
                fontSize: 60,
                letterSpacing: 1,
                // fontWeight: "lighter",
                fill: "white",
              }}
            >
              {item.label}
            </text>
            <circle
              id={`${index}-progress`}
              key={`${index}-inside`}
              cx={500}
              cy={500}
              r={item.radius}
              strokeWidth="1"
              stroke="#ffffff"
              fill="none"
              strokeDasharray={item.strokeDasharray}
              strokeLinecap="round"
              strokeDashoffset={item.strokeDasharray * (1 - 75 / 100)}
            />
            <circle
              key={`${index}-outside`}
              cx={500}
              cy={500}
              r={item.radius}
              strokeWidth={1000 / 15}
              stroke={item.color}
              fill="none"
              strokeDasharray={item.strokeDasharray}
              strokeDashoffset={item.strokeDashoffset}
            />
            <text key={`${index}-text-circle`}>
              <textPath
                style={{
                  fontSize: 60,
                  letterSpacing: 1,
                  // fontWeight: "lighter",
                  fill: "white",
                }}
                href={`#${index}-progress`}
                startOffset={`${item.percent * 0.75 + 1}%`}
              >
                {`${item.percent.toFixed(0)}%`}
              </textPath>
            </text>
          </Fragment>
        ))}
    </svg>
  );
};

export default styled(RadialProgressBar);
