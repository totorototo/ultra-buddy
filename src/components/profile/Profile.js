import React, { useCallback } from "react";

import styled from "./style";
import useResizeObserver from "../../hooks/useResizeObserver";
import Graph from "../graph/Graph";

const Profile = ({ className, data }) => {
  const [ref, { contentRect }] = useResizeObserver();

  const getContentRect = useCallback(
    (key) => {
      return contentRect && Math.round(contentRect[key]);
    },
    [contentRect]
  );

  return (
    <div ref={ref} className={className}>
      <Graph
        width={getContentRect("width")}
        height={getContentRect("height")}
        data={data}
      />
    </div>
  );
};

export default styled(Profile);
