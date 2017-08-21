import React, { PropTypes } from "react";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import LocalDrink from "material-ui/svg-icons/maps/local-drink";

const Header = ({ authenticated, signOut }) => {
  return (
    <AppBar
      title={<span>CoffeeIQ</span>}
      onTitleTouchTap={() => console.log("TODO: go to home")}
      iconElementLeft={
        <IconButton>
          <LocalDrink />
        </IconButton>
      }
      iconElementRight={
        authenticated
          ? <IconButton>
              <LocalDrink />
            </IconButton>
          : <IconButton>
              <LocalDrink />
            </IconButton>
      }
    />
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
