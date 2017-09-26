import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { orgSelectors } from "src/org";
import GroupItem from "../group-item/group-item.container";

const GroupList = ({ groups }) => (
	<div className="group-list">
		{groups && groups.length && groups.map((group, i) => <GroupItem key={i} group={group} />)}
	</div>
);

GroupList.propTypes = {
	groups: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	groups: orgSelectors.selectGroups(state)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
