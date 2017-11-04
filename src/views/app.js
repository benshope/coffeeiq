import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";

import { authActions, isAuthenticated } from "src/auth";
import Header from "./components/header";
import Notifications from "./components/notifications";
import RequireAuthRoute from "./components/require-auth-route";
import RequireUnauthRoute from "./components/require-unauth-route";
import AboutPage from "./components/about-page";
import AcceptInvitePage from "./components/accept-invite-page";
import HomePage from "./components/home-page";
import HowItWorksPage from "./components/how-it-works-page";
import GroupPage from "./components/group-page";
import GroupsPage from "./components/groups-page";
import UserPage from "./components/user-page";
import UsersPage from "./components/users-page";
import "./styles/styles.css";

const App = ({ authenticated, signOut }) => (
  <div className={["app-container", authenticated ? "authenticated" : ""].join(" ")}>
    <div className="background" />
    <Notifications />
    <Header authenticated={authenticated} signOut={signOut} about={HowItWorksPage} />
    <main className="page-container">
      <RequireUnauthRoute authenticated={authenticated} exact path="/" component={HomePage} />
      <RequireAuthRoute authenticated={authenticated} path="/groups" component={GroupsPage} />
      <RequireAuthRoute authenticated={authenticated} path="/group/:groupId" component={GroupPage} />
      <RequireAuthRoute authenticated={authenticated} path="/users" component={UsersPage} />
      <RequireAuthRoute authenticated={authenticated} path="/user/:emailId" component={UserPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/accept" component={AcceptInvitePage} />
    </main>
  </div>
);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: isAuthenticated(state)
});

const mapDispatchToProps = {
  signOut: authActions.signOut
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
