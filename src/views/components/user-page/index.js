import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { orgActions } from "src/org";

const UserPage = ({ users, groups, match, toggleMembership }) => {
  const user = users && users[match.params.userId];
  return (
    (user && (
      <div className="user-page">
        <h1>{user.name}</h1>
        <div>{user.email}</div>
        <div>TODO: Picture here</div>
        <div>TODO: List of user's groups</div>
      </div>
    )) || <div>Loading...</div>
  );
};

UserPage.propTypes = {
  users: PropTypes.object,
  auth: PropTypes.object.isRequired,
  groups: PropTypes.object,
  toggleMembership: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.org.users,
  groups: state.org.groups,
  auth: state.auth
});

const mapDispatchToProps = {
  toggleMembership: orgActions.toggleMembership
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));
