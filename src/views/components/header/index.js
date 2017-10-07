import PropTypes from "prop-types";
import { authActions } from "src/auth";
import React from "react";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";

const Header = ({ authenticated, signOut, signIn }) => {
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
          <ul className="header-buttons">
            <li onClick={signIn}>Log In</li>
          </ul>
        ) : (
          <div className="header-buttons">
            <NavLink activeClassName="selected" to="/groups">
              Groups
            </NavLink>
            <NavLink activeClassName="selected" to="/users">
              Users
            </NavLink>
            <a onClick={signOut}>Log Out</a>
          </div>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = {
  signOut: authActions.signOut,
  signIn: authActions.signIn
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
