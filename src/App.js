import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import MarvinFont from "./assets/fonts/MarvinVisionsTrial-Variable.ttf";
import StackMenu from "./components/stackMenu/StackMenu";

const THEME = {
  colors: {
    one: "#330136",
    two: "#5e1742",
    three: "#962e40",
    four: "#c9463d",
    five: "#ff5e35",
    background: "#2e394b"
  }
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
