import React, { PropTypes } from "react";
import { connect } from "react-redux";
import GroupList from "views/group-list/group-list.container";
import Header from "views/header";

const GroupsPage = ({ user }) => {
  return (
    <div className="groups-page">
      {user.orgId === "gmail_com" ? (
        <h2>
          Hi {user.displayName.split(" ")[0] || user.displayName}, you have
          signed in with Gmail. Please sign in with your @yourcompany.com email
          address. Thanks!
        </h2>
      ) : (
        <div>
          <Header />
          <h3>
            Hi {user.displayName.split(" ")[0] || user.displayName}, welcome to
            CoffeeIQ for <span className="capitalize">
              {user.orgName}.
            </span>{" "}
            Begin by joining a coffee group below - or make a new group for your
            team.
          </h3>
          <GroupList />
        </div>
      )}
    </div>
  );
};

GroupsPage.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);
