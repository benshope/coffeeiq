import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { orgSelectors } from "src/org";
import GroupList from "../group-list/group-list.container";

const GroupsPage = ({ group, users, auth }) => {
  const goToUser = console.log;
  const toggleUserMembership = console.log;
  return (
    <div className="group-page">
      <button onClick={() => toggleUserMembership(auth.uid)}>
        {(group.value.userIds || {})[auth.uid] ? "Join" : "Leave"}
      </button>
      {group.value.name} @ {group.value.location}
      <ul className="user-list">
        {group.value.userIds.map((uid, i) => (
          <li key={uid} onClick={() => goToUser(uid)} className="user-item">
            {users[uid].name} - {users[uid].email}
          </li>
        ))}
      </ul>
    </div>
  );
};

GroupsPage.propTypes = {
  groups: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: orgSelectors.selectGroups(state),
  user: state.auth.user
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupsPage));
