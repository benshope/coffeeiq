import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';


const GroupFilters = ({filter}) => {
  return (
    <ul className="group-filters">
      <li><Link className={classNames({active: !filter})} to="/">View All</Link></li>
      <li><Link activeClassName="active" to={{pathname: '/', query: {filter: 'active'}}}>Active</Link></li>
      <li><Link activeClassName="active" to={{pathname: '/', query: {filter: 'completed'}}}>Completed</Link></li>
    </ul>
  );
};

GroupFilters.propTypes = {
  filter: PropTypes.string
};

export default GroupFilters;
