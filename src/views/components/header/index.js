import React, { PropTypes } from 'react';
import Button from '../button';
import Icon from '../icon';
import { go } from 'react-router-redux';

const Header = ({authenticated, signOut}) => {
  const goToAbout = () => {
    go('/about');
  };
  return (
    <header className="header">
      <div className="g-row">
        <div className="g-col">
          <h1 className="header__title">
            <span className="title-icon"><Icon name="local_cafe" /></span>
            <span className="title-text">CoffeeIQ</span>
          </h1>
          <ul className="header__actions">
            {authenticated ? <li><Button onClick={signOut}>Sign Out</Button></li> : null}
            {!authenticated ? <li><Button onClick={goToAbout}>About</Button></li> : null}
            <li>
              {undefined && <a className="link link-help" href="#">
                <Icon name="help" />
              </a>}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  goToAbout: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
};


export default Header;
