import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { orgActions } from "src/org";
import { groupFormActions } from "src/group-form";
import GroupForm from "../group-form";
import InviteForm from "../invite-form";

const GroupPage = ({ auth, deleteGroup, groupForm, groups, match, toggleMembership, updateGroupForm, users }) => {
  const group = groups && groups[match.params.groupId];
  const userIds = (group && group.userIds) || {};
  const realUserIds = Object.keys(userIds).filter(userId => userIds[userId]);
  return (
    (group &&
      users && (
        <div className="group-page">
          {!groupForm.key || match.params.groupId !== groupForm.key ? (
            <div className="group-page-header">
              <div className="group-page-title">
                <h1>{group.name}</h1>
              </div>
              <button
                className="edit-button"
                onClick={e => updateGroupForm({ key: match.params.groupId, value: group })}
              >
                Edit
              </button>
              <button
                className="membership-button"
                onClick={e =>
                  toggleMembership({
                    groupId: match.params.groupId,
                    userId: auth.uid
                  })}
              >
                {(userIds || {})[auth.uid] ? "Leave" : "Join"}
              </button>
              <button
                className="delete-group-button"
                onClick={e =>
                  window.confirm(`Are you sure you want to delete group ${group.name}?`) &&
                  deleteGroup(match.params.groupId)}
              >
                <span role="img" aria-label="trash">
                  🗑️
                </span>
              </button>
            </div>
          ) : (
            <GroupForm />
          )}
          <div>Meeting at {group.location}</div>
          <div className="members-header">
            <h2>{realUserIds.length} Members</h2>
          </div>
          <ul className="user-list">
            {realUserIds.map((userId, i) => {
              const user = users[userId] || {};
              return (
                <Link key={userId} to={`/user/${userId}`}>
                  <li className="user-item">
                    <span className="user-description">
                      {user.displayName} - {user.email}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
          <InviteForm groupId={match.params.groupId} />
        </div>
      )) || <div>Loading...</div>
  );
};

GroupPage.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  groups: PropTypes.object,
  users: PropTypes.object,
  toggleMembership: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groupForm: state.groupForm,
  auth: state.auth,
  groups: (state.org[state.auth.orgId] || {}).groups,
  users: (state.org[state.auth.orgId] || {}).users
});

const mapDispatchToProps = {
  updateGroupForm: groupFormActions.updateGroupForm,
  deleteGroup: orgActions.deleteGroup,
  toggleMembership: orgActions.toggleMembership
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupPage));
