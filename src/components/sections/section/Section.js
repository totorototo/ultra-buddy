import React from "react";

import styled from "./style";
import Graph from "../../graph/Graph";

const Section = ({ className, data, width, height, domain }) => {
  return (
    <div className={className}>
      <Graph data={data} width={width} height={height} domain={domain} />
    </div>
  );
};

export default styled(Section);
