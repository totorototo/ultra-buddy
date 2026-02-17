import React, { useCallback } from "react";

import styled from "./style";
import useResizeObserver from "../../hooks/useResizeObserver";

const AutoSizer = ({ className, children }) => {
  const [ref, { contentRect }] = useResizeObserver();

  const getContentRect = useCallback(
    (key) => {
      return contentRect && Math.round(contentRect[key]);
    },
    [contentRect]
  );
  const width = getContentRect("width") || 200;
  const height = getContentRect("height") || 200;
  return (
    <div ref={ref} className={className} width={getContentRect("width") || 200}>
      {children(width, height)}
    </div>
  );
};

export default styled(AutoSizer);
