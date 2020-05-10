import React, { useEffect, useState } from "react";

import styled from "./style";
import RadialProgessBar from "../radialProgressBar/RadialProgressBar";

const Progression = ({
  className,
  progression,
  routeAnalytics,
  sections,
  currentSectionIndex,
}) => {
  const [data, setData] = useState();
  const [NextCheckpointDistance, setNextCheckpointDistance] = useState(0);

  useEffect(() => {
    if (currentSectionIndex < 0 || !progression || !sections) return;

    const remaining = sections[currentSectionIndex].toKm - progression[0];
    setNextCheckpointDistance(remaining);
  }, [currentSectionIndex, sections, progression]);

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
        color: "#DC0073",
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
      <div className="analytics">
        <div className="item distance">{`${progression[0].toFixed(2)} km`}</div>
        <div className="item gain">{`${progression[1].toFixed(0)} m`}</div>
        <div className="item loss">{`${progression[2].toFixed(0)} m`}</div>
        <div className="item checkpoint">{`${NextCheckpointDistance.toFixed(
          2
        )} km`}</div>
      </div>
    </div>
  );
};

export default styled(Progression);
