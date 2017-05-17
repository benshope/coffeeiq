import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { groupActions } from 'core/groups';
import classNames from 'classnames';
import Button from '../button';
import Icon from '../icon';

import groupForm from '../group-form/group-form.component';

const GroupItem = ({
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

  const sendInvitesToGroup = () => console.log('button clicked');
  const editing = groupBeingEdited && groupBeingEdited.key === group.key;

  const startEditing = () => editGroup(group);
  const stopEditing = () => editGroup(undefined);

  const remove = () => {
    removeGroup(group);
  };

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
          onClick={toggleGroupMembership}>
          <Icon name="done" />
        </Button>
      </div>
      <div className="cell">
        {editing ? groupEditor() : groupViewer()}
      </div>
      <div className="cell">
        <Button
          className={classNames('group-item__button', {'hide': editing})}
          onClick={sendInvitesToGroup}>
          Send Invites to Group
        </Button>
        <Button
          className={classNames('btn--icon', 'group-item__button', {'hide': editing})}
          onClick={startEditing}>
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
  groupBeingEdited: state.groups.groupBeingEdited
});

const mapDispatchToProps = {
  removeGroup: groupActions.removeGroup,
  updateGroup: groupActions.updateGroup,
  toggleGroupMembership: groupActions.toggleGroupMembership,
  editGroup: groupActions.editGroup
};

GroupItem.propTypes = {
  editGroup: PropTypes.func.isRequired,
  removeGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  groupBeingEdited: PropTypes.object,
  toggleGroupMembership: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupItem);
