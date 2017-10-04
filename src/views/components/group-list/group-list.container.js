import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { orgActions } from "src/org";

const GroupList = ({ auth, groups, toggleGroupMembership }) => (
  <ul className="group-list">
    {Object.keys(groups).map((key, i) => {
      const group = groups[key];
      return (
        <Link to={`/group/${key}`}>
          <li key={group.key} className="group-item">
            <button onClick={() => toggleGroupMembership(group)}>
              {(group.userIds || {})[auth.uid] ? "Join" : "Leave"}
            </button>
            <span className="group-title">
              {group.name} @ {group.location}
            </span>
          </li>
        </Link>
      );
    })}
  </ul>
);

GroupList.propTypes = {
  groups: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  toggleGroupMembership: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  groups: state.org.groups || {}
});

const mapDispatchToProps = {
  toggleGroupMembership: orgActions.toggleGroupMembership
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
