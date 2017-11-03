import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { orgActions } from "src/org";
import Toggle from "../toggle";
import GroupItem from "../group-item";

const GroupList = ({ auth, groups, toggleMembership }) => (
  <ul className="item-list group-list">
    {Object.keys(groups).map(groupId => {
      const group = groups[groupId];
      const emailIds = group.emailIds || {};
      return (
        <GroupItem
          key={groupId}
          group={group}
          groupId={groupId}
          rightContent={
            <Toggle
              id={groupId}
              value={!!emailIds[auth.emailId] ? "Leave" : "Join"}
              checked={!!emailIds[auth.emailId]}
              onChange={e => {
                toggleMembership({ groupId, email: auth.email });
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
  groups: (state.org[state.auth.orgId] && state.org[state.auth.orgId].groups) || {}
});

const mapDispatchToProps = {
  toggleMembership: orgActions.toggleMembership
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
