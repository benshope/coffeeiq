import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const GroupItem = ({ group, groupId, rightContent, hideMemberCount }) => (
  <li key={groupId} className="item group-item">
    <Link to={`/group/${groupId}`} className="item-title">
      {group.name} @ {group.location}{" "}
      {!hideMemberCount && (
        <div className="member-count">
          {Object.keys(group.userIds || {}).length}
        </div>
      )}
    </Link>
    <div className="right-content">{rightContent}</div>
  </li>
);

GroupItem.propTypes = {
  hideMemberCount: PropTypes.bool,
  group: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired,
  rightContent: PropTypes.node
};

const mapStateToProps = (state, passedProps) => ({ ...passedProps });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem);
