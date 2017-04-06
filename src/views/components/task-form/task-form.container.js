import { connect } from 'react-redux';
import { taskActions } from 'core/tasks';

import TaskForm from './task-form.component';

const mapStateToProps = state => ({
  task: state.tasks.newTask
});

const mapDispatchToProps = {
  onSubmit: taskActions.createTask,
  onChange: taskActions.updateNewTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
