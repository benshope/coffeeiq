import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { orgActions } from "src/org";
import { groupFormActions } from "src/group-form";
import GroupForm from "../group-form";
import InviteForm from "../invite-form";
import InviteList from "../invite-list";
import Toggle from "../toggle";

const GroupPage = ({ auth, deleteGroup, groupForm, groups, match, toggleMembership, setGroupForm, users }) => {
  const group = groups && groups[match.params.groupId];
  const userIds = (group && group.userIds) || {};
  const realUserIds = Object.keys(userIds).filter(userId => userIds[userId]);
  return (
    (group &&
      users && (
        <div className="group-page">
          {!groupForm.key || match.params.groupId !== groupForm.key || groupForm.sending ? (
            <div className="group-page-header">
              <div className="group-page-title">
                <h1>{group.name}</h1>
              </div>
              <button
                title="Edit Group"
                className="edit-button"
                onClick={e => setGroupForm({ key: match.params.groupId, value: group })}
              >
                <span role="img" aria-label="edit">
                  ✏️
                </span>
              </button>
              <button
                className="delete-group-button"
                title="Delete Group"
                onClick={e =>
                  window.confirm(`Are you sure you want to delete group ${group.name}?`) &&
                  deleteGroup(match.params.groupId)}
              >
                <span role="img" aria-label="delete">
                  🗑️
                </span>
              </button>
            </div>
          ) : (
            <GroupForm />
          )}
          <div>Meeting at {group.location}</div>
          <div className="members-header">
            <h2>{realUserIds.length} Members</h2>{" "}
            <Toggle
              id={match.params.groupId}
              value={!!userIds[auth.uid] ? "Leave" : "Join"}
              checked={!!userIds[auth.uid]}
              onChange={e => {
                toggleMembership({ groupId: match.params.groupId, userId: auth.uid });
              }}
            />
          </div>
          <ul className="user-list item-list">
            {realUserIds.map((userId, i) => {
              const user = users[userId] || {};
              return (
                <Link key={userId} to={`/user/${userId}`}>
                  <li className="user-item item">
                    <span className="user-description">
                      {user.displayName} - {user.email}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
          <InviteList invites={group.invites || {}} groupId={match.params.groupId} />
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
  setGroupForm: groupFormActions.setGroupForm,
  deleteGroup: orgActions.deleteGroup,
  toggleMembership: orgActions.toggleMembership
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupPage));
