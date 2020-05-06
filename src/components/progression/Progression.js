import React, { Fragment, useEffect, useState } from "react";

import styled from "./style";

const RADIUS_OFFSET = 100;

const RadialProgessBar = ({ width = 200, height = 200, data }) => {
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
    <svg width={width} height={height} viewBox="0 0 1000 1000">
      {enhancedData &&
        enhancedData.map((item, index) => (
          <Fragment key={index}>
            <text
              x={500 + 50}
              y={100 * index + 50}
              style={{
                fontSize: 60,
                letterSpacing: 1,
                fontWeight: "lighter",
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
                  fontWeight: "lighter",
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

const Progression = ({ className, progression, routeAnalytics }) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (!routeAnalytics || !progression) return;

    const updatedData = [
      {
        label: "distance",
        color: "#42708C",
        total: routeAnalytics.distance,
        progression: progression[0],
        percent: (progression[0] * 100) / routeAnalytics.distance,
      },
      {
        label: " elevation gain",
        color: "#D9A443",
        total: routeAnalytics.elevation.positive,
        progression: progression[1],
        percent:
          (progression[1] * 100) / routeAnalytics.elevation.positive <= 100
            ? (progression[1] * 100) / routeAnalytics.elevation.positive
            : 100,
      },
      {
        label: "elevation loss",
        color: "#A6813C",
        total: routeAnalytics.elevation.negative,
        progression: progression[2],
        percent:
          (progression[2] * 100) / routeAnalytics.elevation.negative <= 100
            ? (progression[2] * 100) / routeAnalytics.elevation.negative
            : 100,
      },
    ];
    setData(updatedData);
  }, [routeAnalytics, progression]);

  return (
    <div className={className}>
      <RadialProgessBar data={data} />
      {/* <div>{`${progression[0].toFixed(2)} km`}</div>
      <div>{`${progression[1].toFixed(0)} m`}</div>
      <div>{`${progression[2].toFixed(0)} m`}</div>
      <div>{`${routeAnalytics.distance.toFixed(2)} km`}</div>
      <div>{`${routeAnalytics.elevation.positive.toFixed(0)} m`}</div>
      <div>{`${routeAnalytics.elevation.negative.toFixed(0)} m`}</div> */}
    </div>
  );
};

export default styled(Progression);
