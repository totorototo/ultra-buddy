import React from "react";

import styled from "./style";

const Home = ({ className }) => {
  return (
    <div className={`${className} x-mandatory x-scroll`}>
      <div class="wrapper">
        <div class="element">1</div>
        <div class="element">2</div>
        <div class="element">3</div>
        <div class="element">4</div>
      </div>
    </div>
  );
};

export default styled(Home);
