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

const GlobalStyle = createGlobalStyle`
 * {
  font-family: inherit;
  font-smoothing: antialiased;
}

html {
  font-size: 62.5%;
  font-family: 'Lato', sans-serif;
}

body {
 background: #1f252d; 
 margin:0;
}
`;

const App = ({ className }) => {
  const [toggle, setToggle] = useState(false);
  const [pageIndex, setPageIndex] = useState(3);

  return (
    <div className={className}>
      <div className={`wrapper ${toggle ? "menu-open" : ""}`}>
        <h1>Menu</h1>
        {/* <div className="menu-btn" onClick={handleClick}></div> */}
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
            Map
          </h1>
        </section>
        <section className={`three ${pageIndex < 2 && "after"}`}>
          <h1
            onClick={() => {
              setPageIndex(2);
              setToggle(!toggle);
            }}
          >
            TimeTable
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
              Home
            </h1>
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

  .wrapper .container {
    height: 100%;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    .icons {
      margin-top: 3em;
      :last-child {
        svg {
          margin-right: auto;
        }
      }
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

  .wrapper {
    height: 100%;
    width: 100%;
    background: #2e394b;
    overflow: hidden;
    position: relative;
    margin: 0px auto 0;
  }

  .menu-btn {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    height: 70px;
    width: 54px;
    cursor: pointer;
    background: url(https://iamturner.co.uk/codepen/menu-icon.png) no-repeat
      center;
    background-size: 44px;

    &:active {
      opacity: 0.2;
    }
  }

  section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.3s;

    &.one {
      background: #f75b5b;
      transition-delay: 0s;
    }

    &.two {
      background: #c84051;
      transition-delay: 0.05s;
    }

    &.three {
      background: #4f3462;
      transition-delay: 0.1s;
    }

    &.four {
      background: #794d9a;
      transition-delay: 0.15s;
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
  }

  .menu-open {
    section {
      cursor: pointer;

      &.one {
        transform: translateY(70px);
        transition-delay: 0.15s;
        &:active {
          background: lighten(#f75b5b, 3%);
        }
      }

      &.two {
        transform: translateY(140px);
        transition-delay: 0.1s;
        &:active {
          background: lighten(#c84051, 3%);
        }
      }

      &.three {
        transform: translateY(210px);
        transition-delay: 0.05s;
        &:active {
          background: lighten(#4f3462, 3%);
        }
      }

      &.four {
        transform: translateY(280px);
        transition-delay: 0s;
        &:active {
          background: lighten(#794d9a, 3%);
        }
      }
    }
  }
`;

export default MainApp;
