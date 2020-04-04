import React from "react";

import styled from "./style";

const Home = ({ className }) => {
  return (
    <div className={className}>
      <div className="carousel x-mandatory x-scroll">
        <div className="wrapper">
          <div className="element">1</div>
          <div className="element">2</div>
          <div className="element">3</div>
          <div className="element">4</div>
        </div>
      </div>
      <div className="commands">
        <h1>Load Trace</h1>
        <h1>Get Roadbook</h1>
      </div>
    </div>
  );
};

export default styled(Home);
