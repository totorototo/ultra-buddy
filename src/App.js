import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import MarvinFont from "./assets/fonts/MarvinVisionsTrial-Variable.ttf";
import StackMenu from "./components/stackMenu/StackMenu";

const THEME = {
  colors: {
    background: "#292929",
    one: "#2c2c34",
    two: "#ee5622",
    three: "#eca72c",
    four: "#28536b",
    five: "#221e22",
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
 font-weight: 170;
 font-variation-settings: "opsz" 99;
 font-feature-settings: "ss02" 0,"ss03" 0,"ss06" 0;
}
`;

const App = () => {
  return (
    <ThemeProvider theme={THEME}>
      <StackMenu />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
