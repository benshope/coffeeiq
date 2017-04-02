import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { taskActions } from 'core/tasks';

const TaskForm = ({newTask, updateNewTask, createTask}) => {
  const handleSubmit = () => {
    createTask(newTask);
  };
  const nameChange = (e) => {
    console.log(e.target.value);
    updateNewTask({ name: e.target.value });
  };
  const locationChange = (e) => {
    console.log(e.target.value);
    updateNewTask({ location: e.target.value });
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
  updateNewTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  newTask: state.tasks.newTask
});

const mapDispatchToProps = {
  createTask: taskActions.createTask,
  updateNewTask: taskActions.updateNewTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
