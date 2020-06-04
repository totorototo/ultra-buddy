import React from "react";
import { useSetRecoilState } from "recoil";

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
import {
  checkpointsState,
  sectionsState,
  currentSectionIndexState,
  currentLocationIndexState,
  currentLocationState,
  runnerAnalyticsState,
  locationsState,
  nameState,
  routeAnalyticsState,
  routeState,
} from "../../model";

const Options = ({ className }) => {
  const setCheckpoints = useSetRecoilState(checkpointsState);
  const setSections = useSetRecoilState(sectionsState);
  const setCurrentSectionIndex = useSetRecoilState(currentSectionIndexState);
  const setCurrentLocationIndex = useSetRecoilState(currentLocationIndexState);
  const setCurrentLocation = useSetRecoilState(currentLocationState);
  const setRunnerAnalytics = useSetRecoilState(runnerAnalyticsState);
  const setLocations = useSetRecoilState(locationsState);
  const setName = useSetRecoilState(nameState);
  const setRouteAnalytics = useSetRecoilState(routeAnalyticsState);
  const setRoute = useSetRecoilState(routeState);

  const flush = () => {
    setRoute([]);
    setCheckpoints([]);
    setSections([]);
    setCurrentSectionIndex(-1);
    setCurrentLocationIndex(-1);
    setCurrentLocation([]);
    setRunnerAnalytics([]);
    setLocations([]);
    setName("");
    setRouteAnalytics({});
  };

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
          flush();
        }}
        width={80}
        height={80}
      />
      <Wrench width={80} height={80} />
    </div>
  );
};

export default styled(Options);
