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
      <h1>Congrats {email}</h1>
      <div>
        You are now a member of the {match.params.groupName} coffee group. It meets each week at
        {match.params.groupLocation}. <br />
        <b>Sign up to join more groups at {orgName}:</b>
      </div>
      <SignUpButton />
    </div>
  );
};

JoinedGroupPage.propTypes = {};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(JoinedGroupPage);
