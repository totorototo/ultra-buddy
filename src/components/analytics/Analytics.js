import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import styled from "./style";
import RadialProgressBar from "../radialProgressBar/RadialProgressBar";
import {
  sectionsState,
  currentSectionIndexState,
  runnerAnalyticsState,
  routeAnalyticsState,
} from "../../model";

const Analytics = ({ className }) => {
  const runnerAnalytics = useRecoilValue(runnerAnalyticsState);
  const routeAnalytics = useRecoilValue(routeAnalyticsState);
  const sections = useRecoilValue(sectionsState);
  const currentSectionIndex = useRecoilValue(currentSectionIndexState);

  const [data, setData] = useState();
  const [distanceToNextCheckpoint, setDistanceToNextCheckpoint] = useState(0);

  useEffect(() => {
    if (
      currentSectionIndex < 0 ||
      runnerAnalytics.length === 0 ||
      sections.length === 0
    )
      return;

    const remaining = sections[currentSectionIndex].toKm - runnerAnalytics[0];
    setDistanceToNextCheckpoint(remaining);
  }, [currentSectionIndex, sections, runnerAnalytics]);

  useEffect(() => {
    if (
      Object.keys(routeAnalytics).length === 0 ||
      runnerAnalytics.length === 0
    ) {
      return;
    }

    const updatedData = [
      {
        label: "distance",
        color: "#42708C",
        total: routeAnalytics.distance,
        runnerAnalytics: runnerAnalytics[0],
        percent: (runnerAnalytics[0] * 100) / routeAnalytics.distance,
      },
      {
        label: " elevation gain",
        color: "#D9A443",
        total: routeAnalytics.elevation.positive,
        runnerAnalytics: runnerAnalytics[1],
        percent:
          (runnerAnalytics[1] * 100) / routeAnalytics.elevation.positive <= 100
            ? (runnerAnalytics[1] * 100) / routeAnalytics.elevation.positive
            : 100,
      },
      {
        label: "elevation loss",
        color: "#bb3439",
        total: routeAnalytics.elevation.negative,
        runnerAnalytics: runnerAnalytics[2],
        percent:
          (runnerAnalytics[2] * 100) / routeAnalytics.elevation.negative <= 100
            ? (runnerAnalytics[2] * 100) / routeAnalytics.elevation.negative
            : 100,
      },
    ];
    setData(updatedData);
  }, [routeAnalytics, runnerAnalytics]);

  return (
    <div className={className}>
      <RadialProgressBar data={data} />
      {currentSectionIndex >= 0 && (
        <div className="analytics">
          <div className="item checkpoint">{`${(
            distanceToNextCheckpoint / 1000
          ).toFixed(2)} km to ${
            sections[currentSectionIndex].arrivalLocation
          }`}</div>
          <div className="item distance">{`${(
            runnerAnalytics[0] / 1000
          ).toFixed(2)} km ran`}</div>
          <div className="item gain">{`${runnerAnalytics[1].toFixed(
            0
          )} m climbed`}</div>
          <div className="item loss">{`${runnerAnalytics[2].toFixed(
            0
          )} m descended`}</div>
        </div>
      )}
    </div>
  );
};

export default styled(Analytics);
