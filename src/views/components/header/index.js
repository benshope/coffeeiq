import PropTypes from "prop-types";
import { authActions } from "src/auth";
import React from "react";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";

const Header = ({ authenticated, signOut, signIn, userId }) => {
  const headerTitle = <span className="header-title">CoffeeIQ</span>;
  return (
    <div className="header-container">
      <div className="stripes-container">
        <div id="stripes">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="header">
        {authenticated ? <Link to="/groups">{headerTitle}</Link> : headerTitle}
        {!authenticated ? (
          <div className="header-buttons">
            <a onClick={signIn}>Log In</a>
          </div>
        ) : (
          <div className="header-buttons">
            <NavLink activeClassName="selected" to="/groups">
              Groups
            </NavLink>
            <NavLink activeClassName="selected" to="/users">
              Users
            </NavLink>
            <NavLink activeClassName="selected" to={`/user/${userId}`}>
              👻
            </NavLink>
            <a onClick={signOut}>🚪 Log Out</a>
          </div>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  userId: PropTypes.string
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  userId: state.auth.user && state.auth.user.uid
});

const mapDispatchToProps = {
  signOut: authActions.signOut,
  signIn: authActions.signIn
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
