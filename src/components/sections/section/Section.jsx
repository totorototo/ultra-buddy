import React from "react";

import styled from "./style";
import Graph from "../../graph/Graph";

const Section = ({ className, data, width, height, domain, color }) => {
  return (
    <div className={className}>
      <Graph
        color={color}
        data={data}
        width={width}
        height={height}
        domain={domain}
      />
    </div>
  );
};

export default styled(Section);
