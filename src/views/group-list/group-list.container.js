import React, { PropTypes } from "react";
import { connect } from "react-redux";
import GroupForm from "views/group-form/group-form.container";
import GroupItem from "views/group-item/group-item.container";
import Header from "views/header";

const GroupList = ({ groups }) => (
  <div className="group-list">
    <Header />
    {groups && groups.length ? (
      groups.map((group, i) => <GroupItem key={i} group={group} />)
    ) : (
      <GroupForm />
    )}
  </div>
);

GroupList.propTypes = {
  groups: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  groups: state.groups.list
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
