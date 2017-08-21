import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { groupActions } from "core/groups";
import GroupForm from "views/group-form/group-form.container";
import GroupList from "views/group-list";

const noCompanyEmailMessage = user =>
  <div className="g-row">
    <h2>
      Hi {user.displayName.split(" ")[0] || user.displayName}, you have signed in with Gmail. Please sign in with your
      @yourcompany.com email address. Thanks!
    </h2>
  </div>;

const pageComponent = (groups, user) =>
  <div className="g-row">
    <div className="g-col">
      <h3>
        Hi {user.displayName.split(" ")[0] || user.displayName}, welcome to CoffeeIQ for{" "}
        <span className="capitalize">{user.orgName}.</span> Begin by joining a coffee group below - or make a new group
        for your team.
      </h3>
      <br />
      <br />
    </div>
    <div className="g-col">
      <GroupList groups={groups} />
    </div>
    <div className="g-col">
      <GroupForm />
    </div>
  </div>;

const GroupsPage = ({ groups, user }) => {
  return user.orgId === "gmail_com" ? noCompanyEmailMessage(user) : pageComponent(groups, user);
};

GroupsPage.propTypes = {
  createGroup: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  removeGroup: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  groups: state.groups.list,
  user: state.auth.user
});

const mapDispatchToProps = {
  createGroup: groupActions.createGroup,
  removeGroup: groupActions.removeGroup,
  updateGroup: groupActions.updateGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);
