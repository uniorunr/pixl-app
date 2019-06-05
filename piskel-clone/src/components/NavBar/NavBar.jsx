import React, { Fragment } from 'react';
import './NavBar.scss';
import Logo from '../../assets/favicon.png';

const NavBar = () => (
  <Fragment>
    <div className="navbar">
      <nav className="navbar__content">
        <h1 className="navbar__logo">
          <a href="/">
            <img src={Logo} alt="Pixl logo" />
            <span>Pixl!</span>
          </a>
        </h1>
        <button className="navbar__sign-in-button" type="button">
          <span>Sign in</span>
        </button>
      </nav>
    </div>
  </Fragment>
);

export default NavBar;
