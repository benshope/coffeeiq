import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import UserItem from "../user-item";

const UserList = ({ emailIds, deleteInvite, groupId, resendInvite }) => (
    <ul className="user-list item-list">
        {Object.keys(emailIds).map(emailId => <UserItem key={emailId} emailId={emailId} groupId={groupId} />)}
    </ul>
);

UserList.propTypes = {
    emailIds: PropTypes.object.isRequired,
    groupId: PropTypes.string
};

const mapStateToProps = (state, props) => ({
    groupId: props.groupId,
    emailIds: props.emailIds || (state.org[state.auth.orgId] && state.org[state.auth.orgId].users) || {}
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
