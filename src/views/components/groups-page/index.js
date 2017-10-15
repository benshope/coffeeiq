import { capitalize } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authActions } from "src/auth";
import GroupList from "../group-list/group-list.container";
import GroupForm from "../group-form";

const GroupsPage = ({ auth, calendarToken, groups, signIn }) => {
  const firstName = capitalize(auth.displayName.split(" ")[0]) || auth.email;
  const orgName = capitalize(auth.orgName);
  const activateDomainMessage = () =>
    !calendarToken && (
      <div className="card warning-card">
        <h3 className="header">Required Setup</h3>
        <div className="body">
          In order for this app to send calendar invites one user from {auth.email.split("@")[1] || orgName} must
          provide access to their calendars.
        </div>
        <div className="footer">
          <div>
            <a>Learn More</a>
          </div>
          <button onClick={() => signIn(true)}>Allow Calendar Access</button>
        </div>
      </div>
    );
  const welcomeMessage = () =>
    groups && (
      <div className="card info-card background-light">
        <div className="body">
          Hi {firstName}, welcome to CoffeeIQ for {orgName}. Begin by joining{" "}
          {Object.keys(groups).length > 1 ? "a" : "the"} coffee group below or make a new group for your team.
        </div>
      </div>
    );
  const errorMessage = () => (
    <div className="card error-card">
      <div className="body">
        Hi {firstName}, you have signed in with Gmail. Please sign in with your @yourcompany.com email address. Thanks!
      </div>
    </div>
  );
  return (
    <div className="groups-page">
      {auth.orgId === "gmail_com" && errorMessage()}
      {welcomeMessage()}
      {activateDomainMessage()}
      <h1>Groups</h1>
      <GroupList />
      <GroupForm />
    </div>
  );
};

GroupsPage.propTypes = {
  auth: PropTypes.object.isRequired,
  calendarToken: PropTypes.string,
  groups: PropTypes.object,
  signIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  calendarToken: state.org.calendarToken,
  groups: state.org.groups
});

const mapDispatchToProps = {
  signIn: authActions.signIn
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupsPage));
