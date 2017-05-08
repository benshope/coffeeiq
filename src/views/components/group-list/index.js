import React, { PropTypes } from 'react';
import TaskItem from '../group-item';


const TaskList = ({groups}) => {
  let groupItems = groups.map((group, index) => {
    return (
      <TaskItem
        key={index}
        group={group}
      />
    );
  });

  return (
    <div className="group-list">
      {groupItems}
    </div>
  );
};

TaskList.propTypes = {
  groups: PropTypes.array.isRequired
};

export default TaskList;
