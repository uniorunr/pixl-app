import React, { Component, Fragment } from 'react';
import './NavBar.scss';
import Logo from '../../assets/favicon.png';
import FireBase from '../../firebase/firebase';

class NavBar extends Component {
  handleSignIn = async () => {
    await FireBase.auth();
  };

  render() {
    return (
      <Fragment>
        <div className="navbar">
          <nav className="navbar__content">
            <h1 className="navbar__logo">
              <a href="/">
                <img src={Logo} alt="Pixl logo" />
                <span>Pixl!</span>
              </a>
            </h1>
            <button className="navbar__faq" type="button">
              <i className="fas fa-question" />
            </button>
            <button
              className="navbar__sign-in-button"
              type="button"
              onClick={this.handleSignIn}
            >
              <span>Sign in</span>
            </button>
          </nav>
        </div>
      </Fragment>
    );
  }
}

export default NavBar;
