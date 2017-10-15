import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authActions } from "src/auth";
import googleLogo from "src/assets/images/google.svg";

const HomePage = ({ signIn }) => {
  return (
    <div className="home-page">
      <button className="signup-button" onClick={() => signIn(false)}>
        <img alt="google-logo" width="25" height="25" src={googleLogo} />
        Sign Up
      </button>
      <h1>Meet your team</h1>
      <h3 className="description">
        CoffeeIQ sets up coffee breaks to meet with randomly-paired teammates at your company.
      </h3>
      <h3 className="description">
        Use CoffeeIQ to build a network, strengthen company culture, and share knowledge across teams.
        Most importantly, CoffeeIQ is a fun way to make new friends with your team.
      </h3>
    </div>
  );
};

HomePage.propTypes = {
  signIn: PropTypes.func.isRequired
};

// TODO: add more copy

const mapDispatchToProps = {
  signIn: authActions.signIn
};

export default withRouter(connect(null, mapDispatchToProps)(HomePage));
