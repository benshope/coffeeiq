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
import { connect } from "react-redux";

import { authActions } from "core/auth";
import Header from "views/header";
import Stripes from "views/stripes";

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

const App = ({ authenticated, children, signOut }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Stripes />
      <div className="app-container">
        <Header authenticated={authenticated} signOut={signOut} />
        <main>{children}</main>
      </div>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  children: PropTypes.element,
  signOut: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = {
  signOut: authActions.signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
