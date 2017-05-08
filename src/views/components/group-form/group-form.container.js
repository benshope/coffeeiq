import { connect } from 'react-redux';
import { groupActions } from 'core/groups';

import TaskForm from './group-form.component';

const mapStateToProps = state => ({
  group: state.groups.newTask
});

const mapDispatchToProps = {
  onSubmit: groupActions.createTask,
  onChange: groupActions.updateNewTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
