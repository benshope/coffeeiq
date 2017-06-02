import { groupActions } from 'core/groups';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from '../button';
import Icon from '../icon';
import groupForm from '../group-form/group-form.component';
// import helloCloudFuncTest from '../functions';

const GroupItem = ({
  auth,
  editGroup,
  removeGroup,
  group,
  groupBeingEdited,
  toggleGroupMembership,
  updateGroup
}) => {
  // const update = (updates) => ({
  //   ...group,
  //   ...updates
  // });

  const editing = groupBeingEdited && groupBeingEdited.key === group.key;

  const startEditing = () => editGroup(group);
  const stopEditing = () => editGroup(undefined);

  const remove = () => {
    removeGroup(group);
  };

  const userInGroup = group.userIds && group.userIds[auth.uid];

  const groupViewer = () => {
    return (
      <div className="group-item__title" tabIndex="0">
        {group.name} @ {group.location}
      </div>
    );
  };

  const groupEditor = () => groupForm({
    group,
    onChange: editGroup,
    onSubmit: updateGroup
  });

  let containerClasses = classNames('group-item', {
    'group-item--completed': group.completed,
    'group-item--editing': editing
  });

  return (
    <div className={containerClasses} tabIndex="0">
      <div className="cell">
        <Button
          className={
            classNames('btn--icon', 'group-item__button',
              {'active': group.completed, 'hide': editing})}
          onClick={() => toggleGroupMembership(group)}>
          <Icon name="done" />
        </Button>
        { userInGroup ? 'Join' : 'Leave' }
      </div>
      <div className="cell">
        {editing ? groupEditor() : groupViewer()}
      </div>
      <div className="cell">
        <Button
          className={classNames('btn--icon', 'group-item__button', {'hide': editing})}
          onClick={startEditing}>
          <Icon name="event" />
        </Button>
        <Button
          className={classNames('btn--icon', 'group-item__button', {'hide': editing})}
          onClick={stopEditing}>
          <Icon name="mode_edit" />
        </Button>
        <Button
          className={classNames('btn--icon', 'group-item__button', {'hide': !editing})}
          onClick={stopEditing}>
          <Icon name="clear" />
        </Button>
        <Button
          className={classNames('btn--icon', 'group-item__button', {'hide': editing})}
          onClick={remove}>
          <Icon name="delete" />
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  groupBeingEdited: state.groups.groupBeingEdited,
  auth: state.auth
});

const mapDispatchToProps = {
  removeGroup: groupActions.removeGroup,
  updateGroup: groupActions.updateGroup,
  toggleGroupMembership: groupActions.toggleGroupMembership,
  editGroup: groupActions.editGroup
};

GroupItem.propTypes = {
  auth: PropTypes.object.isRequired,
  editGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  groupBeingEdited: PropTypes.object,
  removeGroup: PropTypes.func.isRequired,
  toggleGroupMembership: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupItem);
