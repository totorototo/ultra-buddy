import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import styled from "./style";
import Home from "../home/Home";
import Map from "../map/Map";
import Options from "../options/Options";
import Sections from "../sections/Sections";
import Analytics from "../analytics/Analytics";
import Live from "../live/Live";
import Message from "../message/Message";
import AutoSizer from "../autoSizer/AutoSizer";
import { ReactComponent as Compass } from "../../assets/compass.svg";
import { ReactComponent as Direction } from "../../assets/direction.svg";
import {
  routeState,
  nameState,
  checkpointsState,
  sectionsState,
  runnerAnalyticsState,
} from "../../model";

const Main = ({ className }) => {
  const route = useRecoilValue(routeState);
  const name = useRecoilValue(nameState);
  const checkpoints = useRecoilValue(checkpointsState);
  const sections = useRecoilValue(sectionsState);
  const runnerAnalytics = useRecoilValue(runnerAnalyticsState);

  const [toggle, setToggle] = useState(false);
  const [pageIndex, setPageIndex] = useState(5);

  return (
    <div className={className}>
      <div className={`sections-wrapper ${toggle ? "menu-open" : ""}`}>
        <h1>Menu</h1>
        <section className={`one ${pageIndex < 0 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(0);
                setToggle(!toggle);
              }}
            >
              Options
            </h1>
            <div className="section-content">
              <Options />
            </div>
          </div>
        </section>
        <section className={`two ${pageIndex < 1 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(1);
                setToggle(!toggle);
              }}
            >
              Analytics
            </h1>
            <div className="section-content">
              {runnerAnalytics.length > 0 && sections.length > 0 ? (
                <Analytics />
              ) : (
                <Message message="get current location ?">
                  <Compass width={100} />
                </Message>
              )}
            </div>
          </div>
        </section>
        <section className={`three ${pageIndex < 2 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(2);
                setToggle(!toggle);
              }}
            >
              Live
            </h1>
            <div className="section-content">
              {Object.keys(runnerAnalytics).length > 0 &&
              sections.length > 0 &&
              checkpoints.length > 0 ? (
                <AutoSizer>
                  {(width, height) => <Live width={width} height={height} />}
                </AutoSizer>
              ) : (
                <Message message="timetable not loaded yet!">
                  <Direction width={100} />
                </Message>
              )}
            </div>
          </div>
        </section>
        <section className={`four ${pageIndex < 3 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(3);
                setToggle(!toggle);
              }}
            >
              Sections
            </h1>
            <div className="section-content">
              {Object.keys(route).length > 0 && sections.length > 0 ? (
                <Sections />
              ) : (
                <Message message="timetable not loaded yet!">
                  <Direction width={100} />
                </Message>
              )}
            </div>
          </div>
        </section>
        <section className={`five ${pageIndex < 4 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(4);
                setToggle(!toggle);
              }}
            >
              Map
            </h1>
            <div className="section-content">
              <Map enableGPS={pageIndex === 4} />
            </div>
          </div>
        </section>
        <section className={`six ${pageIndex < 5 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(5);
                setToggle(!toggle);
              }}
            >
              {name !== "" ? name : "Home"}
            </h1>
            <div className="section-content">
              <Home />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default styled(Main);
