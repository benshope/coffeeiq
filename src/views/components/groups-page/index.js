import { capitalize } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import GroupList from "../group-list/group-list.container";

const GroupsPage = ({ groups, user }) => {
  const firstName = capitalize(user.displayName.split(" ")[0]) || user.email;
  const orgName = capitalize(user.orgName);
  const welcomeMessage = () =>
    groups && (
      <div className="welcome-message">
        Hi {firstName}, welcome to CoffeeIQ for {orgName}. Begin by joining{" "}
        {Object.keys(groups).length > 1 ? "a" : "the"} coffee group below - or make a new group for your team.
      </div>
    );
  const errorMessage = () => (
    <div className="welcome-message">
      Hi {firstName}, you have signed in with Gmail. Please sign in with your @yourcompany.com email address. Thanks!
    </div>
  );
  return (
    <div className="groups-page">
      {user.orgId === "gmail_com" && errorMessage()}
      {welcomeMessage()}
      <h2>Groups</h2>
      <GroupList />
    </div>
  );
};

GroupsPage.propTypes = {
  groups: PropTypes.object,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groups: state.org.groups,
  user: state.auth.user
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupsPage));
