import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { taskActions } from 'core/tasks';
import classNames from 'classnames';
import Button from '../button';
import Icon from '../icon';

import taskForm from '../task-form/task-form.component';

const TaskItem = ({
  editTask,
  removeTask,
  task,
  taskBeingEdited,
  toggleGroupMembership,
  updateTask
}) => {
  // const update = (updates) => ({
  //   ...task,
  //   ...updates
  // });

  const editing = taskBeingEdited && taskBeingEdited.key === task.key;

  const startEditing = () => editTask(task);
  const stopEditing = () => editTask(undefined);

  const remove = () => {
    removeTask(task);
  };

  const taskViewer = () => {
    return (
      <div className="task-item__title" tabIndex="0">
        {task.name} @ {task.location}
      </div>
    );
  };

  const taskEditor = () => taskForm({
    task,
    onChange: editTask,
    onSubmit: updateTask
  });

  let containerClasses = classNames('task-item', {
    'task-item--completed': task.completed,
    'task-item--editing': editing
  });

  return (
    <div className={containerClasses} tabIndex="0">
      <div className="cell">
        <Button
          className={
            classNames('btn--icon', 'task-item__button',
              {'active': task.completed, 'hide': editing})}
          onClick={toggleGroupMembership}>
          <Icon name="done" />
        </Button>
      </div>
      <div className="cell">
        {editing ? taskEditor() : taskViewer()}
      </div>
      <div className="cell">
        <Button
          className={classNames('btn--icon', 'task-item__button', {'hide': editing})}
          onClick={startEditing}>
          <Icon name="mode_edit" />
        </Button>
        <Button
          className={classNames('btn--icon', 'task-item__button', {'hide': !editing})}
          onClick={stopEditing}>
          <Icon name="clear" />
        </Button>
        <Button
          className={classNames('btn--icon', 'task-item__button', {'hide': editing})}
          onClick={remove}>
          <Icon name="delete" />
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  taskBeingEdited: state.tasks.taskBeingEdited
});

const mapDispatchToProps = {
  removeTask: taskActions.removeTask,
  updateTask: taskActions.updateTask,
  toggleGroupMembership: taskActions.toggleGroupMembership,
  editTask: taskActions.editTask
};

TaskItem.propTypes = {
  editTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  taskBeingEdited: PropTypes.object,
  toggleGroupMembership: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskItem);
