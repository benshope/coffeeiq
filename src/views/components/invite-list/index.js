import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import InviteItem from "./invite-item";

const InviteList = ({ invites, groupId }) => (
  <ul className="invite-list item-list">
    {Object.keys(invites || {}).map(inviteId => (
      <InviteItem key={inviteId} inviteId={inviteId} invite={invites[inviteId]} groupId={groupId} />
    ))}
  </ul>
);

InviteList.propTypes = {
  groupId: PropTypes.string,
  invites: PropTypes.object.isRequired
};

const mapStateToProps = (state, passedProps) => ({ ...passedProps });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InviteList);
