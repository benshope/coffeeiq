import React from "react";
import { connect } from "react-redux";
import { GreenStripes } from "../stripes";

const AcceptInvitePage = ({ match }) => {
  console.log("TRIGGER ACCEPT INVITE", match);
  return (
    <div className="about-page">
      <GreenStripes />
      <h1>Invite Accepted</h1>
      <p>You are now a member of ___ group. Sign up to join more groups ___</p>
    </div>
  );
};

AcceptInvitePage.propTypes = {};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(AcceptInvitePage);
