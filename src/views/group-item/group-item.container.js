import { groupActions } from "core/groups";
import IconButton from "material-ui/IconButton";
import Person from "material-ui/svg-icons/social/person";
import PersonOutline from "material-ui/svg-icons/social/person-outline";
import React, { PropTypes } from "react";
import { connect } from "react-redux";
// import { go } from "react-router-redux";

const GroupItem = ({ auth, goToGroup, group, toggleGroupMembership }) => {
  const userInGroup = group.userIds && group.userIds[auth.uid];
  return (
    <div onClick={() => goToGroup(group)} className="group-item" tabIndex="0">
      <div className="cell">
        <button onClick={() => toggleGroupMembership(group)}>
          {userInGroup ? (
            <IconButton>
              <Person />
            </IconButton>
          ) : (
            <IconButton>
              <PersonOutline />
            </IconButton>
          )}
        </button>
      </div>
      <div className="cell">
        {group.name} @ {group.location}
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
  toggleGroupMembership: groupActions.toggleGroupMembership
};

GroupItem.propTypes = {
  auth: PropTypes.object.isRequired,
  goToGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  toggleGroupMembership: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem);
