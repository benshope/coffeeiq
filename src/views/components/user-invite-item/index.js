import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { orgActions } from "src/org";

const InviteItem = ({ groupId, invite, inviteId, deleteInvite, resendInvite }) => (
  <li className="item invite-item">
    <div className="item-title">{invite.email}</div>
    <div className="right-content">
      {undefined && (
        <a title="Resend Invite" onClick={() => resendInvite({ groupId, inviteId })}>
          ↻
        </a>
      )}
      <a className="delete" title="Delete Invite" onClick={() => deleteInvite({ groupId, inviteId })}>
        ×
      </a>
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
