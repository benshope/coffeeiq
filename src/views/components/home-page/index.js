import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authActions } from "src/auth";
import googleLogo from "src/assets/graphics/google_logo.svg";

const HomePage = ({ signIn }) => {
  return (
    <div className="home-page">
      <div className="background" />
      <div className="stripes-container">
        <div className="stripes">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="page">
        <div className="hero">
          <h1>Meet your team</h1>
          <div className="description">CoffeeIQ schedules a coffee break with a new coworker each week</div>
          <button className="signup-button" onClick={() => signIn(false)}>
            <img alt="google-logo" width="25" height="25" src={googleLogo} />
            Sign Up
          </button>
        </div>
        <div className="description background-light">
          Use CoffeeIQ to build a network, strengthen company culture, and share knowledge across teams. Most
          importantly, CoffeeIQ is a fun way to make new friends with your team.
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  signIn: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  signIn: authActions.signIn
};

export default withRouter(connect(null, mapDispatchToProps)(HomePage));
