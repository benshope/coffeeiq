import PropTypes from "prop-types";
import { authActions } from "src/auth";
import React from "react";
import { connect } from "react-redux";

const Header = ({ authenticated, signOut, signIn }) => {
  return (
    <header className="header">
      <h1 className="header-title">CoffeeIQ</h1>
      <ul className="header-buttons">
        <li>
          {authenticated ? (
            <button onClick={signOut}>Log Out</button>
          ) : (
            <button onClick={signIn}>Log In</button>
          )}
        </li>
      </ul>
    </header>
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
