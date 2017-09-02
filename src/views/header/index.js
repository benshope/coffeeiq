import React, { PropTypes } from "react";

import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import ExitToApp from "material-ui/svg-icons/action/exit-to-app";
import IconButton from "material-ui/IconButton";
import FreeBreakfast from "material-ui/svg-icons/places/free-breakfast";

const Header = ({ authenticated, signOut }) => {
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
        authenticated
          ? <FlatButton label="Log Out" labelPosition="before" onClick={signOut} icon={<ExitToApp style={{transform: "rotate(180deg)"}} />} />
          : <FlatButton label="Log In" labelPosition="before" onClick={signOut} icon={<ExitToApp />} />
      }
    />
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
