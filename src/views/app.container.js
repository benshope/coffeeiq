import { cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack } from "material-ui/styles/colors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import React, { PropTypes } from "react";
import { connect } from "react-redux";

import { authActions } from "core/auth";
import Header from "views/header";
import Particles from "views/particles";

const muiTheme = getMuiTheme({
  fontFamily: "Helvetica Neue, Roboto, sans-serif",
  palette: {
    primary1Color: grey300,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: darkBlack,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: grey500,
    pickerHeaderColor: cyan500,
    clockCircleColor: grey500,
    shadowColor: fullBlack
  },
  appBar: {
    height: 60,
    // color: grey500,
    textColor: darkBlack
    // titleFontWeight: 300
    // padding: spacing.desktopGutter,
  }
});

const App = ({ authenticated, children, signOut }) =>
  <MuiThemeProvider muiTheme={muiTheme}>
  <div>
    {false && <Particles />}
    <Header authenticated={authenticated} signOut={signOut} />
    <main>
      {children}
    </main>
    </div>
  </MuiThemeProvider>
;

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
