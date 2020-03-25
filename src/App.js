import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { ReactComponent as Beer } from "./assets/beer.svg";
import { ReactComponent as Chicken } from "./assets/chicken.svg";
import { ReactComponent as Wine } from "./assets/wine.svg";
import { ReactComponent as Hammer } from "./assets/hammer.svg";
import { ReactComponent as Burn } from "./assets/burn.svg";
import { ReactComponent as Carrot } from "./assets/carrot.svg";
import { ReactComponent as Mushroom } from "./assets/mushroom.svg";
import { ReactComponent as Monster } from "./assets/monster.svg";
import { ReactComponent as Wrench } from "./assets/wrench.svg";
import MarvinFont from "./assets/fonts/MarvinVisionsTrial-Variable.ttf";

const GlobalStyle = createGlobalStyle`
*,
*:before,
*:after {
  box-sizing: border-box;
}

@font-face {
  font-family: MyFont;
  src: url('${MarvinFont}') format('opentype');
}


body {
 background: #1f252d; 
 margin:0;
 font-family: MyFont;
 font-weight: 170;
 font-variation-settings: "opsz" 99;
 font-feature-settings: "ss02" 0,"ss03" 0,"ss06" 0;
}
`;

const App = ({ className }) => {
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
            <div className="section-content"></div>
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
            <div className="section-content"></div>
          </div>
        </section>
      </div>
      <GlobalStyle />
    </div>
  );
};

const MainApp = styled(App)`
  display: flex;
  flex: 1 1 auto;
  height: 100vh;

  .sections-wrapper .container .section-content {
    display: flex;
    flex: 1 1 auto;
    width: 100%;
    padding: 8px;
    p {
      font-family: helvetica;
      color: white;
    }
  }

  .sections-wrapper .container {
    height: 100%;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    .icons {
      margin-top: 3em;

      flex-wrap: wrap;
      justify-content: center;
      display: flex;
      svg {
        margin: 1em;
        :hover {
          cursor: pointer;
        }
      }
    }
  }

  .sections-wrapper {
    height: 100%;
    width: 100%;
    background: #2e394b;
    overflow: hidden;
    position: relative;
    margin: 0px auto 0;
  }

  section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.3s;

    &.one {
      background: #330136;
      transition-delay: 0s;
    }

    &.two {
      background: #5e1742;
      transition-delay: 0.05s;
    }

    &.three {
      background: #962e40;
      transition-delay: 0.1s;
    }

    &.four {
      background: #c9463d;
      transition-delay: 0.15s;
    }

    &.five {
      background: #ff5e35;
      transition-delay: 0.2s;
    }

    &.after {
      transform: translateY(100%);
    }
  }

  h1 {
    color: white;
    width: 100%;
    font-weight: 500;
    font-size: 2rem;
    text-align: center;
    margin: 0;
    line-height: 70px;
    user-select: none;
    cursor: pointer;
  }

  .menu-open {
    section {
      cursor: pointer;

      &.one {
        transform: translateY(70px);
        transition-delay: 0.15s;
        &:active {
          background: lighten(#330136, 3%);
        }
      }

      &.two {
        transform: translateY(140px);
        transition-delay: 0.1s;
        &:active {
          background: lighten(#5e1742, 3%);
        }
      }

      &.three {
        transform: translateY(210px);
        transition-delay: 0.05s;
        &:active {
          background: lighten(#962e40, 3%);
        }
      }

      &.four {
        transform: translateY(280px);
        transition-delay: 0s;
        &:active {
          background: lighten(#c9463d, 3%);
        }
      }

      &.five {
        transform: translateY(350px);
        transition-delay: 0s;
        &:active {
          background: lighten(#ff5e35, 3%);
        }
      }
    }
  }
`;

export default MainApp;
