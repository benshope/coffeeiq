import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authActions } from "src/auth";
import { orgActions } from "src/org";

const UserPage = ({ auth, users, groups, match, signOut, toggleMembership }) => {
  const user = users && users[match.params.userId];
  return (
    (user && (
      <div className="user-page">
        <div className="user-page-title">
          <h1>{user.displayName}</h1>
          {auth.uid === user.uid && <button onClick={signOut}>Sign Out</button>}
        </div>
        <div className="user-details">
          {user.photoURL && <img className="user-image" alt="user" src={user.photoURL} />}
          <div className="user-email">{user.email}</div>
        </div>
        <h2>Groups</h2>
        <ul>{Object.keys(user.groupIds || {}).map(key => <li key={key}>{groups[key] && groups[key].name}</li>)}</ul>
      </div>
    )) || (
      <div className="user-page-loading display-flex align-items-center">
        <div className="loading-message flex-grow">Loading user...</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    )
  );
};

UserPage.propTypes = {
  users: PropTypes.object,
  auth: PropTypes.object.isRequired,
  groups: PropTypes.object,
  signOut: PropTypes.func.isRequired,
  toggleMembership: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: (state.org[state.auth.orgId] || {}).users,
  groups: (state.org[state.auth.orgId] || {}).groups,
  auth: state.auth
});

const mapDispatchToProps = {
  signOut: authActions.signOut,
  toggleMembership: orgActions.toggleMembership
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));
