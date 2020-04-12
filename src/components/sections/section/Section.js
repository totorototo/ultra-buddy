import React from "react";

import styled from "./style";
import Graph from "../../graph/Graph";

const Section = ({ className, data, width, height }) => {
  return (
    <div className={className}>
      <Graph data={data} width={width} height={height} />
    </div>
  );
};

export default styled(Section);
