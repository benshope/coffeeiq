import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { orgActions } from "src/org";

const GroupList = ({ auth, groups, toggleMembership }) => (
  <ul className="group-list">
    {Object.keys(groups).map((groupId, i) => {
      const group = groups[groupId];
      const userIds = group.userIds || {};
      return (
        <Link key={groupId} to={`/group/${groupId}`}>
          <li className="group-item">
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                toggleMembership({ groupId, userId: auth.user.uid });
              }}
            >
              {userIds[auth.uid] ? "Leave" : "Join"}
            </button>
            <span className="group-title">
              {group.name} @ {group.location}
            </span>
            <span>Members: {Object.keys(group.userIds).filter(userId => userIds[userId]).length}</span>
          </li>
        </Link>
      );
    })}
  </ul>
);

GroupList.propTypes = {
  groups: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  toggleMembership: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  groups: state.org.groups || {}
});

const mapDispatchToProps = {
  toggleMembership: orgActions.toggleMembership
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
