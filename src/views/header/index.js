import React, { PropTypes } from "react";

import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import ExitToApp from "material-ui/svg-icons/action/exit-to-app";
import IconButton from "material-ui/IconButton";
import FreeBreakfast from "material-ui/svg-icons/places/free-breakfast";

import { connect } from "react-redux";
import { authActions } from "core/auth";

const Header = ({ authenticated, signOut, signIn }) => {
  return (
    <AppBar
      title={<span>CoffeeIQ</span>}
      onTitleTouchTap={() => console.log("TODO: go to home")}
      iconElementLeft={
        <IconButton>
          <FreeBreakfast />
        </IconButton>
      }
      iconElementRight={
        authenticated ? (
          <FlatButton
            label="Log Out"
            labelPosition="before"
            onClick={signOut}
            icon={<ExitToApp style={{ transform: "rotate(180deg)" }} />}
          />
        ) : (
          <FlatButton
            label="Log In"
            labelPosition="before"
            onClick={signIn}
            icon={<ExitToApp />}
          />
        )
      }
    />
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = {
  signOut: authActions.signOut,
  signIn: authActions.signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
