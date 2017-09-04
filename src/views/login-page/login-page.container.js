import RaisedButton from "material-ui/RaisedButton";
import React, { PropTypes } from "react";
import { connect } from "react-redux";

import { authActions } from "core/auth";

const SignInPage = ({ signIn }) => {
  return (
    <div className="home-page">
      <h1>Meet Your Team</h1>
      <div className="description">
        CoffeeIQ schedules a quick coffee meeting each week with a random
        coworker.
      </div>
      <button onClick={signIn}>
        Sign Up
        <img width="25" height="60" src="../../assets/images/google.svg" />
      </button>
    </div>
  );
};

SignInPage.propTypes = {
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

export default connect(null, mapDispatchToProps)(SignInPage);
