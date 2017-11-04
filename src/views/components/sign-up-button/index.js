import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import googleLogo from "src/assets/graphics/google_logo.svg";
import { authActions } from "src/auth";

const GroupItem = ({ signIn }) => (
  <button className="signup-button" onClick={() => signIn(false)}>
    <img alt="google-logo" width="25" height="25" src={googleLogo} />
    Sign Up
  </button>
);

GroupItem.propTypes = {
  signIn: PropTypes.func.isRequired
};

const mapStateToProps = (state, passedProps) => ({ ...passedProps });

const mapDispatchToProps = {
  signIn: authActions.signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem);
