import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { orgActions } from "src/org";

const GroupPage = ({ groups, users, auth, match, toggleMembership }) => {
  const group = groups && groups[match.params.groupId];
  const userIds = group.userIds || {};
  return (
    (group &&
      users && (
        <div className="group-page">
          <h1>
            {group.name} @ {group.location}{" "}
            <button onClick={() => toggleMembership(auth.user.uid)}>{userIds[auth.user.uid] ? "Join" : "Leave"}</button>
          </h1>
          <h3>Members:</h3>
          <ul className="user-list">
            {Object.keys(userIds).map((userId, i) => (
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
