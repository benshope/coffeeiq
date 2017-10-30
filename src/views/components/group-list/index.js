import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { orgActions } from "src/org";
import Toggle from "../toggle";
import GroupItem from "../group-item";

// const numUserIds = group => {
//   const userIds = group.userIds || {};
//   return Object.keys(userIds).filter(userId => userIds[userId]).length;
// };

const GroupList = ({ auth, groups, toggleMembership }) => (
  <ul className="item-list group-list">
    {Object.keys(groups)
      // .sort((x, y) => numUserIds(groups[y]) - numUserIds(groups[x]))
      .map(groupId => {
        const group = groups[groupId];
        const userIds = group.userIds || {};
        return (
          <GroupItem
            key={groupId}
            group={group}
            groupId={groupId}
            rightContent={
              <Toggle
                id={groupId}
                value={!!userIds[auth.uid] ? "Leave" : "Join"}
                checked={!!userIds[auth.uid]}
                onChange={e => {
                  toggleMembership({ groupId, userId: auth.uid });
                }}
              />
            }
          />
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
  groups:
    (state.org[state.auth.orgId] && state.org[state.auth.orgId].groups) || {}
});

const mapDispatchToProps = {
  toggleMembership: orgActions.toggleMembership
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
