import React from "react";
import { connect } from "react-redux";
import { BlueStripes } from "../stripes";
import SignUpButton from "../sign-up-button";

const JoinedGroupPage = ({ match }) => {
  const email = match.params.emailId.split("_").join(".");
  const emailParts = match.params.emailId.split("_");
  const orgName = emailParts[emailParts.length - 2];
  return (
    <div className="joined-group-page">
      <BlueStripes />
      <h1>Congrats {email}!</h1>
      <div className="message">
        You are now a member of{match.params.groupName}.{" "}
        <b>You will receive weekly calendar invites to meet for coffee at {match.params.groupLocation}.</b> Sign up to
        join more groups at {orgName}.
      </div>
      <SignUpButton />
    </div>
  );
};

JoinedGroupPage.propTypes = {};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(JoinedGroupPage);
