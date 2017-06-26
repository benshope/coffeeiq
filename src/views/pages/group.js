import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { groupActions } from 'core/groups';

const GroupPage = ({
  id,
  groups,
  user
  // removeGroup,
  // updateGroup
}) => {
  console.log('ATTEMPTING TO SHOW GROUP PAGE', id, groups, user);
  const group = groups.list.find((g) => g.key === id);
  const users = Object.keys(group.userIds).map((user, index) => (<li key={index}>{user} [remove user]</li>));
  const isAdmin = group.admins.includes(user.email) || groups.admins.includes(user.email) || user.isAdmin;

  return (
    <div className="g-row">
      <h2>{group.name}</h2>
      {isAdmin && '[delete group]'}
      {users}
      [add users]
    </div>);
};

GroupPage.propTypes = {
  groups: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const stateProps = (state, ownProps) => ({
  id: ownProps.params.id,
  user: state.auth.user,
  groups: state.groups
});

const dispatchProps = {
  removeGroup: groupActions.removeGroup,
  updateGroup: groupActions.updateGroup
};

export default connect(
  stateProps,
  dispatchProps
)(GroupPage);
