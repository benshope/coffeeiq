import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { orgActions } from "src/org";

const UserList = ({ auth, uids, users }) => (
  <ul className="user-list item-list">
    {(uids || Object.keys(users)).map((uid, i) => {
      const user = users[uid];
      return (
        <Link key={uid} to={`/user/${uid}`}>
          <li className="user-item item">
            {user.displayName ? (
              <span>
                <b>{user.displayName}</b> - {user.email}
              </span>
            ) : (
              user.email
            )}
          </li>
        </Link>
      );
    })}
  </ul>
);

UserList.propTypes = {
  uids: PropTypes.array,
  users: PropTypes.object.isRequired,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: (state.org[state.auth.orgId] || {}).users || {}
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
