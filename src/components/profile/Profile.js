import React, { useCallback, useEffect, useState } from "react";
import * as d3Array from "d3-array";

import styled from "./style";
import useResizeObserver from "../../hooks/useResizeObserver";
import Graph from "../graph/Graph";

const Profile = ({ className, data }) => {
  const [domain, setDomain] = useState({
    x: { min: 0, max: 0 },
    y: { min: 0, max: 0 },
  });
  const [ref, { contentRect }] = useResizeObserver();

  const getContentRect = useCallback(
    (key) => {
      return contentRect && Math.round(contentRect[key]);
    },
    [contentRect]
  );

  useEffect(() => {
    const altitudes = data.map((location) => location[2]);
    const extentY = d3Array.extent(altitudes);
    const lowerFullHundred = Math.floor(extentY[0] / 100) * 100;
    setDomain((domain) => ({
      ...domain,
      x: { min: 0, max: data.length },
      y: { min: lowerFullHundred, max: extentY[1] },
    }));
  }, [data]);

  return (
    <div ref={ref} className={className}>
      <Graph
        width={getContentRect("width")}
        height={getContentRect("height")}
        data={data}
        domain={domain}
      />
    </div>
  );
};

export default styled(Profile);
