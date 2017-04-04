import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { taskActions } from 'core/tasks';
import TaskFilters from 'views/components/task-filters';
import TaskForm from 'views/components/task-form';
import TaskList from 'views/components/task-list';


const TasksPage = ({createTask, location, tasks}) => {
  const { filter } = location.query;

  return (
    <div className="g-row">
      <div className="g-col">
        <TaskForm handleSubmit={createTask} />
      </div>

      <div className="g-col">
        <TaskFilters filter={filter} />
        <TaskList
          tasks={tasks}
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
  tasks: PropTypes.array.isRequired,
  updateTask: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  tasks: state.tasks.list
});

const mapDispatchToProps = {
  createTask: taskActions.createTask,
  filterTasks: taskActions.filterTasks,
  removeTask: taskActions.removeTask,
  updateTask: taskActions.updateTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksPage);
