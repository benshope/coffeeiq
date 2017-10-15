import PropTypes from "prop-types";
import { authActions } from "src/auth";
import React from "react";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";

const Header = ({ auth, AboutPage, HowItWorksPage, calendarToken, signOut, signIn }) => {
  const authenticated = auth.authenticated;
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
        <Link className="header-title" to={authenticated ? "/groups" : "/"}>
          CoffeeIQ
        </Link>
        {!authenticated ? (
          <div className="header-buttons">
            <NavLink activeClassName="selected" to={"/how-it-works"} onClick={HowItWorksPage}>
              How it works
            </NavLink>
            <NavLink activeClassName="selected" to={"/about"} onClick={AboutPage}>
              About
            </NavLink>
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
            <NavLink activeClassName="selected" to={`/user/${auth.uid}`}>
              <span role="img" aria-label="ghost">
                👻
              </span>
            </NavLink>
            <a onClick={signOut}>
              <span role="img" aria-label="door">
                🚪
              </span>{" "}
              Log Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signIn: authActions.signIn,
  signOut: authActions.signOut
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
