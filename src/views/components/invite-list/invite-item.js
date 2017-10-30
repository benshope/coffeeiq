import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { orgActions } from "src/org";

const InviteItem = ({
  groupId,
  invite,
  inviteId,
  deleteInvite,
  resendInvite
}) => (
  <li className="item invite-item">
    {invite.email}
    <div className="right-content">
      <a onClick={() => resendInvite({ groupId, inviteId })}>Resend</a>
      <a onClick={() => deleteInvite({ groupId, inviteId })}>Delete</a>
    </div>
  </li>
);

InviteItem.propTypes = {
  groupId: PropTypes.string,
  invite: PropTypes.object.isRequired,
  inviteId: PropTypes.string.isRequired,
  deleteInvite: PropTypes.func.isRequired,
  resendInvite: PropTypes.func.isRequired
};

const mapStateToProps = (state, passedProps) => ({ ...passedProps });

const mapDispatchToProps = {
  deleteInvite: orgActions.deleteInvite,
  resendInvite: orgActions.resendInvite
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteItem);
