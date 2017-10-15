import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";

const UserInviteList = ({invites}) => {
	if (invites) {
		return (
			<div>
				<h3>Invited Users</h3>
				<ul>
					{Object.keys(invites).map(key => <li key={key}>{invites[key].email}</li>)}
				</ul>
			</div>
		)
	}
};

UserInviteList.propTypes = {
	invites: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	invites: state.org.invites || {}
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserInviteList);
