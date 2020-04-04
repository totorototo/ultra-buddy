import React from "react";

import styled from "./style";

const Home = ({ className }) => {
  return (
    <div className={className}>
      <div className="carousel x-mandatory x-scroll">
        <div class="wrapper">
          <div class="element">1</div>
          <div class="element">2</div>
          <div class="element">3</div>
          <div class="element">4</div>
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
