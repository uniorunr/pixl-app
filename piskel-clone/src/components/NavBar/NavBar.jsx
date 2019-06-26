import React, { Component, Fragment } from 'react';
import './NavBar.scss';
import PropTypes from 'prop-types';
import Logo from '../../assets/favicon.png';
import FireBase from '../../firebase/firebase';
import UserInfo from './UserInfo/UserInfo';

class NavBar extends Component {
  handleSignIn = async () => {
    const { updateSignInState } = this.props;
    updateSignInState('Signing in...');
    await FireBase.auth();
  };

  render() {
    const { userData, signInState } = this.props;

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
            {!userData ? (
              <button
                className="navbar__sign-in-button"
                type="button"
                onClick={this.handleSignIn}
              >
                <span>{signInState || 'Sign in'}</span>
              </button>
            ) : (
              <UserInfo src={userData.photoURL} />
            )}
          </nav>
        </div>
      </Fragment>
    );
  }
}

NavBar.propTypes = {
  userData: PropTypes.instanceOf(Object),
  updateSignInState: PropTypes.func.isRequired,
  signInState: PropTypes.string,
};

NavBar.defaultProps = {
  userData: null,
  signInState: null,
};

export default NavBar;
