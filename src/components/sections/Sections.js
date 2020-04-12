import React from "react";

import styled from "./style";
import Section from "../sections/section/Section";

const Sections = ({ className, sections, data }) => {
  return (
    <div className={className}>
      {sections.map((section) => (
        <Section data={section.coordinates} width={100} height={200} />
      ))}
    </div>
  );
};

export default styled(Sections);
