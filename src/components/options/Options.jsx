import React from "react";

import styled from "./style";
import Beer from "../../assets/beer.svg?react";
import Chicken from "../../assets/chicken.svg?react";
import Wine from "../../assets/wine.svg?react";
import Hammer from "../../assets/hammer.svg?react";
import Burn from "../../assets/burn.svg?react";
import Carrot from "../../assets/carrot.svg?react";
import Mushroom from "../../assets/mushroom.svg?react";
import Monster from "../../assets/monster.svg?react";
import Wrench from "../../assets/wrench.svg?react";

const Options = ({ className, clearData }) => {
  return (
    <div className={className}>
      <Beer width={80} height={80} />
      <Chicken width={80} height={80} />
      <Wine width={80} height={80} />
      <Hammer width={80} height={80} />
      <Carrot width={80} height={80} />
      <Burn width={80} height={80} />
      <Mushroom width={80} height={80} />
      <Monster
        onClick={() => {
          clearData();
        }}
        width={80}
        height={80}
      />
      <Wrench width={80} height={80} />
    </div>
  );
};

export default styled(Options);
