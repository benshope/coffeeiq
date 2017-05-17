import React, { PropTypes } from 'react';
import GroupItem from '../group-item';


const GroupList = ({groups}) => {
  let groupItems = groups.map((group, index) => {
    return (
      <GroupItem
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

GroupList.propTypes = {
  groups: PropTypes.array.isRequired
};

export default GroupList;
