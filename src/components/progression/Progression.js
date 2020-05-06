import React from "react";

import styled from "./style";

const Progression = ({ className, progression, routeAnalytics }) => {
  return (
    <div className={className}>
      <div>{`${progression[0].toFixed(2)} km`}</div>
      <div>{`${progression[1].toFixed(0)} m`}</div>
      <div>{`${progression[2].toFixed(0)} m`}</div>
      <div>{`${routeAnalytics.distance.toFixed(2)} km`}</div>
      <div>{`${routeAnalytics.elevation.positive.toFixed(0)} m`}</div>
      <div>{`${routeAnalytics.elevation.negative.toFixed(0)} m`}</div>
    </div>
  );
};

export default styled(Progression);
