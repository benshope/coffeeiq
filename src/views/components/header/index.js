import PropTypes from "prop-types";
import { authActions } from "src/auth";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ authenticated, signOut, signIn }) => {
  return (
    <div className="header-container">
      <div className="header">
        <span className="header-title">CoffeeIQ</span>
        {!authenticated ? (
          <ul className="header-buttons">
            <li onClick={signIn}>Log In</li>
          </ul>
        ) : (
          <ul className="header-buttons">
            <Link to="/groups">
              <li>Groups</li>
            </Link>
            <li onClick={signOut}>Log Out</li>
          </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
