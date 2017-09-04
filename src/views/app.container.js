import {
  cyan500,
  cyan700,
  pinkA200,
  grey100,
  grey300,
  grey400,
  grey500,
  white,
  darkBlack,
  fullBlack
} from "material-ui/styles/colors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import React, { PropTypes } from "react";

const muiTheme = getMuiTheme({
  fontFamily: "Gotham, Helvetica Neue, Roboto, sans-serif",
  palette: {
    primary1Color: white,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: grey100,
    accent2Color: pinkA200,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: darkBlack,
    canvasColor: "#f2f2f2",
    borderColor: grey300,
    disabledColor: grey500,
    pickerHeaderColor: cyan500,
    clockCircleColor: grey500,
    shadowColor: fullBlack
  },
  appBar: {
    height: 80,
    color: "rgba(0,0,0,0)",
    textColor: white
    // titleFontWeight: 300
    // padding: spacing.desktopGutter,
  },
  paper: {
    // color: palette.textColor,
    backgroundColor: cyan500,
    zDepthShadows: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ].map(
      () =>
        `0 0px 0px black},
       0 0px 0px black}`
    )
  }
});

const App = ({ children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>{children}</MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.element
};

export default App;
