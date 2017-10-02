import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import GroupList from "../group-list/group-list.container";

const GroupsPage = ({ groups, user }) => {
  const welcomeMessage = () =>
    groups && (
      <h3>
        Hi {user.displayName.split(" ")[0] || user.displayName}, welcome to CoffeeIQ for{" "}
        <span className="capitalize">{user.orgName}.</span> Begin by joining{" "}
        {Object.keys(groups).length > 1 ? "a" : "the"} coffee group below - or make a new group for your team.
      </h3>
    );
  const errorMessage = () => (
    <h2>
      Hi {user.displayName.split(" ")[0] || user.displayName}, you have signed in with Gmail. Please sign in with your
      @yourcompany.com email address. Thanks!
    </h2>
  );
  return (
    <div className="groups-page">
      {user.orgId === "gmail_com" ? errorMessage() : welcomeMessage()}
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
