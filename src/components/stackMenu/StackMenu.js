import React, { useState } from "react";

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
import Home from "../home/Home";
import Map from "../map/Map";

const StackMenu = ({ className }) => {
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
            <div className="icons">
              <Beer width={80} height={80} />
              <Chicken width={80} height={80} />
              <Wine width={80} height={80} />
              <Hammer width={80} height={80} />
              <Carrot width={80} height={80} />
              <Burn width={80} height={80} />
              <Mushroom width={80} height={80} />
              <Monster width={80} height={80} />
              <Wrench width={80} height={80} />
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
              <Map />
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
              <Home />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default styled(StackMenu);
