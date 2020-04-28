import React from "react";

import styled from "./style";
import { ReactComponent as Beer } from "../../assets/beer.svg";
import { ReactComponent as Chicken } from "../../assets/chicken.svg";
import { ReactComponent as Wine } from "../../assets/wine.svg";
import { ReactComponent as Hammer } from "../../assets/hammer.svg";
import { ReactComponent as Burn } from "../../assets/burn.svg";
import { ReactComponent as Carrot } from "../../assets/carrot.svg";
import { ReactComponent as Mushroom } from "../../assets/mushroom.svg";
import { ReactComponent as Monster } from "../../assets/monster.svg";
import { ReactComponent as Wrench } from "../../assets/wrench.svg";

const Options = ({
  className,
  setRoute,
  setCheckpoints,
  setSections,
  setCurrentSectionIndex,
  setCurrentLocation,
  setCurrentLocationIndex,
  setProgression,
  setLocations,
}) => {
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
          setRoute(null);
          setCheckpoints(null);
          setSections(null);
          setCurrentSectionIndex(-1);
          setCurrentLocationIndex(-1);
          setCurrentLocation(null);
          setProgression(null);
          setLocations(null);
        }}
        width={80}
        height={80}
      />
      <Wrench width={80} height={80} />
    </div>
  );
};

export default styled(Options);
