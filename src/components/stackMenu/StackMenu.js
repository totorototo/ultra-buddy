import React, { useState } from "react";

import styled from "./style";
import Home from "../home/Home";
import Map from "../map/Map";
import Options from "../options/Options";
import usePresistedState from "../../hooks/usePersistedState";

const StackMenu = ({ className }) => {
  const [route, setRoute] = usePresistedState("route", null);
  const [checkpoints, setCheckpoints] = usePresistedState("checkpoints", null);
  const [toggle, setToggle] = useState(false);
  const [pageIndex, setPageIndex] = useState(4);

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
          <h1
            onClick={() => {
              setPageIndex(1);
              setToggle(!toggle);
            }}
          >
            Progression
          </h1>
        </section>
        <section className={`three ${pageIndex < 2 && "after"}`}>
          <h1
            onClick={() => {
              setPageIndex(2);
              setToggle(!toggle);
            }}
          >
            Time Table
          </h1>
        </section>
        <section className={`four ${pageIndex < 3 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(3);
                setToggle(!toggle);
              }}
            >
              Map
            </h1>
            <div className="section-content">
              <Map route={route} checkpoints={checkpoints} />
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
              Home
            </h1>
            <div className="section-content">
              <Home setRoute={setRoute} setCheckpoints={setCheckpoints} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default styled(StackMenu);
