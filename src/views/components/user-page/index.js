import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authActions } from "src/auth";
import { orgActions } from "src/org";
import GroupItem from "../group-item";

const UserPage = ({ auth, users, groups, match, signOut, toggleMembership }) => {
  const user = users && users[match.params.userId];
  const isMyUserPage = auth.uid === user.uid;
  return (
    (user && (
      <div className="user-page">
        <div className="user-page-title">
          <h1>{user.displayName}</h1>
          {isMyUserPage && <button onClick={signOut}>Sign Out</button>}
        </div>
        <div className="user-details">
          {user.photoURL && <img className="user-image" alt="user" src={user.photoURL} />}
          <div className="user-email">{user.email}</div>
        </div>
        <h2>Groups</h2>
        <ul>
          {Object.keys(user.groupIds || {}).map(groupId => {
            const group = groups[groupId];
            return group ? (
              <GroupItem
                key={groupId}
                hideMemberCount={true}
                group={group}
                groupId={groupId}
                rightContent={
                  isMyUserPage ? (
                    <a
                      id={`delete-membership-in-${groupId}`}
                      className="delete-membership-link"
                      title="Leave Group"
                      onClick={() => {
                        toggleMembership({ groupId, userId: auth.uid });
                      }}
                    >
                      ×
                    </a>
                  ) : (
                    undefined
                  )
                }
              />
            ) : (
              undefined
            );
          })}
        </ul>
      </div>
    )) || (
      <div className="user-page-loading display-flex align-items-center">
        <div className="loading-message flex-grow">Loading user...</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    )
  );
};

UserPage.propTypes = {
  users: PropTypes.object,
  auth: PropTypes.object.isRequired,
  groups: PropTypes.object,
  signOut: PropTypes.func.isRequired,
  toggleMembership: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: (state.org[state.auth.orgId] || {}).users,
  groups: (state.org[state.auth.orgId] || {}).groups,
  auth: state.auth
});

const mapDispatchToProps = {
  signOut: authActions.signOut,
  toggleMembership: orgActions.toggleMembership
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));
