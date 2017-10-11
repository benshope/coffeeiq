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
          <h1>
            {group.name} @ {group.location}
          </h1>
          <button onClick={e => deleteGroup(match.params.groupId)}>Delete Group</button>
          <button
            onClick={e => {
              toggleMembership({
                groupId: match.params.groupId,
                userId: auth.user.uid
              });
            }}
          >
            {(userIds || {})[auth.uid] ? "Leave" : "Join"}
          </button>
          <h3>{realUserIds.length} Members</h3>
          <ul className="user-list">
            {realUserIds.map((userId, i) => {
              const user = users[userId] || {};
              return (
                <Link key={userId} to={`/user/${userId}`}>
                  <li className="user-item">
                    {user.name} - {user.email}
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
  groups: state.org.groups,
  users: state.org.users
});

const mapDispatchToProps = {
  deleteGroup: orgActions.deleteGroup,
  toggleMembership: orgActions.toggleMembership
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupPage));
