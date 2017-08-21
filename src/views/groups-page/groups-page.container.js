import React, { PropTypes } from "react";
import { connect } from "react-redux";
import GroupList from "views/group-list/group-list.container";

const noCompanyEmailMessage = user =>
  <div className="g-row">
    <h2>
      Hi {user.displayName.split(" ")[0] || user.displayName}, you have signed in with Gmail. Please sign in with your
      @yourcompany.com email address. Thanks!
    </h2>
  </div>;

const pageComponent = user =>
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
      <GroupList />
    </div>
  </div>;

const GroupsPage = ({ user }) => {
  return user.orgId === "gmail_com" ? noCompanyEmailMessage(user) : pageComponent(user);
};

GroupsPage.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);
