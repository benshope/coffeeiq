import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { orgActions } from "src/org";

// const numUserIds = group => {
//   const userIds = group.userIds || {};
//   return Object.keys(userIds).filter(userId => userIds[userId]).length;
// };

const GroupList = ({ auth, groups, toggleMembership }) => (
  <ul className="item-list group-list">
    {Object.keys(groups)
      // .sort((x, y) => numUserIds(groups[y]) - numUserIds(groups[x]))
      .map((groupId, i) => {
        const group = groups[groupId];
        const userIds = group.userIds || {};
        return (
          <Link key={groupId} to={`/group/${groupId}`}>
            <li className="item">
              <div className="item-title">
                {group.name} @ {group.location}{" "}
                <div className="member-count">{Object.keys(userIds).filter(userId => userIds[userId]).length}</div>
              </div>
              <div className="join-leave-button-wrapper">
                <button
                  className="join-leave-button"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleMembership({ groupId, userId: auth.uid });
                  }}
                >
                  {userIds[auth.uid] ? "Leave" : "Join"}
                </button>
              </div>
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
  groups: (state.org[state.auth.orgId] && state.org[state.auth.orgId].groups) || {}
});

const mapDispatchToProps = {
  toggleMembership: orgActions.toggleMembership
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
