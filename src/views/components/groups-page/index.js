import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import GroupList from "../group-list/group-list.container";
import Header from "../header";

const GroupsPage = ({ groups, user }) => {
  const isGmailAccount = user && user.orgId === "gmail_com";
  const gmailAccountErrorMessage = () => (
    <h2>
      Hi {user.displayName.split(" ")[0] || user.displayName}, you have signed
      in with Gmail. Please sign in with your @yourcompany.com email address.
      Thanks!
    </h2>
  );
  return (
    user && (
      <div className="groups-page">
        <div className="groups-page-stripes-container">
          <div className="stripes">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="iq-app-container">
          <Header />
          <div className="iq-content-container">
            {isGmailAccount ? (
              gmailAccountErrorMessage()
            ) : (
              <div>
                <div className="iq-margin-bottom">
                  <h3>
                    Hi {user.displayName.split(" ")[0] || user.displayName},
                    welcome to CoffeeIQ for{" "}
                    <span className="capitalize">{user.orgName}.</span> Begin by
                    joining {groups.length > 1 ? "a" : "the"} coffee group below
                    - or make a new group for your team.
                  </h3>
                </div>
                <GroupList />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

GroupsPage.propTypes = {
  groups: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groups: state.groups.list,
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);
