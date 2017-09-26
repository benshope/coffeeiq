import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import GroupList from "../group-list/group-list.container";

const GroupsPage = ({ groups, user }) => {
  const isGmailAccount = user && user.orgId === "gmail_com";
  const gmailAccountErrorMessage = () => (
    <h2>
      Hi {user.displayName.split(" ")[0] || user.displayName}, you have signed in with Gmail. Please sign in with your
      @yourcompany.com email address. Thanks!
    </h2>
  );
  // <GroupList />
  return (
    user && (
      <div className="groups-page">
        <div className="iq-app-container">
          <div className="iq-content-container">
            {isGmailAccount ? (
              gmailAccountErrorMessage()
            ) : (
              <div>
                <div className="iq-margin-bottom">
                  <h3>
                    Hi {user.displayName.split(" ")[0] || user.displayName}, welcome to CoffeeIQ for{" "}
                    <span className="capitalize">{user.orgName}.</span> Begin by joining{" "}
                    {(groups && groups.length) > 1 ? "a" : "the"} coffee group below - or make a new group for your
                    team.
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

GroupsPage.propTypes = {
  groups: PropTypes.array,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groups: state.org.groups,
  user: state.auth.user
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupsPage));
