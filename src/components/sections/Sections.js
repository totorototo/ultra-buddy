import React, { useCallback } from "react";

import styled from "./style";
import useResizeObserver from "../../hooks/useResizeObserver";

const Sections = ({ className }) => {
  const [ref, { contentRect }] = useResizeObserver();

  const getContentRect = useCallback(
    (key) => {
      return contentRect && Math.round(contentRect[key]);
    },
    [contentRect]
  );

  return (
    <div ref={ref} className={className}>
      {getContentRect("width")}x{getContentRect("height")}
    </div>
  );
};

export default styled(Sections);
