import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { orgActions } from "src/org";

const GroupPage = ({ groups, users, auth, match, toggleMembership }) => {
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
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
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
            {realUserIds.map((userId, i) => (
              <Link key={userId} to={`/user/${userId}`}>
                <li className="user-item">
                  {users[userId].name} - {users[userId].email}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )) || <div>Loading...</div>
  );
};

GroupPage.propTypes = {
  groups: PropTypes.object,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object,
  toggleMembership: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groups: state.org.groups,
  users: state.org.users,
  auth: state.auth
});

const mapDispatchToProps = {
  toggleMembership: orgActions.toggleMembership
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupPage));
