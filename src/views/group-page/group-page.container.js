import { groupActions } from "core/groups";
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { go } from "react-router-redux";
import IconButton from "material-ui/IconButton";
import Person from "material-ui/svg-icons/social/person";
import PersonOutline from "material-ui/svg-icons/social/person-outline";
import GroupForm from "../group-form/group-form.component";

class GroupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.newState();
  }

  newState() {
    return {
      editing: false
    };
  }

  toggleGroupMembership() {
    this.props.toggleGroupMembership(this.props.group);
  }

  render() {
    const { auth, group, updateGroup } = this.props;
    const userInGroup = group.userIds && group.userIds[auth.uid];
    return (
      <div className="group-item" tabIndex="0">
        <div className="cell">
          {userInGroup
            ? <IconButton>
                <Person />
              </IconButton>
            : <IconButton>
                <PersonOutline />
              </IconButton>}
        </div>
        <div className="cell">
          {this.state.editing
            ? <GroupForm group={group} onChange={updateGroup} />
            : <div>
                {group.name} @ {group.location}
              </div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  goToGroup: group => {
    console.log("TODO: NOT WORKING GOING TO: ", group);
    return go(`group/${group.key}`);
  },
  removeGroup: groupActions.removeGroup,
  updateGroup: groupActions.updateGroup,
  toggleGroupMembership: groupActions.toggleGroupMembership
};

GroupPage.propTypes = {
  auth: PropTypes.object.isRequired,
  goToGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  toggleGroupMembership: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
