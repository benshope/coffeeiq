import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

const UserInviteList = ({ invites }) =>
    invites && <ul>{Object.keys(invites).map(key => <li key={key}>{invites[key].email}</li>)}</ul>;

UserInviteList.propTypes = {
    invites: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    invites: (state.org[state.auth.orgId] || {}).invites || {}
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserInviteList);
