import PropTypes from "prop-types";
import { orgActions } from "src/org";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// TODO: make stateful component
const GroupForm = ({ group, createGroup, updateGroup }) => {
  return <div className="header-container">Group Form Here</div>;
};

GroupForm.propTypes = {
  createGroup: PropTypes.func.isRequired,
  group: PropTypes.object,
  updateGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  createGroup: orgActions.createGroup,
  updateGroup: orgActions.updateGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);
