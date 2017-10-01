import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { orgActions, orgSelectors } from "src/org";

const GroupList = ({ auth, goToGroup, groups, toggleGroupMembership }) => (
  <ul className="group-list">
    {groups.map((group, i) => (
      <li key={group.key} onClick={() => goToGroup(group)} className="group-item">
        <button onClick={() => toggleGroupMembership(group)}>
          {(group.value.userIds || {})[auth.uid] ? "Join" : "Leave"}
        </button>
        {group.value.name} @ {group.value.location}
      </li>
    ))}
  </ul>
);

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  goToGroup: PropTypes.func.isRequired,
  toggleGroupMembership: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  groups: orgSelectors.selectGroups(state)
});

const mapDispatchToProps = {
  goToGroup: group => push(`group/${group.key}`),
  toggleGroupMembership: orgActions.toggleGroupMembership
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
