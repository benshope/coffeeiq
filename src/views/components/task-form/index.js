import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { taskActions } from 'core/tasks';

const TaskForm = ({newTask, updateTask, createTask}) => {
  const handleSubmit = () => {
    createTask(newTask);
  };
  const nameChange = (e) => {
    updateTask({ name: e.value });
  };
  const locationChange = (e) => {
    updateTask({ location: e.value });
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        autoComplete="off"
        autoFocus
        className="task-form__input"
        maxLength="64"
        onChange={nameChange}
        placeholder="Coffee Group Name"
        type="text"
        value={newTask.name}
      />
      <input
        autoComplete="off"
        autoFocus
        className="task-form__input"
        maxLength="64"
        onChange={locationChange}
        placeholder="Meeting Location"
        type="text"
        value={newTask.location}
      />
    </form>
  );
};

TaskForm.propTypes = {
  createTask: PropTypes.func.isRequired,
  newTask: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  newTask: state.tasks.newTask
});

const mapDispatchToProps = {
  createTask: taskActions.createTask,
  updateTask: taskActions.updateTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
