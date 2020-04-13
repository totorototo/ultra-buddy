import React, { useEffect, useState } from "react";
import * as d3Array from "d3-array";

import styled from "./style";
import Section from "../sections/section/Section";

const Sections = ({ className, sections, data }) => {
  const [domain, setDomain] = useState({
    x: { min: 0, max: 0 },
    y: { min: 0, max: 0 },
  });
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
    <div className={className}>
      {sections.map((section) => (
        <Section
          data={section.coordinates}
          width={100}
          height={200}
          domain={domain}
        />
      ))}
    </div>
  );
};

export default styled(Sections);
