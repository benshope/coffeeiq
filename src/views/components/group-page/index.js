import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { orgActions } from "src/org";

const GroupPage = ({ groups, users, user, match, toggleMembership }) => {
  const group = groups && groups[match.params.groupId];
  return (
    (group && (
      <div className="group-page">
        <h1>
          {group.name} @ {group.location}{" "}
          <button onClick={() => toggleMembership(user.uid)}>{group.userIds[user.uid] ? "Join" : "Leave"}</button>
        </h1>
        <h3>Members:</h3>
        <ul className="user-list">
          {Object.keys(group.userIds).map((uid, i) => (
            <Link key={uid} to={`/user/${uid}`}>
              <li className="user-item">
                {users[uid].name} - {users[uid].email}
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
  user: PropTypes.object.isRequired,
  users: PropTypes.object,
  toggleMembership: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groups: state.org.groups,
  users: state.org.users,
  user: state.auth
});

const mapDispatchToProps = {
  toggleMembership: orgActions.toggleMembership
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupPage));
