import React, { PropTypes } from 'react';
import TaskItem from '../task-item';


const TaskList = ({tasks}) => {
  let taskItems = tasks.map((task, index) => {
    return (
      <TaskItem
        key={index}
        task={task}
      />
    );
  });

  return (
    <div className="task-list">
      {taskItems}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default TaskList;
