import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { authActions, isAuthenticated } from "src/auth";
import Header from "./components/header";
import RequireAuthRoute from "./components/require-auth-route";
import RequireUnauthRoute from "./components/require-unauth-route";
import HomePage from "./components/home-page";
import GroupPage from "./components/group-page";
import GroupsPage from "./components/groups-page";

const App = ({ authenticated, signOut }) => (
  <div>
    <Header authenticated={authenticated} signOut={signOut} />
    <main>
      <RequireUnauthRoute authenticated={authenticated} exact path="/" component={HomePage} />
      <RequireAuthRoute authenticated={authenticated} path="/groups" component={GroupsPage} />
      <RequireAuthRoute authenticated={authenticated} path="/group/:groupId" component={GroupPage} />
    </main>
  </div>
);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  authenticated: isAuthenticated(state)
});

const mapDispatchToProps = {
  signOut: authActions.signOut
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
