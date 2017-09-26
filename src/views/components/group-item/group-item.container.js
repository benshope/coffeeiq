import { orgActions } from "src/org";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
// import { go } from "react-router-redux";

const GroupItem = ({ auth, goToGroup, group, toggleGroupMembership }) => {
  const userInGroup = group.userIds && group.userIds[auth.uid];
  return (
    <div onClick={() => goToGroup(group)} className="group-item" tabIndex="0">
      <div className="cell">
        {userInGroup ? (
          <button onClick={() => toggleGroupMembership(group)}>You are a member</button>
        ) : (
          <button onClick={() => toggleGroupMembership(group)}>Join</button>
        )}
      </div>
      <div className="cell">
        {group.value.name} @ {group.value.location}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  goToGroup: group => {
    console.log("TODO: NOT WORKING GOING TO: ", group);
    // return go(`group/${group.key}`);
  },
  toggleGroupMembership: orgActions.toggleGroupMembership
};

GroupItem.propTypes = {
  auth: PropTypes.object.isRequired,
  goToGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  toggleGroupMembership: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem);
