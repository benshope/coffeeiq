import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { orgActions } from "src/org";

const GroupPage = ({ auth, deleteGroup, match, groups, users, toggleMembership }) => {
  const group = groups && groups[match.params.groupId];
  const userIds = (group && group.userIds) || {};
  const realUserIds = Object.keys(userIds).filter(userId => userIds[userId]);
  return (
    (group &&
      users && (
        <div className="group-page">
          <div className="group-page-header">
            <div className="group-page-title">
              <h1>{group.name}</h1>
            </div>
            <button
              className="membership-button"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                toggleMembership({
                  groupId: match.params.groupId,
                  userId: auth.uid
                });
              }}
            >
              {(userIds || {})[auth.uid] ? "Leave" : "Join"}
            </button>
            <Link to="/groups">
              <button
                className="delete-group-button"
                onClick={e =>
                  window.confirm(`Are you sure you want to delete group ${group.name}?`) &&
                  deleteGroup(match.params.groupId)}
              >
                <span role="img" aria-label="trash">
                  🗑️
                </span>
              </button>
            </Link>
          </div>
          <div>Meeting at {group.location}</div>
          <h3>{realUserIds.length} Members</h3>
          <ul className="user-list">
            {realUserIds.map((userId, i) => {
              const user = users[userId] || {};
              return (
                <Link key={userId} to={`/user/${userId}`}>
                  <li className="user-item">
                    <span className="user-description">
                      {user.displayName} - {user.email}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      )) || <div>Loading...</div>
  );
};

GroupPage.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  groups: PropTypes.object,
  users: PropTypes.object,
  toggleMembership: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  groups: (state.org[state.auth.orgId] || {}).groups,
  users: (state.org[state.auth.orgId] || {}).users
});

const mapDispatchToProps = {
  deleteGroup: orgActions.deleteGroup,
  toggleMembership: orgActions.toggleMembership
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupPage));
