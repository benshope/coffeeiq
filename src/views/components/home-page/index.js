import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authActions } from "src/auth";

const HomePage = ({ signIn }) => {
  return (
    <div>
      <div className="home-page-stripes-container">
        <div id="stripes">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="iq-app-container">
        <div className="home-page">
          <h1>Meet your team</h1>
          <div className="description">
            CoffeeIQ schedules a quick coffee meeting each week with a coworker.
          </div>
          <button className="signup-button" onClick={signIn}>
            <img
              alt="google-logo"
              width="25"
              height="60"
              src="../../assets/images/google.svg"
            />
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  signIn: PropTypes.func.isRequired
};

// This helps you build a network, strengthens company culture, and shares knowledge.
// Most importantly, CoffeeIQ is a fun way to make new friends.

//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  signIn: authActions.signIn
};

export default withRouter(connect(null, mapDispatchToProps)(HomePage));
