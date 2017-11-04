import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { orgActions } from "src/org";

const UserItem = ({ deleteInvite, emailId, groupId, resendInvite, user }) =>
  !user.invite ? (
    <li className="item user-item">
      <Link to={`/user/${emailId}`}>
        <b>{user.displayName}</b> - {user.email}
      </Link>
    </li>
  ) : (
    <li className="item invite-item">
      <div className="item-title">{user.email}</div>
      <div className="right-content">
        {undefined && (
          <a title="Resend Invite" onClick={() => resendInvite({ emailId, groupId })}>
            ↻
          </a>
        )}
        <a className="delete" title="Delete Invite" onClick={() => deleteInvite({ emailId, groupId })}>
          ×
        </a>
      </div>
    </li>
  );

UserItem.propTypes = {
  deleteInvite: PropTypes.func,
  emailId: PropTypes.string.isRequired,
  groupId: PropTypes.string,
  resendInvite: PropTypes.func,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  emailId: props.emailId,
  groupId: props.groupId,
  user: ((state.org[state.auth.orgId] || {}).users || {})[props.emailId]
});

const mapDispatchToProps = {
  deleteInvite: orgActions.deleteInvite,
  resendInvite: orgActions.resendInvite
};

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
