import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { RecoilRoot, useRecoilTransactionObserver_UNSTABLE } from "recoil";

import MarvinFont from "./assets/fonts/MarvinVisionsTrial-Variable.ttf";
import Main from "./components/main/Main";

const THEME = {
  colors: {
    background: "#212121",
    one: "#292929",
    two: "#323232",
    three: "#383838",
    four: "#3e3e3e",
    five: "#444444",
    six: "#555555",
    text: "#E0E2DB",
    mustard: "#D5A021",
    dark: "#313131",
    blue: "#357496",
    "dark-blue": "#08415C",
    light: "#E0E2DB",
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

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
 font-weight: 200;
 font-variation-settings: "opsz" 99;
 font-feature-settings: "ss02" 0,"ss03" 0,"ss06" 0;
}
`;

const initializeState = ({ set }) => {
  Object.entries(localStorage).forEach(([key, value]) => {
    if (!key.includes("mapbox")) {
      const parsedValue = JSON.parse(value).value;
      set({ key }, parsedValue);
    }
  });
};

const Inner = () => {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    for (const modifiedAtom of snapshot.getNodes_UNSTABLE({
      isModified: true,
    })) {
      const atomLoadable = snapshot.getLoadable(modifiedAtom);
      if (atomLoadable.state === "hasValue") {

        localStorage.setItem(
          modifiedAtom.key,
          JSON.stringify({ value: atomLoadable.contents })
        );
      }
    }
  });
  return (
    <ThemeProvider theme={THEME}>
      <Main />
      <GlobalStyle />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <RecoilRoot initializeState={initializeState}>
      <Inner />
    </RecoilRoot>
  );
};

export default App;
