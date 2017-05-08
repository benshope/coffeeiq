import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { groupActions } from 'core/groups';
import TaskFilters from 'views/components/group-filters';
import TaskForm from 'views/components/group-form/group-form.container';
import TaskList from 'views/components/group-list';

const TasksPage = ({createTask, location, groups}) => {
  const { filter } = location.query;

  return (
    <div className="g-row">
      <div className="g-col">
        <TaskForm handleSubmit={createTask} />
      </div>

      <div className="g-col">
        <TaskFilters filter={filter} />
        <TaskList
          groups={groups}
        />
      </div>
    </div>
  );
};

TasksPage.propTypes = {
  createTask: PropTypes.func.isRequired,
  filterTasks: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  removeTask: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  updateTask: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  groups: state.groups.list
});

const mapDispatchToProps = {
  createTask: groupActions.createTask,
  filterTasks: groupActions.filterTasks,
  removeTask: groupActions.removeTask,
  updateTask: groupActions.updateTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksPage);
