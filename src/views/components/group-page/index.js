import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "react-router-redux";

const GroupPage = props => {
  const { groups, users, user, match, goToGroups } = props;
  const group = groups && groups[match.params.groupId];
  const goToUser = console.log;
  const toggleUserMembership = console.log;
  console.log("PROPS:", props);
  return (
    <div>
      <a onClick={goToGroups}>Back</a>
      {(group && (
        <div className="group-page">
          <button onClick={() => toggleUserMembership(user.uid)}>
            {(group.userIds || {})[user.uid] ? "Join" : "Leave"}
          </button>
          {group.name} @ {group.location}
          <ul className="user-list">
            {Object.keys(group.userIds).map((uid, i) => (
              <li key={uid} onClick={() => goToUser(uid)} className="user-item">
                {users[uid].name} - {users[uid].email}
              </li>
            ))}
          </ul>
        </div>
      )) || <div>{match.params.groupId}</div>}
    </div>
  );
};

GroupPage.propTypes = {
  groups: PropTypes.object,
  user: PropTypes.object.isRequired,
  users: PropTypes.object,
  goToGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groups: state.org.groups,
  users: state.org.users,
  user: state.auth
});

const mapDispatchToProps = {
  goToGroups: () => push(`/groups`)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupPage));
