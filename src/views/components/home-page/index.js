import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BlueStripes } from "../stripes";
import SignUpButton from "../sign-up-button";

const HomePage = ({ signIn }) => {
  return (
    <div className="home-page">
      <BlueStripes />
      <div className="hero">
        <h1>Meet your team</h1>
        <div className="description">CoffeeIQ schedules a coffee break with a new coworker each week</div>
        <SignUpButton />
      </div>
      {false && (
        <div className="description background-light">
          Use CoffeeIQ to build a network, strengthen company culture, and share knowledge across teams. Most
          importantly, CoffeeIQ is a fun way to make new friends with your team.
        </div>
      )}
    </div>
  );
};

HomePage.propTypes = {};

const mapDispatchToProps = {};

export default withRouter(connect(null, mapDispatchToProps)(HomePage));
