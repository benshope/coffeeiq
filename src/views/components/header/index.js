import PropTypes from "prop-types";
import { authActions } from "src/auth";
import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import LogoSVG from "src/assets/graphics/coffeeiq_logo.svg";

const Header = ({ auth, AboutPage, HowItWorksPage, calendarToken, match, signOut, signIn }) => {
  const authenticated = auth.authenticated;
  return (
    <div className={["header-container", authenticated ? "background-light" : ""].join(" ")}>
      <div className="header">
        <NavLink exact activeClassName="selected" className="header-title" to={authenticated ? "/groups" : "/"}>
          <img className="header-logo" src={LogoSVG} alt="CoffeeIQ" />
          <span className="header-title-text">CoffeeIQ</span>
        </NavLink>
        {!authenticated ? (
          <div className="header-buttons">
            <NavLink
              activeClassName="selected"
              className="unauth-header-link"
              to={"/how-it-works"}
              onClick={HowItWorksPage}
            >
              How it Works
            </NavLink>
            <NavLink activeClassName="selected" className="unauth-header-link" to={"/about"} onClick={AboutPage}>
              About
            </NavLink>
            <a className="login" onClick={() => signIn(false)}>
              Log In
            </a>
          </div>
        ) : (
          <div className="header-buttons">
            <NavLink activeClassName="selected" to="/groups">
              Groups
            </NavLink>
            <NavLink activeClassName="selected" to="/users">
              Users
            </NavLink>
            <NavLink
              title={(auth && auth.displayName) || "Profile"}
              className="my-profile"
              activeClassName="selected"
              to={`/user/${auth.emailId}`}
            >
              <img alt="user" src={auth && auth.photoURL} />
            </NavLink>
            {false && (
              <a title="Sign Out" onClick={signOut}>
                <span role="img" aria-label="Sign Out">
                  🚪
                </span>
              </a>
            )}
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
